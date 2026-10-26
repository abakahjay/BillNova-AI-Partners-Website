import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MOTION_OK = '(prefers-reduced-motion: no-preference)';
let lenis = null;

// Smooth scrolling for the whole site. Skipped entirely when the visitor asks for reduced motion.
export function SmoothScroll({ children }) {
  const [location] = useLocation();

  useEffect(() => {
    if (!window.matchMedia(MOTION_OK).matches) return;
    lenis = new Lenis({ lerp: 0.12, anchors: true });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = time => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); lenis.destroy(); lenis = null; };
  }, []);

  // A new page starts at the top, then scroll scenes measure the new layout.
  useEffect(() => {
    const toTop = () => {
      lenis?.resize();
      lenis?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
    };
    toTop();
    // The browser clamps the old scroll position once the shorter page lays out; reset again after that.
    const frame = requestAnimationFrame(() => { toTop(); ScrollTrigger.refresh(); });
    return () => cancelAnimationFrame(frame);
  }, [location]);

  usePageReveals(location);
  return children;
}

// One motion language for every page: headings rise out of a mask like the home hero, and
// photographs open with a clip wipe while the image settles from a slight zoom. Each plays once.
function usePageReveals(location) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.utils.toArray('main .section-title, main .display:not(h1)').forEach(heading => {
          if (heading.closest('.hero')) return;
          gsap.from(heading, {
            yPercent: 40, autoAlpha: 0, clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'expo.out',
            scrollTrigger: { trigger: heading, start: 'top 88%', once: true },
          });
        });
        gsap.utils.toArray('.people-photo, .context-image, .detail-visual').forEach(frame => {
          const img = frame.querySelector('img');
          const tl = gsap.timeline({ scrollTrigger: { trigger: frame, start: 'top 85%', once: true } });
          tl.from(frame, { clipPath: 'inset(18% 0 0 0)', duration: 1.1, ease: 'power3.out', clearProps: 'clipPath' });
          // Cleared afterwards so the CSS hover zoom can take over.
          if (img && !frame.closest('.context-gallery')) tl.from(img, { scale: 1.12, duration: 1.4, ease: 'power3.out', clearProps: 'transform' }, 0);
        });
      });
    }, document.body);
    return () => ctx.revert();
  }, [location]);
}

// Home hero: the statement rises line by line from behind a mask, a rule draws under it,
// then the supporting copy settles. Everything is visible by default; this only runs the entrance.
export function useHeroMotion() {
  const scope = useRef(null);
  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .from('.hero-line-inner', { yPercent: 108, duration: 1.1, stagger: 0.14 })
        .from('.hero-rule', { scaleX: 0, duration: 0.9, ease: 'power3.inOut' }, '-=0.6')
        .from(['.hero-support', '.hero-note'], { y: 16, autoAlpha: 0, duration: 0.7, ease: 'power2.out', stagger: 0.08 }, '-=0.5')
        .from('.hero-visual', { scale: 0.94, autoAlpha: 0, duration: 1.4, ease: 'power3.out' }, 0.2);
    });
  }, { scope });
  return scope;
}

