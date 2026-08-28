import { useEffect } from 'react';
import { useRouter } from '../RouterContext';
import { HeroParallax } from '@/components/ui/hero-parallax';
import './AppDevPage.css';

export const products = [
  { 
    title: "Project Neyam", 
    thumbnail: "/projects/neyam-cover.jpg",
    category: "Citizen App: Tamil Nadu Digital Election Accessibility",
    description: "NEYAM is a citizen-facing mobile application designed to make voting accessible for differently-abled citizens. Developed under the guidance of the District Administration for the 2026 Legislative Assembly Election, the app lets voters locate polling booths, request real-time support/amenities, register complaints, and get queries resolved via a multi-lingual chatbot interface.",
    year: "2026",
    tags: ["React Native", "Node.js", "Conversational Chatbot", "Accessibility Integrations"],
    images: ["/projects/neyam-cover.jpg", "/projects/neyam-phones.jpg"]
  },
  { 
    title: "VoteAble", 
    thumbnail: "/projects/neyam-phones.jpg",
    category: "Admin Portal & Companion App",
    description: "VoteAble is the administrative companion system for Project Neyam. It enables RO/ARO and booth-level officers (BLO) to manage incoming assistance requests, track complaints on a live map, dispatch support personnel, and streamline communication to ensure a seamless voting experience.",
    year: "2026",
    tags: ["React Native", "Node.js", "Maps & Geolocation", "Live Support Dashboards"],
    images: ["/projects/neyam-phones.jpg", "/projects/neyam-cover.jpg"]
  },
  { title: "Fintech Mobile Wallet", thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80" },
  { title: "AI Writer & Editor", thumbnail: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=600&q=80" },
  { title: "Creative Photo Editor", thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80" },
  { title: "Real-time Analytics Portal", thumbnail: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=600&q=80" },
  { title: "SaaS Platform Showcase", thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80" },
  { title: "Design System & UI Kit", thumbnail: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80" },
  { title: "CSS Framework Toolkit", thumbnail: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=600&q=80" },
  { title: "IoT Control Center", thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80" },
  { title: "3D Rendering Studio", thumbnail: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80" },
  { title: "Digital Agency Hub", thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80" },
  { title: "EdTech Classroom App", thumbnail: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=600&q=80" },
  { title: "API Gateway Console", thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" },
  { title: "Smart Invoicing App", thumbnail: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=600&q=80" },
];

export default function AppDevPage() {
  const { navigate } = useRouter();

  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="adp-root">
      {/* Back bar */}
      <div className="page-back-bar">
        <button className="page-back-btn" onClick={() => navigate('')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
        <span className="page-back-logo">STRENOVIX</span>
        <button className="page-back-cta" onClick={() => navigate('') || setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 200)}>
          Get Started
        </button>
      </div>

      {/* Main HeroParallax (user's exact structure) */}
      <HeroParallax products={products} />

      {/* Stats footer */}
      <div className="adp-footer">
        <div className="adp-footer-inner">
          {[['10+', 'Apps Shipped'], ['4.9★', 'Avg Rating'], ['12+', 'End Users']].map(([n, l]) => (
            <div key={l} className="adp-stat">
              <span className="adp-stat-num">{n}</span>
              <span className="adp-stat-label">{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
