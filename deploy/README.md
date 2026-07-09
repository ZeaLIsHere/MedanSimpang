# Deploy — redirect root domain ke /medansimpang

## Masalah
`urbanmorphsoc.com` (root) balas **403** karena `public_html/` tidak punya file index —
seluruh app ada di `public_html/medansimpang/` (akibat `basePath: '/medansimpang'`).

## Solusi
Upload isi folder `public_html-root/` ke **root domain** (`public_html/`), sejajar
dengan folder `medansimpang/` — BUKAN ke dalamnya.

Struktur akhir di server:

```
public_html/
├── .htaccess          <- dari deploy/public_html-root/ (redirect root)
├── index.html         <- dari deploy/public_html-root/ (fallback redirect)
└── medansimpang/
    ├── index.html     <- hasil build (out/)
    ├── .htaccess      <- dari public/.htaccess
    └── _next/ ...
```

## Cara upload (Hostinger — hPanel File Manager atau FTP)
1. Buka File Manager, masuk ke `public_html/`.
2. Upload `.htaccess` dan `index.html` dari `deploy/public_html-root/` ke sini.
   - Kalau File Manager menyembunyikan file diawali titik: aktifkan "Show hidden files".
3. Buka `https://urbanmorphsoc.com/` — harus langsung mengalih ke `/medansimpang/`.

## Catatan
- `.htaccess` melakukan redirect di sisi server (paling bersih). `index.html`
  jadi cadangan kalau mod_rewrite bermasalah — dua-duanya boleh dipasang bersama.
- Redirect memakai **302 (sementara)**. Ganti ke **301 (permanen)** di `.htaccess`
  kalau urbanmorphsoc.com memang selamanya hanya untuk MedanSimpang.
- Kalau nanti bikin homepage sendiri untuk urbanmorphsoc.com, hapus/ganti kedua file ini.
