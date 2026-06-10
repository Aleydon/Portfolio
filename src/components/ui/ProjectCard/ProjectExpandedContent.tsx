'use client';

import { motion } from 'framer-motion';

import type { Project } from '@/types';

import ProjectFeatures from './ProjectFeatures';
import ProjectGallery from './ProjectGallery';
import ProjectTechnologies from './ProjectTechnologies';
import { revealVariants } from './types';

interface ProjectExpandedContentProps {
  project: Project;
}

export default function ProjectExpandedContent({
  project
}: ProjectExpandedContentProps) {
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
      {project.technologies && (
        <ProjectTechnologies technologies={project.technologies} />
      )}

      {/* Gallery Section */}
      {project.gallery && (
        <ProjectGallery title={project.title} gallery={project.gallery} />
      )}

      {/* Features Section */}
      {project.features && <ProjectFeatures features={project.features} />}
    </div>
  );
}
