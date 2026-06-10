'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

import Tag from '@/components/ui/Tag';
import { contentfulLoader } from '@/lib/utils';
import type { Project } from '@/types';

import ProjectExpandedContent from './ProjectExpandedContent';
import { isContentfulUrl, revealVariants, textVariants } from './types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

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
                className="bg-brand-muted/5 text-brand-secondary rounded-full px-3 py-1 text-xs font-bold tracking-tighter opacity-70 sm:text-sm"
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

        {/* Expanded Content */}
        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: 10 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full overflow-hidden"
            >
              <ProjectExpandedContent project={project} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}
