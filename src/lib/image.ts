import { contentfulLoader } from './utils';

export function isContentfulUrl(url: string): boolean {
  return url.includes('ctfassets.net');
}

export function getImageLoader(url: string) {
  return isContentfulUrl(url) ? contentfulLoader : undefined;
}

export function isPortraitProject(project: {
  tag: string;
  platform?: string;
}): boolean {
  if (project.platform) {
    return project.platform.toLowerCase() === 'mobile';
  }
  const portraitKeywords = ['mobile', 'android', 'ios', 'app', 'flutter'];
  return portraitKeywords.some(keyword =>
    project.tag.toLowerCase().includes(keyword)
  );
}

export function getAspectRatioClasses(
  isPortrait: boolean,
  options?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  }
): string {
  if (isPortrait) {
    return options?.mobile ?? 'aspect-[9/16] sm:aspect-[3/4] lg:aspect-[9/16]';
  }
  return options?.mobile ?? 'aspect-[16/9] sm:aspect-[16/9]';
}
