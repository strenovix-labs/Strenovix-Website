import { Suspense, useEffect, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import CameraRig from './CameraRig';
import { startScrollRig, refreshSectionBounds, subscribeScroll } from './ScrollRig';
import './Scene3D.css';

const FOOTER_MOUNT_THRESHOLD = 0.85;

function getCapability() {
  if (typeof window === 'undefined') return 'full';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return 'reduced';
  if (window.innerWidth < 768) return 'low';
  return 'full';
}

// Single persistent WebGL canvas for the whole page — mounted once at the
// App root so there is only ever one GL context, not one per section.
export default function Scene3D() {
  const capability = useMemo(getCapability, []);
  const [frameloop, setFrameloop] = useState('always');
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    const handleVisibility = () => {
      setFrameloop(document.visibilityState === 'visible' ? 'always' : 'never');
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  useEffect(() => startScrollRig(), []);

  useEffect(() => subscribeScroll((p) => {
    if (p >= FOOTER_MOUNT_THRESHOLD) setNearFooter(true);
  }), []);

  useEffect(() => {
    refreshSectionBounds();
    const handleResize = () => refreshSectionBounds();
    window.addEventListener('resize', handleResize);
    // layout settles a tick after mount (fonts/images), refresh once more
    const t = setTimeout(refreshSectionBounds, 500);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(t);
    };
  }, []);

  // Respect prefers-reduced-motion entirely — no animated WebGL layer.
  if (capability === 'reduced') return null;

  return (
    <div className="scene3d-root" aria-hidden="true">
      <Canvas
        frameloop={frameloop}
        dpr={capability === 'low' ? 1 : [1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 100 }}
      >
        <Suspense fallback={null}>
          {/* MeshDistortMaterial is PBR-lit — without these it renders ~black */}
          <ambientLight intensity={0.8} />
          <pointLight position={[4, 3, 6]} intensity={60} color="#fff7e8" />
          <pointLight position={[-4, -2, 4]} intensity={25} color="#DEDBC8" />
          <CameraRig />
        </Suspense>
      </Canvas>
    </div>
  );
}
