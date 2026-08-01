import { useEffect, useState } from 'react';

function shouldUseLightweightMode() {
  if (typeof window === 'undefined') return true;

  const smallScreen = window.matchMedia('(max-width: 760px)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lowMemory = navigator.deviceMemory && navigator.deviceMemory <= 4;
  const fewCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
  let hasWebGL = false;

  try {
    const canvas = document.createElement('canvas');
    hasWebGL = Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    hasWebGL = false;
  }

  return Boolean(!hasWebGL || smallScreen || reducedMotion || lowMemory || fewCores);
}

export default function useLightweightMode() {
  const [lightweight, setLightweight] = useState(shouldUseLightweightMode);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 760px)');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setLightweight(shouldUseLightweightMode());

    media.addEventListener('change', update);
    motion.addEventListener('change', update);
    window.addEventListener('resize', update, { passive: true });

    return () => {
      media.removeEventListener('change', update);
      motion.removeEventListener('change', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return lightweight;
}
