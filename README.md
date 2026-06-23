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
