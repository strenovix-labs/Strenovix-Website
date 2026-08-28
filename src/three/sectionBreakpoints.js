// Declarative choreography table - single source of truth for where the
// shared glass object sits per section. GlassObjects.jsx lerps toward
// whichever entry matches the section the current scroll progress falls in.
// Object recedes (scaled down, pushed back) through the dense content
// sections, and comes forward again as a focal point in Hero and Contact.

export const RECEDED = { position: [0, -7, -3], rotation: [0.2, 0, 0], scale: 0.35, color: '#000000' };

export const SECTION_BREAKPOINTS = [
  { id: 'home', position: [1.3, 0.3, 0], rotation: [0.4, 0.6, 0], scale: 1.15, color: '#000000' },
  { id: 'our-story', ...RECEDED },
  { id: 'services', ...RECEDED },
  { id: 'work', ...RECEDED },
  { id: 'team', ...RECEDED },
  // CameraRig zooms out across the whole page (camZ 5->9), so by Contact's
  // scroll depth the camera is ~1.6x farther away than at Hero - scale up
  // to compensate and keep the object visually prominent, not a speck.
  { id: 'contact', position: [-1.4, -0.1, 1.2], rotation: [0.8, -0.5, 0.2], scale: 1.9, color: '#000000' },
];
