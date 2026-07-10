import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true, // export folder/index.html agar cocok dgn URL bertrailing-slash (fix 403 di hosting statis)
  images: {
    // Custom loader agar next/image bekerja saat static export (unoptimized passthrough).
    loader: 'custom',
    loaderFile: './src/image-loader.ts',
  },
};

export default nextConfig;
