'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import { contentfulLoader } from '@/lib/utils';

import { isContentfulUrl, revealVariants } from './types';

interface ProjectGalleryProps {
  title: string;
  gallery: string[];
}

export default function ProjectGallery({
  title,
  gallery
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
            className="bg-brand-muted relative aspect-[4/5] overflow-hidden rounded-3xl ring-1 shadow-2xl ring-black/5 sm:aspect-[16/10]"
          >
            {/* Blurred background for different aspect ratios */}
            <Image
              loader={isContentfulUrl(url) ? contentfulLoader : undefined}
              src={url}
              alt=""
              fill
              sizes="10px"
              className="scale-110 object-cover opacity-20 blur-2xl transition-transform duration-1000"
              aria-hidden="true"
            />
            <Image
              loader={isContentfulUrl(url) ? contentfulLoader : undefined}
              src={url}
              alt={`${title} gallery ${idx + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="relative z-10 object-contain transition-transform duration-1000 hover:scale-110"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
