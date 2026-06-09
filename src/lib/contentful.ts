import {
  type NavItem,
  type Post,
  type Project,
  type ProjectFeature,
  type SocialLink
} from '@/types';
import {
  createClient,
  type Entry,
  type EntrySkeletonType,
  type Asset
} from 'contentful';

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

if (!SPACE_ID || !ACCESS_TOKEN) {
  console.warn('Contentful environment variables are missing.');
}

export const contentfulClient = createClient({
  space: SPACE_ID ?? '',
  accessToken: ACCESS_TOKEN ?? ''
});

// --- Projects ---

interface ContentfulProjectFields {
  projectName: string;
  projectDescriptions: string;
  projectFullDescription?: string;
  projectGallery: Asset[];
  projectTechnologies: string;
  year: string;
  tag: string;
  repositoryUrl: string;
  projectLink: string;
  features: Array<Entry<any, undefined, string>>;
}

type ProjectSkeleton = EntrySkeletonType<ContentfulProjectFields, 'portfolio'>;

export async function getContentfulProjects(): Promise<Project[]> {
  try {
    const response = await contentfulClient.getEntries<ProjectSkeleton>({
      content_type: 'portfolio',
      include: 10 // Aumentado para o máximo permitido para garantir o carregamento de todos os assets e referências
    });

    return response.items.map(item => {
      const fields = item.fields as unknown as ContentfulProjectFields;

      const gallery = Array.isArray(fields.projectGallery)
        ? fields.projectGallery
            .map((asset: any) => asset.fields?.file?.url)
            .filter((url): url is string => !!url)
            .map(url => `https:${url}`)
        : [];

      const firstImage = gallery.length > 0 ? gallery[0] : null;

      const techs =
        typeof fields.projectTechnologies === 'string'
          ? fields.projectTechnologies.split(',').map(t => t.trim())
          : [];

      const features: ProjectFeature[] = Array.isArray(fields.features)
        ? fields.features
            .map((feature: any) => {
              const fFields = feature.fields;
              if (!fFields) return null;

              const images =
                fFields.featureImage ??
                fFields.image ??
                fFields.featureImages ??
                fFields.images ??
                fFields.gallery ??
                fFields.media;

              let imageUrls: string[] = [];
              if (Array.isArray(images)) {
                imageUrls = images
                  .map((asset: any) => asset.fields?.file?.url)
                  .filter((url: string | undefined): url is string => !!url)
                  .map((url: string) => `https:${url}`);
              } else if (images?.fields?.file?.url) {
                imageUrls = [`https:${images.fields.file.url}`];
              }

              return {
                title: (fFields.featureTitle ?? fFields.title ?? '') as string,
                description: (fFields.featureDescription ??
                  fFields.description ??
                  '') as string,
                imageUrls
              };
            })
            .filter((f): f is ProjectFeature => f !== null)
        : [];

      return {
        id: item.sys.id,
        title: fields.projectName ?? 'Untitled Project',
        excerpt: fields.projectDescriptions ?? '',
        description: fields.projectFullDescription ?? '',
        imageUrl: firstImage ?? '/images/dashboard-preview.svg',
        imageAlt: fields.projectName ?? 'Project image',
        gallery,
        technologies: techs,
        year:
          fields.year ?? new Date(item.sys.createdAt).getFullYear().toString(),
        tag: fields.tag ?? 'Web',
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

// --- Hero Data ---

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
    const avatarUrl = fields.avatar?.fields?.file?.url;

    return {
      name: fields.name,
      title: fields.title,
      bio: fields.bio,
      resumeUrl: fields.resumeUrl,
      avatarUrl:
        typeof avatarUrl === 'string'
          ? `https:${avatarUrl}`
          : '/images/avatar.png',
      avatarAlt: `${fields.name} profile photo`
    };
  } catch (error) {
    console.error('Error fetching hero data:', error);
    return null;
  }
}

// --- Navigation ---

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
      order: ['fields.order' as any]
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

// --- Social Links ---

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
        icon: fields.icon as any
      };
    });
  } catch (error) {
    console.error('Error fetching social links:', error);
    return [];
  }
}

// --- Blog Posts ---

interface ContentfulPostFields {
  title: string;
  date: string;
  categories: string[];
  excerpt: string;
  slug: string;
}

type PostSkeleton = EntrySkeletonType<ContentfulPostFields, 'post'>;

export async function getPosts(): Promise<Post[]> {
  try {
    const response = await contentfulClient.getEntries<PostSkeleton>({
      content_type: 'post',
      order: ['-fields.date' as any]
    });

    return response.items.map(item => {
      const fields = item.fields as unknown as ContentfulPostFields;
      return {
        id: item.sys.id,
        title: fields.title,
        date: fields.date,
        categories: fields.categories,
        excerpt: fields.excerpt,
        slug: fields.slug
      };
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}
