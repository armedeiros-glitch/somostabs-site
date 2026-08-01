import { useMemo, useState } from 'react';

const FORM_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbxY7n1QqI2tRubu28Z0rP1N9lvfyB0fvK9EkJbP8JlL_UNYO5sPHRbKwUErulPayVh5Ww/exec';

const moments = [
  {
    number: '01',
    title: 'Antes do pitch',
    copy: 'Quando a ideia já está pronta e o que falta é entrar na sala presente.',
    signal: 'APRESENTAR'
  },
  {
    number: '02',
    title: 'Antes da prova',
    copy: 'Quando você precisa sair do modo dispersão e mergulhar no que importa.',
    signal: 'ESTUDAR'
  },
  {
    number: '03',
    title: 'Antes da partida',
    copy: 'Quando reação, leitura e decisão precisam caber no mesmo segundo.',
    signal: 'COMPETIR'
  },
  {
    number: '04',
    title: 'Antes de criar',
    copy: 'Quando a página está vazia, o prazo está perto e o primeiro movimento decide tudo.',
    signal: 'CRIAR'
  }
];

const profiles = [
  'Gamer ou jogador de e-sports',
  'Streamer ou criador de conteúdo',
  'Profissional ou empreendedor',
  'Universitário',
  'Outro'
];

const momentOptions = [
  'Antes de uma partida ou competição',
  'Durante uma live ou criação de conteúdo',
  'Antes de um pitch, apresentação ou reunião',
  'Antes de uma prova ou período de estudo',
  'Durante um projeto pessoal',
  'Outro momento'
];

function SectionLabel({ children, index }) {
  return (
    <div className="section-label">
      <span>{index}</span>
      <strong>{children}</strong>
    </div>
  );
}

