import type { Variants } from 'framer-motion';

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export const textVariants: Variants = {
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

export const slideInVariants = (direction: 'left' | 'right'): Variants => ({
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

export const isContentfulUrl = (url: string) => url.includes('ctfassets.net');
