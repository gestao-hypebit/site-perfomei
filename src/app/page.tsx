import Image from "next/image";
import { IconePerformei, LogoPerformei } from "./logo";
import { Coreografia } from "./coreografia";
import { linkWhats } from "./whats";
import { FormAgendar } from "./agendar";
import { Preloader, ProgressoRolagem, SCRIPT_PRELOADER } from "./preloader";
import { Painel } from "./painel";
import { Checklist, PilhaCartoes } from "./interativos";
import { Jornada } from "./jornada";
import { Etiqueta } from "./etiqueta";
import { getConteudo } from "@/slick/conteudo";
import type { Conteudo } from "@/slick/estrutura";
import { Rico, emailValido, linhas, numeroWhats, paragrafos } from "@/slick/rico";

// Site da Performei Consultoria (Rubens Queiroz), a partir do briefing de 02/11/2026.
// Linguagem visual na linha do site da Slick: escuro predominante, tipografia gigante e pesada,
// marca-texto azul nas palavras-chave, faixas cruzadas, seção presa que reage à rolagem
// (velocímetro: a metáfora do "painel apagado"), comparador e checklist interativos.
// Ação principal: agendar horário (formulário → WhatsApp com a mensagem pronta).
// Textos, fotos e listas vêm do painel da Slick (src/slick); os padrões ficam em src/slick/estrutura.ts.

// Revalida o conteúdo do painel a cada 5 min (e na hora, quando o cliente publica).
export const revalidate = 300;

const MSG_OI = "Olá, Rubens! Vim pelo site da Performei e quero conversar sobre a minha empresa.";

// Links de contato montados a partir da seção "Contatos" do painel.
function contatosDe(c: Conteudo["contatos"]) {
  const whats = numeroWhats(c.whatsapp) || "5591984047100";
  return {
    whats,
    whatsOi: linkWhats(MSG_OI, whats),
    email: emailValido(c.email.trim()),
    insta: c.instagram,
  };
}
type Contatos = ReturnType<typeof contatosDe>;

