'use client';

import { useEffect, useRef, useState } from 'react';
import MagicRings from '../components/MagicRings';

type Lang = 'pt' | 'en';

const T: Record<Lang, Record<string, string>> = {
  pt: {
    nav_home: 'Home', nav_serv: 'Serviços', nav_sobre: 'Sobre', nav_tec: 'Tecnologias', nav_proc: 'Processo', nav_cont: 'Contato',
    hero_eyebrow: 'Desenvolvedores Associados',
    hero_h1a: 'Tecnologia sob medida,', hero_h1b: 'construída por especialistas.',
    hero_sub: 'Um coletivo de programadores associados que entrega ERPs, CRM, integrações com IA e presença digital — do sistema interno ao site que converte.',
    hero_cta1: 'Solicitar orçamento', hero_cta2: 'Ver serviços',
    strip1: 'ERPs', strip2: 'CRM', strip3: 'Integrações com IA', strip4: 'Websites & Landing Pages', strip5: 'Automações', strip6: 'Soluções Institucionais',
    serv_eyebrow: 'O que fazemos', serv_title: 'Soluções tecnológicas de ponta a ponta',
    serv_sub: 'Do back-office ao ponto de contato com o cliente. Cada projeto é conduzido por desenvolvedores associados com domínio real da stack.',
    sobre_eyebrow: 'Quem somos', sobre_h: 'Programadores associados, não uma fábrica de software',
    sobre_p1: 'Somos um grupo de desenvolvedores experientes que se uniram para entregar projetos com o cuidado de quem é dono do próprio trabalho. Sem camadas de intermediários — você fala direto com quem constrói.',
    sobre_p2: 'Cada associado traz uma especialidade — do back-end pesado ao design de interface — e o cliente ganha um time completo, ágil e sem burocracia.',
    stat1: 'Contato direto com quem desenvolve', stat2: 'Especialização em CRM comprovada', stat3: 'Do ERP ao site, tudo em um só time', stat4: 'Integrações inteligentes de verdade',
    tec_eyebrow: 'Stack', tec_h: 'Tecnologias que dominamos',
    proc_eyebrow: 'Como trabalhamos', proc_h: 'Um processo claro, do briefing à entrega',
    cta_eyebrow: 'Vamos conversar', cta_h: 'Conte seu projeto. Devolvemos um orçamento.',
    cta_sub: 'Preencha o formulário com o essencial. Um dos associados retorna com uma proposta clara.',
    cta_btn: 'Solicitar orçamento', cta_note: 'Resposta em até 1 dia útil.',
    cta_ok: '✓ Recebemos seu pedido! Retornamos em breve.',
    ph_nome: 'Nome', ph_email: 'E-mail', ph_empresa: 'Empresa (opcional)', ph_msg: 'O que você precisa? (ERP, CRM, IA, site...)',
    foot_tag: 'Desenvolvedores Associados · Tecnologia sob medida',
  },
  en: {
    nav_home: 'Home', nav_serv: 'Services', nav_sobre: 'About', nav_tec: 'Tech', nav_proc: 'Process', nav_cont: 'Contact',
    hero_eyebrow: 'Associated Developers',
    hero_h1a: 'Tailored technology,', hero_h1b: 'built by specialists.',
    hero_sub: 'A collective of associated developers delivering ERPs, CRM, AI integrations and digital presence — from the internal system to the site that converts.',
    hero_cta1: 'Request a quote', hero_cta2: 'See services',
    strip1: 'ERPs', strip2: 'CRM', strip3: 'AI integrations', strip4: 'Websites & Landing Pages', strip5: 'Automations', strip6: 'Institutional Solutions',
    serv_eyebrow: 'What we do', serv_title: 'End-to-end technology solutions',
    serv_sub: 'From back-office to the customer touchpoint. Every project is led by associated developers with real command of the stack.',
    sobre_eyebrow: 'Who we are', sobre_h: 'Associated developers, not a software factory',
    sobre_p1: 'We are a group of experienced developers who came together to deliver projects with the care of people who own their own work. No layers of middlemen — you talk directly to who builds.',
    sobre_p2: 'Each associate brings a specialty — from heavy back-end to interface design — and the client gets a complete, agile, bureaucracy-free team.',
    stat1: 'Direct contact with who develops', stat2: 'Proven CRM specialization', stat3: 'From ERP to site, one team', stat4: 'Genuinely smart integrations',
    tec_eyebrow: 'Stack', tec_h: 'Technologies we master',
    proc_eyebrow: 'How we work', proc_h: 'A clear process, from briefing to delivery',
    cta_eyebrow: "Let's talk", cta_h: 'Tell us your project. We send back a quote.',
    cta_sub: 'Fill in the essentials. One of the associates gets back with a clear proposal.',
    cta_btn: 'Request a quote', cta_note: 'Reply within 1 business day.',
    cta_ok: "✓ We got your request! We'll be in touch soon.",
    ph_nome: 'Name', ph_email: 'Email', ph_empresa: 'Company (optional)', ph_msg: 'What do you need? (ERP, CRM, AI, site...)',
    foot_tag: 'Associated Developers · Tailored technology',
  },
};

