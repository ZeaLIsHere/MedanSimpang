import Image from 'next/image';

interface LocationMediaProps {
  imageUrl: string;
  name: string;
  latitude: number;
  longitude: number;
  sizes: string;
  priority?: boolean;
  interactive?: boolean;
  imageClassName?: string;
}

export const isPlaceholderLocationImage = (imageUrl: string) =>
  imageUrl.includes('/images/placeholder-location');

export const getStreetViewEmbedUrl = (latitude: number, longitude: number) =>
  `https://www.google.com/maps?layer=c&cbll=${latitude},${longitude}&cbp=12,0,0,0,0&output=svembed`;

export default function LocationMedia({
  imageUrl,
  name,
  latitude,
  longitude,
  sizes,
  priority = false,
  interactive = false,
  imageClassName = 'object-cover',
}: LocationMediaProps) {
  if (isPlaceholderLocationImage(imageUrl)) {
    return (
      <iframe
        src={getStreetViewEmbedUrl(latitude, longitude)}
        title={`Google Street View — ${name}`}
        loading={priority ? 'eager' : 'lazy'}
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className={`absolute inset-0 h-full w-full border-0 ${interactive ? '' : 'pointer-events-none'}`}
      />
    );
  }

  return (
    <Image
      src={imageUrl}
      alt={name}
      fill
      priority={priority}
      className={imageClassName}
      sizes={sizes}
    />
  );
}
