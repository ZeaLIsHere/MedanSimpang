export type CategoryType = 'iSee' | 'iEat' | 'iDrink' | 'iSurprise';

export type BlockType = 'heading' | 'paragraph' | 'circle-image' | 'pull-quote';

export interface ContentBlock {
  type: BlockType;
  text_id?: string;
  text_en?: string;
  imageUrl?: string;
  caption_id?: string;
  caption_en?: string;
  author_id?: string;
  author_en?: string;
}

export interface Contributor {
  name: string;
  bio_id: string;
  bio_en: string;
  logoOrPhoto: string;
  linkUrl: string;
  type: 'Dibuat oleh' | 'Didesain oleh' | 'Didukung oleh' | 'Mitra';
}

export interface Kawasan {
  name: string;
  slug: string;
  region?: string;
  tagline_id: string;
  tagline_en: string;
  description_id: string;
  description_en: string;
  coverImage: string;
  walkCount: number;
}

export interface Walk {
  title_id: string;
  title_en: string;
  slug: string;
  neighbourhoodSlug: string;
  heroImage: string;
  description_id: string;
  description_en: string;
  durationMinutes: number;
  distanceMeters: number;
  stepsCount: number;
  walkType: 'Story Walk' | string;
  pointsOfInterestCount: number;
  lastUpdated: string;
  downloadableMapImage: string;
  latitude: number;
  longitude: number;
  createdByOrg?: string;
  designedBy?: string;
  poweredBy?: string;
  locationSlugs: string[];
  contributors: Contributor[];
  nearbyWalkSlugs?: string[];
}

export interface Location {
  name_id: string;
  name_en: string;
  slug: string;
  walkSlug: string;
  category: CategoryType;
  thumbnail: string;
  gallery: string[];
  shortDescription_id: string;
  shortDescription_en: string;
  address_id: string;
  address_en: string;
  openingHours_id: string;
  openingHours_en: string;
  latitude: number;
  longitude: number;
  googleMapsUrl: string;
  appleMapsUrl: string;
  websiteUrl?: string;
  order: number;
  contentBlocks: ContentBlock[];
}

export interface Cerita {
  title_id: string;
  title_en: string;
  slug: string;
  coverImage: string;
  excerpt_id: string;
  excerpt_en: string;
  body_id: ContentBlock[];
  body_en: ContentBlock[];
  neighbourhoodSlug: string;
  categories: string[];
  publishedDate: string;
  featured: boolean;
}
