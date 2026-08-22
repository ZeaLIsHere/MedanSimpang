import { mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const projectRoot = process.cwd();
const imagesRoot = path.join(projectRoot, 'public', 'images');
const outputRoot = path.join(imagesRoot, '_responsive');
const manifestPath = path.join(projectRoot, 'src', 'data', 'image-manifest.json');
const supported = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const minimumBytes = 180 * 1024;

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === '_responsive') continue;
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(absolutePath)));
    else if (supported.has(path.extname(entry.name).toLowerCase())) files.push(absolutePath);
  }

  return files;
}

const files = await walk(imagesRoot);
const manifest = {};
let sourceBytes = 0;
let optimizedBytes = 0;

for (const absolutePath of files) {
  const fileStat = await stat(absolutePath);
  const metadata = await sharp(absolutePath).metadata();
  const sourceWidth = metadata.width || 0;

  if (fileStat.size < minimumBytes && sourceWidth <= 960) continue;

  const relativePath = path.relative(imagesRoot, absolutePath);
  const relativeDirectory = path.dirname(relativePath);
  const baseName = path.basename(relativePath, path.extname(relativePath));
  const sourceUrl = `/images/${relativePath.split(path.sep).join('/')}`;
  const widths = [...new Set([Math.min(480, sourceWidth), Math.min(1440, sourceWidth)])]
    .filter((width) => width > 0)
    .sort((a, b) => a - b);
  const variants = [];

  for (const width of widths) {
    const outputDirectory = path.join(outputRoot, relativeDirectory);
    const outputPath = path.join(outputDirectory, `${baseName}-${width}.webp`);
    const outputUrl = `/images/_responsive/${
      relativeDirectory === '.' ? '' : `${relativeDirectory.split(path.sep).join('/')}/`
    }${baseName}-${width}.webp`;

    await mkdir(outputDirectory, { recursive: true });
    let outputStat;
    try {
      outputStat = await stat(outputPath);
    } catch {
      outputStat = null;
    }

    if (!outputStat || outputStat.mtimeMs < fileStat.mtimeMs) {
      await sharp(absolutePath)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 78, effort: 3, smartSubsample: true })
        .toFile(outputPath);
      outputStat = await stat(outputPath);
    }

    optimizedBytes += outputStat.size;
    variants.push({ width, url: outputUrl });
  }

  sourceBytes += fileStat.size;
  manifest[sourceUrl] = variants;
}

const sortedManifest = Object.fromEntries(
  Object.entries(manifest).sort(([left], [right]) => left.localeCompare(right)),
);
await writeFile(manifestPath, `${JSON.stringify(sortedManifest, null, 2)}\n`, 'utf8');

const toMb = (bytes) => (bytes / 1024 / 1024).toFixed(2);
console.log(
  JSON.stringify({
    optimizedSources: Object.keys(sortedManifest).length,
    sourceMB: Number(toMb(sourceBytes)),
    responsiveVariantsMB: Number(toMb(optimizedBytes)),
    manifest: path.relative(projectRoot, manifestPath),
  }),
);
