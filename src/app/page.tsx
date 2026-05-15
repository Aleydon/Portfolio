'use server';

import FeaturedWorksSection from '@/components/sections/FeaturedWorksSection';
import HeroSection from '@/components/sections/HeroSection';

export default async function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedWorksSection />
    </main>
  );
}
