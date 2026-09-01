import { useState } from 'react';
import { RouterProvider, useRouter } from './RouterContext';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import FeaturesSection from './components/FeaturesSection';
import WorkSection from './components/WorkSection';
import TeamSection from './components/TeamSection';
import ContactSection from './components/ContactSection';
import FooterSection from './components/FooterSection';
import CookieBanner from './components/CookieBanner';
import PageLoader from './components/PageLoader';
import useLenis from './three/useLenis';
import Scene3D from './three/Scene3D';

import AppDevPage from './pages/AppDevPage';
import WebDevPage from './pages/WebDevPage';
import MLPage from './pages/MLPage';
import SAPPage from './pages/SAPPage';
import ThankYouPage from './pages/ThankYouPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';

function AppContent() {
  useLenis();
  const { route } = useRouter();
  const [prefilledEmail, setPrefilledEmail] = useState('');

  const renderCurrentView = () => {
    switch (route) {
      case '':
        return (
          <>
            <HeroSection
              onSubscribe={(email) => {
                setPrefilledEmail(email);
                setTimeout(() => {
                  const el = document.getElementById('contact');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 50);
              }}
            />
            <AboutSection />
            <FeaturesSection />
            <WorkSection />
            <TeamSection />
            <ContactSection prefilledEmail={prefilledEmail} />
            <FooterSection />
          </>
        );
      case 'services/app-dev':
        return <AppDevPage />;
      case 'services/web-dev':
        return <WebDevPage />;
      case 'services/ml':
        return <MLPage />;
      case 'services/sap':
        return <SAPPage />;
      case 'thank-you':
        return <ThankYouPage />;
      case 'privacy-policy':
        return <PrivacyPolicyPage />;
      case 'terms-and-conditions':
        return <TermsPage />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <main className="bg-transparent text-black min-h-screen relative">
      <PageLoader />
      <Scene3D />
      {renderCurrentView()}
      <CookieBanner />
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
