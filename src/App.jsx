import { useState } from 'react';
import { RouterProvider, useRouter } from './RouterContext';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import FeaturesSection from './components/FeaturesSection';
import WorkSection from './components/WorkSection';
import ToonHubCarousel from './components/ToonHubCarousel';
import ContactSection from './components/ContactSection';
import FooterSection from './components/FooterSection';
import useLenis from './three/useLenis';
import Scene3D from './three/Scene3D';

import AppDevPage from './pages/AppDevPage';
import WebDevPage from './pages/WebDevPage';
import MLPage from './pages/MLPage';
import SAPPage from './pages/SAPPage';

function AppContent() {
  useLenis();
  const { route } = useRouter();
  const [prefilledEmail, setPrefilledEmail] = useState('');
  const subPages = ['services/app-dev', 'services/web-dev', 'services/ml', 'services/sap'];
  const isSubPage = subPages.includes(route);

  return (
    <main className="bg-transparent text-black">
      <Scene3D />
      {route === 'services/app-dev' && <AppDevPage />}
      {route === 'services/web-dev' && <WebDevPage />}
      {route === 'services/ml' && <MLPage />}
      {route === 'services/sap' && <SAPPage />}
      {!isSubPage && (
        <>
          <HeroSection onSubscribe={(email) => {
            setPrefilledEmail(email);
            setTimeout(() => {
              const el = document.getElementById('contact');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }, 50);
          }} />
          <AboutSection />
          <FeaturesSection />
          <WorkSection />
          <ToonHubCarousel />
          <ContactSection prefilledEmail={prefilledEmail} />
          <FooterSection />
        </>
      )}
    </main>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
