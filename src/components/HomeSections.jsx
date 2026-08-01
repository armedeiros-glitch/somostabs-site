import { useMemo, useState } from 'react';

const FORM_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbxY7n1QqI2tRubu28Z0rP1N9lvfyB0fvK9EkJbP8JlL_UNYO5sPHRbKwUErulPayVh5Ww/exec';

const moments = [
  ['01', 'Antes da prova', 'ESTUDAR'],
  ['02', 'Antes do pitch', 'APRESENTAR'],
  ['03', 'Antes da partida', 'COMPETIR'],
  ['04', 'Antes de criar', 'CRIAR']
];

function SectionLabel({ children, index }) {
  return (
    <div className="section-label">
      <span>{index}</span>
      <strong>{children}</strong>
    </div>
  );
}

function HomeInterestForm() {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const source = useMemo(() => {
    if (typeof window === 'undefined') return 'direto';
    return (
      new URLSearchParams(window.location.search)
        .get('origem')
        ?.trim()
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, '')
        .slice(0, 60) || 'direto'
    );
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setStatus('sending');
    setMessage('');

    try {
      const data = new FormData(form);
      data.set('source', source);
      await fetch(FORM_ENDPOINT, { method: 'POST', mode: 'no-cors', body: data });
      form.reset();
      setStatus('success');
      setMessage('Cadastro recebido. A gente avisa quando os primeiros testes começarem.');
    } catch {
      setStatus('error');
      setMessage('Não conseguimos enviar agora. Tente novamente em alguns instantes.');
    }
  }

  return (
    <form className="interest-form" id="interest-form" onSubmit={handleSubmit}>
      <div className="form-head">
        <span>FIRST ACCESS</span>
        <strong>18+</strong>
      </div>
      <h3>Quero testar primeiro.</h3>
      <p>Entre na lista para receber o convite dos primeiros testes.</p>

      <div className="form-grid">
        <label>
          <span>Nome</span>
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label>
          <span>WhatsApp</span>
          <input name="whatsapp" type="tel" autoComplete="tel" required />
        </label>
        <label className="form-grid__wide">
          <span>Cidade</span>
          <input name="city" type="text" autoComplete="address-level2" required />
        </label>
      </div>

      <input type="hidden" name="source" value={source} readOnly />
      <input type="hidden" name="profile" value="Homepage comercial" readOnly />
      <input type="hidden" name="moment" value="Quero participar dos primeiros testes" readOnly />

      <label className="check-row">
        <input name="adult" type="checkbox" value="Sim" required />
        <span>Confirmo que tenho 18 anos ou mais.</span>
      </label>
      <label className="check-row">
        <input name="consent" type="checkbox" value="Sim" required />
        <span>Autorizo contato pelo WhatsApp sobre testes e lançamento.</span>
      </label>

      <button className="primary-button primary-button--full" type="submit" disabled={status === 'sending'}>
        <span>{status === 'sending' ? 'Enviando...' : 'Entrar na primeira lista'}</span>
        <i aria-hidden="true">↗</i>
      </button>

      {message && (
        <div className={`form-message form-message--${status}`} role="status" aria-live="polite">
          {message}
        </div>
      )}
    </form>
  );
}

export default function HomeSections() {
  return (
    <>
      <section className="moments-section" id="momento">
        <div className="site-shell">
          <div className="section-heading">
            <SectionLabel index="02">O Momento TABS</SectionLabel>
            <h2>Quando o momento chega,<br /><em>você precisa entrar nele.</em></h2>
            <p>Uma Smart Gum para marcar a entrada no seu modo performance.</p>
          </div>

          <div className="moments-grid">
            {moments.map(([number, title, signal]) => (
              <article className="moment-card" key={number}>
                <div className="moment-card__top">
                  <span>{number}</span>
                  <i>{signal}</i>
                </div>
                <div className="moment-card__radar" aria-hidden="true"><span /></div>
                <h3>{title}</h3>
                <strong>Tá na hora.</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="formula-section" id="produto">
        <div className="site-shell formula-layout">
          <div className="formula-product" aria-hidden="true">
            <div className="gum-orbit gum-orbit--outer"><span /></div>
            <div className="gum-orbit gum-orbit--inner"><span /></div>
            <div className="hero-gum">
              <span>TABS</span>
              <i>SMART GUM</i>
            </div>
          </div>

          <div className="formula-copy">
            <SectionLabel index="03">O produto</SectionLabel>
            <h2>Energia com foco.<br /><em>Num formato pronto.</em></h2>
            <p>
              Cafeína e L-teanina em uma goma compacta, discreta e portátil, criada para adultos em momentos de alta exigência.
            </p>

            <div className="ingredient-stack">
              <article>
                <span>01</span>
                <div><strong>CAFEÍNA + L-TEANINA</strong><p>Uma combinação pensada para comunicar energia com foco.</p></div>
                <i>ACTIVE</i>
              </article>
              <article>
                <span>02</span>
                <div><strong>SEMPRE NO BOLSO</strong><p>Sem preparar, misturar ou esperar. O ritual começa quando o momento aparece.</p></div>
                <i>READY</i>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="ritual-section">
        <div className="site-shell ritual-layout">
          <div className="ritual-sticky">
            <SectionLabel index="04">O ritual</SectionLabel>
            <h2>Abra. Mastigue.<br /><em>Entre no momento.</em></h2>
            <p>Uma pequena ação para marcar o começo da performance.</p>
          </div>

          <div className="ritual-steps">
            <article>
              <span>01</span>
              <div className="ritual-icon ritual-icon--open" aria-hidden="true"><i /><i /></div>
              <h3>Abra.</h3>
              <p>O momento apareceu.</p>
            </article>
            <article>
              <span>02</span>
              <div className="ritual-icon ritual-icon--gum" aria-hidden="true"><i /></div>
              <h3>Mastigue.</h3>
              <p>Ative o ritual.</p>
            </article>
            <article>
              <span>03</span>
              <div className="ritual-icon ritual-icon--signal" aria-hidden="true"><i /><i /><i /></div>
              <h3>Entre.</h3>
              <p>Vai de TABS.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="access-section" id="lista">
        <div className="site-shell access-layout">
          <div className="access-copy">
            <SectionLabel index="05">Primeiros testes</SectionLabel>
            <h2>Seja uma das primeiras pessoas a experimentar TABS.</h2>
            <p>Projeto selecionado para o Programa NaSCer 2026. Produto em desenvolvimento para maiores de 18 anos.</p>
            <div className="access-list">
              <span>Receber o convite dos testes</span>
              <span>Participar antes do lançamento</span>
              <span>Ajudar a construir a experiência</span>
            </div>
          </div>
          <HomeInterestForm />
        </div>
      </section>

      <section className="closing-section">
        <div className="closing-grid" aria-hidden="true" />
        <div className="site-shell closing-content">
          <span>O MOMENTO APARECEU.</span>
          <h2>TABS.<em>Tá na hora.</em></h2>
          <a className="primary-button" href="#lista"><span>Vai de TABS</span><i>↗</i></a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-shell">
          <strong>SOMOS <span>TABS.</span></strong>
          <p>Produto, formulação e dosagens em desenvolvimento. As informações desta página não constituem orientação de saúde.</p>
          <span>© 2026</span>
        </div>
      </footer>
    </>
  );
}