const SERVICES: Record<Lang, { icon: string; h: string; p: string }[]> = {
  pt: [
    { icon: '◈', h: 'Implementação de CRM', p: 'Configuração, automação de funis, telefonia e integrações — colocamos seu comercial e atendimento num CRM que a equipe realmente usa.' },
    { icon: '◇', h: 'ERPs sob medida', p: 'Sistemas de gestão desenhados para o seu processo — estoque, financeiro, produção e relatórios num só lugar.' },
    { icon: '✦', h: 'Integrações com IA', p: 'Agentes, copilotos e automações inteligentes conectados aos seus dados — do atendimento à análise, com IA que gera resultado.' },
    { icon: '▤', h: 'Sites & Landing Pages', p: 'Sites institucionais e landing pages rápidas, responsivas e feitas para converter — com identidade e performance.' },
    { icon: '⌘', h: 'Todo tipo de solução', p: 'Integrações entre sistemas, automações, APIs, dashboards e o que mais seu negócio precisar. Se é software, a gente resolve.' },
  ],
  en: [
    { icon: '◈', h: 'CRM Implementation', p: 'Setup, pipeline automation, telephony and integrations — we get your sales and support on a CRM the team actually uses.' },
    { icon: '◇', h: 'Custom ERPs', p: 'Management systems designed for your process — inventory, finance, production and reports in one place.' },
    { icon: '✦', h: 'AI Integrations', p: 'Agents, copilots and smart automations connected to your data — from support to analysis, with AI that delivers.' },
    { icon: '▤', h: 'Sites & Landing Pages', p: 'Institutional sites and fast, responsive landing pages built to convert — with identity and performance.' },
    { icon: '⌘', h: 'Every kind of solution', p: "System integrations, automations, APIs, dashboards and whatever else your business needs. If it's software, we solve it." },
  ],
};

const STEPS: Record<Lang, { h: string; p: string }[]> = {
  pt: [
    { h: 'Descoberta', p: 'Entendemos o problema, o processo e as metas antes de escrever uma linha de código.' },
    { h: 'Proposta & escopo', p: 'Definimos entregáveis, prazos e orçamento com transparência — sem surpresas depois.' },
    { h: 'Desenvolvimento', p: 'Entregas em ciclos curtos, com você acompanhando cada evolução do projeto.' },
    { h: 'Entrega & suporte', p: 'Colocamos no ar, treinamos a equipe e seguimos ao seu lado com suporte contínuo.' },
  ],
  en: [
    { h: 'Discovery', p: 'We understand the problem, the process and the goals before writing a line of code.' },
    { h: 'Proposal & scope', p: 'We define deliverables, deadlines and budget transparently — no surprises later.' },
    { h: 'Development', p: 'Delivered in short cycles, with you following every step of the project.' },
    { h: 'Delivery & support', p: 'We ship it, train the team and stay by your side with ongoing support.' },
  ],
};

