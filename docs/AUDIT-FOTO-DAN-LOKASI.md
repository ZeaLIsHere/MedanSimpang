# Audit Foto dan Metadata Lokasi

Terakhir diperiksa: 17 Agustus 2026

## Aturan galeri

- Setiap lokasi menampilkan minimal 1 dan maksimal 7 foto.
- Data galeri di `src/data/seed.json` sudah dibatasi maksimal 7 entri.
- Halaman detail juga menerapkan batas 7 foto sebagai pengaman.
- File foto lama yang tidak lagi ditampilkan tidak dihapus, agar tidak menghilangkan aset tanpa persetujuan.

## Lokasi yang masih memerlukan foto

Lokasi berikut masih memakai gambar placeholder. Tautan Maps mengarah ke koordinat yang tersimpan di proyek dan dapat digunakan untuk memastikan tempat sebelum pemotretan atau meminta izin kepada pemilik foto.

Sebagai persiapan sosialisasi, placeholder pada halaman rute dan detail digantikan dengan Google Street View yang ditanam langsung berdasarkan koordinat KML `SILALAS`. Street View tetap berasal dari layanan Google, mempertahankan atribusi, dan tidak disalin menjadi file foto lokal. Jika foto lapangan berizin sudah tersedia, foto tersebut dapat menggantikan fallback ini tanpa perubahan komponen.

