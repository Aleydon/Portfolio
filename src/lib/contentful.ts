import {
  type Asset,
  createClient,
  type Entry,
  type EntrySkeletonType
} from 'contentful';

import {
  type NavItem,
  type Project,
  type ProjectFeature,
  type SocialLink
} from '@/types';

import {
  extractAssetUrls,
  getAssetUrl,
  getFirstImageUrl,
  parseTechnologies,
  safeString
} from './contentful-helpers';

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

if (!SPACE_ID || !ACCESS_TOKEN) {
  console.warn('Contentful environment variables are missing.');
}

export const contentfulClient = createClient({
  space: SPACE_ID ?? '',
  accessToken: ACCESS_TOKEN ?? ''
});

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

interface ContentfulFeatureFields {
  featureTitle?: string;
  title?: string;
  featureDescription?: string;
  description?: string;
  featureImage?: Asset | Asset[];
  image?: Asset | Asset[];
  featureImages?: Asset[];
  images?: Asset[];
  gallery?: Asset[];
  media?: Asset | Asset[];
}

type FeatureEntry = Entry<
  EntrySkeletonType<ContentfulFeatureFields>,
  undefined,
  string
>;

interface ContentfulProjectFields {
  projectName: string;
  projectDescriptions: string;
  projectFullDescription?: string;
  projectGallery: Asset[];
  projectTechnologies: string;
  year: string;
  tag: string;
  platform?: string;
  repositoryUrl: string;
  projectLink: string;
  features: FeatureEntry[];
}

type ProjectSkeleton = EntrySkeletonType<ContentfulProjectFields, 'portfolio'>;

function extractFeatureImages(fFields: ContentfulFeatureFields): string[] {
  const images =
    fFields.featureImage ??
    fFields.image ??
    fFields.featureImages ??
    fFields.images ??
    fFields.gallery ??
    fFields.media;

  return extractAssetUrls(images);
}

function mapFeature(feature: FeatureEntry): ProjectFeature | null {
  const fFields = feature.fields as ContentfulFeatureFields;
  if (!fFields) return null;

  return {
    title: safeString(fFields.featureTitle ?? fFields.title, ''),
    description: safeString(
      fFields.featureDescription ?? fFields.description,
      ''
    ),
    imageUrls: extractFeatureImages(fFields)
  };
}

export async function getContentfulProjects(): Promise<Project[]> {
  try {
    const response = await contentfulClient.getEntries<ProjectSkeleton>({
      content_type: 'portfolio',
      include: 10
    });

    return response.items.map(item => {
      const fields = item.fields as unknown as ContentfulProjectFields;

      const gallery = extractAssetUrls(fields.projectGallery);
      const firstImage = getFirstImageUrl(
        gallery,
        '/images/dashboard-preview.svg'
      );

      const features: ProjectFeature[] = Array.isArray(fields.features)
        ? fields.features
            .map(mapFeature)
            .filter((f): f is ProjectFeature => f !== null)
        : [];

      return {
        id: item.sys.id,
        title: safeString(fields.projectName, 'Untitled Project'),
        excerpt: safeString(fields.projectDescriptions, ''),
        description: fields.projectFullDescription ?? '',
        imageUrl: firstImage,
        imageAlt: safeString(fields.projectName, 'Project image'),
        gallery,
        technologies: parseTechnologies(fields.projectTechnologies),
        year:
          fields.year ?? new Date(item.sys.createdAt).getFullYear().toString(),
        tag: fields.tag ?? 'Web',
        platform: fields.platform,
        repoUrl: fields.repositoryUrl ?? '',
        projectUrl: fields.projectLink ?? '',
        features
      };
    });
  } catch (error) {
    console.error('Error fetching projects from Contentful:', error);
    return [];
  }
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

interface ContentfulHeroFields {
  name: string;
  title: string;
  bio: string;
  resumeUrl: string;
  avatar: Asset;
}

type HeroSkeleton = EntrySkeletonType<ContentfulHeroFields, 'hero'>;

export async function getHeroData() {
  try {
    const response = await contentfulClient.getEntries<HeroSkeleton>({
      content_type: 'hero',
      limit: 1
    });

    if (response.items.length === 0) return null;

    const fields = response.items[0].fields as unknown as ContentfulHeroFields;
    const avatarUrl = getAssetUrl(fields.avatar);

    return {
      name: fields.name,
      title: fields.title,
      bio: fields.bio,
      resumeUrl: fields.resumeUrl,
      avatarUrl: avatarUrl ?? '/images/avatar.png',
      avatarAlt: `${fields.name} profile photo`
    };
  } catch (error) {
    console.error('Error fetching hero data:', error);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

interface ContentfulNavItemFields {
  label: string;
  href: string;
  order: number;
}

type NavItemSkeleton = EntrySkeletonType<ContentfulNavItemFields, 'navItem'>;

export async function getNavItems(): Promise<NavItem[]> {
  try {
    const response = await contentfulClient.getEntries<NavItemSkeleton>({
      content_type: 'navItem',
      order: ['fields.order' as unknown as 'sys.id']
    });

    return response.items.map(item => {
      const fields = item.fields as unknown as ContentfulNavItemFields;
      return {
        label: fields.label,
        href: fields.href
      };
    });
  } catch (error) {
    console.error('Error fetching nav items:', error);
    return [];
  }
}

// ---------------------------------------------------------------------------
// Social Links
// ---------------------------------------------------------------------------

interface ContentfulSocialFields {
  label: string;
  href: string;
  icon: string;
}

type SocialSkeleton = EntrySkeletonType<ContentfulSocialFields, 'socialLink'>;

export async function getSocialLinks(): Promise<SocialLink[]> {
  try {
    const response = await contentfulClient.getEntries<SocialSkeleton>({
      content_type: 'socialLink'
    });

    return response.items.map(item => {
      const fields = item.fields as unknown as ContentfulSocialFields;
      return {
        id: item.sys.id,
        label: fields.label,
        href: fields.href,
        icon: fields.icon as SocialLink['icon']
      };
    });
  } catch (error) {
    console.error('Error fetching social links:', error);
    return [];
  }
}
