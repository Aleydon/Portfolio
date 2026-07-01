'use client';

import { motion } from 'framer-motion';

import ImageWithBlur from '@/components/ui/ImageWithBlur';
import { cn } from '@/lib/utils';

import { revealVariants } from './constants';

interface ProjectGalleryProps {
  title: string;
  gallery: string[];
  isPortrait?: boolean;
}

export default function ProjectGallery({
  title,
  gallery,
  isPortrait = false
}: ProjectGalleryProps) {
  if (!Array.isArray(gallery) || gallery.length <= 1) return null;

  return (
    <div className="space-y-8">
      <h4 className="text-brand-secondary px-6 text-[11px] font-black tracking-[0.3em] uppercase opacity-40 sm:text-xs">
        Visual Showcase
      </h4>
      <div className="grid grid-cols-1 gap-6 px-2 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
        {gallery.slice(1).map((url, idx) => (
          <motion.div
            key={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            whileHover={{ y: -12, scale: 1.02 }}
            className={cn(
              'bg-brand-muted relative overflow-hidden rounded-3xl ring-1 shadow-2xl ring-black/5',
              isPortrait
                ? 'aspect-[9/16] sm:aspect-[3/4] lg:aspect-[9/16]'
                : 'aspect-[16/9] sm:aspect-[16/9]'
            )}
          >
            <ImageWithBlur
              src={url}
              alt={`${title} gallery ${idx + 1}`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
