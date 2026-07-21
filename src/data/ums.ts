export interface Person {
  name: string;
  role?: string;
  photo?: string | null;
  /** Profil eksternal (halaman dosen/repositori). Kartu jadi bisa diklik jika ada. */
  link?: string;
  /** Institusi asal — ditampilkan sebagai tag kecil di kartu. */
  affiliation?: string;
}

export const umsDescription =
  'Urban Morphology and Society (UMS) is a research cluster dedicated to understanding how society shapes the built environment and, in turn, how the built environment influences social life. The cluster investigates the morphology of buildings, neighbourhoods, and cities through the lens of spatial transformation, cultural practices, historical processes, community adaptation, and everyday urban life. Rather than viewing urban form as a static physical artifact, UMS approaches morphology as a means of understanding the evolving relationship between space and society across diverse cultural and historical settings.';

export const umsDescriptionId =
  'Urban Morphology and Society (UMS) adalah klaster riset yang berfokus pada pemahaman tentang bagaimana masyarakat membentuk lingkungan binaan dan, sebaliknya, bagaimana lingkungan binaan memengaruhi kehidupan sosial. Klaster ini meneliti morfologi bangunan, permukiman, dan kota melalui lensa transformasi spasial, praktik budaya, proses sejarah, adaptasi komunitas, dan kehidupan urban sehari-hari. Alih-alih memandang bentuk kota sebagai artefak fisik yang statis, UMS memaknai morfologi sebagai cara untuk memahami hubungan yang terus berkembang antara ruang dan masyarakat di berbagai latar budaya dan sejarah.';

/** Pick the UMS description for the active language. */
export const umsDescriptionFor = (language: 'id' | 'en') =>
  language === 'id' ? umsDescriptionId : umsDescription;

export const umsEstablishment = {
  decree: '4921/UN5.1.R/SK/PPM/2023',
  date: '28 December 2023',
};

export const umsAddress = {
  dept: 'Department of Architecture, Universitas Sumatera Utara, Indonesia',
  street: 'Jalan Perpustakaan Kampus USU Padang Bulan',
  city: 'Medan, Indonesia 20155',
  email: 'urbanmorphsoc@gmail.com',
};

export const umsHead: Person = {
  name: 'Dr. Salmina Wati Ginting',
  role: 'Head',
  photo: null,
  link: 'https://ft.usu.ac.id/id/dosen/salmina-wati-ginting',
  affiliation: 'Universitas Sumatera Utara',
};

export const umsMembers: Person[] = [
  { name: 'Dr. Ulrike Herbig', photo: null, link: 'https://gcd.tuwien.ac.at/ulrike-herbig', affiliation: 'TU Wien' },
  { name: 'Dr. Isnen Fitri', photo: null, link: 'https://ft.usu.ac.id/id/dosen/isnen-fitri/', affiliation: 'Universitas Sumatera Utara' },
  { name: 'Dr. Wahyuni Zahrah', photo: null, link: 'https://ft.usu.ac.id/id/dosen/wahyuni-zahrah', affiliation: 'Universitas Sumatera Utara' },
  { name: 'Dr. Lim Seng Boon', photo: null, link: 'https://perak.uitm.edu.my/index.php/en/component/content/article/487-department-of-built-environment-studies-technology-2?layout=edit&Itemid=101', affiliation: 'UiTM Perak' },
  { name: 'Dr. Norhazlan Haron', photo: null, link: 'https://perak.uitm.edu.my/index.php/en/component/content/article/487-department-of-built-environment-studies-technology-2?layout=edit&Itemid=101', affiliation: 'UiTM Perak' },
  { name: 'Sri Elfina Panjaitan', photo: null, link: 'https://repositori.usu.ac.id/handle/123456789/110616', affiliation: 'Universitas Sumatera Utara' },
  { name: 'Ryandika Afdila', photo: null, link: 'https://ft.usu.ac.id/en/lecturer/ryandika-afdila', affiliation: 'Universitas Sumatera Utara' },
  { name: 'Nurrahmadayeni', photo: null, link: 'https://fasilkom-ti.usu.ac.id/id/dosen/nurrahmadayeni', affiliation: 'Universitas Sumatera Utara' },
];

// TBD — user will provide student names/photos. Keep empty until then.
export const umsStudents: Person[] = [];

export function initials(name: string): string {
  const parts = name.replace(/^Dr\.\s*/i, '').trim().split(/\s+/);
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase();
}
