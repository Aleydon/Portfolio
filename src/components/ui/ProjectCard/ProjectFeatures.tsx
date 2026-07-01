'use client';

import { motion } from 'framer-motion';

import ImageWithBlur from '@/components/ui/ImageWithBlur';
import { cn } from '@/lib/utils';
import type { ProjectFeature } from '@/types';

import { revealVariants, slideInVariants } from './constants';

interface ProjectFeaturesProps {
  features: ProjectFeature[];
  isPortrait?: boolean;
}

export default function ProjectFeatures({
  features,
  isPortrait = false
}: ProjectFeaturesProps) {
  if (!Array.isArray(features) || features.length === 0) return null;

  return (
    <div className="space-y-12 sm:space-y-16">
      <h4 className="text-brand-secondary px-6 text-[11px] font-black tracking-[0.3em] uppercase opacity-40 sm:text-xs">
        Core Features
      </h4>
      <div className="flex flex-col gap-10 px-1 sm:gap-16 sm:px-2">
        {features.map((feature, idx) => {
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
                className={`flex flex-col items-start gap-10 sm:gap-12 md:flex-row md:items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
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

                {Array.isArray(feature.imageUrls) &&
                  feature.imageUrls.length > 0 && (
                    <motion.div
                      variants={slideInVariants(isEven ? 'right' : 'left')}
                      className="w-full flex-1"
                    >
                      <div className="grid grid-cols-1 gap-4 sm:gap-6">
                        {feature.imageUrls.map((url, imgIdx) => (
                          <motion.div
                            key={imgIdx}
                            whileHover={{ scale: 1.03, y: -5 }}
                            className={cn(
                              'bg-brand-muted relative w-full overflow-hidden rounded-3xl ring-1 shadow-2xl ring-black/5',
                              isPortrait
                                ? 'aspect-[9/16] sm:aspect-[3/4]'
                                : 'aspect-[16/9] sm:aspect-[16/9]'
                            )}
                          >
                            <ImageWithBlur
                              src={url}
                              alt={`${feature.title} image ${imgIdx + 1}`}
                              sizes="(max-width: 768px) 100vw, 50vw"
                              imageClassName="relative z-10 object-contain transition-transform duration-1000 hover:scale-105"
                            />
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
