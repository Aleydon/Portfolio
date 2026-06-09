'use client';

import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { HERO_DATA } from '@/lib/data';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      aria-label="Introduction"
      className="relative overflow-hidden bg-white pt-32 pb-20 md:pt-48 md:pb-32"
    >
      {/* Background decoration */}
      <div className="bg-brand-accent/5 absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full blur-3xl" />
      <div className="bg-brand-accent/5 absolute bottom-0 left-0 -z-10 h-[300px] w-[300px] rounded-full blur-3xl" />

      <Container>
        <div className="flex flex-col-reverse items-center gap-12 text-center md:flex-row md:items-center md:justify-between md:gap-16 md:text-left">
          {/* ── Text block ─────────────────────────────── */}
          <motion.div
            variants={staggerContainer}
            initial={mounted ? 'initial' : false}
            animate={mounted ? 'animate' : false}
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

          {/* ── Avatar ─────────────────────────────────── */}
          <motion.div
            initial={mounted ? { opacity: 0, scale: 0.9 } : false}
            animate={mounted ? { opacity: 1, scale: 1 } : false}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative"
          >
            <div className="bg-brand-muted relative h-64 w-64 overflow-hidden rounded-3xl shadow-2xl transition-transform duration-500 hover:scale-105 sm:h-80 sm:w-80 lg:h-[400px] lg:w-[400px]">
              <Image
                src={HERO_DATA.avatarUrl}
                alt={HERO_DATA.avatarAlt}
                fill
                sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 400px"
                className="object-cover"
                priority
              />
            </div>
            {/* Decorative element */}
            <motion.div
              animate={mounted ? { rotate: 360 } : false}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="border-brand-accent/30 absolute -top-4 -right-4 -z-10 h-24 w-24 rounded-full border border-dashed"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
