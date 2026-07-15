import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { subscribeScroll } from './ScrollRig';

const FRAME_MS = 1000 / 30;

// Generalized version of VortexBG.jsx's camera lerp (camZ/camY), driven
// by the shared scroll-progress value instead of a single section's scroll.
export default function CameraRig() {
  const { camera } = useThree();
  const scrollRef = useRef(0);
  const smoothed = useRef({ camZ: 5, camY: 0 });
  const lastTime = useRef(0);

  useEffect(() => subscribeScroll((p) => { scrollRef.current = p; }), []);

  useFrame((state) => {
    const now = state.clock.elapsedTime * 1000;
    if (now - lastTime.current < FRAME_MS) return;
    lastTime.current = now;

    const sp = scrollRef.current;
    const tCamZ = 5 + sp * 4;
    const tCamY = sp * -2.5;

    const k = 0.07;
    const s = smoothed.current;
    s.camZ += (tCamZ - s.camZ) * k;
    s.camY += (tCamY - s.camY) * k;

    camera.position.z = s.camZ;
    camera.position.y = s.camY;
    camera.lookAt(0, 0, 0);
  });

  return null;
}
