import type { Asset } from 'contentful';

export function getAssetUrl(asset: Asset): string | null {
  const url = asset.fields?.file?.url;
  return typeof url === 'string' ? `https:${url}` : null;
}

export function extractAssetUrls(
  assets: Asset[] | Asset | undefined
): string[] {
  if (!assets) return [];

  if (Array.isArray(assets)) {
    return assets.map(getAssetUrl).filter((url): url is string => url !== null);
  }

  const url = getAssetUrl(assets);
  return url ? [url] : [];
}

export function parseTechnologies(value: string): string[] {
  return value.split(',').map(t => t.trim());
}

export function safeString(value: unknown, fallback: string): string {
  return typeof value === 'string' ? value : fallback;
}

export function safeNumber(value: unknown, fallback: number): number {
  return typeof value === 'number' ? value : fallback;
}

export function getFirstImageUrl(gallery: string[], fallback: string): string {
  return gallery.length > 0 ? gallery[0] : fallback;
}
