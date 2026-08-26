import { access, mkdir, readdir, readFile, stat, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const projectRoot = process.cwd();
const includePng = process.argv.includes('--include-png');
const rootArguments = process.argv.slice(2).filter((argument) => !argument.startsWith('--'));
const sourceRoots = (rootArguments.length ? rootArguments : ['public/images'])
  .map((root) => path.resolve(projectRoot, root));
const excludedDirectories = new Set([
  '.git',
  '.next',
  '_responsive',
  'deploy',
  'node_modules',
  'out',
]);
const textExtensions = new Set([
  '.css',
  '.html',
  '.js',
  '.json',
  '.jsx',
  '.md',
  '.mjs',
  '.ts',
  '.tsx',
]);

function isInside(parent, candidate) {
  const relative = path.relative(parent, candidate);
  return relative !== '' && !relative.startsWith('..') && !path.isAbsolute(relative);
}

for (const sourceRoot of sourceRoots) {
  const parsed = path.parse(sourceRoot);
  if (sourceRoot === parsed.root || !isInside(projectRoot, sourceRoot)) {
    throw new Error(`Unsafe source root: ${sourceRoot}`);
  }
}

async function walk(directory, predicate) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory() && excludedDirectories.has(entry.name)) continue;
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(absolutePath, predicate)));
    else if (predicate(absolutePath)) files.push(absolutePath);
  }

  return files;
}

function isConvertiblePhoto(absolutePath) {
  const extension = path.extname(absolutePath).toLowerCase();
  return extension === '.jpg' || extension === '.jpeg' || (includePng && extension === '.png');
}

function referenceForms(absolutePath) {
  const relative = path.relative(projectRoot, absolutePath).split(path.sep).join('/');
  const forms = new Set([relative, `./${relative}`]);
  if (relative.startsWith('public/')) forms.add(`/${relative.slice('public/'.length)}`);
  return forms;
}

const sourceFiles = (
  await Promise.all(sourceRoots.map((sourceRoot) => walk(sourceRoot, isConvertiblePhoto)))
).flat();
const conversions = [];
let beforeBytes = 0;
let afterBytes = 0;

for (const sourcePath of sourceFiles) {
  const sourceStat = await stat(sourcePath);
  const destinationPath = sourcePath.replace(/\.(?:jpe?g|png)$/i, '.webp');
  try {
    await access(destinationPath);
    throw new Error(`Destination already exists; refusing to overwrite: ${destinationPath}`);
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }

  await mkdir(path.dirname(destinationPath), { recursive: true });
  await sharp(sourcePath)
    .rotate()
    .webp({ quality: 84, effort: 5, smartSubsample: true })
    .toFile(destinationPath);

  const outputMetadata = await sharp(destinationPath).metadata();
  if (outputMetadata.format !== 'webp' || !outputMetadata.width || !outputMetadata.height) {
    throw new Error(`WebP verification failed: ${destinationPath}`);
  }

  const outputStat = await stat(destinationPath);
  beforeBytes += sourceStat.size;
  afterBytes += outputStat.size;
  conversions.push({
    sourcePath,
    destinationPath,
    sourceReferences: referenceForms(sourcePath),
    destinationReferences: referenceForms(destinationPath),
  });
}

const textFiles = await walk(projectRoot, (absolutePath) =>
  textExtensions.has(path.extname(absolutePath).toLowerCase()),
);
let rewrittenFiles = 0;

for (const textFile of textFiles) {
  let contents = await readFile(textFile, 'utf8');
  const originalContents = contents;

  for (const conversion of conversions) {
    const oldReferences = [...conversion.sourceReferences];
    const newReferences = [...conversion.destinationReferences];
    oldReferences.forEach((oldReference, index) => {
      contents = contents.split(oldReference).join(newReferences[index]);
    });
  }

  if (contents !== originalContents) {
    await writeFile(textFile, contents, 'utf8');
    rewrittenFiles += 1;
  }
}

for (const conversion of conversions) {
  if (!isInside(projectRoot, conversion.sourcePath)) {
    throw new Error(`Refusing to delete outside project: ${conversion.sourcePath}`);
  }
  await unlink(conversion.sourcePath);
}

const toMiB = (bytes) => Number((bytes / 1024 / 1024).toFixed(2));
console.log(
  JSON.stringify({
    converted: conversions.length,
    rewrittenFiles,
    beforeMiB: toMiB(beforeBytes),
    afterMiB: toMiB(afterBytes),
    reductionPercent: beforeBytes
      ? Number((((beforeBytes - afterBytes) / beforeBytes) * 100).toFixed(1))
      : 0,
  }),
);
