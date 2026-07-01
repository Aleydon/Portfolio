import type { ComponentType } from 'react';

import * as Icons from '@/components/ui/icons';
import type { IconProps } from '@/components/ui/icons/types';

export type IconName =
  | 'react'
  | 'nextjs'
  | 'tailwind'
  | 'css'
  | 'docker'
  | 'postgresql'
  | 'github'
  | 'jest'
  | 'typescript'
  | 'javascript'
  | 'storybook'
  | 'vite'
  | 'prisma'
  | 'drizzle';

export const ICON_MAP: Record<IconName, ComponentType<IconProps>> = {
  react: Icons.ReactIcon,
  nextjs: Icons.NextIcon,
  tailwind: Icons.TailwindIcon,
  css: Icons.CssIcon,
  docker: Icons.DockerIcon,
  postgresql: Icons.PostgreSql,
  github: Icons.GitHubIcon,
  jest: Icons.JestIcon,
  typescript: Icons.ReactIcon,
  javascript: Icons.ReactIcon,
  storybook: Icons.ReactIcon,
  vite: Icons.ReactIcon,
  prisma: Icons.PostgreSql,
  drizzle: Icons.PostgreSql
};

export const TECHNOLOGY_ICONS: Record<string, IconName> = {
  React: 'react',
  'Next.js': 'nextjs',
  Nextjs: 'nextjs',
  'Next JS': 'nextjs',
  Tailwind: 'tailwind',
  'Tailwind CSS': 'tailwind',
  CSS: 'css',
  Docker: 'docker',
  PostgreSQL: 'postgresql',
  Postgres: 'postgresql',
  GitHub: 'github',
  Jest: 'jest',
  TypeScript: 'typescript',
  Typescript: 'typescript',
  Javascript: 'javascript',
  JavaScript: 'javascript',
  Storybook: 'storybook',
  Vite: 'vite',
  Prisma: 'prisma',
  Drizzle: 'drizzle'
} as const;

export function getTechnologyIcon(
  tech: string
): ComponentType<IconProps> | null {
  const name = TECHNOLOGY_ICONS[tech];
  return name ? ICON_MAP[name] : null;
}
