import { type Project } from '@/types';
import { PROJECTS as STATIC_PROJECTS } from './data';

const GITHUB_USERNAME = 'Aleydon';
const FEATURED_REPOS = ['e-commerce', 'Pomodoro-Timer', 'ODS-8', 'Agency-X']; // Add repo names you want to feature, or rely on the 'portfolio-featured' topic in GitHub

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  created_at: string;
  languages_url: string;
  topics?: string[];
}

// Helper to find a potential cover image in the repo
async function getRepoCoverImage(repoName: string): Promise<string> {
  const branches = ['main', 'master', 'Aleydon'];
  const possiblePaths = [
    'assets/next14.png',
    'public/banner.png',
    'public/banner-2.png',
    'assets/storybok_screen_shot.png',
    'assets/React-Vite.png',
    'assets/images/icon.png',
    'img/screenshots/agency-list-details.png'
  ];

  for (const branch of branches) {
    for (const path of possiblePaths) {
      const url = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/${branch}/${path}`;
      try {
        const res = await fetch(url, { method: 'HEAD' });
        if (res.ok) return url;
      } catch (e) {
        throw new Error(`Error checking image URL: ${url}`, { cause: e });
      }
    }
  }

  // Fallback to OpenGraph image
  return `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repoName}`;
}

export async function getGitHubProjects(): Promise<Project[]> {
  try {
    const reposResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      {
        next: { revalidate: 3600 }
      }
    );

    if (!reposResponse.ok) {
      console.error('Failed to fetch repos from GitHub');
      return [];
    }

    const repos = (await reposResponse.json()) as GitHubRepo[];

    const selectedRepos = repos.filter(
      repo =>
        FEATURED_REPOS.includes(repo.name) ??
        repo.topics?.includes('portfolio-featured')
    );

    const projects: Project[] = await Promise.all(
      selectedRepos.map(async repo => {
        // Check if we have manual overrides in data.ts
        const manualOverride = STATIC_PROJECTS.find(p => p.id === repo.name);

        const langResponse = await fetch(repo.languages_url, {
          next: { revalidate: 3600 }
        });
        const languages = (
          langResponse.ok ? await langResponse.json() : {}
        ) as Record<string, number>;
        const githubTechs = Object.keys(languages);

        // Merge technologies, prioritizing manual ones but keeping unique ones from GitHub
        const technologies =
          manualOverride?.technologies !== undefined
            ? Array.from(
                new Set([...manualOverride.technologies, ...githubTechs])
              )
            : githubTechs;

        const imageUrl = await getRepoCoverImage(repo.name);

        return {
          id: repo.name,
          githubId: repo.id,
          title: manualOverride?.title ?? formatRepoName(repo.name),
          year:
            manualOverride?.year ??
            new Date(repo.created_at).getFullYear().toString(),
          tag: manualOverride?.tag ?? repo.topics?.[0] ?? 'Web',
          excerpt:
            manualOverride?.excerpt ??
            repo.description ??
            'Project developed by Aleydon.',
          imageUrl: manualOverride?.imageUrl ?? imageUrl,
          imageAlt: manualOverride?.imageAlt ?? `${repo.name} preview image`,
          technologies,
          repoUrl: repo.html_url
        };
      })
    );

    return projects;
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return [];
  }
}

function formatRepoName(name: string): string {
  return name
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
