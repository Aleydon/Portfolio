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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  })
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
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
  }
});

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Helper to determine if a URL is from Contentful
  const isContentfulUrl = (url: string) => url.includes('ctfassets.net');

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.article
      layout
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={revealVariants}
      className="group relative"
    >
      <div
        onClick={toggleExpand}
        className={`relative flex cursor-pointer flex-col gap-6 rounded-[2.5rem] border transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:gap-8 ${
          isExpanded
            ? 'border-black/10 bg-white p-6 ring-1 shadow-2xl ring-black/5 sm:p-10'
            : 'border-transparent bg-white/40 p-4 backdrop-blur-sm hover:border-black/5 hover:bg-white/80 hover:shadow-2xl sm:p-6'
        }`}
      >
        {/* Main Row: Thumbnail and Summary */}
        <div className="flex flex-col gap-8 sm:gap-10 md:flex-row">
          {/* Thumbnail */}
          <div className="bg-brand-muted relative w-full flex-shrink-0 overflow-hidden rounded-3xl sm:w-72 md:w-96">
            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[16/10] w-full"
            >
              <Image
                loader={
                  isContentfulUrl(project.imageUrl)
                    ? contentfulLoader
                    : undefined
                }
                src={project.imageUrl}
                alt={project.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority={false}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col justify-center py-2">
            <div className="mb-4 flex items-center justify-between">
              <motion.h3
                custom={0}
                variants={textVariants}
                className="text-brand-primary group-hover:text-brand-accent text-3xl font-black tracking-tight transition-colors duration-500 sm:text-4xl"
              >
                {project.title}
              </motion.h3>
              <motion.span
                custom={1}
                variants={textVariants}
                className="bg-brand-muted/50 text-brand-secondary rounded-full px-3 py-1 text-xs font-bold tracking-tighter opacity-70 sm:text-sm"
              >
                {project.year}
              </motion.span>
            </div>

            <motion.div
              custom={2}
              variants={textVariants}
              className="mb-5 flex flex-wrap gap-2"
            >
              <Tag
                variant="default"
                className="bg-brand-accent/10 text-brand-accent border-none px-4 py-1.5 text-[10px] font-black tracking-[0.15em] uppercase shadow-xs sm:text-xs"
              >
                {project.tag}
              </Tag>
            </motion.div>

            <motion.p
              custom={3}
              variants={textVariants}
              className="text-brand-secondary mb-8 text-lg leading-relaxed font-medium opacity-80 sm:mb-10 sm:text-xl"
            >
              {project.excerpt}
            </motion.p>

            <div className="mt-auto flex items-center justify-between">
              <button
                onClick={e => {
                  e.stopPropagation();
                  toggleExpand();
                }}
                className="text-brand-primary hover:text-brand-accent group/btn flex items-center gap-4 text-xs font-black tracking-[0.2em] uppercase transition-all active:scale-95 sm:text-sm"
              >
                <span className="relative">
                  {isExpanded ? 'Hide Details' : 'View Project'}
                  <motion.span
                    className="bg-brand-accent absolute -bottom-2 left-0 h-[3px] w-full origin-left rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isExpanded ? 1 : 0 }}
                    whileHover={{ scaleX: 1 }}
                  />
                </span>
                <motion.div
                  animate={{
                    rotate: isExpanded ? 180 : 0,
                    y: isExpanded ? 0 : [0, 3, 0]
                  }}
                  transition={{
                    rotate: { type: 'spring', stiffness: 200, damping: 15 },
                    y: { repeat: Infinity, duration: 2, ease: 'easeInOut' }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </motion.div>
              </button>

              {project.repoUrl && (
                <motion.a
                  onClick={e => {
                    e.stopPropagation();
                  }}
                  whileHover={{ scale: 1.15, rotate: 8, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-primary hover:bg-brand-accent rounded-2xl p-3 text-white shadow-xl transition-all duration-300 sm:p-3.5"
                  title="View Repository"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
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

        {/* Expanded Content (Wrapped inside the same card div) */}
        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: 10 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full overflow-hidden"
            >
              <ExpandedContent
                project={project}
                revealVariants={revealVariants}
                slideInVariants={slideInVariants}
                isContentfulUrl={isContentfulUrl}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

function ExpandedContent({
  project,
  revealVariants,
  slideInVariants,
  isContentfulUrl
}: any) {
  return (
    <div className="mt-12 flex flex-col gap-12 pb-8 sm:gap-16">
      {/* Full Description Section */}
      {project.description && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
          className="bg-brand-muted/10 border-brand-accent/10 rounded-[2rem] border p-8 shadow-inner sm:p-10"
        >
          <h4 className="text-brand-secondary mb-6 text-[11px] font-black tracking-[0.3em] uppercase opacity-40 sm:text-xs">
            Project Overview
          </h4>
          <p className="text-brand-primary text-lg leading-relaxed font-medium whitespace-pre-line opacity-90 sm:text-xl">
            {project.description}
          </p>
        </motion.div>
      )}

      {/* Technologies Section */}
      <div className="space-y-8">
        <h4 className="text-brand-secondary px-6 text-[11px] font-black tracking-[0.3em] uppercase opacity-40 sm:text-xs">
          Built With
        </h4>
        <div className="flex flex-wrap gap-4 px-2 sm:gap-6">
          {Array.isArray(project.technologies) &&
            project.technologies.map((tech: string, i: number) => {
              const iconName = TECHNOLOGY_ICONS[tech];
              const IconComponent = iconName ? ICON_MAP[iconName] : null;

              return (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.05, rotate: [0, -2, 2, 0] }}
                  className="flex items-center gap-3 rounded-2xl bg-white px-5 py-3 ring-1 shadow-md ring-black/5 transition-all hover:shadow-xl sm:gap-4 sm:rounded-[1.25rem] sm:px-6 sm:py-4"
                  title={tech}
                >
                  {IconComponent && (
                    <IconComponent className="text-brand-accent h-5 w-5 sm:h-6 sm:w-6" />
                  )}
                  <span className="text-brand-primary text-sm font-black sm:text-base">
                    {tech}
                  </span>
                </motion.div>
              );
            })}
        </div>
      </div>

      {/* Gallery Section */}
      {Array.isArray(project.gallery) && project.gallery.length > 1 && (
        <div className="space-y-8">
          <h4 className="text-brand-secondary px-6 text-[11px] font-black tracking-[0.3em] uppercase opacity-40 sm:text-xs">
            Visual Showcase
          </h4>
          <div className="grid grid-cols-1 gap-6 px-2 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            {project.gallery.slice(1).map((url: string, idx: number) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={revealVariants}
                whileHover={{ y: -12, scale: 1.02 }}
                className="bg-brand-muted relative aspect-[16/10] overflow-hidden rounded-3xl ring-1 shadow-2xl ring-black/5"
              >
                <Image
                  loader={isContentfulUrl(url) ? contentfulLoader : undefined}
                  src={url}
                  alt={`${project.title} gallery ${idx + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-1000 hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Features Section with Alternating Layout */}
      {Array.isArray(project.features) && project.features.length > 0 && (
        <div className="space-y-12 sm:space-y-16">
          <h4 className="text-brand-secondary px-6 text-[11px] font-black tracking-[0.3em] uppercase opacity-40 sm:text-xs">
            Core Features
          </h4>
          <div className="flex flex-col gap-10 px-1 sm:gap-16 sm:px-2">
            {project.features.map((feature: any, idx: number) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  variants={revealVariants}
                  className="bg-brand-muted/5 border-brand-accent/5 relative overflow-hidden rounded-[2.5rem] border p-6 sm:p-10 md:p-12 lg:p-16"
                >
                  <div
                    className={`flex flex-col items-start gap-10 sm:gap-12 md:flex-row md:items-center ${
                      isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Feature Text */}
                    <motion.div
                      variants={slideInVariants(isEven ? 'left' : 'right')}
                      className="flex-1 space-y-4 sm:space-y-6"
                    >
                      <div className="flex items-center gap-4">
                        <span className="bg-brand-accent/10 text-brand-accent flex h-8 w-8 items-center justify-center rounded-full text-xs font-black sm:h-10 sm:w-10 sm:text-sm">
                          {idx + 1}
                        </span>
                        <h5 className="text-brand-primary text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl">
                          {feature.title}
                        </h5>
                      </div>
                      <p className="text-brand-secondary text-base leading-relaxed font-medium opacity-80 sm:text-lg lg:text-xl">
                        {feature.description}
                      </p>
                    </motion.div>

                    {/* Feature Images Gallery */}
                    {Array.isArray(feature.imageUrls) &&
                      feature.imageUrls.length > 0 && (
                        <motion.div
                          variants={slideInVariants(isEven ? 'right' : 'left')}
                          className="w-full flex-1"
                        >
                          <div className="grid grid-cols-1 gap-4 sm:gap-6">
                            {feature.imageUrls.map(
                              (url: string, imgIdx: number) => (
                                <motion.div
                                  key={imgIdx}
                                  whileHover={{ scale: 1.03, y: -5 }}
                                  className="bg-brand-muted relative aspect-[16/9] w-full overflow-hidden rounded-3xl ring-1 shadow-2xl ring-black/5"
                                >
                                  <Image
                                    loader={
                                      isContentfulUrl(url)
                                        ? contentfulLoader
                                        : undefined
                                    }
                                    src={url}
                                    alt={`${feature.title} image ${imgIdx + 1}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover transition-transform duration-1000 hover:scale-105"
                                  />
                                </motion.div>
                              )
                            )}
                          </div>
                        </motion.div>
                      )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
