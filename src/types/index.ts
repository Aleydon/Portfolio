export interface Post {
  id: string;
  title: string;
  date: string;
  categories: string[];
  excerpt: string;
  slug: string;
}

export interface ProjectFeature {
  title: string;
  description: string;
  imageUrls: string[];
}

export interface Project {
  id: string;
  githubId?: number;
  title: string;
  year: string;
  tag: string;
  excerpt: string;
  description?: string;
  imageUrl: string;
  imageAlt: string;
  gallery?: string[];
  technologies?: string[];
  repoUrl?: string;
  projectUrl?: string;
  features?: ProjectFeature[];
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'github';
}

export interface NavItem {
  label: string;
  href: string;
}