const MENU = [
  { href: "#servicos", label: "Serviços" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#sobre", label: "Sobre" },
  { href: "#duvidas", label: "Dúvidas" },
];

const atraso = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;
const num = (i: number) => String(i + 1).padStart(2, "0");

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

// Ícones da faixa escura do topo, pela posição (os textos vêm do painel).
const ICONES_DIFERENCIAIS = [
  <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /><path d="M8.5 11h5" /></>,
  <><path d="M4 19V5" /><path d="M4 19h16" /><path d="m7.5 14.5 3.5-4 3 2.5 5-6" /></>,
  <><path d="M5 21V4" /><path d="M5 4h12l-2.5 3.5L17 11H5" /></>,
  <><circle cx="9" cy="8" r="3.5" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="m16 11 2 2 3.5-4" /></>,
];

function Icone({ children, className = "h-5 w-5" }: { children: React.ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

// Selo redondo no "morro" da faixa escura: o "P" da marca com as três frentes girando em volta.
function SeloGiratorio() {
  const texto = "DIAGNÓSTICO · FINANÇAS · ESTRATÉGIA · ";
  return (
    <div className="relative h-[124px] w-[124px] sm:h-[148px] sm:w-[148px]">
      <div aria-hidden className="absolute inset-[-18px] rounded-full bg-[#63C8FE]/25 blur-2xl" />
      <div className="relative h-full w-full rounded-full bg-[radial-gradient(circle_at_50%_35%,#24306E,#12163A_70%)] shadow-[0_0_0_1px_rgba(99,200,254,0.35),0_20px_50px_-15px_rgba(10,20,60,0.8),inset_0_0_30px_rgba(99,200,254,0.18)]">
        <svg viewBox="0 0 100 100" className="pf-gira absolute inset-0 h-full w-full" aria-hidden>
          <defs><path id="pf-selo-arco" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0" /></defs>
          <text fill="#63C8FE" fontSize="7.4" letterSpacing="1.6" fontFamily="var(--font-texto)" fontWeight="700">
            <textPath href="#pf-selo-arco" textLength="236">{texto}</textPath>
          </text>
        </svg>
        <div className="absolute inset-[27%] flex items-center justify-center rounded-full border border-[#63C8FE]/30 bg-[#12163A]">
          <IconePerformei id="pm-selo" className="h-[52%] w-auto" />
        </div>
      </div>
    </div>
  );
}

function Hero({ c }: { c: Conteudo["hero"] }) {
  return (
    <section id="inicio" className="relative overflow-hidden bg-[#EEF5FC] text-[#12163A] lg:flex lg:min-h-[min(100svh,1000px)] lg:flex-col">
      {/* Fundo: luz azul, anéis finos atrás da foto e uma grade de pontos bem leve */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_35%,#FFFFFF_0%,transparent_55%),radial-gradient(ellipse_at_0%_100%,rgba(99,200,254,0.28),transparent_50%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:radial-gradient(rgba(18,22,58,0.13)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[44%] h-[1100px] w-[1100px] -translate-x-1/2 -translate-y-1/2 lg:left-[62%]">
        <div className="absolute inset-[30%] rounded-full bg-[#63C8FE]/35 blur-[90px]" />
        {[0, 1, 2, 3].map((k) => (
          <div key={k} className="pf-anel absolute rounded-full border border-[#1A7BB8]/[0.13]" style={{ inset: `${18 + k * 8}%`, ...atraso(400 + k * 150) }} />
        ))}
      </div>

      <div className="relative mx-auto grid w-full max-w-[1320px] px-5 pt-28 sm:px-10 sm:pt-32 lg:flex-1 lg:grid-cols-[1fr_1fr] lg:pt-24">
        {/* Texto */}
        <div className="relative z-10 flex flex-col justify-center pb-4 lg:pb-10">
          <h1 className="pf-titulo pf-entra text-[2.5rem] leading-[1] sm:text-[4.2rem] lg:text-[clamp(3rem,min(8.4svh,5.6vw),5.1rem)]" style={atraso(140)}>
            <Rico texto={c.titulo} destaque="pf-tarja pf-tarja-anim [--pf-tarja-de:#12163A]" estiloDestaque={atraso(900)} />
          </h1>
          <p className="pf-entra mt-7 max-w-[31rem] text-[17px] leading-[1.7] text-[#12163A]/65 sm:text-[18px] lg:mt-[clamp(1rem,2.6svh,1.75rem)] lg:max-w-[36rem]" style={atraso(260)}>
            <Rico texto={c.texto} negrito="font-semibold text-[#12163A]" />
          </p>
          <div className="pf-entra mt-9 flex lg:mt-[clamp(1.25rem,3.4svh,2.25rem)]" style={atraso(380)}>
            <a href="#agendar" className="pf-botao inline-flex items-center rounded-full bg-[#12163A] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_14px_30px_-12px_rgba(18,22,58,0.6)] [--pf-preenche:#63C8FE] hover:text-[#12163A]">
              {c.botao}
            </a>
          </div>
        </div>

        {/* Foto recortada */}
        <div className="relative h-[480px] sm:h-[600px] lg:h-auto">
          <div className="pf-entra-foto absolute bottom-0 left-1/2 h-full w-full max-w-[560px] -translate-x-1/2 lg:-bottom-[120px] lg:left-[44%] lg:top-[4%] lg:h-auto">
            <Image src={c.foto} alt={`${c.selo_nome}, Performei Consultoria`} fill priority sizes="(min-width: 1024px) 560px, 92vw"
              className="object-contain object-bottom drop-shadow-[0_30px_40px_rgba(18,22,58,0.25)]" />
          </div>
        </div>
      </div>

      {/* Faixa escura: sobe num "morro" em volta do selo e emenda com a seção seguinte */}
      <div className="relative z-20 -mt-[70px] sm:-mt-[90px] lg:mt-0">
        {/* Mesma grade do topo, para o morro e o selo ficarem centrados sob a foto */}
        <div className="pointer-events-none relative z-10 mx-auto grid max-w-[1320px] px-5 sm:px-10 lg:grid-cols-2">
          <div className="hidden lg:block" />
          <div className="relative h-0">
            <svg aria-hidden viewBox="0 0 420 72" preserveAspectRatio="none" className="absolute bottom-[-1px] left-1/2 h-[72px] w-[400px] -translate-x-1/2 text-[#12163A] lg:left-[44%] lg:w-[460px]">
              <path d="M0 72C120 72 118 0 210 0s90 72 210 72Z" fill="currentColor" />
            </svg>
            <div className="pf-entra absolute bottom-[-34px] left-1/2 -translate-x-1/2 lg:left-[44%]" style={atraso(900)}>
              <SeloGiratorio />
            </div>
          </div>
        </div>
        <div className="relative rounded-t-[2.5rem] bg-[#12163A] sm:rounded-t-[3rem]">
          <div className="relative mx-auto max-w-[1320px] px-5 pb-10 pt-[88px] sm:px-10 sm:pb-14 lg:pb-8 lg:pt-8">
            <ul className="grid grid-cols-2 gap-x-5 gap-y-8 text-white lg:grid-cols-4 lg:gap-0">
              {c.diferenciais.map((d, i) => (
                <li key={d._id} className={`pf-entra flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4 lg:px-6 ${i > 0 ? "lg:border-l lg:border-white/10" : "lg:pl-0"}`} style={atraso(1300 + i * 110)}>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#63C8FE]/35 bg-[#63C8FE]/[0.08] text-[#63C8FE]">
                    <Icone>{ICONES_DIFERENCIAIS[i % ICONES_DIFERENCIAIS.length]}</Icone>
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold leading-snug sm:text-[16px]">{d.titulo}</span>
                    <span className="mt-1 block text-[13.5px] leading-[1.55] text-white/55">{d.texto}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Diferença: antes × depois, tudo visível (sem clique) ---------- */

// ✕ e ✓ da comparação: desenho próprio porque emoji muda de aparência em cada aparelho.
function IconeComparacao({ tipo, className = "h-5 w-5" }: { tipo: "nao" | "sim"; className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden className={`shrink-0 ${className}`}>
      <circle cx="10" cy="10" r="10" fill={tipo === "nao" ? "#D9363E" : "#16A34A"} />
      <path d={tipo === "nao" ? "m6.5 6.5 7 7m0-7-7 7" : "m5.5 10.5 3 3 6-6.5"} fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Diferenca({ c }: { c: Conteudo["diferenca"] }) {
  return (
    <section className="bg-[#F4F9FD] px-5 py-24 text-[#12163A] sm:px-10 sm:py-36">
      <div className="mx-auto max-w-[1320px]">
        <Etiqueta texto={c.etiqueta} tema="claro" />
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <h2 data-revelar className="pf-titulo text-[2.5rem] leading-[1] sm:text-[3.6rem] lg:text-[4.3rem]">
            <Rico texto={c.titulo} apagado="text-[#12163A]/35" />
          </h2>
          <p data-revelar style={atraso(120)} className="max-w-md text-[17px] leading-[1.7] text-[#12163A]/65 lg:justify-self-end">
            {c.texto}
          </p>
        </div>

        {/* Cabeçalho das colunas (só desktop) */}
        <div aria-hidden className="mt-16 hidden grid-cols-[9rem_1fr_4rem_1fr] gap-8 border-b border-[#12163A]/15 pb-5 lg:grid">
          <span />
          <span className="pf-mono flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#12163A]/70"><IconeComparacao tipo="nao" />{c.rotulo_antes}</span>
          <span />
          <span className="pf-mono flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#1A7BB8]"><IconeComparacao tipo="sim" />{c.rotulo_depois}</span>
        </div>

        <ol className="mt-10 lg:mt-0">
          {c.itens.map((l, i) => (
            <li key={l._id} data-revelar style={atraso(i * 90)}
              className="grid gap-4 border-b border-[#12163A]/10 py-9 lg:grid-cols-[9rem_1fr_4rem_1fr] lg:items-center lg:gap-8 lg:py-11">
              <span className="pf-titulo text-[1.85rem] leading-[1.1] tracking-[-0.03em] text-[#12163A] lg:text-[1.9rem]">{l.tema}</span>
              {/* "Antes"/"Depois" por linha só abaixo do desktop, onde não há o cabeçalho das colunas */}
              <div>
                <span className="pf-mono mb-2 inline-flex items-center gap-1.5 rounded-full bg-[#12163A]/[0.06] py-1 pl-1.5 pr-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#12163A]/70 lg:hidden">
                  <IconeComparacao tipo="nao" className="h-4 w-4" />
                  Antes
                </span>
                <p className="text-[18px] leading-[1.6] text-[#12163A]/75">
                  <span className="pf-risco">{l.antes}</span>
                </p>
              </div>
              <span aria-hidden className="flex h-12 w-12 rotate-90 items-center justify-center rounded-full bg-[#12163A] text-[#63C8FE] lg:rotate-0">
                <Seta className="h-5 w-5" />
              </span>
              <div className="pf-depois">
                <span className="pf-mono mb-2 inline-flex items-center gap-1.5 rounded-full bg-[#63C8FE] py-1 pl-1.5 pr-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#12163A] lg:hidden">
                  <IconeComparacao tipo="sim" className="h-4 w-4" />
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

// Cor e ilustração de cada cartão, pela posição (os textos vêm do painel).
const VISUAL_SERVICOS = [
  { tema: "bg-white text-[#12163A]", botaoCls: "[--pf-preenche:#12163A] hover:text-white", visual: <VisualDiagnostico />, fundoVisual: "bg-[#F4F9FD]", destaque: "pf-tarja" },
  { tema: "bg-[#63C8FE] text-[#12163A]", botaoCls: "[--pf-preenche:#12163A] hover:text-white", visual: <VisualFinanceiro />, fundoVisual: "bg-white/30", destaque: "rounded-[0.1em] bg-[#12163A] px-[0.12em] text-[#63C8FE]" },
  { tema: "bg-[#1C2149] text-white ring-1 ring-white/10", botaoCls: "[--pf-preenche:#63C8FE] hover:text-[#12163A]", visual: <VisualPlanejamento />, fundoVisual: "bg-white/[0.04]", destaque: "pf-tarja" },
];

function Servicos({ c }: { c: Conteudo["servicos"] }) {
  const total = String(c.itens.length).padStart(2, "0");
  return (
    <section id="servicos" className="scroll-mt-24 px-5 py-24 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-[1320px]">
        <Etiqueta texto={c.etiqueta} tema="escuro" />
        <div className="mb-14 grid gap-8 lg:mb-20 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <h2 data-revelar className="pf-titulo text-[2.5rem] leading-[1] sm:text-[3.6rem] lg:text-[4.3rem]">
            <Rico texto={c.titulo} />
          </h2>
          <p data-revelar style={atraso(120)} className="max-w-md text-[17px] leading-[1.7] text-white/60 lg:justify-self-end">
            {c.texto}
          </p>
        </div>

        <PilhaCartoes>
          {c.itens.map((item, i) => {
            const s = { ...item, ...VISUAL_SERVICOS[i % VISUAL_SERVICOS.length] };
            return (
            // O menor dos dois: a posição da pilha ou, se o cartão não couber na tela, onde o fim dele aparece.
            <li key={item._id} className="sticky mb-6 last:mb-0" style={{ top: `min(${100 + i * 26}px, calc(100svh - var(--pf-altura, 0px) - 16px))` }}>
              <article data-revelar className={`pf-cartao grid overflow-hidden rounded-[2.2rem] shadow-[0_-20px_60px_-30px_rgba(0,0,0,0.6)] lg:min-h-[540px] lg:grid-cols-[1.15fr_0.85fr] ${s.tema}`}>
                <div className="flex flex-col p-7 sm:p-12 lg:p-14">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="pf-titulo text-[1.3rem] tracking-[-0.02em] sm:text-[1.55rem]">{s.nome}</h3>
                    <span className="pf-mono shrink-0 whitespace-nowrap text-[13px] font-semibold opacity-50">{num(i)} / {total}</span>
                  </div>
                  <p className="pf-titulo mt-7 text-[2.1rem] leading-[1.02] sm:text-[3rem] lg:text-[3.4rem]"><Rico texto={s.gancho} destaque={s.destaque} /></p>
                  <p className="mt-6 max-w-[34rem] text-[16.5px] leading-[1.7] opacity-70">{s.texto}</p>
                  <ul className="mb-10 mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:mb-8">
                    {linhas(s.entregas, 6).map((e) => (
                      <li key={e} className="flex items-center gap-3 text-[15px] font-medium">
                        <span className="h-[7px] w-[7px] shrink-0 rotate-45 bg-current opacity-60" />{e}
                      </li>
                    ))}
                  </ul>
                  <a href="#agendar" className={`pf-botao mt-auto inline-flex items-center gap-3 self-start rounded-full border border-current px-6 py-3.5 text-[14px] font-semibold ${s.botaoCls}`}>
                    {s.botao} <Seta />
                  </a>
                </div>
                <div className={`relative hidden items-center justify-center p-10 sm:flex lg:p-14 ${s.fundoVisual}`}>
                  <div className="aspect-square w-full max-w-[340px]">{s.visual}</div>
                </div>
              </article>
            </li>
            );
          })}
        </PilhaCartoes>
      </div>
    </section>
  );
}

/* ---------- Números (só fatos) ---------- */

function Fatos({ c }: { c: Conteudo["fatos"] }) {
  return (
    <section aria-label="Credenciais" className="border-y border-white/10">
      <dl className="mx-auto grid max-w-[1320px] grid-cols-2 lg:grid-cols-4">
        {c.itens.map((f, i) => (
          <div key={f._id} data-revelar style={atraso(i * 70)}
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

function ParaQuem({ c }: { c: Conteudo["para_quem"] }) {
  return (
    <section className="bg-white px-5 py-24 text-[#12163A] sm:px-10 sm:py-36">
      <Checklist etiqueta={<Etiqueta texto={c.etiqueta} tema="claro" />} titulo={<Rico texto={c.titulo} />} texto={c.texto} />
    </section>
  );
}

/* ---------- Sobre ---------- */

function Sobre({ c, contatos }: { c: Conteudo["sobre"]; contatos: Contatos }) {
  return (
    <section id="sobre" className="relative scroll-mt-24 overflow-hidden bg-[#F4F9FD] px-5 py-24 text-[#12163A] sm:px-10 sm:py-36">
      <p aria-hidden className="pf-titulo pointer-events-none absolute -top-6 left-0 select-none whitespace-nowrap text-[22vw] leading-none text-[#12163A]/[0.035]">PARÁ</p>
      <div className="relative mx-auto grid max-w-[1320px] gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <div data-revelar className="relative mx-auto w-full max-w-[460px] lg:mx-0">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.2rem]">
            <Image src={c.foto} alt={c.nome} fill sizes="(min-width: 1024px) 460px, 90vw" className="object-cover object-[50%_30%]" />
          </div>
          <div className="absolute -bottom-6 right-4 rotate-[-2deg] rounded-2xl bg-[#63C8FE] px-6 py-4 shadow-xl sm:-right-6">
            <p className="pf-titulo text-[1.3rem] tracking-[-0.02em]">{c.nome}</p>
            <p className="pf-mono mt-0.5 text-[11px] uppercase tracking-[0.12em] opacity-70">{c.cargo}</p>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <Etiqueta texto={c.etiqueta} tema="claro" />
          <h2 data-revelar style={atraso(100)} className="pf-titulo text-[2.5rem] leading-[1] sm:text-[3.5rem]">
            <Rico texto={c.titulo} />
          </h2>
          <div data-revelar style={atraso(200)} className="mt-8 space-y-5 text-[17px] leading-[1.75] text-[#12163A]/70">
            {paragrafos(c.texto).map((p, i) => (
              <p key={i}><Rico texto={p} negrito="font-semibold text-[#12163A]" /></p>
            ))}
          </div>
          <a data-revelar style={atraso(280)} href={contatos.insta} target="_blank" rel="noopener" className="group mt-9 inline-flex items-center gap-3 self-start font-semibold">
            <span className="pf-link pb-1">{c.link_instagram}</span> <Seta />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Depoimentos (reais, do site antigo do cliente) ---------- */

const iniciais = (n: string) => n.split(" ").map((p) => p[0]).slice(0, 2).join("");

// Logo da empresa no círculo; sem logo, as iniciais no estilo de cada cartão.
function SeloDepoimento({ nome, logo, estiloIniciais }: { nome: string; logo: string; estiloIniciais: string }) {
  if (!logo) return <span className={`pf-titulo flex shrink-0 items-center justify-center rounded-full tracking-normal ${estiloIniciais}`}>{iniciais(nome)}</span>;
  return (
    <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-white">
      <Image src={logo} alt="" fill sizes="112px" className="object-contain" />
    </span>
  );
}

function Depoimentos({ c }: { c: Conteudo["depoimentos"] }) {
  const [principal, ...outros] = c.itens;
  return (
    <section id="depoimentos" className="scroll-mt-24 px-5 py-24 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-[1320px]">
        <Etiqueta texto={c.etiqueta} tema="escuro" />
        <h2 data-revelar className="pf-titulo max-w-[13em] text-[2.5rem] leading-[1] sm:text-[3.6rem]">
          <Rico texto={c.titulo} />
        </h2>

        <div className="mt-14 grid gap-4 lg:mt-16 lg:grid-cols-[1.25fr_1fr]">
          <figure data-revelar className="relative flex flex-col overflow-hidden rounded-[2rem] bg-[#63C8FE] p-8 text-[#12163A] sm:p-12">
            <span aria-hidden className="pf-titulo pointer-events-none absolute -right-4 -top-10 text-[16rem] leading-none text-[#12163A]/10">”</span>
            <blockquote className="relative flex-1">
              <p className="pf-titulo text-[2rem] leading-[1.05] sm:text-[2.8rem]">“{principal.destaque}”</p>
              <p className="mt-7 max-w-[38rem] text-[16.5px] leading-[1.75] text-[#12163A]/75">{principal.texto}</p>
            </blockquote>
            <figcaption className="relative mt-10 flex items-center gap-4 border-t border-[#12163A]/15 pt-6">
              <SeloDepoimento nome={principal.nome} logo={principal.logo} estiloIniciais="h-12 w-12 bg-[#12163A] text-[15px] text-[#63C8FE]" />
              <span>
                <span className="block font-semibold">{principal.nome}</span>
                <span className="text-[13.5px] text-[#12163A]/65">{principal.empresa}</span>
              </span>
            </figcaption>
          </figure>

          <div className="grid gap-4">
            {outros.map((d, i) => (
              <figure key={d._id} data-revelar style={atraso(120 + i * 120)} className="flex flex-col rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 sm:p-10">
                <blockquote className="flex-1">
                  <p className="pf-titulo text-[1.5rem] leading-[1.12] sm:text-[1.8rem]">“{d.destaque}”</p>
                  <p className="mt-4 text-[15.5px] leading-[1.7] text-white/60">{d.texto}</p>
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-4">
                  <SeloDepoimento nome={d.nome} logo={d.logo} estiloIniciais="h-11 w-11 bg-white/10 text-[14px] text-[#63C8FE]" />
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

function Duvidas({ c, contatos }: { c: Conteudo["duvidas"]; contatos: Contatos }) {
  return (
    <section id="duvidas" className="scroll-mt-24 bg-white px-5 py-24 text-[#12163A] sm:px-10 sm:py-36">
      <div className="mx-auto grid max-w-[1320px] gap-14 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Etiqueta texto={c.etiqueta} tema="claro" />
          <h2 data-revelar className="pf-titulo text-[2.5rem] leading-[1] sm:text-[3.6rem]">
            <Rico texto={c.titulo} />
          </h2>
          <div data-revelar style={atraso(150)} className="mt-9 flex items-center gap-5">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
              <Image src={c.foto} alt="" fill sizes="96px" className="object-cover object-[50%_30%]" />
            </div>
            <p className="max-w-[16rem] text-[16px] leading-[1.6] text-[#12163A]/70">
              <Rico texto={c.texto} negrito="font-semibold text-[#12163A]" />
            </p>
          </div>
          <a data-revelar style={atraso(260)} href={contatos.whatsOi} target="_blank" rel="noopener" className="pf-botao mt-8 inline-flex items-center gap-3 rounded-full bg-[#12163A] px-6 py-3.5 text-[14px] font-semibold text-white [--pf-preenche:#63C8FE] hover:text-[#12163A]">
            <IconeWhats /> Perguntar no WhatsApp
          </a>
        </div>
        <div className="border-t border-[#12163A]/15">
          {c.itens.map((f, i) => (
            <details key={f._id} data-revelar style={atraso(i * 60)} className="pf-faq group border-b border-[#12163A]/15" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 [&::-webkit-details-marker]:hidden">
                <span className="pf-titulo text-[1.25rem] leading-snug tracking-[-0.03em] sm:text-[1.5rem]">{f.pergunta}</span>
                <span aria-hidden className="relative h-10 w-10 shrink-0 rounded-full border border-[#12163A]/20 transition-all duration-300 group-open:rotate-180 group-open:border-[#63C8FE] group-open:bg-[#63C8FE]">
                  <span className="absolute left-1/2 top-1/2 h-[1.5px] w-3.5 -translate-x-1/2 -translate-y-1/2 bg-[#12163A]" />
                  <span className="absolute left-1/2 top-1/2 h-3.5 w-[1.5px] -translate-x-1/2 -translate-y-1/2 bg-[#12163A] transition-transform duration-300 group-open:scale-y-0" />
                </span>
              </summary>
              <div><p className="max-w-[40rem] pb-8 pr-14 text-[16.5px] leading-[1.75] text-[#12163A]/65">{f.resposta}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Agendar: formulário (abre o WhatsApp) + contatos + mapa ---------- */

function Agendar({ c, ct, contatos }: { c: Conteudo["agendar"]; ct: Conteudo["contatos"]; contatos: Contatos }) {
  return (
    <section id="agendar" className="relative scroll-mt-24 overflow-hidden px-5 pt-24 sm:px-10 sm:pt-36">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-40 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[#63C8FE]/15 blur-[160px]" />
      <div className="relative mx-auto max-w-[760px]">
        <div className="text-center">
          <Etiqueta texto={c.etiqueta} tema="escuro" />
          <h2 data-revelar className="pf-titulo mx-auto max-w-[11em] text-[3rem] leading-[0.95] sm:text-[4.6rem] lg:text-[5.4rem]">
            <Rico texto={c.titulo} />
          </h2>
          <p data-revelar style={atraso(150)} className="mx-auto mt-7 max-w-xl text-[17px] leading-[1.7] text-white/65">
            {c.texto}
          </p>
        </div>

        <div data-revelar style={atraso(250)} className="mt-14 rounded-3xl border border-white/10 bg-[#1C2149]/80 p-6 backdrop-blur sm:p-10">
          <FormAgendar whats={contatos.whats} />
        </div>
        <p data-revelar style={atraso(300)} className="mx-auto mt-5 max-w-md text-center text-[14px] leading-[1.6] text-white/50">{c.form_texto}</p>
      </div>

      <div id="mapa" data-revelar className="relative mx-auto mt-16 h-[300px] max-w-[1320px] overflow-hidden rounded-3xl border border-white/10 sm:h-[360px]">
        <iframe title={`Mapa: ${ct.endereco}`} src={`https://www.google.com/maps?q=${encodeURIComponent(ct.endereco_mapa)}&z=16&output=embed`}
          loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full" />
      </div>
    </section>
  );
}

function Rodape({ contatos }: { contatos: Contatos }) {
  return (
    <footer className="relative overflow-hidden px-5 pb-8 pt-24 sm:px-10">
      <div className="mx-auto max-w-[1320px]">
        <div className="flex flex-col gap-8 border-t border-white/10 pt-10 lg:flex-row lg:items-center lg:justify-between">
          <LogoPerformei claro />
          <nav aria-label="Rodapé" className="flex flex-wrap gap-x-8 gap-y-3 text-[14px] text-white/60">
            {MENU.map((m) => <a key={m.href} href={m.href} className="pf-link pb-0.5 hover:text-white">{m.label}</a>)}
            <a href={contatos.insta} target="_blank" rel="noopener" className="pf-link pb-0.5 hover:text-white">Instagram</a>
          </nav>
        </div>
        <p className="pf-mono mt-8 flex flex-col gap-2 text-[11px] uppercase tracking-[0.14em] text-white/40 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Performei Consultoria · Belém/PA</span>
          <a href="https://www.agenciaslick.com.br/" target="_blank" rel="noopener" className="group inline-flex items-center gap-1.5 transition-colors hover:text-white">
            Site desenvolvido pela <span className="pf-link pb-0.5 font-semibold text-white/70 group-hover:text-[#63C8FE]">Agência Slick</span>
          </a>
        </p>
      </div>
    </footer>
  );
}

function WhatsFlutuante({ contatos }: { contatos: Contatos }) {
  return (
    <a href={contatos.whatsOi} target="_blank" rel="noopener" aria-label="Conversar no WhatsApp"
      className="group fixed bottom-5 right-5 z-50 sm:bottom-8 sm:right-8">
      {/* O balão aparece e recolhe (performei.css); o selo do WhatsApp fica sempre. */}
      <span className="pf-contato-rotulo absolute inset-y-0 right-full mr-2.5 my-auto h-fit whitespace-nowrap rounded-full bg-[#63C8FE] px-3.5 py-2 text-[13.5px] font-semibold text-[#12163A] shadow-[0_10px_24px_-8px_rgba(0,0,0,0.55)]">
        Fale comigo
      </span>
      <span className="relative block h-14 w-14 transition-transform group-hover:scale-110">
        <span className="absolute inset-0 overflow-hidden rounded-full border-2 border-[#63C8FE] bg-[#12163A] shadow-[0_12px_30px_-8px_rgba(0,0,0,0.6)]">
          <Image src="/fotos/rubens-retrato.jpg" alt="" fill sizes="112px" className="origin-[27%_13%] scale-[1.35] object-cover object-top" />
        </span>
        <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#25D366] text-white ring-2 ring-white">
          <IconeWhats className="h-4 w-4" />
        </span>
      </span>
    </a>
  );
}

const jsonLd = (contatos: Contatos, servicos: Conteudo["servicos"]) => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Performei Consultoria",
  description: "Consultoria empresarial para pequenas empresas: diagnóstico empresarial, consultoria financeira e planejamento estratégico.",
  founder: { "@type": "Person", name: "Rubens Queiroz", jobTitle: "Administrador e consultor empresarial" },
  telephone: `+${contatos.whats}`,
  ...(contatos.email ? { email: contatos.email } : {}),
  areaServed: { "@type": "City", name: "Belém" },
  address: { "@type": "PostalAddress", streetAddress: "Rua Avertano Rocha, 192 - Campina (Do It Hub)", postalCode: "66023-120", addressLocality: "Belém", addressRegion: "PA", addressCountry: "BR" },
  sameAs: [contatos.insta],
  makesOffer: servicos.itens.map((s) => s.nome).map((n) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: n },
  })),
});

export default async function PerformeiSite() {
  const c = await getConteudo();
  const contatos = contatosDe(c.contatos);
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: SCRIPT_PRELOADER }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(contatos, c.servicos)).replace(/</g, "\\u003c") }} />
      <noscript><style>{".pf-preloader{display:none}"}</style></noscript>
      <Preloader />
      <ProgressoRolagem />
      <div aria-hidden className="pf-grao" />
      <Coreografia />
      <Nav />
      <main>
        <Hero c={c.hero} />
        <Painel />
        <Diferenca c={c.diferenca} />
        <Servicos c={c.servicos} />
        <Fatos c={c.fatos} />
        <ParaQuem c={c.para_quem} />
        <Jornada />
        <Sobre c={c.sobre} contatos={contatos} />
        <Depoimentos c={c.depoimentos} />
        <Duvidas c={c.duvidas} contatos={contatos} />
        <Agendar c={c.agendar} ct={c.contatos} contatos={contatos} />
      </main>
      <Rodape contatos={contatos} />
      <WhatsFlutuante contatos={contatos} />
    </>
  );
}
