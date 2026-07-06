import type { NextConfig } from "next";

// MedanSimpang dilayani sebagai sub-path dari situs besar urbanmorphsoc.com
const basePath = '/medansimpang';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true, // export folder/index.html agar cocok dgn URL bertrailing-slash (fix 403 di hosting statis)
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath, // dipakai helper assetPath() untuk path gambar mentah (non next/image)
  },
  images: {
    // Custom loader agar next/image menambah basePath ke src lokal (static export).
    loader: 'custom',
    loaderFile: './src/image-loader.ts',
  },
};

export default nextConfig;
