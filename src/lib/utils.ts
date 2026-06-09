import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function contentfulLoader({
  src,
  width,
  quality
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const url = new URL(src);
  url.searchParams.set('fm', 'webp');
  url.searchParams.set('w', width.toString());
  if (quality) {
    url.searchParams.set('q', quality.toString());
  }
  return url.toString();
}
