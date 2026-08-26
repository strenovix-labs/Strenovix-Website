import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { subscribeScroll } from './ScrollRig';

const FRAME_MS = 1000 / 30;

const STAR_COUNT_FULL = 600;
const STAR_COUNT_LOW = 250;

function buildStarPositions(count) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
  }
  return positions;
}

// Port of VortexBG.jsx's particle/star fields into r3f. Rotation/opacity
// are scroll-driven via the same lerp constants (k=0.07, 30fps throttle)
// VortexBG.jsx already proved out, now reading from the shared ScrollRig
// instead of one section's local scroll value.
export default function Starfield({ capability = 'full' }) {
  const starCount = capability === 'low' ? STAR_COUNT_LOW : STAR_COUNT_FULL;

  const starPositions = useMemo(() => buildStarPositions(starCount), [starCount]);

  const starsRef = useRef();
  const scrollRef = useRef(0);
  const rot = useRef({ y: 0, x: 0 });
  const lastTime = useRef(0);

  useEffect(() => subscribeScroll((p) => { scrollRef.current = p; }), []);

  useFrame((state) => {
    const now = state.clock.elapsedTime * 1000;
    if (now - lastTime.current < FRAME_MS) return;
    lastTime.current = now;

    const sp = scrollRef.current;
    const tRotY = sp * Math.PI * 1.4;
    const tRotX = sp * 0.5;

    const k = 0.07;
    rot.current.y += (tRotY - rot.current.y) * k;
    rot.current.x += (tRotX - rot.current.x) * k;

    if (starsRef.current) {
      starsRef.current.rotation.y = rot.current.y * 0.12;
      starsRef.current.rotation.x = rot.current.x * 0.12;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={starPositions.length / 3}
          array={starPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.01}
        color="#000000"
        transparent
        opacity={0.15}
        blending={THREE.NormalBlending}
        depthWrite={false}
      />
    </points>
  );
}
