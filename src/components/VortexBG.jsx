import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './VortexBG.css';

// Receives scrollSetterRef - App.jsx writes the setter into it so scroll
// updates bypass React's state system entirely (zero re-renders).
export default function VortexBG({ scrollSetterRef }) {
  const mountRef = useRef(null);
  const scrollRef = useRef(0);   // internal mutable scroll value

  useEffect(() => {
    // Expose a setter so App.jsx can push scroll values directly
    if (scrollSetterRef) scrollSetterRef.current = (v) => { scrollRef.current = v; };
    return () => { if (scrollSetterRef) scrollSetterRef.current = null; };
  }, [scrollSetterRef]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: 'low-power',
    });
    renderer.setPixelRatio(1);   // force 1× - biggest perf gain on retina displays
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    // ── Vortex particles ──────────────────────────────────────────────────────
    const COUNT = 1800;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);

    const colorA = new THREE.Color('#ffffff');
    const colorB = new THREE.Color('#ffffff');
    const colorC = new THREE.Color('#ffffff');

    for (let i = 0; i < COUNT; i++) {
      const t = i / COUNT;
      const angle = t * Math.PI * 2 * 10;
      const radius = 0.3 + t * 4;
      const height = (t - 0.5) * 12;
      positions[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 1] = height + (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 0.5;

      const mix = t < 0.5
        ? colorA.clone().lerp(colorB, t * 2)
        : colorB.clone().lerp(colorC, (t - 0.5) * 2);
      colors[i * 3] = mix.r;
      colors[i * 3 + 1] = mix.g;
      colors[i * 3 + 2] = mix.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.04, vertexColors: true, transparent: true,
      opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // ── Starfield (very sparse) ───────────────────────────────────────────────
    const STARS = 600;
    const starPos = new Float32Array(STARS * 3);
    for (let i = 0; i < STARS; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 50;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff, size: 0.01, transparent: true,
      opacity: 0.2, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // ── Resize ────────────────────────────────────────────────────────────────
    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // ── Render loop - 30 fps cap, scroll-only rotation ───────────────────────
    const FRAME_MS = 1000 / 30;  // 30 fps
    let lastTime = 0;
    let raf;

    // Smoothed state (lerped so rotation never jumps)
    let rotY = 0, rotX = 0, camZ = 5, camY = 0;

    const animate = (now) => {
      raf = requestAnimationFrame(animate);

      // Hard throttle - skip frame if too early
      if (now - lastTime < FRAME_MS) return;
      lastTime = now;

      const sp = scrollRef.current;

      // Scroll-driven targets - ZERO auto-rotation
      const tRotY = sp * Math.PI * 1.4;
      const tRotX = sp * 0.5;
      const tCamZ = 5 + sp * 4;
      const tCamY = sp * -2.5;

      // Smooth lerp (ease = 0.07 feels natural without being laggy)
      const k = 0.07;
      rotY += (tRotY - rotY) * k;
      rotX += (tRotX - rotX) * k;
      camZ += (tCamZ - camZ) * k;
      camY += (tCamY - camY) * k;

      points.rotation.y = rotY;
      points.rotation.x = rotX;
      stars.rotation.y = rotY * 0.12;
      stars.rotation.x = rotX * 0.12;

      camera.position.z = camZ;
      camera.position.y = camY;
      camera.lookAt(0, 0, 0);

      material.opacity = Math.max(0.05, 0.7 - sp * 0.65);

      renderer.render(scene, camera);
    };
    requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', handleResize);
      geometry.dispose(); material.dispose();
      starGeo.dispose(); starMat.dispose();
      renderer.dispose(); renderer.forceContextLoss();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="vortex-bg" />;
}