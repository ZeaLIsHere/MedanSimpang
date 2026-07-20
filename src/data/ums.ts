export interface Person {
  name: string;
  role?: string;
  photo?: string | null;
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

export const umsHead: Person = { name: 'Dr. Salmina Wati Ginting', role: 'Head', photo: null };

export const umsMembers: Person[] = [
  { name: 'Dr. Ulrike Herbig', photo: null },
  { name: 'Dr. Isnen Fitri', photo: null },
  { name: 'Dr. Wahyuni Zahrah', photo: null },
  { name: 'Dr. Lim Seng Boon', photo: null },
  { name: 'Dr. Norhazlan Haron', photo: null },
  { name: 'Sri Elfina Panjaitan', photo: null },
  { name: 'Ryandika Afdila', photo: null },
  { name: 'Nurrahmadayeni', photo: null },
];

// TBD — user will provide student names/photos. Keep empty until then.
export const umsStudents: Person[] = [];

export function initials(name: string): string {
  const parts = name.replace(/^Dr\.\s*/i, '').trim().split(/\s+/);
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase();
}
