'use client';

import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { HERO_DATA } from '@/lib/data';

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const avatarVariants: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }
  }
};

const rotateVariants: Variants = {
  animate: {
    rotate: 360,
    transition: { duration: 20, repeat: Infinity, ease: 'linear' }
  }
};

export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Avoid hydration mismatch or incomplete animations

  return (
    <section
      aria-label="Introduction"
      className="relative overflow-hidden bg-white pt-32 pb-20 md:pt-48 md:pb-32"
    >
      {/* Background decoration */}
      <div className="bg-brand-accent/5 absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full blur-3xl" />
      <div className="bg-brand-accent/5 absolute bottom-0 left-0 -z-10 h-[300px] w-[300px] rounded-full blur-3xl" />

      <Container>
        {/* Inner wrapper with max-width to keep content integrated on ultra-wide screens */}
        <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-12 text-center md:flex-row md:items-center md:justify-between md:gap-16 md:text-left">
          {/* Text block */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex max-w-2xl flex-col items-center md:items-start"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-brand-primary mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
            >
              Hi, I am Roberto,
              <br />
              <span className="text-brand-accent">{HERO_DATA.title}</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-brand-secondary mb-10 max-w-lg text-lg leading-relaxed lg:text-xl"
            >
              {HERO_DATA.bio}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-4 md:justify-start"
            >
              <Button
                as="a"
                href={HERO_DATA.resumeUrl}
                size="lg"
                className="rounded-full px-8"
              >
                Download Resume
              </Button>
              <Button
                variant="secondary"
                as="a"
                href="#projects"
                size="lg"
                className="rounded-full px-8"
              >
                View Projects
              </Button>
            </motion.div>
          </motion.div>

          {/* Avatar */}
          <div className="relative">
            <motion.div
              variants={avatarVariants}
              initial="initial"
              animate="animate"
              className="bg-brand-muted relative h-64 w-64 overflow-hidden rounded-full shadow-2xl transition-transform duration-500 hover:scale-105 sm:h-80 sm:w-80 lg:h-[400px] lg:w-[400px]"
            >
              <Image
                src={HERO_DATA.avatarUrl}
                alt={HERO_DATA.avatarAlt}
                fill
                sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 400px"
                className="rounded-full object-cover"
                priority
              />
            </motion.div>

            {/* Decorative element */}
            <motion.div
              variants={rotateVariants}
              animate="animate"
              className="border-brand-accent/30 absolute -top-4 -right-4 -z-10 h-24 w-24 rounded-full border border-dashed"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
