import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const TEXT = 'STRENOVIX';
const SAMPLE_W = 360;
const SAMPLE_H = 90;
const STRIDE = 2;
const FRAME_MS = 1000 / 30;
// Roughly where CameraRig's end-of-scroll framing (camZ~9, camY~-2.5,
// lookAt origin) puts the lower-middle of the view.
const WORLD_POSITION = [0, -2.3, -1];

function sampleTextPoints() {
  const canvas = document.createElement('canvas');
  canvas.width = SAMPLE_W;
  canvas.height = SAMPLE_H;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.font = "bold 56px 'Anton', sans-serif";
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(TEXT, SAMPLE_W / 2, SAMPLE_H / 2);

  const { data } = ctx.getImageData(0, 0, SAMPLE_W, SAMPLE_H);
  const points = [];
  for (let y = 0; y < SAMPLE_H; y += STRIDE) {
    for (let x = 0; x < SAMPLE_W; x += STRIDE) {
      const alpha = data[(y * SAMPLE_W + x) * 4 + 3];
      if (alpha > 128) {
        points.push((x / SAMPLE_W - 0.5) * 6, -(y / SAMPLE_H - 0.5) * 1.5, 0);
      }
    }
  }
  return new Float32Array(points.length ? points : [0, 0, 0]);
}

// Small particle cloud, separate from Starfield/GlassObjects so its text-
// formation math only runs once the footer is actually near the viewport.
// Particles dissolve-assemble from scattered into a sampled "STRENOVIX"
// glyph shape, triggered by an IntersectionObserver on the <footer> element
// (FooterSection.jsx's own isInView already handles the DOM-side reveal —
// this is a decorative WebGL-side echo, not wired to it directly).
export default function FooterParticles() {
  const pointsRef = useRef();
  const visible = useRef(false);
  const assembleRef = useRef(0);
  const lastTime = useRef(0);

  const targetPositions = useMemo(sampleTextPoints, []);
  const count = targetPositions.length / 3;

  const scatterPositions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, [count]);

  const currentPositions = useMemo(() => scatterPositions.slice(), [scatterPositions]);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visible.current = true;
          observer.disconnect();
        }
      },
      { rootMargin: '-100px' }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useFrame((state) => {
    const now = state.clock.elapsedTime * 1000;
    if (now - lastTime.current < FRAME_MS) return;
    lastTime.current = now;

    const geo = pointsRef.current?.geometry;
    if (!geo) return;

    const target = visible.current ? 1 : 0;
    assembleRef.current += (target - assembleRef.current) * 0.05;
    const t = assembleRef.current;
    if (t < 0.001) return; // still fully scattered, nothing to update yet

    const posAttr = geo.attributes.position;
    for (let i = 0; i < count * 3; i++) {
      currentPositions[i] = scatterPositions[i] + (targetPositions[i] - scatterPositions[i]) * t;
    }
    posAttr.array.set(currentPositions);
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} position={WORLD_POSITION}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={scatterPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#DEDBC8"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
