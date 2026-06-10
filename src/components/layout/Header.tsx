'use client';

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform
} from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { HERO_DATA, NAV_ITEMS } from '@/lib/data';

const DESKTOP_NAV = NAV_ITEMS.filter(item =>
  ['Home', 'Projects', 'Contact'].includes(item.label)
);

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    setMounted(true);
  }, []);

  const headerBg = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.8)']
  );

  const headerBorder = useTransform(
    scrollY,
    [0, 50],
    ['rgba(229, 231, 235, 0)', 'rgba(229, 231, 235, 1)']
  );

  const headerBlur = useTransform(
    scrollY,
    [0, 50],
    ['blur(0px)', 'blur(12px)']
  );

  return (
    <>
      <motion.header
        id="home"
        style={
          mounted
            ? {
                backgroundColor: headerBg,
                borderBottomColor: headerBorder,
                backdropFilter: headerBlur
              }
            : {}
        }
        className="fixed top-0 right-0 left-0 z-50 border-b transition-colors duration-300"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="text-brand-primary text-lg font-bold tracking-tight transition-opacity hover:opacity-70"
          >
            {HERO_DATA.title || HERO_DATA.name.split(' ')[0]}
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-2 md:flex"
          >
            {DESKTOP_NAV.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="text-brand-secondary hover:text-brand-primary rounded-full px-4 py-2 text-sm font-medium transition-all hover:bg-black/5"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex md:hidden">
            <button
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              onClick={() => {
                setIsOpen(prev => !prev);
              }}
              className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full bg-black/5 transition-colors hover:bg-black/10"
            >
              <motion.span
                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="bg-brand-primary h-0.5 w-5 rounded-full"
              />
              <motion.span
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="bg-brand-primary h-0.5 w-5 rounded-full"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="bg-brand-primary h-0.5 w-5 rounded-full"
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsOpen(false);
              }}
              className="fixed inset-0 z-40 bg-white/60 backdrop-blur-sm md:hidden"
            />

            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 flex w-full max-w-sm flex-col bg-white px-8 pt-24 pb-12 shadow-2xl md:hidden"
            >
              <ul className="flex flex-col gap-4">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      className="text-brand-primary hover:text-brand-accent text-3xl font-bold tracking-tight transition-colors"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="border-brand-border text-brand-secondary mt-auto border-t pt-8 text-sm">
                © {new Date().getFullYear()} {HERO_DATA.name}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
