'use client';

import Tag from '@/components/ui/Tag';
import { ICON_MAP, TECHNOLOGY_ICONS } from '@/lib/icons';
import { contentfulLoader } from '@/lib/utils';
import type { Project } from '@/types';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface ProjectCardProps {
  project: Project;
}

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};

const slideInVariants = (direction: 'left' | 'right'): Variants => ({
  hidden: {
    opacity: 0,
    x:
      typeof window !== 'undefined' && window.innerWidth < 768
        ? 0
        : direction === 'left'
          ? -40
          : 40,
    y: typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 0
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }
});

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Helper to determine if a URL is from Contentful
  const isContentfulUrl = (url: string) => url.includes('ctfassets.net');

  return (
    <motion.article
      layout
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-20px' }}
      variants={revealVariants}
      className="group relative overflow-x-hidden"
    >
      <div
        className={`flex flex-col gap-6 rounded-3xl p-4 transition-all duration-700 sm:gap-8 sm:p-6 ${
          isExpanded
            ? 'bg-white ring-1 shadow-2xl ring-black/5'
            : 'hover:bg-white/50 hover:shadow-xl'
        } md:flex-row`}
      >
        {/* Thumbnail */}
        <div className="bg-brand-muted relative w-full flex-shrink-0 overflow-hidden rounded-2xl sm:w-64 md:w-80">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-video w-full"
          >
            <Image
              loader={
                isContentfulUrl(project.imageUrl) ? contentfulLoader : undefined
              }
              src={project.imageUrl}
              alt={project.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
              priority={false}
            />
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-center">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-brand-primary group-hover:text-brand-accent text-2xl font-bold tracking-tight transition-colors sm:text-3xl">
              {project.title}
            </h3>
            <span className="text-brand-secondary text-xs font-semibold opacity-60 sm:text-sm">
              {project.year}
            </span>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            <Tag
              variant="default"
              className="bg-brand-accent/10 text-brand-accent border-none px-3 py-1 text-[10px] font-bold tracking-wider uppercase sm:text-xs"
            >
              {project.tag}
            </Tag>
          </div>

          <p className="text-brand-secondary mb-6 text-base leading-relaxed opacity-80 sm:mb-8 sm:text-lg">
            {project.excerpt}
          </p>

          <div className="mt-auto flex items-center justify-between">
            <button
              onClick={() => {
                setIsExpanded(!isExpanded);
              }}
              className="text-brand-primary hover:text-brand-accent flex items-center gap-3 text-sm font-black tracking-widest uppercase transition-all active:scale-95"
            >
              <span className="relative">
                {isExpanded ? 'Hide Details' : 'View Project'}
                <motion.span
                  className="bg-brand-accent absolute -bottom-1 left-0 h-0.5 w-full origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                />
              </span>
              <motion.svg
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </motion.svg>
            </button>

            {project.repoUrl && (
              <motion.a
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-primary hover:bg-brand-accent rounded-full p-2 text-white shadow-lg transition-colors sm:p-2.5"
                title="View Repository"
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
              </motion.a>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-8 flex flex-col gap-10 pb-8 sm:gap-12">
              {/* Full Description Section */}
              {project.description && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={revealVariants}
                  className="bg-brand-muted/20 border-brand-accent/5 rounded-3xl border p-6 sm:p-8"
                >
                  <h4 className="text-brand-secondary mb-4 text-[10px] font-black tracking-[0.2em] uppercase opacity-50 sm:text-xs">
                    Project Overview
                  </h4>
                  <p className="text-brand-primary text-base leading-relaxed whitespace-pre-line opacity-90 sm:text-lg">
                    {project.description}
                  </p>
                </motion.div>
              )}

              {/* Technologies Section */}
              <div className="space-y-6">
                <h4 className="text-brand-secondary px-4 text-[10px] font-black tracking-[0.2em] uppercase opacity-50 sm:text-xs">
                  Built With
                </h4>
                <div className="flex flex-wrap gap-3 px-2 sm:gap-4">
                  {Array.isArray(project.technologies) &&
                    project.technologies.map((tech, i) => {
                      const iconName = TECHNOLOGY_ICONS[tech];
                      const IconComponent = iconName
                        ? ICON_MAP[iconName]
                        : null;

                      return (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          whileHover={{ y: -5, scale: 1.05 }}
                          className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 ring-1 shadow-sm ring-black/5 transition-all hover:shadow-md sm:gap-3 sm:rounded-2xl sm:px-5 sm:py-3"
                          title={tech}
                        >
                          {IconComponent && (
                            <IconComponent className="text-brand-accent h-4 w-4 sm:h-5 sm:w-5" />
                          )}
                          <span className="text-brand-primary text-xs font-bold sm:text-sm">
                            {tech}
                          </span>
                        </motion.div>
                      );
                    })}
                </div>
              </div>

              {/* Gallery Section */}
              {Array.isArray(project.gallery) && project.gallery.length > 1 && (
                <div className="space-y-6">
                  <h4 className="text-brand-secondary px-4 text-[10px] font-black tracking-[0.2em] uppercase opacity-50 sm:text-xs">
                    Visual Showcase
                  </h4>
                  <div className="grid grid-cols-1 gap-4 px-2 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                    {project.gallery.slice(1).map((url, idx) => (
                      <motion.div
                        key={idx}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={revealVariants}
                        whileHover={{ y: -10 }}
                        className="bg-brand-muted relative aspect-video overflow-hidden rounded-2xl ring-1 shadow-lg ring-black/5"
                      >
                        <Image
                          loader={
                            isContentfulUrl(url) ? contentfulLoader : undefined
                          }
                          src={url}
                          alt={`${project.title} gallery ${idx + 1}`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 hover:scale-110"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features Section with Alternating Layout */}
              {Array.isArray(project.features) &&
                project.features.length > 0 && (
                  <div className="space-y-10 sm:space-y-12">
                    <h4 className="text-brand-secondary px-4 text-[10px] font-black tracking-[0.2em] uppercase opacity-50 sm:text-xs">
                      Core Features
                    </h4>
                    <div className="flex flex-col gap-16 px-2 sm:gap-20">
                      {project.features.map((feature, idx) => {
                        const isEven = idx % 2 === 0;
                        return (
                          <div
                            key={idx}
                            className={`flex flex-col items-center gap-8 sm:gap-10 md:flex-row ${
                              isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                            }`}
                          >
                            {/* Feature Text */}
                            <motion.div
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true, margin: '-20px' }}
                              variants={slideInVariants(
                                isEven ? 'left' : 'right'
                              )}
                              className="flex-1 space-y-3 sm:space-y-4"
                            >
                              <h5 className="text-brand-primary text-2xl font-black tracking-tight sm:text-3xl">
                                {feature.title}
                              </h5>
                              <p className="text-brand-secondary text-base leading-relaxed opacity-80 sm:text-lg">
                                {feature.description}
                              </p>
                            </motion.div>

                            {/* Feature Images Gallery */}
                            {Array.isArray(feature.imageUrls) &&
                              feature.imageUrls.length > 0 && (
                                <motion.div
                                  initial="hidden"
                                  whileInView="visible"
                                  viewport={{ once: true, margin: '-20px' }}
                                  variants={slideInVariants(
                                    isEven ? 'right' : 'left'
                                  )}
                                  className="w-full flex-1 space-y-4"
                                >
                                  <div className="grid grid-cols-1 gap-4">
                                    {feature.imageUrls.map((url, imgIdx) => (
                                      <motion.div
                                        key={imgIdx}
                                        whileHover={{ scale: 1.02, y: -5 }}
                                        className="bg-brand-muted relative aspect-video w-full overflow-hidden rounded-2xl ring-1 shadow-xl ring-black/5"
                                      >
                                        <Image
                                          loader={
                                            isContentfulUrl(url)
                                              ? contentfulLoader
                                              : undefined
                                          }
                                          src={url}
                                          alt={`${feature.title} image ${
                                            imgIdx + 1
                                          }`}
                                          fill
                                          sizes="(max-width: 768px) 100vw, 50vw"
                                          className="object-cover transition-transform duration-700 hover:scale-110"
                                        />
                                      </motion.div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
