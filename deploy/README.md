# Deploy — UrbanMorphSoc (landing di root) + MedanSimpang

## Model
Sejak landing page UrbanMorphSoc diintegrasikan, `basePath` dihapus dan
seluruh situs di-export ke satu folder `out/`:

    out/
    ├── index.html          <- landing UrbanMorphSoc (root domain)
    ├── 404.html
    ├── .htaccess           <- dari public/.htaccess (kompresi, cache, header, 404)
    ├── sitemap.xml, robots.txt
    ├── _next/ ... images/ ...
    └── medansimpang/
        ├── index.html      <- MedanSimpang
        └── kawasan/ walks/ cerita/ tentang/ ...

## Cara deploy (Hostinger — File Manager atau FTP)
1. Jalankan `npm run build` → menghasilkan folder `out/`.
2. Upload **seluruh isi `out/`** ke `public_html/` (root domain), termasuk
   file tersembunyi `.htaccess` (aktifkan "Show hidden files" bila perlu).
3. Buka `https://urbanmorphsoc.com/` → tampil landing UrbanMorphSoc.
   Buka `https://urbanmorphsoc.com/medansimpang/` → tampil MedanSimpang.

## Catatan
- Tidak ada lagi redirect root → /medansimpang (folder `public_html-root/`
  yang lama sudah dihapus). Root kini disajikan langsung oleh `index.html`.
- `.htaccess` di root berlaku untuk seluruh situs (aturan berbasis ekstensi).
