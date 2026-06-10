'use client';

import * as Icons from '@/components/ui/icons';
import { SOCIAL_LINKS } from '@/lib/data';

const iconMap = {
  facebook: Icons.FacebookIcon,
  instagram: Icons.InstagramIcon,
  twitter: Icons.TwitterIcon,
  linkedin: Icons.LinkedInIcon,
  github: Icons.GitHubIcon
} as const;

export default function Footer() {
  return (
    <footer id="contact" className="border-brand-border border-t bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-5 py-10 sm:gap-6 sm:px-8 sm:py-12 lg:px-12 xl:px-16 2xl:px-20">
        <nav aria-label="Social media links">
          <ul className="flex items-center gap-5 sm:gap-7">
            {SOCIAL_LINKS.map(link => {
              const Icon = iconMap[link.icon] ?? Icons.GitHubIcon;
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="text-brand-primary hover:text-brand-accent block transition-colors duration-200"
                  >
                    <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <p className="text-brand-secondary text-center text-sm opacity-60">
          Copyright ©{new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </footer>
  );
}
