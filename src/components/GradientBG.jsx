import { useEffect } from 'react';
import gsap from 'gsap';
import './GradientBG.css';

export default function GradientBG() {
  useEffect(() => {
    const blobs = document.querySelectorAll('.gbg-blob');

    blobs.forEach((blob, i) => {
      const xRange = [60, -80, 40];
      const yRange = [-50, 60, -70];
      const dur    = [10, 13, 9];

      gsap.to(blob, {
        x: xRange[i],
        y: yRange[i],
        duration: dur[i],
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 1.8,
      });

      gsap.to(blob, {
        scale: i === 1 ? 1.2 : 0.85,
        duration: dur[i] * 0.7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.9,
      });
    });
  }, []);

  return (
    <div className="gbg" aria-hidden="true">
      <div className="gbg-blob gbg-blob--indigo" />
      <div className="gbg-blob gbg-blob--cyan" />
      <div className="gbg-blob gbg-blob--pink" />
    </div>
  );
}