// A single, one-time sequence draws attention through the four adoption stages.
// After the entrance, a calm loop walks a marker through the four stages and repeats.
// The stages remain visible without JS and when reduced motion is requested.
export function useAdoptionMotion() {
  const scope = useRef(null);
  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      const root = scope.current;
      const track = root.querySelector('.adoption-track');
      const fill = root.querySelector('.adoption-track-fill');
      const marker = root.querySelector('.adoption-marker');
      const steps = gsap.utils.toArray('.adoption-step', root);

      // Distance from the top of the track to the centre of a step's number.
      const stop = i => {
        const index = steps[i].querySelector('.adoption-index').getBoundingClientRect();
        return index.top + index.height / 2 - track.getBoundingClientRect().top;
      };
      const setStage = active => steps.forEach((step, i) => {
        step.classList.toggle('is-active', i === active);
        step.classList.toggle('is-done', i < active);
      });

      root.classList.add('is-cycling');
      gsap.set(fill, { scaleY: 0 });
      gsap.set(marker, { y: stop(0), autoAlpha: 0 });

      // The marker walks the four stages, rests on each, then the path clears and starts again.
      const cycle = gsap.timeline({ paused: true, repeat: -1, defaults: { duration: 0.9, ease: 'power2.inOut' }, onRepeat: () => cycle.invalidate() });
      cycle.to(marker, { autoAlpha: 1, duration: 0.4 }).call(setStage, [0]).to({}, { duration: 2.2 });
      steps.slice(1).forEach((_, n) => {
        const i = n + 1;
        cycle
          .to(marker, { y: () => stop(i) })
          .to(fill, { scaleY: () => stop(i) / track.offsetHeight }, '<')
          .call(setStage, [i], '-=0.25')
          .to({}, { duration: 2.2 });
      });
      cycle
        .call(setStage, [steps.length])
        .to([marker, fill], { autoAlpha: 0, duration: 0.6, ease: 'power1.out' }, '+=0.4')
        .call(setStage, [-1])
        .set(fill, { scaleY: 0, autoAlpha: 1 })
        .set(marker, { y: () => stop(0) });

      gsap.timeline({ delay: 0.35, defaults: { ease: 'power2.out' }, onComplete: () => cycle.play() })
        .from('.adoption-label', { autoAlpha: 0, y: 8, duration: 0.45 })
        .from(steps, { autoAlpha: 0, x: 14, duration: 0.42, stagger: 0.14 }, '-=0.2');

      // Hold still while someone is reading it, and stop working when it is off screen.
      let hovered = false;
      let visible = true;
      const sync = () => (hovered || !visible ? cycle.pause() : cycle.progress() > 0 && cycle.resume());
      const hold = () => { hovered = true; sync(); };
      const release = () => { hovered = false; sync(); };
      root.addEventListener('pointerenter', hold);
      root.addEventListener('pointerleave', release);
      root.addEventListener('focusin', hold);
      root.addEventListener('focusout', release);
      ScrollTrigger.create({ trigger: root, start: 'top bottom', end: 'bottom top', onToggle: self => { visible = self.isActive; sync(); } });
      const onResize = () => cycle.invalidate();
      window.addEventListener('resize', onResize);

      return () => {
        root.removeEventListener('pointerenter', hold);
        root.removeEventListener('pointerleave', release);
        root.removeEventListener('focusin', hold);
        root.removeEventListener('focusout', release);
        window.removeEventListener('resize', onResize);
        root.classList.remove('is-cycling');
        setStage(-1);
      };
    });
  }, { scope });
  return scope;
}

// Hero headline word that cycles through the sectors BillNova serves. Each word leaves upward
// through the line mask as the next rises in. The first word is the only one shown without JS or
// with reduced motion, and the only one screen readers hear.
export function useHeroRotator({ hold = 2.8, startAfter = 2.6 } = {}) {
  const scope = useRef(null);
  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      const words = gsap.utils.toArray('.hero-rotator-word', scope.current);
      if (words.length < 2) return;
      let index = 0;
      gsap.set(words, { yPercent: i => (i ? 110 : 0), autoAlpha: i => (i ? 0 : 1) });
      words.forEach(word => word.classList.add('is-ready'));
      let call;
      const advance = () => {
        const current = words[index];
        index = (index + 1) % words.length;
        const next = words[index];
        gsap.timeline({ defaults: { duration: 0.75, ease: 'power3.inOut' } })
          .to(current, { yPercent: -110, autoAlpha: 0 })
          .fromTo(next, { yPercent: 110, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1 }, '<0.08');
        call = gsap.delayedCall(hold, advance);
      };
      call = gsap.delayedCall(startAfter, advance);
      return () => call?.kill();
    });
  }, { scope });
  return scope;
}

// The hero's rendered 3D loop: plays only while on screen, and holds on its poster frame
// for visitors who ask for reduced motion.
export function useLoopVideo() {
  const ref = useRef(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let onScreen = true;
    const shouldPlay = () => !reduce.matches && onScreen && document.visibilityState === 'visible';
    const sync = () => {
      if (!shouldPlay()) video.pause();
      else if (video.paused) video.play().catch(() => {});
    };
    // Browsers pause muted autoplay in background tabs and power-saving modes; resume when the visitor is back.
    const resumeIfDropped = () => { if (shouldPlay()) setTimeout(sync, 250); };
    const observer = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; sync(); });
    observer.observe(video);
    reduce.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    window.addEventListener('focus', sync);
    window.addEventListener('pageshow', sync);
    video.addEventListener('pause', resumeIfDropped);
    sync();
    return () => {
      observer.disconnect();
      reduce.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
      window.removeEventListener('focus', sync);
      window.removeEventListener('pageshow', sync);
      video.removeEventListener('pause', resumeIfDropped);
    };
  }, []);
  return ref;
}

// Context photos drift gently inside their frames while the gallery crosses the viewport.
export function useGalleryParallax() {
  const scope = useRef(null);
  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      gsap.utils.toArray('.context-image').forEach((figure, i) => {
        const img = figure.querySelector('img');
        const travel = i % 2 ? 5 : 8;
        gsap.fromTo(img, { yPercent: -travel, scale: 1.16 }, {
          yPercent: travel, scale: 1.16, ease: 'none',
          scrollTrigger: { trigger: figure, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        });
      });
    });
  }, { scope });
  return scope;
}
