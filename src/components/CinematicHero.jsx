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
  const ingredientLayer = useRef(null);
  const closingLayer = useRef(null);
  const fallbackLid = useRef(null);
  const lightweight = useLightweightMode();

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: scrollRoot.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.85
        }
      });

      timeline
        .to(content.current, { yPercent: -18, opacity: 0, ease: 'none' }, 0.14)
        .to('.scroll-progress__fill', { scaleY: 1, ease: 'none' }, 0)
        .to('.hero-status__value', { color: '#dfff38', ease: 'none' }, 0.24)
        .fromTo(
          ingredientLayer.current,
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.18, ease: 'power1.out' },
          0.34
        )
        .to(ingredientLayer.current, { opacity: 0, y: -18, duration: 0.14, ease: 'none' }, 0.68)
        .fromTo(
          closingLayer.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.18, ease: 'power1.out' },
          0.74
        )
        .to('.hero-footer', { opacity: 0.25, ease: 'none' }, 0.72);

      if (fallbackLid.current) {
        timeline
          .to(
            fallbackLid.current,
            { rotateX: -116, translateY: -10, ease: 'power1.inOut' },
            0.12
          )
          .to(
            '.fallback-gum',
            {
              y: (index) => -34 - index * 8,
              x: (index) => (index % 2 === 0 ? -18 : 18),
              rotate: (index) => (index % 2 === 0 ? -8 : 8),
              stagger: 0.03,
              ease: 'power1.out'
            },
            0.36
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
          <nav className="hero-nav__links" aria-label="Navegação principal">
            <a href="#momento">O momento</a>
            <a href="#produto">O produto</a>
            <a className="nav-cta" href="#lista">Quero testar</a>
          </nav>
          <div className="hero-status">
            <span className="status-dot" />
            <span>Smart Case</span>
            <strong className="hero-status__value">Sequence 01</strong>
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
          <a className="primary-button hero-button" href="#lista">
            <span>Entrar na primeira lista</span><i>↗</i>
          </a>
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

        <div className="ingredient-layer" ref={ingredientLayer} aria-hidden="true">
          <div className="ingredient-callout ingredient-callout--caffeine">
            <span>01</span><strong>CAFEÍNA</strong><i>ENERGIA</i>
          </div>
          <div className="ingredient-callout ingredient-callout--theanine">
            <span>02</span><strong>L-TEANINA</strong><i>FOCO</i>
          </div>
          <div className="ingredient-center">
            <span>COMBINAÇÃO 01</span>
            <strong>ENERGIA<br /><em>COM FOCO.</em></strong>
          </div>
        </div>

        <div className="hero-closing-layer" ref={closingLayer}>
          <span>PRONTO QUANDO VOCÊ ESTIVER.</span>
          <strong>Abra. Mastigue.<br /><em>Entre no momento.</em></strong>
          <a href="#momento">Descobrir o ritual <i>↓</i></a>
        </div>

        <div className="hero-footer">
          <div className="scroll-cue">
            <span className="scroll-cue__line" />
            Role para entrar
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
