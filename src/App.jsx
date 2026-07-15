import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import FeaturesSection from './components/FeaturesSection';
import WorkSection from './components/WorkSection';
import ToonHubCarousel from './components/ToonHubCarousel';
import ContactSection from './components/ContactSection';
import FooterSection from './components/FooterSection';
import useLenis from './three/useLenis';
import Scene3D from './three/Scene3D';

export default function App() {
  useLenis();

  return (
    <main className="bg-black">
      <Scene3D />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <WorkSection />
      <ToonHubCarousel />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
