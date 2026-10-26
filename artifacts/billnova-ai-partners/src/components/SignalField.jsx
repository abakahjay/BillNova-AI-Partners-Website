import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const GAP = 22;
const MOTION_OK = '(prefers-reduced-motion: no-preference)';

// A quiet grid of dots behind the adoption stages. A band of blue light follows the
// stage marker (.adoption-marker) and a slow wave keeps the field alive. Decorative only.
export function SignalField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const host = canvas.parentElement;
    const marker = host.querySelector('.adoption-marker');
    let width = 0;
    let height = 0;
    let bandY = null;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = t => {
      ctx.clearRect(0, 0, width, height);
      if (marker && getComputedStyle(marker).opacity > 0.05) {
        const target = marker.getBoundingClientRect().top + 6 - canvas.getBoundingClientRect().top;
        bandY = bandY === null ? target : bandY + (target - bandY) * 0.08;
      } else if (bandY !== null) {
        bandY = null;
      }
      for (let y = GAP / 2; y < height; y += GAP) {
        for (let x = GAP / 2; x < width; x += GAP) {
          const wave = (Math.sin(x * 0.018 + t * 0.6) + Math.sin(y * 0.024 - t * 0.45)) * 0.25 + 0.5;
          const band = bandY === null ? 0 : Math.exp(-(((y - bandY) / 34) ** 2));
          const shimmer = band * (0.55 + 0.45 * Math.sin(x * 0.045 - t * 2.2));
          const r = 1 + wave * 0.5 + shimmer * 1.3;
          ctx.fillStyle = shimmer > 0.18
            ? `rgba(22,136,186,${0.25 + shimmer * 0.55})`
            : `rgba(21,93,181,${0.1 + wave * 0.12})`;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    resize();
    const observer = new ResizeObserver(() => { resize(); draw(gsap.ticker.time); });
    observer.observe(canvas);

    if (!window.matchMedia(MOTION_OK).matches) {
      draw(0);
      return () => observer.disconnect();
    }

    const tick = time => draw(time);
    let running = false;
    const visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) { gsap.ticker.add(tick); running = true; }
      else if (!entry.isIntersecting && running) { gsap.ticker.remove(tick); running = false; }
    });
    visibility.observe(canvas);

    return () => {
      observer.disconnect();
      visibility.disconnect();
      gsap.ticker.remove(tick);
    };
  }, []);

  return <canvas ref={canvasRef} className="signal-field" aria-hidden="true" />;
}
