# Medan Simpang — Heritage Walk & City Guide

**Medan Simpang** adalah platform panduan jalan kaki warisan budaya (*heritage walk*) dan kuliner kota Medan. Website ini memandu Anda menyusuri sejarah, kuliner, dan budaya tersembunyi di balik gang-gang kecil (simpang) dan fasad tua kota Medan secara lebih dekat—*seen at eye level*.

Platform ini dirancang dengan antarmuka yang sangat responsif, minimalis, dan menggunakan estetika visual premium dengan warna krem warisan budaya (*heritage cream*) dan aksen hijau besi/charcoal.

---

## Fitur Utama

- **Peta Interaktif Vertikal Penuh**: Integrasi OpenStreetMap dan Leaflet yang dinamis di mana pin lokasi rute jalan kaki sinkron dengan kartu rute di sebelah kiri. Di layar desktop, peta bersifat *sticky* dan melayang mengikuti tinggi vertikal sisa layar (`lg:h-[calc(100vh-140px)]`).
- **Tata Letak Edge-to-Edge Responsif**: Desain tanpa batas kontainer sempit yang memanfaatkan seluruh ruang lebar dan tinggi desktop secara maksimal. Peta bertransisi menjadi susunan vertikal di bawah daftar rute ketika diakses melalui perangkat *mobile*.
- **Desain Kartu Rute Minimalis**: Menyajikan informasi judul rute dan ringkasan yang bersih tanpa gangguan visual berlebih untuk menonjolkan keindahan foto cagar budaya.
- **Navigasi Dropdown Interaktif**: Menu Header dengan animasi hover garis bawah (*underline hover animation*) yang melebar dari tengah, serta dropdown menu berbasis klik dengan transisi transparan & pergeseran halus (*fade & swipe down/up*) yang dinamis.
- **Dukungan Dua Bahasa (Bilingual)**: Alih bahasa instan (Bahasa Indonesia dan Bahasa Inggris) pada seluruh halaman menggunakan React Context API.

---

## Spesifikasi Teknologi

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Peta**: [React Leaflet](https://react-leaflet.js.org/) & Leaflet.js
- **Ikon**: [Lucide React](https://lucide.dev/)
- **Bahasa Pemrograman**: TypeScript

---

## Cara Menjalankan Proyek Secara Lokal

Ikuti langkah-langkah di bawah ini untuk mengambil (*pull*) kode proyek dan menjalankannya di komputer Anda.

### Prasyarat (Prerequisites)
Pastikan Anda sudah menginstal **Node.js** (rekomendasi versi LTS 18 atau yang lebih baru) dan **Git** di komputer Anda.

### Langkah 1: Kloning Repositori
Jalankan perintah ini di terminal Anda untuk mengkloning repositori dari GitHub:
```bash
git clone https://github.com/ZeaLIsHere/MedanSimpang.git
cd MedanSimpang
```

Jika Anda sudah memiliki versi lokal sebelumnya dan ingin mengambil pembaruan terbaru (*pull*):
```bash
git pull origin main
```

### Langkah 2: Instal Dependensi
Pasang semua pustaka (*packages*) yang dibutuhkan oleh proyek menggunakan npm:
```bash
npm install
```

### Langkah 3: Jalankan Server Pengembangan
Jalankan server lokal dalam mode pengembangan (*development mode*):
```bash
npm run dev
```

### Langkah 4: Buka Aplikasi
Setelah server menyala, buka browser Anda dan akses:
**[http://localhost:3000](http://localhost:3000)**

Halaman beranda akan melakukan pembaharuan otomatis (*hot reload*) setiap kali Anda mengedit file di dalam direktori `src`.

---

## Kompilasi Produksi (Production Build)

Untuk membuat bundel kompilasi yang dioptimalkan untuk performa produksi, jalankan perintah berikut:

1. **Membuat Build**:
   ```bash
   npm run build
   ```
2. **Menjalankan Server Produksi**:
   ```bash
   npm run start
   ```

Proyek akan berjalan menggunakan build statis yang telah dikompresi secara optimal.

---

## Statistik Pengunjung

Website menggunakan dua lapisan analytics:

- Cloudflare Web Analytics mencatat kunjungan, halaman, perangkat, dan negara untuk dashboard pengelola.
- Worker `cloudflare/visitor-analytics` dan database D1 menyediakan jumlah pengunjung nyata serta negara asal yang ditampilkan di homepage. Satu browser dihitung sekali per hari dan panel diperbarui setiap 15 detik.

1. Buka [Cloudflare Web Analytics](https://dash.cloudflare.com/?to=/:account/web-analytics) dan pilih **Add a site**.
2. Masukkan hostname `urbanmorphsoc.com`.
3. Salin nilai `token` dari JavaScript snippet yang diberikan Cloudflare.
4. Buat file `.env.local` di folder utama project:

   ```env
   NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN=TOKEN_DARI_CLOUDFLARE
   ```

5. Jalankan ulang `npm run build`, kemudian unggah isi folder `out` ke Hostinger.
6. Buka kembali dashboard Cloudflare Web Analytics. Gunakan rentang tanggal untuk kunjungan harian dan filter **Country** untuk melihat negara asal pengunjung.

Tanpa token tersebut, website tetap berjalan tetapi tidak mengirimkan data ke dashboard Web Analytics.

### Mengaktifkan statistik publik

Statistik publik sudah menggunakan Worker berikut:

`https://urbanmorphsoc-visitor-analytics.urbanmorphsoc.workers.dev/api/visitors`

Database D1 `urbanmorphsoc-analytics` menyimpan satu identitas browser per hari beserta kode negaranya. Untuk menerapkan migrasi atau memperbarui Worker dari folder `cloudflare/visitor-analytics`, jalankan:

   ```bash
   npx wrangler d1 migrations apply urbanmorphsoc-analytics --remote
   npx wrangler deploy
   ```

Panel tidak menggunakan angka contoh. Jika Worker atau D1 belum aktif, homepage menampilkan pesan bahwa statistik belum terhubung.

---

## Agar Situs Muncul di Google

Kode situs sudah menyediakan `robots.txt`, `sitemap.xml`, canonical URL, metadata unik untuk rute dan lokasi, serta structured data. Agar Google mulai memprosesnya:

1. Tambahkan **Domain property** `urbanmorphsoc.com` di Google Search Console dan selesaikan verifikasi DNS.
2. Jika memakai verifikasi HTML tag, isi tokennya di `.env.local` (hanya nilai pada atribut `content`):

   ```env
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=TOKEN_DARI_GOOGLE
   ```

3. Build dan unggah ulang situs.
4. Di menu **Sitemaps**, kirim `https://urbanmorphsoc.com/sitemap.xml`.
5. Di **URL inspection**, periksa lalu minta pengindeksan untuk:
   - `https://urbanmorphsoc.com/`
   - `https://urbanmorphsoc.com/medansimpang/`

Pengindeksan dan peringkat ditentukan Google sehingga tidak dapat dijamin langsung berada di posisi pertama. Pantau status halaman, kueri pencarian, dan impresi melalui Search Console.
