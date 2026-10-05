import { ContactSection } from '@/features/contact';
import { ExperienceSection } from '@/features/experience';
import { HeroSection } from '@/features/hero';
import { ProfileSection } from '@/features/profile';
import { FeaturedProjectSection } from '@/features/projects';
import { SkillsMarquee, SkillsSection } from '@/features/skills';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SkillsMarquee />
      <FeaturedProjectSection />
      <ExperienceSection />
      <SkillsSection />
      <ProfileSection />
      <ContactSection />
    </>
  );
}
