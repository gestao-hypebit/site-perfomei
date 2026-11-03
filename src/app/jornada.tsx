"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";

// "Como funciona" como uma estrada: a seção fica presa e, conforme a pessoa rola para baixo,
// os passos correm na horizontal. A linha de progresso acende cada parada e o passo ativo
// ganha destaque. No fim, o cartão de agendar. Com movimento reduzido, vira rolagem lateral comum.

const ETAPAS = [
  { titulo: "Primeira conversa", texto: "30 minutos, sem compromisso. Você conta como está a empresa e onde está o aperto; eu explico, sem enrolação, como posso ajudar.", entrega: "Clareza do caminho" },
  { titulo: "Diagnóstico", texto: "Olho números, preços e rotina de perto e mostro onde a empresa perde dinheiro e tempo.", entrega: "Raio-x com prioridades" },
  { titulo: "Plano de ação", texto: "Prioridades, metas e tarefas claras. Cada passo com motivo, prazo e responsável.", entrega: "Plano com metas e prazos" },
  { titulo: "Acompanhamento", texto: "Encontros periódicos para medir, ajustar a rota e decidir com base no que os números mostram.", entrega: "Decisões guiadas por números" },
];

const num = (i: number) => String(i + 1).padStart(2, "0");

export function Jornada() {
  const secao = useRef<HTMLElement>(null);
  const trilho = useRef<HTMLDivElement>(null);
  const reduzir = useReducedMotion();
  const [dist, setDist] = useState(0);

  useEffect(() => {
    const el = trilho.current;
    if (!el || reduzir) return;
    const medir = () => setDist(Math.max(0, el.scrollWidth - window.innerWidth));
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    window.addEventListener("resize", medir);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", medir);
    };
  }, [reduzir]);

  const { scrollYProgress } = useScroll({ target: secao, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (v) => -v * dist);
  const [ativo, setAtivo] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setAtivo(Math.min(ETAPAS.length, Math.floor(v * (ETAPAS.length + 0.6)))));

  const fixo = !reduzir && dist > 0;

  return (
    <section
      ref={secao}
      id="como-funciona"
      className="relative scroll-mt-0"
      style={{ height: fixo ? `calc(100svh + ${dist * 1.15}px)` : undefined }}
    >
      <div className={`${fixo ? "sticky top-0 h-[100svh]" : "py-24"} flex flex-col justify-center overflow-hidden`}>
        <div className="mx-auto mb-10 flex w-full max-w-[1320px] flex-col gap-5 px-5 pt-20 sm:px-10 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="pf-titulo max-w-[13em] text-[2.2rem] leading-[1] sm:text-[3rem] lg:text-[3.6rem]">
            Do improviso ao <span className="pf-tarja">controle</span>, em quatro passos.
          </h2>
          <p className="pf-mono text-[13px] uppercase tracking-[0.14em] text-white/50">
            Passo <span className="inline-block w-[2ch] text-[#63C8FE]">{num(Math.min(ativo, ETAPAS.length - 1))}</span> de 04
          </p>
        </div>

        <motion.div
          ref={trilho}
          style={fixo ? { x } : undefined}
          className={`flex gap-5 px-5 sm:px-10 ${fixo ? "w-max" : "overflow-x-auto pb-4"} lg:pl-[max(2.5rem,calc((100vw-1320px)/2+2.5rem))]`}
        >
          {ETAPAS.map((e, i) => {
            const on = ativo === i;
            const passou = ativo > i;
            return (
              <article
                key={e.titulo}
                className={`relative flex h-[min(54svh,440px)] w-[82vw] shrink-0 flex-col justify-between overflow-hidden rounded-[2rem] border p-7 transition-all duration-700 sm:w-[520px] sm:p-10 lg:w-[600px] ${
                  on ? "border-[#63C8FE]/60 bg-[#1C2149]" : "border-white/10 bg-white/[0.025]"
                } ${passou ? "opacity-60" : ""}`}
              >
                <span
                  aria-hidden
                  className="pf-titulo pointer-events-none absolute -right-4 -top-6 text-[9rem] leading-none transition-all duration-700 sm:text-[12rem]"
                  style={{
                    color: on ? "#63C8FE" : "transparent",
                    WebkitTextStroke: on ? "0px" : "1.5px rgba(255,255,255,0.18)",
                  }}
                >
                  {num(i)}
                </span>
                <div className="relative">
                  <span className={`pf-mono text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors duration-500 ${on ? "text-[#63C8FE]" : "text-white/40"}`}>
                    Passo {num(i)}
                  </span>
                </div>
                <div className="relative">
                  <h3 className="pf-titulo text-[2rem] leading-[1.02] sm:text-[2.7rem]">{e.titulo}</h3>
                  <p className="mt-4 max-w-[30rem] text-[16px] leading-[1.7] text-white/65">{e.texto}</p>
                  <p className={`mt-7 inline-flex items-center gap-3 rounded-full px-4 py-2 text-[13.5px] font-semibold transition-colors duration-500 ${on ? "bg-[#63C8FE] text-[#12163A]" : "bg-white/[0.06] text-white/70"}`}>
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="m5 12.5 4.2 4.2L19 7" />
                    </svg>
                    Você sai com: {e.entrega}
                  </p>
                </div>
              </article>
            );
          })}

          {/* Fim da estrada */}
          <article className="flex h-[min(54svh,440px)] w-[82vw] shrink-0 flex-col justify-between rounded-[2rem] bg-[#63C8FE] p-7 text-[#12163A] sm:w-[460px] sm:p-10">
            <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 42V8" />
              <path d="M12 9h24l-6 7 6 7H12" fill="currentColor" />
            </svg>
            <div>
              <p className="pf-titulo text-[2.3rem] leading-[1] sm:text-[3rem]">O passo 01 começa com um “oi”.</p>
              <a href="#agendar" className="pf-botao mt-8 inline-flex items-center gap-3 rounded-full bg-[#12163A] px-7 py-4 text-[15px] font-semibold text-white [--pf-preenche:#ffffff] hover:text-[#12163A]">
                Agendar horário
                <svg viewBox="0 0 24 24" className="pf-seta h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M4 12h16" /><path d="m14 6 6 6-6 6" />
                </svg>
              </a>
            </div>
          </article>
        </motion.div>

        {/* Estrada: linha de progresso com as paradas */}
        <div className="mx-auto mt-10 w-full max-w-[1320px] px-5 sm:px-10 lg:mt-14">
          <div className="relative">
            <div className="h-[2px] w-full rounded-full bg-white/10" />
            <motion.div className="absolute inset-y-0 left-0 h-[2px] w-full origin-left rounded-full bg-[#63C8FE]" style={{ scaleX: fixo ? scrollYProgress : 1 }} />
            <ol className="absolute inset-x-0 -top-[7px] flex justify-between">
              {[...ETAPAS.map((e) => e.titulo), "Agendar"].map((t, i) => (
                <li key={t} className="flex flex-col items-center gap-3">
                  <span className={`h-4 w-4 rounded-full border-2 transition-all duration-500 ${ativo >= i ? "border-[#63C8FE] bg-[#63C8FE] shadow-[0_0_14px_#63C8FE]" : "border-white/25 bg-[#12163A]"}`} />
                  <span className={`pf-mono hidden text-[11px] uppercase tracking-[0.12em] transition-colors duration-500 sm:block ${ativo >= i ? "text-white" : "text-white/35"}`}>{t}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