| Lokasi | Rute | Titik verifikasi |
|---|---|---|
| The Promised Cafe | Trails 1 | [Google Maps](https://maps.google.com/?q=3.595104,98.672237) |
| Shidoka Dojo | Trails 1 | [Google Maps](https://maps.google.com/?q=3.604089,98.671198) |
| Rumah Jl. Sei Deli 2 | Trails 1 | [Google Maps](https://maps.google.com/?q=3.6018052,98.6704518) |
| Gang Tumbuhan Jl. Cempedak | Trails 2 | [Google Maps](https://maps.google.com/?q=3.597049,98.669512) |
| Rumah Jl. Nenas | Trails 2 | [Google Maps](https://maps.google.com/?q=3.5995881,98.6697094) |
| Rumah Panggung Jl. Nenas 2 | Trails 2 | [Google Maps](https://maps.google.com/?q=3.6008725,98.6699575) |
| Kantor Lurah Silalas | Trails 4 | [Google Maps](https://maps.google.com/?q=3.592929,98.671154) |
| Warung Makan Jl. Guru Patimpus | Trails 4 | [Google Maps](https://maps.google.com/?q=3.594997,98.673973) |
| Jembatan Jl. Guru Patimpus | Trails 4 | [Google Maps](https://maps.google.com/?q=3.594627,98.672642) |
| Rumah Panggung Graha Putra Mandiri | Trails 6 | [Google Maps](https://maps.google.com/?q=3.6042474,98.6692761) |
| Regale Convention Centre | Trails 6 | [Google Maps](https://maps.google.com/?q=3.6035295,98.6692348) |
| PT. Dwi Pertiwi | Trails 6 | [Google Maps](https://maps.google.com/?q=3.5994383,98.6689391) |
| Rumah Belanda | Trails 6 | [Google Maps](https://maps.google.com/?q=3.5988039,98.668958) |
| SMP-SMA Kalam Kudus | Trails 6 | [Google Maps](https://maps.google.com/?q=3.594853,98.6668528) |
| Gereja Kristen Kalam Kudus | Trails 6 | [Google Maps](https://maps.google.com/?q=3.5948759,98.6669683) |

### Ketentuan pengambilan foto

Foto yang diunggah pengguna ke Google Maps tidak otomatis boleh disalin ke proyek. Gunakan salah satu cara berikut:

1. Ambil foto lapangan milik tim sendiri.
2. Minta izin tertulis dari pemilik usaha atau fotografer.
3. Gunakan foto dari situs resmi hanya setelah izin atau lisensinya jelas.
4. Simpan bukti sumber dan izin bersama aset foto.

Sebelum memasukkan foto, cocokkan fasad, nama tempat, ruas jalan, dan koordinat. Untuk rumah tinggal, hindari menampilkan penghuni, nomor kendaraan, atau detail privat tanpa izin.

## Kebijakan alamat dan jam operasional

- Nomor bangunan hanya dicantumkan jika ditemukan pada sumber publik yang cukup jelas.
- Untuk titik lanskap dan ruang publik, alamat ditulis sebagai ruas jalan, simpang, tepian sungai, atau akses terdekat.
- Jam operasional hanya ditampilkan jika berlaku dan berhasil diverifikasi.
- Rumah, jalan, gang, jembatan, tugu, kuburan, tepian sungai, dan kampung tidak menampilkan jam operasional.
- Tempat usaha yang jamnya belum dapat diverifikasi juga tidak menampilkan perkiraan.

## Sumber verifikasi utama

| Lokasi | Data yang diverifikasi | Sumber |
|---|---|---|
| Steve's Coffee | Jl. Sei Deli No. 39B dan jam buka | [Waze](https://www.waze.com/live-map/directions/indonesia/north-sumatra/medan/steves-coffee-sei-deli?to=place.ChIJM8vbSIsxMTARQUETcuvFH3g) |
| Kantor Lurah Silalas | Jl. Kelapa No. 5 dan jam kantor | [Waze](https://www.waze.com/live-map/directions/kantor-kelurahan-silalas-kelapa-5-medan?to=place.w.64684068.646644071.2336418) |
| SMP Negeri 7 Medan | Jl. H. Adam Malik No. 12; sekolah pagi, 6 hari | [Kemendikdasmen](https://sekolah.data.kemendikdasmen.go.id/profil-sekolah/A00F22DA-2EF5-E011-A323-CB86114E79F5) |
| SDN 060837 | Kegiatan sekolah pagi, 6 hari | [SekolahLoka](https://sekolahloka.com/data/upt-sd-negeri-060837/) |
| Universitas IBBI | Jl. Sei Deli No. 18 | [IBBI](https://stieibbi.ac.id/) |
| Rumah Makan Sinar Pagi | Jl. Sei Deli No. 2D/1 dan jam buka | [SemuaBis](https://www.semuabis.com/rumah-makan-sinar-pagi_21Z-061-6614943) |
| Warung Nasi Barkah | Jl. Sei Deli No. 113 dan jam buka | [IDN Times Sumut](https://sumut.idntimes.com/food/dining-guide/5-warung-nasi-enak-di-medan-lauknya-bikin-ketagihan-c1c2-01-534cy-44tycv) |
| Regale Convention Centre | Jl. H. Adam Malik No. 66-68 | [Wanderlog](https://wanderlog.com/place/details/3436727/regale-international-convention-centre) |
| The Promised Cafe | Jl. Sei Deli No. 80 | [Liputan4](https://liputan4.com/komisi-iv-dprd-medan-segel-bangunan-di-sari-rejo-dan-silalas/) |
| Graha Putra Mandiri | Jl. H. Adam Malik No. 76 | [Jobstreet](https://id.jobstreet.com/id/companies/pt-graha-putra-mandiri-168557594966657) |
| SMP-SMA Kalam Kudus | Jl. Mayang No. 10 | [SemuaBis](https://www.semuabis.com/smp-sma-kristen-kalam-kudus-medan-061-4520470) |
| Gereja Kristen Kalam Kudus | Jl. Mayang No. 10 | [GKKK](https://gkkk.org/lokasi-gkkk/) |

Alamat ruas jalan lainnya dicocokkan dengan koordinat proyek dan reverse geocoding OpenStreetMap. Karena data peta dan jam usaha dapat berubah, metadata usaha sebaiknya diperiksa kembali sebelum publikasi besar.
