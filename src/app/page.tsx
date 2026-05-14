import FeaturedWorksSection from '@/components/sections/FeaturedWorksSection';
import HeroSection from '@/components/sections/HeroSection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      {/* @ts-expect-error Server Component */}
      <FeaturedWorksSection />
    </main>
  );
}
