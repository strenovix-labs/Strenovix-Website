import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { subscribeScroll, getSectionBounds } from './ScrollRig';
import { SECTION_BREAKPOINTS, RECEDED } from './sectionBreakpoints';

const FRAME_MS = 1000 / 30;
const DEFAULT_TARGET = SECTION_BREAKPOINTS[0];

function resolveTarget(progress) {
  const bounds = getSectionBounds();
  if (!bounds.length) return DEFAULT_TARGET;

  const active = bounds.find((b) => progress >= b.start && progress <= b.end);
  if (active) return SECTION_BREAKPOINTS.find((bp) => bp.id === active.id) || DEFAULT_TARGET;

  // Past the last tracked section (the footer, which has no breakpoint of
  // its own) — recede rather than staying frozen at Contact's bold target.
  if (progress > bounds[bounds.length - 1].end) return RECEDED;
  return DEFAULT_TARGET;
}

// One shared "liquid glass" shape, scroll-choreographed per sectionBreakpoints.js.
// MeshTransmissionMaterial (real refraction, extra render-to-texture pass)
// only on desktop ('full'); mobile/low-power gets the cheap MeshDistortMaterial.
export default function GlassObjects({ capability = 'full' }) {
  const meshRef = useRef();
  const scrollRef = useRef(0);
  const lastTime = useRef(0);
  const smoothed = useRef({
    position: new THREE.Vector3(...DEFAULT_TARGET.position),
    rotX: DEFAULT_TARGET.rotation[0],
    rotY: DEFAULT_TARGET.rotation[1],
    scale: DEFAULT_TARGET.scale,
  });
  const color = useRef(new THREE.Color(DEFAULT_TARGET.color));

  useEffect(() => subscribeScroll((p) => { scrollRef.current = p; }), []);

  useFrame((state) => {
    const now = state.clock.elapsedTime * 1000;
    if (now - lastTime.current < FRAME_MS) return;
    lastTime.current = now;

    const target = resolveTarget(scrollRef.current);
    const k = 0.06;
    const s = smoothed.current;

    s.position.x += (target.position[0] - s.position.x) * k;
    s.position.y += (target.position[1] - s.position.y) * k;
    s.position.z += (target.position[2] - s.position.z) * k;
    s.rotX += (target.rotation[0] - s.rotX) * k;
    s.rotY += (target.rotation[1] - s.rotY) * k;
    s.scale += (target.scale - s.scale) * k;
    color.current.lerp(new THREE.Color(target.color), k);

    if (meshRef.current) {
      meshRef.current.position.copy(s.position);
      // gentle continuous spin layered on top of the scroll-driven rotation
      meshRef.current.rotation.set(s.rotX, s.rotY + state.clock.elapsedTime * 0.08, 0);
      meshRef.current.scale.setScalar(s.scale);
      meshRef.current.material.color.copy(color.current);
      if (meshRef.current.material.emissive) meshRef.current.material.emissive.copy(color.current);
    }
  });

  return (
    <mesh ref={meshRef} position={DEFAULT_TARGET.position}>
      <icosahedronGeometry args={[1, capability === 'low' ? 2 : 4]} />
      {capability === 'full' ? (
        <MeshTransmissionMaterial
          color={DEFAULT_TARGET.color}
          thickness={0.5}
          roughness={0.12}
          transmission={1}
          ior={1.3}
          chromaticAberration={0.04}
          anisotropy={0.2}
          distortion={0.4}
          distortionScale={0.3}
          temporalDistortion={0.1}
          samples={2}
          resolution={128}
        />
      ) : (
        <MeshDistortMaterial
          color={DEFAULT_TARGET.color}
          emissive={DEFAULT_TARGET.color}
          emissiveIntensity={0.4}
          distort={0.35}
          speed={1.2}
          roughness={0.2}
          metalness={0.1}
          transparent
          opacity={0.85}
        />
      )}
    </mesh>
  );
}
