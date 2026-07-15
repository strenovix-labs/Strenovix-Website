import { useEffect } from 'react';
import gsap from 'gsap';
import './GridBG.css';

export default function GridBG() {
  useEffect(() => {
    /* Scan line loops top → bottom forever */
    gsap.fromTo(
      '.gbg-scan',
      { y: '-2%' },
      { y: '102%', duration: 6, ease: 'none', repeat: -1 }
    );

    /* Pulse the corner dots */
    gsap.to('.gbg-corner-dot', {
      opacity: 0.15,
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.5,
    });
  }, []);

  return (
    <div className="gbg" aria-hidden="true">
      <div className="gbg-grid" />
      <div className="gbg-scan" />
      <div className="gbg-vignette" />

      {/* Corner HUD decorations */}
      <div className="gbg-corner gbg-corner--tl">
        <div className="gbg-corner-dot" />
        <div className="gbg-corner-line gbg-corner-line--h" />
        <div className="gbg-corner-line gbg-corner-line--v" />
      </div>
      <div className="gbg-corner gbg-corner--tr">
        <div className="gbg-corner-dot" />
        <div className="gbg-corner-line gbg-corner-line--h" />
        <div className="gbg-corner-line gbg-corner-line--v" />
      </div>
      <div className="gbg-corner gbg-corner--bl">
        <div className="gbg-corner-dot" />
        <div className="gbg-corner-line gbg-corner-line--h" />
        <div className="gbg-corner-line gbg-corner-line--v" />
      </div>
      <div className="gbg-corner gbg-corner--br">
        <div className="gbg-corner-dot" />
        <div className="gbg-corner-line gbg-corner-line--h" />
        <div className="gbg-corner-line gbg-corner-line--v" />
      </div>
    </div>
  );
}