const STEP_COLORS = ['#5fb3c0', '#3f8a97', '#2e7681', '#155361'];

const TECH: Record<Lang, { t: string; items: string[] }[]> = {
  pt: [
    { t: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind'] },
    { t: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'REST & GraphQL'] },
    { t: 'CRM / ERP', items: ['Bitrix24', 'ERPs sob medida', 'Automações', 'Funis de venda', 'Telefonia'] },
    { t: 'IA & Dados', items: ['OpenAI', 'Claude', 'RAG', 'Agentes', 'Analytics'] },
  ],
  en: [
    { t: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind'] },
    { t: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'REST & GraphQL'] },
    { t: 'CRM / ERP', items: ['Bitrix24', 'Custom ERPs', 'Automations', 'Sales pipelines', 'Telephony'] },
    { t: 'AI & Data', items: ['OpenAI', 'Claude', 'RAG', 'Agents', 'Analytics'] },
  ],
};

const STATS = ['100%', 'Bitrix24', '360°', 'IA'];

const NAV = [
  { id: 'top', key: 'nav_home', icon: 'home' },
  { id: 'servicos', key: 'nav_serv', icon: 'box' },
  { id: 'sobre', key: 'nav_sobre', icon: 'users' },
  { id: 'tecnologias', key: 'nav_tec', icon: 'chip' },
  { id: 'processo', key: 'nav_proc', icon: 'steps' },
  { id: 'contato', key: 'nav_cont', icon: 'mail' },
];

const ICONS: Record<string, React.ReactNode> = {
  home: <path d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5" />,
  box: <><path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" /><path d="M3 8l9 5 9-5" /><path d="M12 13v8" /></>,
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" /><path d="M16 5.2A3 3 0 0 1 16 11" /><path d="M18 15c2.2.4 3.5 1.9 3.5 4" /></>,
  chip: <><rect x="6.5" y="6.5" width="11" height="11" rx="2" /><path d="M10 3v3M14 3v3M10 18v3M14 18v3M3 10h3M3 14h3M18 10h3M18 14h3" /></>,
  steps: <><path d="M8 6h12M8 12h12M8 18h12" /><circle cx="4" cy="6" r="1.4" /><circle cx="4" cy="12" r="1.4" /><circle cx="4" cy="18" r="1.4" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
};

const HERO_NODES = [
  { x: 64, y: 28, r: 2.9, glow: 9, fill: '#7fd0da' },
  { x: 46, y: 27, r: 2.9, glow: 9, fill: '#2e7681' },
  { x: 34, y: 43, r: 2.9, glow: 9, fill: '#7fd0da' },
  { x: 50, y: 51, r: 4.4, glow: 12, fill: '#6fcbd8' },
  { x: 67, y: 62, r: 2.9, glow: 9, fill: '#2e7681' },
  { x: 54, y: 75, r: 2.9, glow: 9, fill: '#7fd0da' },
  { x: 35, y: 73, r: 2.7, glow: 8, fill: '#7fd0da' },
];

function LogoMark() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="auto" fill="none" style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id="heroLg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7fd0da" />
          <stop offset="1" stopColor="#2e7681" />
        </linearGradient>
        <radialGradient id="heroGlow">
          <stop offset="0" stopColor="#9fe8f2" stopOpacity="0.95" />
          <stop offset="1" stopColor="#9fe8f2" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="44" stroke="url(#heroLg)" strokeWidth="1.2" strokeOpacity="0.5" strokeDasharray="1 3" strokeLinecap="round" />
      <g stroke="url(#heroLg)" strokeWidth="2.6" strokeLinecap="round">
        <line x1="64" y1="28" x2="46" y2="27" />
        <line x1="46" y1="27" x2="34" y2="43" />
        <line x1="34" y1="43" x2="50" y2="51" />
        <line x1="50" y1="51" x2="67" y2="62" />
        <line x1="67" y1="62" x2="54" y2="75" />
        <line x1="54" y1="75" x2="35" y2="73" />
      </g>
      <g>
        {HERO_NODES.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={n.glow} fill="url(#heroGlow)"
            style={{ animation: `nodeGlow 2.8s ease-in-out infinite`, animationDelay: `${i * 0.4}s` }} />
        ))}
      </g>
      <g>
        {HERO_NODES.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={n.r} fill={n.fill} />
        ))}
      </g>
    </svg>
  );
}

