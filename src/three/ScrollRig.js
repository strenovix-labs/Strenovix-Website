// Scroll-math-only module (no JSX, no three.js). Owns one normalized
// scroll-progress value (0-1 across the full document) and a pub-sub
// so multiple r3f components can read it without React re-renders —
// same zero-re-render intent as VortexBG.jsx's scrollSetterRef.
//
// Runs its own requestAnimationFrame loop, deliberately separate from
// both Lenis's RAF and r3f's internal useFrame RAF (see plan: don't
// couple them, that risks frame-order bugs).

let progress = 0;
const subscribers = new Set();
let rafId = null;
let refCount = 0;

function computeProgress() {
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
}

function tick() {
  progress = computeProgress();
  subscribers.forEach((fn) => fn(progress));
  rafId = requestAnimationFrame(tick);
}

// Idempotent + ref-counted: safe to call from multiple mounted components.
// Returns a stop function the caller should invoke on unmount.
export function startScrollRig() {
  refCount += 1;
  if (refCount === 1) {
    rafId = requestAnimationFrame(tick);
  }
  return () => {
    refCount -= 1;
    if (refCount <= 0 && rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };
}

export function subscribeScroll(fn) {
  subscribers.add(fn);
  fn(progress);
  return () => subscribers.delete(fn);
}

export function getScrollProgress() {
  return progress;
}

// ── Section bounds ──────────────────────────────────────────────────────
// Normalized [start, end] scroll-progress range for each named section,
// computed from real layout. sectionBreakpoints.js's choreography table
// is keyed by these same section ids.
const SECTION_IDS = ['home', 'our-story', 'services', 'work', 'team', 'contact'];
let sectionBounds = [];

function computeSectionBounds() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (max <= 0) return [];
  return SECTION_IDS.map((id) => {
    const el = document.getElementById(id);
    if (!el) return null;
    return {
      id,
      start: el.offsetTop / max,
      end: (el.offsetTop + el.offsetHeight) / max,
    };
  }).filter(Boolean);
}

export function refreshSectionBounds() {
  sectionBounds = computeSectionBounds();
  return sectionBounds;
}

export function getSectionBounds() {
  return sectionBounds;
}

if (import.meta.env?.DEV && typeof window !== 'undefined') {
  window.__scrollRig = { getScrollProgress, getSectionBounds, refreshSectionBounds };
}
