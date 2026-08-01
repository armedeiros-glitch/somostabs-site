import { lazy, Suspense, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useLightweightMode from '../hooks/useLightweightMode';
import HeroFallback from './HeroFallback';

const SmartCaseCanvas = lazy(() => import('../scene/SmartCaseCanvas'));

gsap.registerPlugin(ScrollTrigger);

export default function CinematicHero() {
  const scrollRoot = useRef(null);
  const content = useRef(null);
  const fallbackLid = useRef(null);
  const lightweight = useLightweightMode();

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: scrollRoot.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8
        }
      });

      timeline
        .to(content.current, { yPercent: -14, opacity: 0.22, ease: 'none' }, 0.16)
        .to('.scroll-progress__fill', { scaleY: 1, ease: 'none' }, 0)
        .to('.hero-status__value', { color: '#dfff38', ease: 'none' }, 0.58);

      if (fallbackLid.current) {
        timeline.to(
          fallbackLid.current,
          { rotateX: -112, translateY: -12, ease: 'power1.inOut' },
          0.12
        );
      }
    }, scrollRoot);

    return () => context.revert();
  }, [lightweight]);

  return (
    <section className="hero-scroll" ref={scrollRoot} aria-label="Apresentação TABS Smart Case">
      <div className="cinematic-hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow hero-glow--one" aria-hidden="true" />
        <div className="hero-glow hero-glow--two" aria-hidden="true" />

        <header className="hero-nav">
          <a className="brand" href="#top" aria-label="Somos TABS">
            SOMOS <span>TABS.</span>
          </a>
          <div className="hero-status">
            <span className="status-dot" />
            <span>Smart Case</span>
            <strong className="hero-status__value">Prototype 01</strong>
          </div>
        </header>

        <div className="hero-content" ref={content} id="top">
          <p className="hero-kicker"><span>01</span> Performance, no seu bolso</p>
          <h1>
            <span>TABS.</span>
            <em>Tá na hora.</em>
          </h1>
          <p className="hero-copy">
            Uma Smart Gum criada para marcar a entrada no seu modo performance.
          </p>
        </div>

        <div className="hero-stage">
          {lightweight ? (
            <HeroFallback lidRef={fallbackLid} />
          ) : (
            <Suspense fallback={<HeroFallback lidRef={fallbackLid} loading />}>
              <SmartCaseCanvas scrollRoot={scrollRoot} />
            </Suspense>
          )}
        </div>

        <div className="hero-footer">
          <div className="scroll-cue">
            <span className="scroll-cue__line" />
            Role para abrir
          </div>
          <div className="hero-specs">
            <span>Matte black</span>
            <span>Neon core</span>
            <span>04 gums</span>
          </div>
        </div>

        <div className="scroll-progress" aria-hidden="true">
          <span className="scroll-progress__fill" />
        </div>
      </div>
    </section>
  );
}