export default function Page() {
  const [lang, setLang] = useState<Lang>('pt');
  const [active, setActive] = useState('top');
  const [sent, setSent] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const t = (k: string) => T[lang][k] ?? k;

  // reveal on scroll
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); } }),
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
    );
    els.forEach((el) => io.observe(el));
    const t0 = setTimeout(() => els.forEach((el) => el.classList.add('show')), 2500);
    return () => { io.disconnect(); clearTimeout(t0); };
  }, []);

  // scroll-spy
  useEffect(() => {
    const onScroll = () => {
      let cur = NAV[0].id;
      for (const item of NAV) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 140) cur = item.id;
      }
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 88, behavior: 'smooth' });
  };

  const stripItems = [t('strip1'), t('strip2'), t('strip3'), t('strip4'), t('strip5'), t('strip6')];

  return (
    <div className="wrap" ref={rootRef}>
      {/* NAV */}
      <nav className="nav">
        <a className="nav-logo" href="#top" onClick={(e) => goTo(e, 'top')}>
          <img src="/singular-selo.png" alt="Singular Solutions" width={34} height={34} style={{ filter: 'drop-shadow(0 0 8px rgba(95,179,192,0.5))' }} />
          <span>SINGULAR</span>
        </a>
        <div className="navpill">
          {NAV.map((item) => (
            <button key={item.id} className={`navlink${active === item.id ? ' active' : ''}`} onClick={(e) => goTo(e, item.id)}>
              <span className="nav-tab" />
              <span className="navlink-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{ICONS[item.icon]}</svg>
              </span>
              <span className="navlink-label">{t(item.key)}</span>
            </button>
          ))}
        </div>
        <button className="lang-toggle" onClick={() => setLang((l) => (l === 'pt' ? 'en' : 'pt'))}>
          {lang === 'pt' ? 'EN' : 'PT'}
        </button>
      </nav>

      {/* HERO */}
      <header id="top" className="hero">
        <MagicRings className="hero-rings" color="#225560" colorTwo="#155361" ringCount={7} opacity={0.9} />
        <div className="hero-fade" />
        <div className="hero-inner">
          <div className="hero-logo reveal"><LogoMark /></div>
          <p className="eyebrow reveal">{t('hero_eyebrow')}</p>
          <h1 className="h1 reveal" style={{ transitionDelay: '.08s' }}>
            {t('hero_h1a')}<br /><span className="grad">{t('hero_h1b')}</span>
          </h1>
          <p className="lead reveal" style={{ transitionDelay: '.16s' }}>{t('hero_sub')}</p>
          <div className="btn-row reveal" style={{ transitionDelay: '.24s' }}>
            <a href="#contato" className="btn-primary" onClick={(e) => goTo(e, 'contato')}>{t('hero_cta1')}</a>
            <a href="#servicos" className="btn-ghost" onClick={(e) => goTo(e, 'servicos')}>{t('hero_cta2')}</a>
          </div>
        </div>
      </header>

      {/* STRIP */}
      <section className="strip">
        <div className="strip-inner reveal">
          {stripItems.map((s, i) => (
            <span key={i} style={{ display: 'contents' }}>
              <span>{s}</span>
              {i < stripItems.length - 1 && <span className="dot">·</span>}
            </span>
          ))}
        </div>
      </section>

      {/* SERVICOS */}
      <section id="servicos" className="section services">
        <div className="head">
          <p className="sec-eyebrow reveal">{t('serv_eyebrow')}</p>
          <h2 className="h2 reveal">{t('serv_title')}</h2>
          <p className="sub reveal" style={{ transitionDelay: '.1s' }}>{t('serv_sub')}</p>
        </div>
        <div className="cards">
          {SERVICES[lang].map((s, i) => (
            <article key={i} className="card reveal" style={{ transitionDelay: `${(i % 3) * 0.06}s` }}>
              <div className="card-ico">{s.icon}</div>
              <h3>{s.h}</h3>
              <p>{s.p}</p>
            </article>
          ))}
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="section">
        <div className="about-grid">
          <div className="about-copy">
            <p className="sec-eyebrow reveal">{t('sobre_eyebrow')}</p>
            <h2 className="h2 reveal">{t('sobre_h')}</h2>
            <p className="reveal" style={{ transitionDelay: '.1s' }}>{t('sobre_p1')}</p>
            <p className="reveal" style={{ transitionDelay: '.18s' }}>{t('sobre_p2')}</p>
          </div>
          <div className="stats reveal" style={{ transitionDelay: '.1s' }}>
            {STATS.map((num, i) => (
              <div key={i} className="stat">
                <div className="stat-num">{num}</div>
                <p>{t(`stat${i + 1}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECNOLOGIAS */}
      <section id="tecnologias" className="band-section">
        <div className="section">
          <div className="head">
            <p className="sec-eyebrow reveal">{t('tec_eyebrow')}</p>
            <h2 className="h2 reveal">{t('tec_h')}</h2>
          </div>
          <div className="tech-groups">
            {TECH[lang].map((g, i) => (
              <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="tech-h">{g.t}</div>
                <div className="tech-list">
                  {g.items.map((it, j) => (
                    <div key={j} className="tech-row"><span className="tech-bullet" />{it}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESSO */}
      <section id="processo" className="section">
        <div className="head">
          <p className="sec-eyebrow reveal">{t('proc_eyebrow')}</p>
          <h2 className="h2 reveal">{t('proc_h')}</h2>
        </div>
        <div className="proc-grid">
          {STEPS[lang].map((s, i) => (
            <div key={i} className="proc-card reveal" style={{ transitionDelay: `${i * 0.08}s`, borderTopColor: STEP_COLORS[i] }}>
              <div className="proc-num" style={{ color: STEP_COLORS[i] }}>{String(i + 1).padStart(2, '0')}</div>
              <h3>{s.h}</h3>
              <p>{s.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="contact">
        <MagicRings className="contact-rings" color="#155361" colorTwo="#225560" ringCount={6} opacity={0.5} />
        <div className="contact-fade" />
        <div className="contact-inner">
          <p className="sec-eyebrow reveal">{t('cta_eyebrow')}</p>
          <h2 className="h2 reveal">{t('cta_h')}</h2>
          <p className="lead reveal" style={{ transitionDelay: '.08s' }}>{t('cta_sub')}</p>
          <form className="form reveal" style={{ transitionDelay: '.16s' }} onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            {!sent ? (
              <>
                <div className="form-row">
                  <input className="input" required name="nome" placeholder={t('ph_nome')} />
                  <input className="input" required type="email" name="email" placeholder={t('ph_email')} />
                </div>
                <input className="input" name="empresa" placeholder={t('ph_empresa')} />
                <textarea className="textarea" required name="msg" rows={4} placeholder={t('ph_msg')} />
                <button type="submit" className="submit">{t('cta_btn')}</button>
                <p className="form-note">{t('cta_note')}</p>
              </>
            ) : (
              <p className="form-note ok">{t('cta_ok')}</p>
            )}
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="brand">
          <img src="/singular-selo.png" alt="" width={30} height={30} />
          <span>SINGULAR SOLUTIONS</span>
        </div>
        <p className="tag">{t('foot_tag')}</p>
        <p className="copy">© 2026 Singular Solutions</p>
      </footer>
    </div>
  );
}
