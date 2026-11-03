import Image from "next/image";
import type { ReactNode } from "react";
import { IconePerformei, LogoPerformei } from "./logo";
import { Coreografia } from "./coreografia";
import { linkWhats } from "./whats";
import { FormAgendar } from "./agendar";
import { Preloader, ProgressoRolagem, SCRIPT_PRELOADER } from "./preloader";
import { Painel } from "./painel";
import { Checklist } from "./interativos";
import { Jornada } from "./jornada";

// Site da Performei Consultoria (Rubens Queiroz), a partir do briefing de 02/11/2026.
// Linguagem visual na linha do site da Slick: escuro predominante, tipografia gigante e pesada,
// marca-texto azul nas palavras-chave, faixas cruzadas, seção presa que reage à rolagem
// (velocímetro: a metáfora do "painel apagado"), comparador e checklist interativos.
// Ação principal: agendar horário (formulário → WhatsApp com a mensagem pronta).
// Depoimentos são ESPAÇOS RESERVADOS até o cliente mandar os reais.

const WHATS_OI = linkWhats("Olá, Rubens! Vim pelo site da Performei e quero conversar sobre a minha empresa.");
const EMAIL = "performeiconsultoria@gmail.com";
const INSTA = "https://www.instagram.com/performeiconsultoria/";
const FOTO_HERO = "/fotos/rubens-bracos-cruzados.jpg";
const FOTO_SOBRE = "/fotos/rubens-notebook.jpg";
const FOTO_AGENDAR = "/fotos/rubens-retrato.jpg";
const FOTO_DUVIDAS = "/fotos/rubens-sala-reuniao.jpg";

