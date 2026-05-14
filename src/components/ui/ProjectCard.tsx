'use client';

import Tag from '@/components/ui/Tag';
import { ICON_MAP, TECHNOLOGY_ICONS } from '@/lib/icons';
import type { Project } from '@/types';
import Image from 'next/image';
import { useState } from 'react';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  return (
    <article className="group overflow-hidden">
      <div
        className={`flex flex-col gap-5 rounded-xl px-3 py-6 transition-all duration-300 sm:-mx-3 sm:flex-row sm:gap-6 sm:py-8 lg:gap-8 ${
          isExpanded ? 'bg-[#f0f4ff]' : 'hover:bg-[#fafbfd]'
        }`}
      >
        {/* Thumbnail */}
        <div className="w-full flex-shrink-0 sm:w-44 md:w-52 lg:w-60 xl:w-64">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#1a1f3a] shadow-md transition-shadow duration-300 group-hover:shadow-lg sm:w-44 md:w-52 lg:w-60 xl:w-64">
            <Image
              src={project.imageUrl}
              alt={project.imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 176px, (max-width: 1024px) 208px, 256px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <div className="flex items-start justify-between">
            <h3 className="font-display mb-2 text-2xl leading-snug font-semibold text-[#1a1f3a] transition-colors group-hover:text-[#3d4a8a] sm:text-2xl lg:text-3xl">
              {project.title}
            </h3>
            <button
              onClick={toggleExpand}
              className="ml-4 rounded-full p-2 transition-colors hover:bg-gray-200"
              aria-expanded={isExpanded}
              aria-label={
                isExpanded
                  ? 'Collapse project details'
                  : 'Expand project details'
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>

          <div className="mb-3 flex items-center gap-2">
            <Tag variant="accent">{project.year}</Tag>
            <Tag variant="default">{project.tag}</Tag>
          </div>

          <p className="line-clamp-3 text-sm leading-relaxed text-[#6b7280] sm:text-base">
            {project.excerpt}
          </p>

          <div
            className={`grid transition-all duration-300 ease-in-out ${
              isExpanded
                ? 'grid-rows-[1fr] opacity-100'
                : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden">
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h4 className="mb-3 text-sm font-bold tracking-wider text-gray-500 uppercase">
                  Details & Links
                </h4>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-medium text-[#3d4a8a] hover:underline"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                      View Repository
                    </a>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map(tech => {
                      const iconName = TECHNOLOGY_ICONS[tech];
                      const IconComponent = iconName
                        ? ICON_MAP[iconName]
                        : null;

                      return (
                        <div
                          key={tech}
                          className="inline-flex items-center gap-1 rounded-full bg-[#e8ecf5] px-3 py-1"
                          title={tech}
                        >
                          {IconComponent && (
                            <IconComponent className="h-4 w-4" />
                          )}
                          <span className="text-xs font-semibold tracking-wide text-[#3d4a8a] uppercase">
                            {tech}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
