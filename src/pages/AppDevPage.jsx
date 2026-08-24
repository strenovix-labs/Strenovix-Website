import { useRouter } from '../RouterContext';
import { HeroParallax } from '@/components/ui/hero-parallax';
import './AppDevPage.css';

export const products = [
  { title: "Project Neyam",       link: "#",                                  thumbnail: "/projects/neyam-cover.jpg" },
  { title: "VoteAble",            link: "#",                                  thumbnail: "/projects/neyam-phones.jpg" },
  { title: "Rogue",               link: "https://userogue.com",               thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/rogue.png" },
  { title: "Editorially",         link: "https://editorially.org",            thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/editorially.png" },
  { title: "Editrix AI",          link: "https://editrix.ai",                 thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/editrix.png" },
  { title: "Pixel Perfect",       link: "https://app.pixelperfect.quest",     thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/pixelperfect.png" },
  { title: "Algochurn",           link: "https://algochurn.com",              thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/algochurn.png" },
  { title: "Aceternity UI",       link: "https://ui.aceternity.com",          thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/aceternityui.png" },
  { title: "Tailwind Master Kit", link: "https://tailwindmasterkit.com",      thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png" },
  { title: "SmartBridge",         link: "https://smartbridgetech.com",        thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/smartbridge.png" },
  { title: "Renderwork Studio",   link: "https://renderwork.studio",          thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/renderwork.png" },
  { title: "Creme Digital",       link: "https://cremedigital.com",           thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/cremedigital.png" },
  { title: "Golden Bells Academy",link: "https://goldenbellsacademy.com",     thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png" },
  { title: "Invoker Labs",        link: "https://invoker.lol",                thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/invoker.png" },
  { title: "E Free Invoice",      link: "https://efreeinvoice.com",           thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/efreeinvoice.png" },
];

export default function AppDevPage() {
  const { navigate } = useRouter();

  return (
    <div className="adp-root">
      {/* Back bar */}
      <div className="page-back-bar">
        <button className="page-back-btn" onClick={() => navigate('')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
          {[['50+', 'Apps Shipped'], ['12', 'Platforms'], ['4.9★', 'Avg Rating'], ['2M+', 'End Users']].map(([n, l]) => (
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
