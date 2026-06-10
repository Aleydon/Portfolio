'use client';

import { ICON_MAP, TECHNOLOGY_ICONS } from '@/lib/icons';
import { motion } from 'framer-motion';

interface ProjectTechnologiesProps {
  technologies: string[];
}

export default function ProjectTechnologies({
  technologies
}: ProjectTechnologiesProps) {
  if (!Array.isArray(technologies) || technologies.length === 0) return null;

  return (
    <div className="space-y-8">
      <h4 className="text-brand-secondary px-6 text-[11px] font-black tracking-[0.3em] uppercase opacity-40 sm:text-xs">
        Built With
      </h4>
      <div className="flex flex-wrap gap-4 px-2 sm:gap-6">
        {technologies.map((tech, i) => {
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
  );
}