function InterestForm() {
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
      setMessage(
        'Cadastro recebido. Quando os primeiros testes estiverem mais perto, a gente entra em contato.'
      );
    } catch {
      setStatus('error');
      setMessage('Não conseguimos enviar agora. Tente novamente em alguns instantes.');
    }
  }

  return (
    <form className="interest-form" id="interest-form" onSubmit={handleSubmit}>
      <div className="form-head">
        <span>FIRST ACCESS</span>
        <strong>01 / 01</strong>
      </div>
      <h3>Quero testar primeiro.</h3>
      <p>Leva menos de um minuto. O produto é destinado a maiores de 18 anos.</p>

      <div className="form-grid">
        <label>
          <span>Nome</span>
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label>
          <span>WhatsApp</span>
          <input name="whatsapp" type="tel" autoComplete="tel" required />
        </label>
        <label>
          <span>Cidade</span>
          <input name="city" type="text" autoComplete="address-level2" required />
        </label>
        <label>
          <span>Seu perfil</span>
          <select name="profile" defaultValue="" required>
            <option value="" disabled>Selecione</option>
            {profiles.map((profile) => <option key={profile}>{profile}</option>)}
          </select>
        </label>
        <label className="form-grid__wide">
          <span>Qual seria o seu Momento TABS?</span>
          <select name="moment" defaultValue="" required>
            <option value="" disabled>Selecione</option>
            {momentOptions.map((moment) => <option key={moment}>{moment}</option>)}
          </select>
        </label>
        <label>
          <span>O que você usa hoje?</span>
          <select name="current_solution" defaultValue="" required>
            <option value="" disabled>Selecione</option>
            <option>Café</option>
            <option>Energético</option>
            <option>Pré-treino ou suplemento com cafeína</option>
            <option>Não uso nada</option>
            <option>Outra solução</option>
          </select>
        </label>
        <label>
          <span>Compraria para experimentar?</span>
          <select name="trial_intent" defaultValue="" required>
            <option value="" disabled>Selecione</option>
            <option>Sim, compraria no lançamento</option>
            <option>Talvez, dependendo do preço</option>
            <option>Gostaria de testar antes</option>
            <option>Não compraria</option>
          </select>
        </label>
        <label className="form-grid__wide">
          <span>Embalagem estimada com 12 unidades: por qual preço compraria?</span>
          <select name="price" defaultValue="" required>
            <option value="" disabled>Selecione</option>
            <option>R$ 19,90</option>
            <option>R$ 24,90</option>
            <option>R$ 29,90</option>
            <option>R$ 34,90</option>
            <option>Não compraria nessas faixas</option>
          </select>
        </label>
      </div>

      <input type="hidden" name="source" value={source} readOnly />

      <label className="check-row">
        <input name="adult" type="checkbox" value="Sim" required />
        <span>Confirmo que tenho 18 anos ou mais.</span>
      </label>
      <label className="check-row">
        <input name="consent" type="checkbox" value="Sim" required />
        <span>Autorizo contato pelo WhatsApp sobre testes, validação e lançamento.</span>
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

export default function SiteSections() {
  return (
    <>
      <section className="signal-strip" aria-label="Sinais de performance">
        <div className="signal-strip__track">
          <span>FOCO</span><i>●</i><span>CLAREZA</span><i>●</i><span>ENERGIA</span><i>●</i>
          <span>FOCO</span><i>●</i><span>CLAREZA</span><i>●</i><span>ENERGIA</span><i>●</i>
        </div>
      </section>

      <section className="state-section" id="momento">
        <div className="site-shell state-layout">
          <div className="state-copy">
            <SectionLabel index="02">O problema real</SectionLabel>
            <h2>Não é falta de energia.<br /><em>É não conseguir entrar no momento.</em></h2>
            <p>
              Antes da prova, do pitch, da partida ou da criação existe um intervalo curto.
              É nele que a cabeça ainda está em dez lugares e você precisa estar em um só.
            </p>
          </div>

          <div className="state-machine" aria-label="Transição de estado mental">
            <div className="state-machine__top">
              <span>STATE TRANSITION</span>
              <strong>LIVE</strong>
            </div>
            <div className="noise-cloud" aria-hidden="true">
              <span style={{ '--x': '8%', '--y': '18%' }}>prazo</span>
              <span style={{ '--x': '58%', '--y': '10%' }}>notificação</span>
              <span style={{ '--x': '28%', '--y': '48%' }}>ansiedade</span>
              <span style={{ '--x': '68%', '--y': '55%' }}>barulho</span>
              <span style={{ '--x': '12%', '--y': '78%' }}>distração</span>
              <span style={{ '--x': '70%', '--y': '82%' }}>pressão</span>
            </div>
            <div className="focus-core">
              <span>TABS</span>
              <strong>AGORA.</strong>
            </div>
            <div className="state-machine__bottom">
              <span>RUÍDO</span>
              <div><i /><i /><i /><i /><i /></div>
              <strong>CLAREZA</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="moments-section">
        <div className="site-shell">
          <div className="section-heading">
            <SectionLabel index="03">Momentos TABS</SectionLabel>
            <h2>O produto entra<br />antes da performance.</h2>
            <p>Não vendemos um ingrediente solto. Construímos um gatilho para começar.</p>
          </div>

          <div className="moments-grid">
            {moments.map((moment) => (
              <article className="moment-card" key={moment.number}>
                <div className="moment-card__top">
                  <span>{moment.number}</span>
                  <i>{moment.signal}</i>
                </div>
                <div className="moment-card__radar" aria-hidden="true"><span /></div>
                <h3>{moment.title}</h3>
                <p>{moment.copy}</p>
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
            <div className="formula-coordinate formula-coordinate--one">X 02.4</div>
            <div className="formula-coordinate formula-coordinate--two">Y 08.1</div>
          </div>

          <div className="formula-copy">
            <SectionLabel index="04">Primeiro produto</SectionLabel>
            <h2>Energia com foco.<br /><em>Num formato pronto.</em></h2>
            <p>
              O primeiro TABS está sendo desenvolvido como uma Smart Gum para adultos que já
              recorrem ao café ou ao energético em momentos de alta exigência.
            </p>

            <div className="ingredient-stack">
              <article>
                <span>01</span>
                <div><strong>CAFEÍNA</strong><p>Energia em um formato compacto, discreto e portátil.</p></div>
                <i>ACTIVE</i>
              </article>
              <article>
                <span>02</span>
                <div><strong>L-TEANINA</strong><p>Combinação pensada para comunicar energia com foco, sem promessas milagrosas.</p></div>
                <i>ACTIVE</i>
              </article>
            </div>

            <p className="development-note">
              Fórmula, dosagem, sabor, embalagem, preço e experiência de uso seguem em validação.
            </p>
          </div>
        </div>
      </section>

      <section className="ritual-section">
        <div className="site-shell ritual-layout">
          <div className="ritual-sticky">
            <SectionLabel index="05">O ritual</SectionLabel>
            <h2>Uma pequena ação.<br /><em>Uma mudança de estado.</em></h2>
            <p>O ritual termina exatamente onde a ação começa.</p>
          </div>

          <div className="ritual-steps">
            <article>
              <span>01</span>
              <div className="ritual-icon ritual-icon--open" aria-hidden="true"><i /><i /></div>
              <h3>Abra.</h3>
              <p>O momento apareceu. Prova, partida, pitch, reunião ou criação.</p>
            </article>
            <article>
              <span>02</span>
              <div className="ritual-icon ritual-icon--gum" aria-hidden="true"><i /></div>
              <h3>Mastigue.</h3>
              <p>Um gesto simples e portátil que marca sua preparação.</p>
            </article>
            <article>
              <span>03</span>
              <div className="ritual-icon ritual-icon--signal" aria-hidden="true"><i /><i /><i /></div>
              <h3>Entre no momento.</h3>
              <p>A cabeça para de negociar. O próximo movimento fica claro.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="lab-section">
        <div className="site-shell lab-layout">
          <div className="lab-panel">
            <div className="lab-panel__header">
              <span>TABS LAB / JOINVILLE</span>
              <strong>2026</strong>
            </div>
            <div className="lab-panel__screen">
              <div className="lab-rings"><i /><i /><i /></div>
              <strong>PROTOTIPAR.<br />TESTAR.<br /><em>EVOLUIR.</em></strong>
            </div>
            <div className="lab-panel__footer">
              <span>NaSCer 2026</span><span>18+</span><span>Primeiros testes</span>
            </div>
          </div>

          <div className="lab-copy">
            <SectionLabel index="06">Do laboratório para o bolso</SectionLabel>
            <h2>Uma categoria nova construída em contexto real.</h2>
            <p>
              O TABS foi selecionado para o Programa NaSCer 2026 e está sendo preparado para
              validações com pessoas que vivem momentos reais de estudo, trabalho, games e criação.
            </p>
            <ul>
              <li><span>01</span> Produto e sabor</li>
              <li><span>02</span> Ocasião de uso</li>
              <li><span>03</span> Ritual e percepção</li>
              <li><span>04</span> Preço e intenção de compra</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="access-section" id="lista">
        <div className="site-shell access-layout">
          <div className="access-copy">
            <SectionLabel index="07">Primeira comunidade</SectionLabel>
            <h2>Seja uma das primeiras pessoas a entrar no modo TABS.</h2>
            <p>
              Sua resposta ajuda a decidir produto, ocasião, preço e experiência antes do primeiro lote.
            </p>
            <div className="access-list">
              <span>Participar da construção</span>
              <span>Ser chamado para testes</span>
              <span>Receber aviso antes do lançamento</span>
            </div>
          </div>
          <InterestForm />
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