const MENU = [
  { href: "#servicos", label: "Serviços" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#sobre", label: "Sobre" },
  { href: "#duvidas", label: "Dúvidas" },
];

const atraso = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;
const num = (i: number) => String(i + 1).padStart(2, "0");
const T = ({ children }: { children: ReactNode }) => <span className="pf-tarja">{children}</span>;

function Seta({ className = "h-[18px] w-[18px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`pf-seta ${className}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h16" /><path d="m14 6 6 6-6 6" />
    </svg>
  );
}

function IconeWhats({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20l1.3-4A8 8 0 1 1 8.4 19L4 20Z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.6-2-1-1 .8a4 4 0 0 1-1.7-1.7l.8-1-1-2L9 9.5Z" />
    </svg>
  );
}

/* ---------- Navegação: pílula flutuante ---------- */

function Nav() {
  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-5 sm:px-6">
      <div className="mx-auto flex h-[62px] max-w-[1180px] items-center justify-between gap-6 rounded-full border border-white/10 bg-[#12163A]/90 pl-5 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)] pr-2 backdrop-blur-xl sm:pl-7">
        <a href="#inicio" aria-label="Performei — início" className="shrink-0 scale-[0.88] origin-left sm:scale-100">
          <LogoPerformei claro comSlogan={false} />
        </a>
        <nav className="hidden items-center gap-9 lg:flex" aria-label="Menu">
          {MENU.map((m) => (
            <a key={m.href} href={m.href} className="pf-link pb-0.5 text-[14px] text-white/70 transition-colors hover:text-white">{m.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="#agendar" className="pf-botao hidden items-center gap-2 rounded-full bg-[#63C8FE] px-5 py-3 text-[13.5px] font-semibold text-[#12163A] sm:inline-flex">
            Agendar horário <Seta className="h-4 w-4" />
          </a>
          <details className="group lg:hidden">
            <summary aria-label="Abrir menu" className="flex h-12 w-12 cursor-pointer list-none items-center justify-center rounded-full bg-white/[0.06] [&::-webkit-details-marker]:hidden">
              <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M4 9h16M4 15h16" className="group-open:hidden" />
                <path d="M6 6l12 12M18 6 6 18" className="hidden group-open:block" />
              </svg>
            </summary>
            <div className="fixed inset-x-3 top-[84px] rounded-3xl border border-white/10 bg-[#12163A] p-5 shadow-2xl">
              {MENU.map((m, i) => (
                <a key={m.href} href={m.href} className="flex items-baseline gap-4 border-b border-white/10 py-4">
                  <span className="pf-mono text-xs text-[#63C8FE]">{num(i)}</span>
                  <span className="pf-titulo text-[1.9rem]">{m.label}</span>
                </a>
              ))}
              <a href="#agendar" className="mt-5 flex items-center justify-between rounded-full bg-[#63C8FE] px-6 py-4 font-semibold text-[#12163A]">
                Agendar horário <Seta />
              </a>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-[100svh] flex-col overflow-hidden pt-28 sm:pt-32">
      <div aria-hidden className="pointer-events-none absolute right-[-15%] top-[-10%] h-[680px] w-[680px] rounded-full bg-[#63C8FE]/20 blur-[150px]" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-[-10%] h-[420px] w-[420px] rounded-full bg-[#2B86D6]/20 blur-[140px]" />
      <IconePerformei id="pm-fundo" className="pointer-events-none absolute -left-24 top-24 hidden h-[760px] w-auto opacity-[0.035] lg:block" />

      <div className="relative mx-auto grid w-full max-w-[1320px] flex-1 items-center gap-6 px-5 sm:px-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-4">
        <div className="pb-6 lg:pb-16">
          <h1 className="pf-titulo pf-entra text-[3.05rem] leading-[0.96] sm:text-[4.6rem] lg:text-[5.4rem] xl:text-[6.2rem]" style={atraso(100)}>
            Você trabalha muito. Falta{" "}
            <span className="pf-tarja pf-tarja-anim" style={atraso(900)}>enxergar o resultado</span>.
          </h1>
          <p className="pf-entra mt-8 max-w-[33rem] text-[17px] leading-[1.7] text-white/70 sm:text-lg" style={atraso(250)}>
            A Performei organiza as finanças, os preços e a rotina da sua empresa para você decidir com clareza.
            Consultoria de verdade, na língua de quem toca o negócio todo dia.
          </p>
          <div className="pf-entra mt-10 flex flex-wrap items-center gap-3" style={atraso(380)}>
            <a href="#agendar" className="pf-botao group inline-flex items-center gap-3 rounded-full bg-[#63C8FE] px-7 py-4 text-[15px] font-semibold text-[#12163A]">
              Agendar um horário <Seta />
            </a>
            <a href={WHATS_OI} target="_blank" rel="noopener" className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-7 py-4 text-[15px] font-medium text-white/85 transition-colors hover:border-[#63C8FE] hover:text-[#63C8FE]">
              <IconeWhats /> Chamar no WhatsApp
            </a>
          </div>
        </div>

        <div className="relative h-[430px] sm:h-[540px] lg:h-full lg:min-h-[600px]">
          <div className="pf-entra-foto absolute inset-x-[4%] bottom-0 top-[4%] overflow-hidden rounded-t-[999px] ring-1 ring-white/10">
            <Image src={FOTO_HERO} alt="Rubens Queiroz, fundador da Performei Consultoria" fill priority sizes="(min-width: 1024px) 480px, 92vw" className="object-cover object-[50%_22%]" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#12163A] via-transparent to-transparent" />
          </div>

          <div className="pf-entra absolute left-0 top-[52%] hidden w-[200px] sm:block rotate-[-4deg] rounded-2xl border border-white/15 bg-[#12163A]/75 p-4 shadow-2xl backdrop-blur-md sm:w-[220px] lg:-left-12" style={atraso(1100)}>
            <p className="pf-mono text-[10px] uppercase tracking-[0.16em] text-white/45">Lucro do mês</p>
            <p className="pf-titulo mt-1.5 text-[2rem] leading-none">R$ <span className="text-[#63C8FE]">???</span></p>
            <p className="mt-2 text-[12px] leading-snug text-white/60">Não sabe de cabeça? A gente precisa conversar.</p>
          </div>
          <div className="pf-entra absolute bottom-[14%] right-0 rotate-[3deg] rounded-2xl bg-[#63C8FE] px-4 py-3 text-[#12163A] shadow-2xl sm:right-2" style={atraso(1250)}>
            <p className="pf-mono text-[10px] font-semibold uppercase tracking-[0.14em] opacity-70">Rubens Queiroz</p>
            <p className="text-[13px] font-semibold">Administrador · CRA-PA</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Diferença: antes × depois, tudo visível (sem clique) ---------- */

const ANTES_DEPOIS = [
  { tema: "Caixa", antes: "“Entrou dinheiro, então tá bom.” E o rombo só aparece no fim do mês.", depois: "Você sabe quanto entra, quanto sai e quanto sobra. Toda semana, sem susto." },
  { tema: "Preço", antes: "Copiado do concorrente ou no chute. Vende muito e continua apertado.", depois: "Preço calculado com custo e margem: cada venda paga a conta e deixa lucro." },
  { tema: "Rotina", antes: "Tudo passa por você. Férias? Só no feriado, e com o celular na mão.", depois: "Processos e responsáveis definidos. A empresa anda sem você empurrando." },
  { tema: "Futuro", antes: "Quem decide o mês é o boleto que vence amanhã.", depois: "Metas e um plano: você sabe aonde quer chegar e qual é o próximo passo." },
];

function Diferenca() {
  return (
    <section className="bg-[#F4F9FD] px-5 py-24 text-[#12163A] sm:px-10 sm:py-36">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <h2 data-revelar className="pf-titulo text-[2.5rem] leading-[1] sm:text-[3.6rem] lg:text-[4.3rem]">
            Mesma empresa. <span className="text-[#12163A]/35">Outro jeito de</span> <T>tocar</T>.
          </h2>
          <p data-revelar style={atraso(120)} className="max-w-md text-[17px] leading-[1.7] text-[#12163A]/65 lg:justify-self-end">
            O improviso sai riscado, a gestão entra no lugar. Não é mágica: é método, número e acompanhamento.
          </p>
        </div>

        {/* Cabeçalho das colunas (só desktop) */}
        <div aria-hidden className="mt-16 hidden grid-cols-[9rem_1fr_4rem_1fr] gap-8 border-b border-[#12163A]/15 pb-5 lg:grid">
          <span />
          <span className="pf-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-[#12163A]/40">No improviso</span>
          <span />
          <span className="pf-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-[#1A7BB8]">Com a Performei</span>
        </div>

        <ol className="mt-10 lg:mt-0">
          {ANTES_DEPOIS.map((l, i) => (
            <li key={l.tema} data-revelar style={atraso(i * 90)}
              className="grid gap-4 border-b border-[#12163A]/10 py-9 lg:grid-cols-[9rem_1fr_4rem_1fr] lg:items-center lg:gap-8 lg:py-11">
              <span className="pf-titulo text-[1.5rem] tracking-[-0.03em] text-[#12163A]/30 lg:text-[1.9rem]">{l.tema}</span>
              {/* "Antes"/"Depois" por linha só abaixo do desktop, onde não há o cabeçalho das colunas */}
              <div>
                <span className="pf-mono mb-2 inline-block rounded-full bg-[#12163A]/[0.06] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#12163A]/50 lg:hidden">
                  Antes
                </span>
                <p className="text-[17px] leading-[1.6] text-[#12163A]/45 sm:text-[18px]">
                  <span className="pf-risco">{l.antes}</span>
                </p>
              </div>
              <span aria-hidden className="flex h-12 w-12 rotate-90 items-center justify-center rounded-full bg-[#12163A] text-[#63C8FE] lg:rotate-0">
                <Seta className="h-5 w-5" />
              </span>
              <div className="pf-depois">
                <span className="pf-mono mb-2 inline-block rounded-full bg-[#63C8FE] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#12163A] lg:hidden">
                  Depois
                </span>
                <p className="pf-titulo text-[1.4rem] leading-[1.25] tracking-[-0.03em] sm:text-[1.65rem]">
                  {l.depois}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Serviços: cartões que se empilham ao rolar ---------- */

function VisualDiagnostico() {
  return (
    <svg viewBox="0 0 320 320" className="h-full w-full" fill="none" aria-hidden>
      {Array.from({ length: 64 }, (_, k) => {
        const x = 40 + (k % 8) * 34, y = 40 + Math.floor(k / 8) * 34;
        const vaza = k === 27 || k === 36;
        return <circle key={k} cx={x} cy={y} r={vaza ? 6 : 3} fill={vaza ? "#1A7BB8" : "currentColor"} opacity={vaza ? 1 : 0.18} className={vaza ? "pf-pulsa" : ""} />;
      })}
      <circle cx="176" cy="160" r="70" stroke="currentColor" strokeWidth="3" />
      <circle cx="176" cy="160" r="70" fill="currentColor" opacity="0.04" />
      <path d="M226 210l52 52" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
      <line x1="110" x2="242" y1="160" y2="160" stroke="#1A7BB8" strokeWidth="2" className="pf-scan" />
    </svg>
  );
}

function VisualFinanceiro() {
  const barras = [70, 95, 85, 130, 160, 205];
  return (
    <svg viewBox="0 0 320 320" className="h-full w-full" fill="none" aria-hidden>
      <path d="M30 280h260" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
      {barras.map((h, k) => (
        <rect key={k} x={42 + k * 42} y={280 - h} width="26" height={h} rx="6"
          fill={k === barras.length - 1 ? "#12163A" : "currentColor"} opacity={k === barras.length - 1 ? 1 : 0.22 + k * 0.08}
          className="pf-barra" style={{ transitionDelay: `${300 + k * 90}ms` }} />
      ))}
      <path d="M55 200 L97 178 L139 186 L181 140 L223 112 L265 62" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" pathLength={1} className="pf-traco-svg" />
      <circle cx="265" cy="62" r="7" fill="#12163A" stroke="#fff" strokeWidth="3" />
    </svg>
  );
}

function VisualPlanejamento() {
  const marcos: [number, number][] = [[50, 262], [130, 200], [196, 236]];
  const rota = "M50 262 C 90 262, 100 200, 130 200 S 170 236, 196 236 S 240 120, 262 92";
  return (
    <svg viewBox="0 0 320 320" className="h-full w-full" fill="none" aria-hidden>
      <path d={rota} stroke="currentColor" strokeOpacity="0.2" strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" />
      <path d={rota} stroke="#63C8FE" strokeWidth="4" strokeLinecap="round" pathLength={1} className="pf-traco-svg" />
      {marcos.map(([x, y], k) => (
        <circle key={k} cx={x} cy={y} r="9" fill="#1C2149" stroke="#63C8FE" strokeWidth="3" />
      ))}
      <path d="M262 92V36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M262 38h44l-12 14 12 14h-44" fill="#63C8FE" />
    </svg>
  );
}

const SERVICOS = [
  {
    nome: "Diagnóstico empresarial",
    gancho: <>Descubra <T>onde</T> o dinheiro está vazando.</>,
    texto: "O raio-x da empresa: finanças, preços e operação olhados de perto, para você saber o que resolver primeiro.",
    entregas: ["Raio-x de 10 áreas da empresa", "Relatório de maturidade", "Mapa de gargalos", "Lista de prioridades"],
    botao: "Quero meu diagnóstico",
    tema: "bg-white text-[#12163A]",
    botaoCls: "[--pf-preenche:#12163A] hover:text-white",
    visual: <VisualDiagnostico />,
    fundoVisual: "bg-[#F4F9FD]",
  },
  {
    nome: "Consultoria financeira",
    gancho: <>Saiba quanto <span className="rounded-[0.1em] bg-[#12163A] px-[0.12em] text-[#63C8FE]">sobra</span>, não só quanto entra.</>,
    texto: "Caixa organizado, dinheiro da empresa separado do seu e preço com margem real. Números que você entende e usa.",
    entregas: ["Fluxo de caixa", "Precificação com margem", "Separação PF × PJ", "Leitura mensal dos números"],
    botao: "Quero organizar o caixa",
    tema: "bg-[#63C8FE] text-[#12163A]",
    botaoCls: "[--pf-preenche:#12163A] hover:text-white",
    visual: <VisualFinanceiro />,
    fundoVisual: "bg-white/30",
  },
  {
    nome: "Planejamento estratégico",
    gancho: <>Uma empresa que anda <T>sem você</T> empurrando.</>,
    texto: "Metas possíveis, plano por etapas, processos e responsáveis definidos, e acompanhamento para tudo sair do papel.",
    entregas: ["Metas e indicadores", "Plano de ação", "Processos e funções", "Acompanhamento"],
    botao: "Quero um plano",
    tema: "bg-[#1C2149] text-white ring-1 ring-white/10",
    botaoCls: "[--pf-preenche:#63C8FE] hover:text-[#12163A]",
    visual: <VisualPlanejamento />,
    fundoVisual: "bg-white/[0.04]",
  },
];

function Servicos() {
  return (
    <section id="servicos" className="scroll-mt-24 px-5 py-24 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-14 grid gap-8 lg:mb-20 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <h2 data-revelar className="pf-titulo text-[2.5rem] leading-[1] sm:text-[3.6rem] lg:text-[4.3rem]">
            Três frentes, um objetivo: uma empresa que <T>dá lucro</T> e tem rumo.
          </h2>
          <p data-revelar style={atraso(120)} className="max-w-md text-[17px] leading-[1.7] text-white/60 lg:justify-self-end">
            Dá pra começar por uma delas ou combinar as três. O diagnóstico mostra qual faz mais diferença agora.
          </p>
        </div>

        <ol>
          {SERVICOS.map((s, i) => (
            <li key={s.nome} className="sticky mb-6 last:mb-0" style={{ top: `calc(100px + ${i * 26}px)` }}>
              <article data-revelar className={`pf-cartao grid overflow-hidden rounded-[2.2rem] shadow-[0_-20px_60px_-30px_rgba(0,0,0,0.6)] lg:min-h-[540px] lg:grid-cols-[1.15fr_0.85fr] ${s.tema}`}>
                <div className="flex flex-col p-7 sm:p-12 lg:p-14">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="pf-titulo text-[1.3rem] tracking-[-0.02em] sm:text-[1.55rem]">{s.nome}</h3>
                    <span className="pf-mono shrink-0 whitespace-nowrap text-[13px] font-semibold opacity-50">{num(i)} / 03</span>
                  </div>
                  <p className="pf-titulo mt-7 text-[2.1rem] leading-[1.02] sm:text-[3rem] lg:text-[3.4rem]">{s.gancho}</p>
                  <p className="mt-6 max-w-[34rem] text-[16.5px] leading-[1.7] opacity-70">{s.texto}</p>
                  <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                    {s.entregas.map((e) => (
                      <li key={e} className="flex items-center gap-3 text-[15px] font-medium">
                        <span className="h-[7px] w-[7px] shrink-0 rotate-45 bg-current opacity-60" />{e}
                      </li>
                    ))}
                  </ul>
                  <a href="#agendar" className={`pf-botao mt-10 inline-flex items-center gap-3 self-start rounded-full border border-current px-6 py-3.5 text-[14px] font-semibold lg:mt-auto ${s.botaoCls}`}>
                    {s.botao} <Seta />
                  </a>
                </div>
                <div className={`relative hidden items-center justify-center p-10 sm:flex lg:p-14 ${s.fundoVisual}`}>
                  <div className="aspect-square w-full max-w-[340px]">{s.visual}</div>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Números (só fatos) ---------- */

const FATOS = [
  { valor: "CRA-PA", rotulo: "Administrador registrado no Conselho Regional do Pará" },
  { valor: "ACP", rotulo: "Consultor empresarial certificado pela Associação Comercial do Pará" },
  { valor: "1:1", rotulo: "Você fala direto com o Rubens, do diagnóstico ao acompanhamento" },
  { valor: "3", rotulo: "frentes de trabalho: diagnóstico, finanças e estratégia" },
];

function Fatos() {
  return (
    <section aria-label="Credenciais" className="border-y border-white/10">
      <dl className="mx-auto grid max-w-[1320px] grid-cols-2 lg:grid-cols-4">
        {FATOS.map((f, i) => (
          <div key={f.valor} data-revelar style={atraso(i * 70)}
            className={`flex flex-col-reverse gap-3 px-5 py-10 sm:px-10 sm:py-14 ${i % 2 ? "border-l border-white/10" : ""} ${i > 1 ? "border-t border-white/10 lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}>
            <dt className="max-w-[16rem] text-[13.5px] leading-relaxed text-white/55">{f.rotulo}</dt>
            <dd className="pf-titulo text-[2.4rem] leading-none text-[#63C8FE] sm:text-5xl lg:text-6xl">{f.valor}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ---------- Pra quem é ---------- */

function ParaQuem() {
  return (
    <section className="bg-white px-5 py-24 text-[#12163A] sm:px-10 sm:py-36">
      <div className="mx-auto grid max-w-[1320px] gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 data-revelar style={atraso(100)} className="pf-titulo text-[2.5rem] leading-[1] sm:text-[3.6rem]">
            Marcou dois ou mais? <T>É com você</T> que eu quero falar.
          </h2>
          <p data-revelar style={atraso(200)} className="mt-8 max-w-md text-[17px] leading-[1.7] text-[#12163A]/65">
            Consultoria não precisa ser coisa de empresa grande. A Performei existe para o pequeno empresário que carrega o negócio nas costas e quer crescer com mais controle.
          </p>
        </div>
        <div data-revelar style={atraso(150)}>
          <Checklist />
        </div>
      </div>
    </section>
  );
}

/* ---------- Sobre ---------- */

function Sobre() {
  return (
    <section id="sobre" className="relative scroll-mt-24 overflow-hidden bg-[#F4F9FD] px-5 py-24 text-[#12163A] sm:px-10 sm:py-36">
      <p aria-hidden className="pf-titulo pointer-events-none absolute -top-6 left-0 select-none whitespace-nowrap text-[22vw] leading-none text-[#12163A]/[0.035]">PARÁ</p>
      <div className="relative mx-auto grid max-w-[1320px] gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <div data-revelar className="relative mx-auto w-full max-w-[460px] lg:mx-0">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.2rem]">
            <Image src={FOTO_SOBRE} alt="Rubens Queiroz trabalhando no notebook" fill sizes="(min-width: 1024px) 460px, 90vw" className="object-cover object-[50%_30%]" />
          </div>
          <div className="absolute -bottom-6 right-4 rotate-[-2deg] rounded-2xl bg-[#63C8FE] px-6 py-4 shadow-xl sm:-right-6">
            <p className="pf-titulo text-[1.3rem] tracking-[-0.02em]">Rubens Queiroz</p>
            <p className="pf-mono mt-0.5 text-[11px] uppercase tracking-[0.12em] opacity-70">Fundador e CEO</p>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <h2 data-revelar style={atraso(100)} className="pf-titulo text-[2.5rem] leading-[1] sm:text-[3.5rem]">
            Quero ajudar a transformar o Pará em um estado <T>mais empreendedor</T>.
          </h2>
          <div data-revelar style={atraso(200)} className="mt-8 space-y-5 text-[17px] leading-[1.75] text-[#12163A]/70">
            <p>
              Oi! Eu sou o Rubens, apaixonado por empreendedorismo. Vejo todo dia pequenos empresários trabalhando demais e
              colhendo de menos, não por falta de esforço, mas por falta de alguém que traduza a gestão para a realidade deles.
            </p>
            <p>
              Fui estudar e me especializar para isso. Hoje sou Administrador registrado no CRA-PA, consultor empresarial
              certificado pela Associação Comercial do Pará e fundador da Performei, com uma ideia simples:
              <strong className="font-semibold text-[#12163A]"> consultoria mais acessível, próxima e fácil de entender.</strong>
            </p>
          </div>
          <a data-revelar style={atraso(280)} href={INSTA} target="_blank" rel="noopener" className="group mt-9 inline-flex items-center gap-3 self-start font-semibold">
            <span className="pf-link pb-1">Me acompanhe no Instagram · @performeiconsultoria</span> <Seta />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Depoimentos (reais, do site antigo do cliente) ---------- */

const DEPOIMENTOS = [
  {
    nome: "Renata Almeida",
    empresa: "Canto das Flores · Psicologia e Arte",
    destaque: "Um lugar que já era bom se tornou melhor ainda.",
    texto:
      "Rubens me trouxe uma perspectiva valiosa, identificando pontos de melhoria que muitas vezes passavam desapercebidos por mim. Suas recomendações práticas e estratégicas me permitiram ter mais saúde e tranquilidade em meu consultório. Também tenho obtido retornos tanto financeiro como de expansão de parcerias a partir dos planejamentos feitos pela consultoria. Recomendo fortemente a Performei!",
  },
  {
    nome: "Heitor Pereira",
    empresa: "CEO · Heitor Pereira Curso de Idiomas",
    destaque: "Nos ajudaram a chegar onde estamos hoje.",
    texto:
      "Os serviços da Performei sempre foram super úteis e nos ajudaram a chegar onde estamos hoje. Sempre fomos bem atendidos com orientações técnicas de finanças e marketing que nos ajudaram a crescer. Muito obrigado, Rubens Queiroz.",
  },
  {
    nome: "Vera Oyola",
    empresa: "Sol e Mar Piscinas e Saunas",
    destaque: "Muito importante para a organização da empresa.",
    texto:
      "A Performei vem sendo muito importante para a organização da empresa no âmbito financeiro e organizacional. Com as suas técnicas vem interagindo com a equipe de forma excelente, buscando o engajamento em todas as etapas do processo.",
  },
];

const iniciais = (n: string) => n.split(" ").map((p) => p[0]).slice(0, 2).join("");

function Depoimentos() {
  const [principal, ...outros] = DEPOIMENTOS;
  return (
    <section id="depoimentos" className="scroll-mt-24 px-5 py-24 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-[1320px]">
        <h2 data-revelar className="pf-titulo max-w-[13em] text-[2.5rem] leading-[1] sm:text-[3.6rem]">
          Não acredite em mim. <T>Acredite neles.</T>
        </h2>

        <div className="mt-14 grid gap-4 lg:mt-16 lg:grid-cols-[1.25fr_1fr]">
          <figure data-revelar className="relative flex flex-col overflow-hidden rounded-[2rem] bg-[#63C8FE] p-8 text-[#12163A] sm:p-12">
            <span aria-hidden className="pf-titulo pointer-events-none absolute -right-4 -top-10 text-[16rem] leading-none text-[#12163A]/10">”</span>
            <blockquote className="relative flex-1">
              <p className="pf-titulo text-[2rem] leading-[1.05] sm:text-[2.8rem]">“{principal.destaque}”</p>
              <p className="mt-7 max-w-[38rem] text-[16.5px] leading-[1.75] text-[#12163A]/75">{principal.texto}</p>
            </blockquote>
            <figcaption className="relative mt-10 flex items-center gap-4 border-t border-[#12163A]/15 pt-6">
              <span className="pf-titulo flex h-12 w-12 items-center justify-center rounded-full bg-[#12163A] text-[15px] tracking-normal text-[#63C8FE]">{iniciais(principal.nome)}</span>
              <span>
                <span className="block font-semibold">{principal.nome}</span>
                <span className="text-[13.5px] text-[#12163A]/65">{principal.empresa}</span>
              </span>
            </figcaption>
          </figure>

          <div className="grid gap-4">
            {outros.map((d, i) => (
              <figure key={d.nome} data-revelar style={atraso(120 + i * 120)} className="flex flex-col rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 sm:p-10">
                <blockquote className="flex-1">
                  <p className="pf-titulo text-[1.5rem] leading-[1.12] sm:text-[1.8rem]">“{d.destaque}”</p>
                  <p className="mt-4 text-[15.5px] leading-[1.7] text-white/60">{d.texto}</p>
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-4">
                  <span className="pf-titulo flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[14px] tracking-normal text-[#63C8FE]">{iniciais(d.nome)}</span>
                  <span>
                    <span className="block font-semibold">{d.nome}</span>
                    <span className="text-[13px] text-white/50">{d.empresa}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Dúvidas (base: FAQ do site antigo + briefing) ---------- */

const FAQ = [
  { p: "Minha empresa é pequena demais para ter consultoria?", r: "Muito pelo contrário. É justamente quando a empresa é menor que dá para construir bases sólidas, organizar os números e definir a estratégia certa desde o início. Assim o crescimento vem planejado, sem incêndio para apagar depois. Pequeno é o tamanho perfeito para crescer certo." },
  { p: "Já tenho contador. Vocês fazem a mesma coisa?", r: "Não. Seu contador é essencial para a saúde fiscal e legal da empresa. A Performei entra para te ajudar a entender o que esses números significam, transformar dados em decisões e criar um plano claro para os seus objetivos. O contador garante que a empresa esteja em dia; a gente pensa junto com você para ela ir além. É trabalho em equipe." },
  { p: "Meus números são um mistério para mim. E agora?", r: "É o cenário mais comum, e é exatamente aí que eu entro. Não tenho bola de cristal, mas tenho método: descomplico seus dados, transformo planilha em decisão e mostro onde o lucro está escondido. Chega de adivinhar." },
  { p: "Consultoria não é só para empresa grande e com orçamento?", r: "A Performei é feita sob medida para a realidade do pequeno empresário. Acesso a organização e estratégia não deveria ser privilégio de gigante. Depois da primeira conversa você recebe uma proposta clara, com escopo e investimento definidos, sem surpresa." },
  { p: "Já estou afogado em tarefas. A consultoria vai me dar mais trabalho?", r: "A ideia é justamente o oposto. No começo há um pequeno esforço conjunto para alinhar tudo, mas o objetivo é organizar a empresa, otimizar processos e liberar o seu tempo e a sua cabeça para o que realmente importa." },
  { p: "O que eu ganho, afinal? Mais números para analisar?", r: "Você ganha clareza, direção, um plano de ação e a segurança de estar tomando as melhores decisões. O objetivo não é só entender os números: é usar os números para crescer e ter um negócio mais lucrativo e sustentável." },
  { p: "Depois que a consultoria termina, fico sozinho de novo?", r: "De jeito nenhum. A missão é deixar você e sua equipe com autonomia para saber o que fazer. E, se fizer sentido para o seu negócio, a Performei também pode assumir processos que tomam o seu tempo. Eu te ensino a pescar, e também posso pescar por você." },
];

function Duvidas() {
  return (
    <section id="duvidas" className="scroll-mt-24 bg-white px-5 py-24 text-[#12163A] sm:px-10 sm:py-36">
      <div className="mx-auto grid max-w-[1320px] gap-14 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 data-revelar className="pf-titulo text-[2.5rem] leading-[1] sm:text-[3.6rem]">
            Ficou alguma <T>dúvida</T>?
          </h2>
          <div data-revelar style={atraso(150)} className="mt-9 flex items-center gap-5">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
              <Image src={FOTO_DUVIDAS} alt="Rubens Queiroz" fill sizes="96px" className="object-cover object-[50%_30%]" />
            </div>
            <p className="max-w-[16rem] text-[16px] leading-[1.6] text-[#12163A]/70">
              Se a sua não estiver aqui, me chama no WhatsApp. <strong className="font-semibold text-[#12163A]">Respondo pessoalmente.</strong>
            </p>
          </div>
          <a data-revelar style={atraso(260)} href={WHATS_OI} target="_blank" rel="noopener" className="pf-botao mt-8 inline-flex items-center gap-3 rounded-full bg-[#12163A] px-6 py-3.5 text-[14px] font-semibold text-white [--pf-preenche:#63C8FE] hover:text-[#12163A]">
            <IconeWhats /> Perguntar no WhatsApp
          </a>
        </div>
        <div className="border-t border-[#12163A]/15">
          {FAQ.map((f, i) => (
            <details key={f.p} data-revelar style={atraso(i * 60)} className="pf-faq group border-b border-[#12163A]/15" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 [&::-webkit-details-marker]:hidden">
                <span className="pf-titulo text-[1.25rem] leading-snug tracking-[-0.03em] sm:text-[1.5rem]">{f.p}</span>
                <span aria-hidden className="relative h-10 w-10 shrink-0 rounded-full border border-[#12163A]/20 transition-all duration-300 group-open:rotate-180 group-open:border-[#63C8FE] group-open:bg-[#63C8FE]">
                  <span className="absolute left-1/2 top-1/2 h-[1.5px] w-3.5 -translate-x-1/2 -translate-y-1/2 bg-[#12163A]" />
                  <span className="absolute left-1/2 top-1/2 h-3.5 w-[1.5px] -translate-x-1/2 -translate-y-1/2 bg-[#12163A] transition-transform duration-300 group-open:scale-y-0" />
                </span>
              </summary>
              <div><p className="max-w-[40rem] pb-8 pr-14 text-[16.5px] leading-[1.75] text-[#12163A]/65">{f.r}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Agendar: formulário (abre o WhatsApp) + contatos + mapa ---------- */

function Agendar() {
  const contatos = [
    { rotulo: "WhatsApp", valor: "(91) 98404-7100", href: WHATS_OI },
    { rotulo: "E-mail", valor: EMAIL, href: `mailto:${EMAIL}` },
    { rotulo: "Instagram", valor: "@performeiconsultoria", href: INSTA },
    { rotulo: "Onde estou", valor: "Do It Hub · Rua Avertano Rocha, 192 · Campina, Belém", href: "#mapa" },
  ];
  return (
    <section id="agendar" className="relative scroll-mt-24 overflow-hidden px-5 pt-24 sm:px-10 sm:pt-36">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-40 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[#63C8FE]/15 blur-[160px]" />
      <div className="relative mx-auto max-w-[1320px]">
        <div className="text-center">
          <h2 data-revelar className="pf-titulo mx-auto max-w-[11em] text-[3rem] leading-[0.95] sm:text-[5rem] lg:text-[6.4rem]">
            Bora colocar <T>ordem na casa</T>?
          </h2>
          <p data-revelar style={atraso(150)} className="mx-auto mt-7 max-w-xl text-[17px] leading-[1.7] text-white/65">
            Um bate-papo de 30 minutos, sem compromisso. A gente conversa sobre a sua empresa e você tira todas as dúvidas.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="grid content-start gap-3">
            <figure data-revelar className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
              <div className="relative aspect-[5/4]">
                <Image src={FOTO_AGENDAR} alt="Rubens Queiroz" fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover object-[50%_28%]" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#12163A] via-[#12163A]/10 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-6">
                  <p className="pf-titulo text-[1.3rem] leading-[1.2] tracking-[-0.02em]">
                    “Não sou o sabichão que tem todas as respostas. Sou o parceiro que faz as perguntas certas.”
                  </p>
                  <p className="mt-2 text-[13px] text-white/60">Rubens Queiroz</p>
                </figcaption>
              </div>
            </figure>
            {contatos.map((c) => (
              <a key={c.rotulo} data-revelar href={c.href} {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4 transition-colors hover:border-[#63C8FE]/60">
                <span className="min-w-0">
                  <span className="pf-mono block text-[11px] uppercase tracking-[0.14em] text-white/45">{c.rotulo}</span>
                  <span className="mt-1 block break-words text-[15.5px]">{c.valor}</span>
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 transition-all duration-500 group-hover:-rotate-45 group-hover:border-[#63C8FE] group-hover:bg-[#63C8FE] group-hover:text-[#12163A]">
                  <Seta className="h-4 w-4" />
                </span>
              </a>
            ))}
          </div>

          <div data-revelar style={atraso(150)} className="self-start rounded-3xl border border-white/10 bg-[#1C2149]/80 p-6 backdrop-blur sm:p-10 lg:sticky lg:top-28">
            <p className="pf-titulo text-[1.7rem] leading-[1.1] tracking-[-0.03em] sm:text-[2.1rem]">Me conta rapidinho sobre a sua empresa.</p>
            <p className="mt-3 mb-10 max-w-md text-[15.5px] leading-[1.6] text-white/60">Leva 30 segundos. A mensagem chega no meu WhatsApp e eu respondo para combinar o melhor dia e horário.</p>
            <FormAgendar />
          </div>
        </div>

        <div id="mapa" data-revelar className="relative mt-6 h-[300px] overflow-hidden rounded-3xl border border-white/10 sm:h-[360px]">
          <iframe title="Mapa: Performei Consultoria no Do It Hub, Campina, Belém" src="https://www.google.com/maps?q=Rua+Avertano+Rocha,+192+-+Campina,+Bel%C3%A9m+-+PA,+66023-120&z=16&output=embed"
            loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full opacity-80 grayscale invert-[0.92] hue-rotate-180" />
        </div>
      </div>
    </section>
  );
}

function Rodape() {
  return (
    <footer className="relative overflow-hidden px-5 pb-8 pt-24 sm:px-10">
      <div className="mx-auto max-w-[1320px]">
        <div className="flex flex-col gap-8 border-t border-white/10 pt-10 lg:flex-row lg:items-center lg:justify-between">
          <LogoPerformei claro />
          <nav aria-label="Rodapé" className="flex flex-wrap gap-x-8 gap-y-3 text-[14px] text-white/60">
            {MENU.map((m) => <a key={m.href} href={m.href} className="pf-link pb-0.5 hover:text-white">{m.label}</a>)}
            <a href={INSTA} target="_blank" rel="noopener" className="pf-link pb-0.5 hover:text-white">Instagram</a>
          </nav>
        </div>
        <p className="pf-mono mt-8 flex flex-col gap-2 text-[11px] uppercase tracking-[0.14em] text-white/40 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Performei Consultoria · Belém/PA</span>
          <span>Consultoria para pequenas empresas</span>
        </p>
      </div>
    </footer>
  );
}

function WhatsFlutuante() {
  return (
    <a href={WHATS_OI} target="_blank" rel="noopener" aria-label="Conversar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#63C8FE] text-[#12163A] shadow-[0_12px_30px_-8px_rgba(0,0,0,0.6)] transition-transform hover:scale-110 sm:bottom-8 sm:right-8">
      <IconeWhats className="h-7 w-7" />
    </a>
  );
}

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Performei Consultoria",
  description: "Consultoria empresarial para pequenas empresas: diagnóstico empresarial, consultoria financeira e planejamento estratégico.",
  founder: { "@type": "Person", name: "Rubens Queiroz", jobTitle: "Administrador e consultor empresarial" },
  telephone: "+55 91 98404-7100",
  email: EMAIL,
  areaServed: { "@type": "City", name: "Belém" },
  address: { "@type": "PostalAddress", streetAddress: "Rua Avertano Rocha, 192 - Campina (Do It Hub)", postalCode: "66023-120", addressLocality: "Belém", addressRegion: "PA", addressCountry: "BR" },
  sameAs: [INSTA],
  makesOffer: ["Diagnóstico empresarial", "Consultoria financeira", "Planejamento estratégico"].map((n) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: n },
  })),
};

export default function PerformeiSite() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: SCRIPT_PRELOADER }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <noscript><style>{".pf-preloader{display:none}"}</style></noscript>
      <Preloader />
      <ProgressoRolagem />
      <div aria-hidden className="pf-grao" />
      <Coreografia />
      <Nav />
      <main>
        <Hero />
        <Painel />
        <Diferenca />
        <Servicos />
        <Fatos />
        <ParaQuem />
        <Jornada />
        <Sobre />
        <Depoimentos />
        <Duvidas />
        <Agendar />
      </main>
      <Rodape />
      <WhatsFlutuante />
    </>
  );
}
