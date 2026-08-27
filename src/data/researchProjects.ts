export interface ResearchProjectSource {
  labelId: string;
  labelEn: string;
  href: string;
  type: 'article' | 'video' | 'document';
}

export interface ResearchProjectFact {
  labelId: string;
  labelEn: string;
  value: string;
}

export interface ResearchProject {
  slug: string;
  title: string;
  shortTitle: string;
  categoryId: string;
  categoryEn: string;
  period: string;
  location: string;
  image: string;
  imageAltId: string;
  imageAltEn: string;
  summaryId: string;
  summaryEn: string;
  descriptionId: string[];
  descriptionEn: string[];
  facts: ResearchProjectFact[];
  sources: ResearchProjectSource[];
}

export const RESEARCH_PROJECTS: ResearchProject[] = [
  {
    slug: 'raja-bilah',
    title: 'Revitalisasi Rumah Besar Raja Bilah',
    shortTitle: 'Raja Bilah',
    categoryId: 'Pengabdian internasional',
    categoryEn: 'International community service',
    period: '2025',
    location: 'Papan, Perak, Malaysia',
    image: '/images/projects/raja-bilah.webp',
    imageAltId: 'Tim kolaborasi USU, UiTM, dan Perak Heritage Society di Rumah Besar Raja Bilah',
    imageAltEn: 'USU, UiTM, and Perak Heritage Society collaborators at Rumah Besar Raja Bilah',
    summaryId: 'Kolaborasi lintas negara untuk menghubungkan kembali sejarah Indonesia–Malaysia dan mendukung pelestarian Rumah Besar Raja Bilah.',
    summaryEn: 'A cross-border collaboration reconnecting Indonesian–Malaysian history and supporting the preservation of Rumah Besar Raja Bilah.',
    descriptionId: [
      'Pada 29 Juni 2025, dosen Arsitektur Fakultas Teknik Universitas Sumatera Utara melaksanakan program pengabdian kepada masyarakat di Papan, Perak, Malaysia. Kegiatan ini bekerja sama dengan Faculty of Built Environment UiTM dan Perak Heritage Society.',
      'Rumah Besar Raja Bilah dipilih karena menyimpan jejak hubungan sejarah Indonesia dan Malaysia sejak abad ke-18. Program bertajuk “Reviving an Interconnected History” ini mempertemukan pengetahuan akademik, komunitas heritage, dan keturunan langsung Raja Bilah untuk mendukung upaya pelestarian bangunan.',
    ],
    descriptionEn: [
      'On 29 June 2025, lecturers from the Faculty of Engineering, Universitas Sumatera Utara, carried out a community service programme in Papan, Perak, Malaysia, in collaboration with the Faculty of Built Environment UiTM and the Perak Heritage Society.',
      'Rumah Besar Raja Bilah was selected for its record of Indonesian–Malaysian connections dating back to the eighteenth century. Entitled “Reviving an Interconnected History,” the programme brought together academic knowledge, heritage communities, and direct descendants of Raja Bilah to support the building’s preservation.',
    ],
    facts: [
      { labelId: 'Pelaksana', labelEn: 'USU team', value: 'Salmina Wati Ginting · Isnen Fitri' },
      { labelId: 'Kolaborator', labelEn: 'Collaborators', value: 'UiTM · Perak Heritage Society' },
      { labelId: 'Lokasi', labelEn: 'Location', value: 'Papan, Perak, Malaysia' },
      { labelId: 'Tanggal kegiatan', labelEn: 'Programme date', value: '29 Juni 2025' },
    ],
    sources: [
      {
        labelId: 'Baca cerita di Fakultas Teknik USU',
        labelEn: 'Read the story at the Faculty of Engineering USU',
        href: 'https://ft.usu.ac.id/id/berita/pengabdian-kepada-masyarakat-abdimas-revitalisasi-rumah-besar-raja-bilah',
        type: 'article',
      },
      {
        labelId: 'Tonton dokumentasi LPPM USU',
        labelEn: 'Watch the LPPM USU documentary',
        href: 'https://www.youtube.com/watch?v=YjoI0tpAdoc',
        type: 'video',
      },
    ],
  },
  {
    slug: 'medan-multi-ethnic',
    title: 'The Morphology of Medan Multi-Ethnics',
    shortTitle: 'Medan Multi-Ethnic',
    categoryId: 'Kluster penelitian',
    categoryEn: 'Research cluster',
    period: '2023—2025',
    location: 'Medan, Indonesia',
    image: '/images/frontpage.webp',
    imageAltId: 'Peta Kota Medan yang menjadi konteks penelitian morfologi multi-etnis',
    imageAltEn: 'Map of Medan, the context for the multi-ethnic morphology research',
    summaryId: 'Riset tentang bagaimana konservasi, modifikasi, dan perubahan kota membentuk karakter kawasan multi-etnis di Medan.',
    summaryEn: 'Research into how conservation, modification, and urban change shape the character of Medan’s multi-ethnic neighbourhoods.',
    descriptionId: [
      'Project ini berawal dari proposal pembentukan kluster keilmuan yang menerima pendanaan Equity Project Universitas Sumatera Utara pada 2023. Penelitian menempatkan keragaman etnis Medan sebagai bagian penting dalam membaca perubahan bentuk kota.',
      'Pengembangan riset berlanjut melalui kajian perubahan dan keberlanjutan morfologi kampung Melayu tradisional di Medan dari 1913 hingga 2024. Analisis terhadap jalan, bangunan, dan ruang terbuka menunjukkan hubungan antara sejarah, perubahan sosial-ekonomi, identitas budaya, dan perkembangan kota.',
    ],
    descriptionEn: [
      'The project began with a scientific-cluster proposal funded by the Universitas Sumatera Utara Equity Project in 2023. It positions Medan’s ethnic diversity as an essential dimension in understanding changes to the city’s form.',
      'The research developed into a study of change and continuity in the morphology of traditional Malay kampung in Medan between 1913 and 2024. Its analysis of streets, buildings, and open spaces reveals links between history, socio-economic change, cultural identity, and urban development.',
    ],
    facts: [
      { labelId: 'Ketua peneliti', labelEn: 'Lead researcher', value: 'Salmina Wati Ginting' },
      { labelId: 'Mitra internasional', labelEn: 'International partner', value: 'Ulrike Herbig · TU Wien' },
      { labelId: 'Skema', labelEn: 'Scheme', value: 'Pembentukan Kluster Keilmuan' },
      { labelId: 'Pendanaan 2023', labelEn: '2023 funding', value: 'Rp55.000.000' },
    ],
    sources: [
      {
        labelId: 'Baca artikel ilmiah di JLBI',
        labelEn: 'Read the journal article at JLBI',
        href: 'https://www.iplbijournals.id/index.php/jlbi/article/view/429/332',
        type: 'article',
      },
      {
        labelId: 'Lihat keputusan Equity Project USU 2023',
        labelEn: 'View the 2023 USU Equity Project decree',
        href: '/documents/equity-project-usu-2023.pdf',
        type: 'document',
      },
    ],
  },
];

export function getResearchProject(slug: string): ResearchProject | undefined {
  return RESEARCH_PROJECTS.find((project) => project.slug === slug);
}
