# PRD: "Medan Simpang" — Seen at eye level

## 1. Ringkasan Proyek

**Medan Simpang** adalah platform city-guide/heritage-walk yang menyajikan rute jalan kaki ("city walks") di lingkungan-lingkungan bersejarah Kota Medan, lengkap dengan peta interaktif, daftar lokasi (tempat makan, tempat wisata, bangunan heritage, dll), dan artikel/blog ("Stories") seputar budaya, arsitektur, dan komunitas lokal.

**Tagline: "Seen at eye level"** — menekankan pengalaman menjelajah kota dengan berjalan kaki, melihat detail-detail yang biasanya terlewat kalau hanya lewat dari dalam mobil: gang-gang kecil (simpang), fasad bangunan tua, kehidupan pedagang dan warga lokal.

Proyek ini merupakan adaptasi arsitektur dan pola UI dari website referensi **iDiscover Maps** (https://i-discoverasia.com/) — sebuah platform city-guide heritage-walk Asia berbasis Sanity.io. Kita mengadaptasi **struktur halaman, model data, dan komponen UI**-nya, namun seluruh brand, cakupan geografis, dan kontennya dibuat orisinal untuk Medan Simpang.

**Catatan skala/cakupan:** karena nama "Medan Simpang" menyiratkan fokus pada satu kota (Medan, Sumatera Utara), level "Country" pada struktur referensi disederhanakan menjadi opsional — lihat §4 dan §9 untuk dua opsi skala (single-city vs multi-city Sumatera/Indonesia).

**Tujuan adaptasi:** replikasi struktur halaman, model data, navigasi, dan komponen UI utama dari referensi — BUKAN meniru konten/brand asli kata demi kata atau gambar berhak cipta milik iDiscover. Semua teks, foto, dan brand asset di Medan Simpang adalah orisinal/milik sendiri, bukan hasil scrape dari situs referensi.

**Catatan revisi (penting):** Pemeriksaan awal terhadap referensi (lewat fetch teks/HTML) tidak menangkap bahwa Homepage dan halaman listing referensi sebenarnya menggunakan **layout split-screen: panel list di kiri + peta interaktif persisten di kanan**, bukan sekadar grid kartu seperti yang tertulis di versi awal PRD ini. Klik pin di peta memunculkan popup overlay (foto + nama + tombol "Explore") tanpa pindah halaman. Temuan ini baru terkonfirmasi lewat screenshot visual langsung dari pengguna. §6.3 dan §6.4 sudah direvisi untuk mencerminkan pola ini — jika agent sudah mulai membangun versi grid-kartu-saja sebelumnya, lihat §9 poin 6 untuk catatan migrasi.

## 2. Tujuan & Non-Tujuan

### Tujuan
- Replikasi arsitektur informasi (sitemap) dan tipe halaman dari pola referensi, diterapkan ke konteks Medan/Sumatera Utara.
- Replikasi komponen UI inti: navbar mega-menu, hero listing, peta interaktif dengan filter kategori, halaman detail lokasi, blog listing dengan filter ganda (kawasan + kategori), bilingual content switcher (Indonesia/English).
- Struktur data (schema) yang merepresentasikan: (Country/Region — opsional) → Neighbourhood/Kawasan → Walk → Location.
- Responsive (mobile-first, karena target pengguna adalah orang yang jalan kaki menyusuri kawasan kota).

### Non-Tujuan
- Tidak perlu replikasi backend Sanity CMS secara identik — boleh pakai CMS/DB apa pun (lihat rekomendasi stack).
- Tidak perlu meniru fitur donasi/charity-specific (referensi adalah NGO/non-profit) kecuali Medan Simpang juga ingin berstatus non-profit/komunitas.
- Tidak mereproduksi foto, logo, atau teks asli milik iDiscover/Urban Discovery — semua konten Medan Simpang orisinal.

## 3. Target Pengguna
- Wisatawan domestik/mancanegara yang ingin menjelajah kawasan bersejarah Medan secara mandiri (self-guided walk) — cth. Kesawan, Kampung Madras, Polonia, kawasan Merdeka Walk.
- Warga lokal/diaspora Medan yang ingin mengenal ulang kotanya sendiri "dari level mata", bukan sekadar lewat dari mobil.
- Pembaca blog yang mencari konten budaya/heritage/kuliner khas Medan dan Sumatera Utara.
- Partner/sponsor lokal (UMKM, rumah makan legendaris, komunitas heritage, pemerintah kota) yang muncul sebagai "kontributor" walk.

## 4. Sitemap & Struktur Halaman

> Karena Medan Simpang berfokus pada satu kota (Medan), level "Country" pada referensi **dihilangkan** dari struktur default. Kawasan/neighbourhood langsung berada di bawah homepage. Lihat §9 untuk opsi scale-up ke multi-kota.

```
/                                          → Homepage (grid kawasan/neighbourhood Medan)
/kawasan/[neighbourhood]/                  → Listing walks dalam 1 kawasan
/walks/[walk-slug]/                        → Detail 1 walk (peta interaktif + list lokasi)
/walks/[walk-slug]/lokasi/[location]/      → Detail 1 lokasi (POI)
/cerita/                                   → Blog listing (filter by kawasan & kategori)
/cerita/[category]/                        → Blog listing terfilter kategori
/cerita/[article-slug]/                    → Detail artikel
/tentang/visi/                             → About Us / Visi
/tentang/mitra/                            → Mitra & Kontributor
/tentang/tim/                              → Tim
/tentang/perjalanan/                       → Perjalanan Kami (Our Journey)
/tentang/metodologi/                       → Metodologi
```

Catatan navigasi:
- Breadcrumb berjenjang sesuai depth: `Jelajah Kota > [Kawasan] > [Nama Walk]`.
- Setiap level breadcrumb adalah link aktif (kecuali halaman saat ini).
- Penamaan path dalam Bahasa Indonesia (`/kawasan`, `/cerita`, `/tentang`) — boleh disesuaikan ke Inggris (`/neighbourhoods`, `/stories`, `/about`) jika target audiens utama adalah turis mancanegara. Putuskan satu standar di awal proyek agar konsisten dengan toggle bilingual (§6.10).

## 5. Model Data (Content Schema)

> Struktur referensi punya 4 level (Country → City → Walk → Location). Untuk Medan Simpang, level **Country dihilangkan** — Kawasan/Neighbourhood menjadi level teratas. Field `country` pada tabel di bawah bersifat **opsional**, hanya diisi jika nanti proyek di-scale-up ke multi-kota (lihat §9).

### 5.1 Kawasan / Neighbourhood
| Field | Tipe | Keterangan |
|---|---|---|
| name | string | Nama kawasan (cth: Kesawan, Kampung Madras, Polonia, Kota Lama Medan) |
| slug | string | URL slug |
| region | string (opsional) | Hanya untuk scale-up multi-kota; default: "Medan" |
| tagline | string | 1 kalimat deskriptif kawasan |
| description | text | Paragraf deskripsi panjang |
| coverImage | image | |
| walkCount | computed | Jumlah walk aktif (ditampilkan sbg "(3 walks)") |
| walks | reference[] | Relasi ke Walk |

### 5.2 Walk
| Field | Tipe | Keterangan |
|---|---|---|
| title | string | Nama walk (cth: "Kesawan Tempo Dulu") |
| slug | string | |
| neighbourhood | reference | FK ke Kawasan |
| heroImage | image | |
| description_id | richtext | Deskripsi (Bahasa Indonesia) |
| description_en | richtext | Deskripsi (English, opsional/bilingual) |
| durationMinutes | number | cth: 90 (ditampilkan "1.5 jam") |
| distanceMeters | number | cth: 2000 (ditampilkan "~2.6 km") |
| stepsCount | number | Jumlah langkah perkiraan |
| walkType | enum | "Story Walk" / lainnya |
| pointsOfInterestCount | computed | Jumlah lokasi dalam walk |
| lastUpdated | date | "terakhir diperbarui Juni 2026" |
| downloadableMapImage | file (jpg/pdf) | Peta ilustrasi yang bisa diunduh |
| createdByOrg | reference | Kontributor (kredit "Dibuat oleh") |
| designedBy | reference | Kontributor (kredit "Didesain oleh") |
| poweredBy | reference | Kontributor (kredit "Didukung oleh") |
| locations | reference[] (ordered) | List Location, urutan = urutan stop |
| contributors | object[] | { name, bio_id, bio_en, instagramOrWebsiteUrl, logo } |

### 5.3 Location (Point of Interest)
| Field | Tipe | Keterangan |
|---|---|---|
| name | string | |
| slug | string | |
| walk | reference | FK ke Walk |
| category | enum | `iSee` \| `iEat` \| `iDrink` \| `iSurprise` (lihat §6.4) |
| thumbnail | image | |
| gallery | image[] | Multi foto di halaman detail |
| shortDescription | string | Subtitle di bawah judul (cth: "Bangunan tua peninggalan era tembakau Deli") |
| address | string | |
| openingHours | string | cth: "Buka 24 jam" atau jam spesifik |
| latitude | number | |
| longitude | number | |
| googleMapsUrl | url (computed dari lat/long) | |
| appleMapsUrl | url (computed dari lat/long) | |
| websiteUrl | url | opsional |
| order | number | Urutan stop dalam walk |
| contentBlocks | richtext blocks[] | Rich content: heading, paragraf, image dengan caption (circle image), blockquote pull-quote |

### 5.4 Cerita (Artikel/Blog)
| Field | Tipe | Keterangan |
|---|---|---|
| title | string | |
| slug | string | |
| coverImage | image | |
| excerpt | text | |
| body | richtext | |
| neighbourhood | reference | Untuk filter "Filter by Kawasan" |
| categories | enum[] | Akademi, Arsitektur, Komunitas, Budaya, Desain, Kuliner, Sejarah |
| publishedDate | date | |
| featured | boolean | Untuk hero artikel di atas listing |

### 5.5 Contributor / Mitra
| Field | Tipe | Keterangan |
|---|---|---|
| name | string | |
| bio_id / bio_en | text | |
| logoOrPhoto | image | |
| linkUrl | url | Instagram / website |
| type | enum | "Dibuat oleh" / "Didesain oleh" / "Didukung oleh" / "Mitra" |

## 6. Spesifikasi Fitur per Halaman

### 6.1 Global — Header / Navigasi
- Logo "Medan Simpang" + tagline kecil "Seen at eye level" (klik logo → homepage).
- Mega-menu dengan 4 menu utama: **Jelajah Kota** (dropdown daftar kawasan: Kesawan, Kampung Madras, Polonia, dst — bukan dropdown negara seperti referensi, karena scope-nya satu kota), **Cerita** (dropdown "Semua Cerita" + 7 kategori), **Akademi** (link langsung, opsional jika ada program edukasi/komunitas), **Tentang** (dropdown 5 sub-halaman).
- Versi mobile: menu hamburger full-screen overlay dengan accordion per section.
- Sticky/fixed header saat scroll (opsional, sesuai preferensi desain).

### 6.2 Global — Footer
- Sitemap ulang (3 kolom: Jelajah Kota, Cerita, Tentang) — replikasi menu utama.
- Social links: Instagram, Facebook, YouTube/TikTok (ikon + link eksternal `target="_blank"`).
- Kontak email (mailto link).
- Logo komunitas/organisasi induk dengan link keluar (jika ada).
- Form newsletter subscribe (input email + submit — boleh dummy/non-fungsional di awal, atau integrasi email service).
- Copyright text + tahun otomatis ("© 2026 Medan Simpang").
- Tagline misi singkat 2 kalimat (cth: misi melestarikan dan menampilkan kawasan bersejarah Medan dari sudut pandang warganya sendiri).

### 6.3 Homepage (`/`) — **Layout split-screen: peta + list**

> **Revisi penting**: berdasarkan pengecekan visual ulang terhadap referensi (lihat catatan di §1), halaman beranda referensi BUKAN sekadar hero + grid kartu, melainkan **layout dua panel**: panel kiri berisi hero text + grid kartu, panel kanan adalah **peta interaktif persisten** yang menampilkan pin untuk tiap entitas level teratas. Untuk Medan Simpang (skala 1 kawasan), pin level teratas adalah **per Walk**, bukan per kawasan/negara seperti referensi (karena hanya ada 1 kawasan).

- **Panel kiri** (scroll independen dari panel kanan di desktop; di mobile, peta dan list bisa di-stack vertikal atau peta jadi toggle "Lihat Peta"):
  - Hero section: judul besar "Medan Simpang", tagline **"Seen at eye level"**, kalimat ajakan pendukung.
  - Grid kartu Walk (bukan kartu Kawasan, karena hanya ada 1 kawasan — lihat §9 poin 6 untuk penjelasan penyesuaian level): cover image + nama walk + tagline 1 kalimat. Klik kartu → `/walks/[walk-slug]/`.
- **Panel kanan — Peta interaktif persisten**:
  - Menampilkan semua Walk sebagai pin di peta, posisi pin sesuai koordinat representatif tiap walk (cth: titik tengah/titik mulai walk).
  - **Klik pin** → muncul **popup overlay di atas peta** (tidak pindah halaman): berisi foto walk, nama walk, dan tombol "Jelajahi Walk" yang mengarah ke `/walks/[walk-slug]/`.
  - Peta dan grid kartu di panel kiri **saling sinkron**: hover/klik kartu di kiri bisa highlight pin terkait di peta (opsional, nice-to-have); klik pin di peta menunjukkan popup info walk yang sama dengan kartu.
  - Kontrol zoom +/- standar di peta.
  - Map provider: lihat §8 (Leaflet+OSM sebagai default).

### 6.4 Kawasan Page (`/kawasan/[neighbourhood]/`) — **Layout split-screen: peta + list (level lebih detail)**
- Breadcrumb: Jelajah Kota > [Kawasan].
- Toggle bahasa "Baca halaman dalam: Indonesia / English" (lihat §6.10).
- **Panel kiri**: paragraf deskripsi kawasan (cth: sejarah singkat Kesawan sebagai jalan utama era kolonial), grid kartu Walk: cover image, nama walk, deskripsi singkat. Klik → `/walks/[walk-slug]/`.
- **Panel kanan — Peta interaktif**: serupa dengan homepage, tapi sudah ter-zoom/center ke area kawasan ini. Pin tetap per Walk. Klik pin → popup overlay (foto + nama walk + tombol "Jelajahi Walk").
- CTA link "Lihat walk di [kawasan lain] →" di bagian bawah panel kiri (navigasi antar kawasan — relevan saat sudah ada >1 kawasan; lihat §9 opsi scale-up).
- **Catatan untuk MVP 1-kawasan**: karena skala awal Medan Simpang sengaja dibatasi 1 kawasan (§9 poin 5), halaman ini akan terasa sangat mirip dengan Homepage (§6.3) — keduanya menampilkan kawasan yang sama dengan peta yang hampir sama. Ini SAH dan DIHARAPKAN untuk MVP. Begitu kawasan ke-2 ditambahkan, perbedaan antara Homepage (peta overview semua kawasan + semua walk) dan Kawasan Page (peta ter-zoom ke 1 kawasan spesifik) akan terasa jelas.

### 6.5 Walk Detail Page (`/walks/[walk-slug]/`) — **Halaman paling kompleks**
- Breadcrumb 3 level: Jelajah Kota > Kawasan > Nama Walk.
- Hero image walk.
- Paragraf deskripsi (bilingual, ID + EN ditampilkan berurutan atau via toggle).
- **Info strip**: durasi (cth: "1.5 jam"), jarak (langkah + km), tipe walk (badge "Story Walk"), jumlah POI ("18 hal yang bisa dilihat & dilakukan").
- **Peta interaktif**:
  - Menampilkan semua Location sebagai pin di peta.
  - **Filter kategori** dengan toggle/chip: All, iSee, iEat, iDrink, iSurprise — memilih filter meng-update pin di map DAN list lokasi secara instan (client-side filter, tanpa reload).
  - Pin map berwarna/ikon berbeda per kategori.
- **List Locations** (sinkron dengan peta): tiap item = thumbnail bulat, nama lokasi, badge kategori. Klik → halaman detail lokasi. Urutan sesuai `order` field (urutan jalan kaki).
- **Download Map** section: gambar preview peta ilustrasi + tombol download (link ke file JPG/PDF).
- **Kredit kontributor**: 3 slot logo ("Dibuat oleh", "Didesain oleh", "Didukung oleh") + teks "terakhir diperbarui [bulan tahun]".
- **About / Sponsor section**: list kontributor dengan foto/logo, nama, bio (bilingual), link keluar (Instagram/website).
- **Nearby** section (placeholder untuk walk lain yang berdekatan geografis — bisa cross-link ke walk lain dalam kawasan yang sama).

### 6.6 Location Detail Page (`/walks/[walk-slug]/lokasi/[location]/`)
- Tombol "back" / link ke parent walk (breadcrumb mini: nama walk + path).
- Judul: badge kategori + nama lokasi (cth: "iEat Soto Sinar Pagi").
- Subtitle singkat.
- Gallery foto (carousel/grid, multiple images, klik untuk perbesar/lightbox opsional).
- **Quick info bar**: alamat, jam operasional, tombol Bagikan, tombol Arah/Directions (dropdown: Google Maps / Apple Maps, generate link otomatis dari lat/long), tombol Website (jika ada).
- **Rich content body**: kombinasi heading (h2), paragraf, "circle image" block (foto bulat + caption text di sampingnya — pola berulang), blockquote/pull-quote bergaya kutipan besar.
- Section "Nearby" di bawah (opsional: list lokasi lain dalam walk yang sama, urutan terdekat).

### 6.7 Cerita — Listing (`/cerita/`)
- Paragraf intro misi (2-3 kalimat).
- Featured article hero (artikel terbaru/pilihan, gambar besar + judul).
- **Filter by Kawasan**: daftar chip/link semua kawasan yang punya artikel (alphabetical).
- **Filter by Kategori**: 7 chip kategori (Akademi, Arsitektur, Komunitas, Budaya, Desain, Kuliner, Sejarah).
- Listing dikelompokkan per kawasan (heading kawasan + deskripsi kawasan + grid 2-3 artikel + link "Lihat cerita [kawasan] lainnya →" jika artikel >3).
- Filter bersifat client-side atau via query param (`/cerita/?kawasan=kesawan&kategori=kuliner`), meng-update grid tanpa reload penuh.

### 6.8 Cerita — Detail Artikel (`/cerita/[slug]/`)
- Hero image.
- Judul, tanggal publish, kategori tag.
- Body richtext (heading, paragraf, image, quote — reuse komponen rich content dari Location detail).
- Related stories (kawasan/kategori sama) di akhir artikel.

### 6.9 Tentang Pages (`/tentang/*`)
5 halaman statis sederhana, masing-masing dengan hero + body content:
- **Visi** (About Us): misi Medan Simpang, kenapa "Seen at eye level" menjadi filosofi inti, statement non-profit/komunitas (jika berlaku).
- **Mitra**: grid logo klien & kontributor (UMKM, pemerintah kota, komunitas heritage).
- **Tim**: grid foto + nama + role anggota tim.
- **Perjalanan**: timeline/storytelling histori Medan Simpang sejak dimulai.
- **Metodologi**: penjelasan proses riset/pembuatan walk (teks panjang, mungkin dengan ilustrasi step-by-step) — cth: bagaimana lokasi dipilih, siapa yang diwawancara, bagaimana validasi sejarah dilakukan.

### 6.10 Fitur Lintas Halaman
- **Bilingual content toggle** ("Baca halaman dalam: Indonesia / English") — muncul di halaman Kawasan, Walk, dan Location. Implementasi: toggle switch state (client-side) yang menampilkan/menyembunyikan field `_id` vs `_en`, TIDAK perlu routing i18n penuh kecuali mau lebih robust (boleh pakai next-intl/i18n routing jika scope diperluas).
- **Breadcrumb** dinamis berdasarkan depth halaman.
- **Newsletter subscribe form** di footer (semua halaman).
- **Share button** (Web Share API native di mobile, fallback copy-link di desktop) — di halaman Location.
- **SEO meta tags** per halaman: title, description, og:image, og:title, canonical URL (generate otomatis dari schema).

## 7. Desain & UI/UX

- **Mobile-first**: target pengguna jalan kaki menyusuri kawasan sambil membawa HP.
- **Identitas warna & tipografi**: belum ditentukan — ini keputusan brand Medan Simpang sendiri, JANGAN pakai warna ungu/magenta (`#a75293`) milik referensi iDiscover. Sarankan agent untuk mengusulkan palet yang merefleksikan tagline "Seen at eye level" (cth: warna earthy/heritage seperti terracotta, hijau tropis, atau warna yang terinspirasi dari arsitektur kolonial/Melayu Deli) — tunggu konfirmasi user sebelum finalisasi.
- **Tipografi**: heading bold besar (style "editorial travel magazine"), body text santai/conversational, dalam Bahasa Indonesia sebagai bahasa utama.
- **Imagery-heavy**: foto besar mendominasi tiap card dan hero — foto asli kawasan Medan, bukan stok foto Asia umum.
- **Komponen reusable**:
  - Card (Kawasan/Walk/Cerita) — pola sama: image + title + caption.
  - Category badge/chip (iSee/iEat/iDrink/iSurprise) dengan warna/ikon berbeda.
  - Circle-image content block (untuk rich content artikel & location).
  - Pull-quote block.
  - Map dengan pin custom per kategori.

## 8. Rekomendasi Tech Stack (untuk AI agent)

> Ini rekomendasi, bukan keharusan — sesuaikan dengan stack yang biasa dipakai agent/developer.

- **Framework**: Next.js 15 (App Router) — SSR/SSG bagus untuk SEO konten travel-blog seperti ini.
- **Styling**: Tailwind CSS.
- **CMS/Database**: 
  - Opsi A (mendekati struktur asli — **direkomendasikan**): Sanity.io headless CMS.
  - Opsi B (lebih sederhana untuk clone cepat): PostgreSQL + Prisma, atau bahkan local JSON/MDX content jika hanya untuk demo statis.
- **Peta interaktif**: Mapbox GL JS atau Leaflet + OpenStreetMap (gratis, tanpa perlu API key berbayar untuk skala kecil) atau Google Maps JavaScript API jika ingin replikasi visual Google Maps.
- **Rich text rendering**: jika pakai Sanity → Portable Text; jika pakai DB biasa → simpan sebagai JSON blocks atau MDX.
- **Image hosting/optimasi**: lihat §8.1 di bawah — **JANGAN simpan file gambar (binary/base64) langsung di database**, baik di Sanity maupun PostgreSQL. Database hanya menyimpan reference/URL ke gambar.
- **Bilingual**: state toggle sederhana di awal; `next-intl` jika scope diperluas ke i18n routing penuh.

### 8.1 Strategi Penyimpanan & Penyajian Gambar

**Keputusan: gambar TIDAK disimpan di database.** Database (baik Sanity maupun PostgreSQL) hanya menyimpan **reference/URL** ke gambar. File gambar aslinya disimpan dan disajikan lewat **object storage + CDN** yang terpisah dari database.

Alasan: gambar berukuran besar (ratusan KB - beberapa MB per file) membuat database lambat di-query, backup jadi berat, dan tidak bisa di-serve secepat CDN yang memang dirancang khusus untuk itu. Pola standarnya: `Database → simpan URL gambar` + `Object storage/CDN → simpan & serve file gambar yang sebenarnya`.

**Pilihan default sesuai CMS yang dipakai:**

- **Jika pakai Sanity (Opsi A, direkomendasikan)**: gunakan **Sanity's built-in image asset + CDN**. Ini otomatis aktif begitu CMS-nya Sanity — tidak perlu setup storage terpisah. Upload gambar lewat Sanity Studio, Sanity otomatis simpan di CDN-nya dan generate URL dengan parameter transformasi (`?w=`, `?h=`, `?fit=`, `?auto=format`) yang bisa dipanggil langsung dari frontend untuk resize/crop/convert format on-the-fly tanpa perlu generate banyak versi file manual. Pola URL akan terlihat seperti `https://cdn.sanity.io/images/[project]/[dataset]/[asset-id]-[dimensions].[ext]?w=600&h=600&fit=max&auto=format`.
- **Jika pakai PostgreSQL (Opsi B)**: gunakan **Cloudinary** (free tier tersedia, auto-optimize, mudah integrasi dengan Next.js `<Image>`) sebagai layanan terpisah. Database hanya menyimpan field seperti `thumbnailUrl`, `galleryUrls[]` yang isinya URL dari Cloudinary.

**Wajib diterapkan terlepas dari pilihan di atas:**
1. Field gambar di schema (§5) — `coverImage`, `heroImage`, `thumbnail`, `gallery[]`, `downloadableMapImage`, `logoOrPhoto` — semuanya disimpan sebagai **URL/reference**, bukan binary/base64.
2. Gunakan `next/image` (komponen `<Image>` Next.js) di frontend, bukan tag `<img>` biasa — ini otomatis lazy-load, resize sesuai viewport, dan convert ke format modern (WebP/AVIF), penting untuk performa di koneksi mobile (PRD §3, §7).
3. Mobile-first berarti gambar listing/thumbnail (card di homepage, list lokasi) harus pakai ukuran yang lebih kecil dari gambar full-size di halaman detail — manfaatkan parameter resize dari CDN yang dipilih, jangan kirim file resolusi penuh ke semua tempat.
4. Jika di tahap development belum ada foto asli kawasan Medan, gunakan placeholder generator (Unsplash API/Lorem Picsum) yang tetap disajikan lewat pola URL+CDN yang sama — supaya saat foto asli sudah ada, tinggal ganti URL tanpa ubah arsitektur (PRD §9 poin 1).

## 9. Out of Scope / Catatan Penting untuk Agent

1. **JANGAN gunakan foto, logo, atau teks asli milik iDiscover/Urban Discovery** — itu berhak cipta. Referensi tersebut hanya dipakai untuk arsitektur & pola UI. Gunakan:
   - Foto asli kawasan Medan (hasil jepretan sendiri/tim) ATAU placeholder generator (Unsplash API/Lorem Picsum) untuk tahap development sebelum foto asli tersedia.
   - Teks dummy yang ditulis ulang sendiri tentang Medan, bukan copy-paste dari situs referensi.
2. Brand yang dipakai adalah **"Medan Simpang"** dengan tagline **"Seen at eye level"** — pastikan ini muncul konsisten di: logo header, hero homepage, meta title default, dan footer.
3. Fokus inti proyek ini adalah **arsitektur & fungsionalitas** (struktur data, navigasi, peta interaktif berfilter, listing berfilter ganda, halaman detail kaya-konten) — bukan reproduksi konten referensi kata-per-kata.
4. **Opsi skala proyek** — pilih salah satu di awal sebelum development:
   - **Opsi A (default/disarankan untuk MVP): Single-city.** Sitemap tanpa level Country/Region (sesuai §4). Semua walk berada di bawah kawasan-kawasan dalam Kota Medan saja (cth: Kesawan, Kampung Madras, Polonia, Kota Lama).
   - **Opsi B (scale-up masa depan): Multi-city/Multi-region.** Jika nantinya Medan Simpang ingin diperluas ke kota lain di Sumatera Utara (cth: Berastagi, Tebing Tinggi, Pematangsiantar) atau Sumatera secara umum, tambahkan kembali level "Region" di atas Kawasan (`/wilayah/[region]/kawasan/[neighbourhood]/`), mengikuti pola Country pada referensi. Field `region` pada schema §5.1 sudah disiapkan opsional untuk transisi ini agar tidak perlu migrasi skema besar di kemudian hari.
5. Untuk MVP, agent boleh mulai dari **1 kawasan saja** (misal: Kesawan) dengan 1-2 walk dan 8-15 lokasi sebagai data seed, lalu generalize ke kawasan lain setelah pola halaman terbukti jalan.
6. **Catatan migrasi — peta persisten di Homepage/Kawasan Page (§6.3, §6.4)**: jika sebelum revisi ini agent sudah membangun Homepage/Kawasan Page sebagai grid kartu biasa tanpa peta, dan peta hanya muncul di Walk Detail Page — itu **tidak salah secara arsitektur**, hanya saja belum mencerminkan pola final yang diinginkan. Sebelum agent merombak struktur halaman secara besar-besaran, lakukan langkah ini dulu:
   - Cek dulu apakah komponen peta interaktif yang sudah dibuat untuk Walk Detail Page (pin, popup, filter kategori) bisa **di-reuse/diabstraksi** menjadi komponen map generik yang menerima parameter berbeda (set pin yang ditampilkan, level zoom, isi popup) — supaya tidak menulis ulang logic peta dari nol untuk tiap halaman.
   - Di level Homepage dan Kawasan Page, pin yang ditampilkan adalah **per Walk** (bukan per Location seperti di Walk Detail Page, dan bukan per Country seperti referensi asli — karena Medan Simpang skala 1 kawasan tidak punya level negara/kawasan-jamak di awal).
   - Popup saat klik pin di level Homepage/Kawasan cukup berisi: foto walk, nama walk, deskripsi singkat 1 kalimat, tombol "Jelajahi Walk" → link ke Walk Detail Page. INI BERBEDA dari popup/detail di Walk Detail Page yang menampilkan info Location (alamat, jam buka, kategori, dst).

## 10. Urutan Implementasi yang Disarankan (untuk AI Agent)

1. Setup project (Next.js + Tailwind) + struktur folder.
2. Definisikan schema data (§5) — bisa mulai dengan file JSON/seed data dummy dulu sebelum hubungkan CMS.
3. Tentukan identitas visual dasar: logo "Medan Simpang", penempatan tagline "Seen at eye level", palet warna awal (lihat §7).
4. Bangun layout global: Header (mega-menu) + Footer.
5. **Bangun komponen Map generik yang reusable** (pin custom, popup overlay, kontrol zoom) sebelum membangun halaman apa pun yang memakainya — karena sekarang dipakai di 3 level berbeda (Homepage, Kawasan Page, Walk Detail Page) dengan parameter berbeda (lihat §9 poin 6). Membangun ini lebih dulu mencegah duplikasi logic peta di tiap halaman.
6. Bangun Homepage (split-screen: panel list Walk + panel peta, lihat §6.3).
7. Bangun Kawasan Page (split-screen serupa, ter-zoom ke 1 kawasan, lihat §6.4).
8. Bangun Walk Detail Page (peta level Location + filter kategori iSee/iEat/iDrink/iSurprise, reuse komponen Map dari langkah 5).
9. Bangun Location Detail Page (rich content blocks + gallery + directions).
10. Bangun Cerita Listing + Detail (filter ganda: kawasan + kategori).
11. Bangun Tentang pages (statis).
12. Tambahkan: breadcrumb, SEO meta, bilingual toggle, newsletter form, share button.
13. Responsive QA (mobile-first) + polish animasi/transisi — perhatikan khusus bagaimana layout split-screen peta+list berperilaku di mobile (lihat catatan stacking di §6.3).