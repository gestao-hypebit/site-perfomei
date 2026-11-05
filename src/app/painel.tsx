"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

// Seção presa na tela: conforme a pessoa rola, a frase acende palavra por palavra
// e o "painel do carro" sai do apagado para o aceso (a metáfora central da marca).

const FRASE =
  "Faturar não é lucrar. Estar ocupado não é crescer. Decidir no feeling não é estratégia. Com os números na mão, você para de apagar incêndio e passa a";
const PALAVRAS = FRASE.split(" ");
const FINAL = "dirigir a empresa.";

const LEITURAS = ["Caixa", "Margem", "Rotina", "Rumo"];

function Palavra({ texto, i, total, p }: { texto: string; i: number; total: number; p: MotionValue<number> }) {
  const ini = 0.05 + (i / total) * 0.65;
  const opacity = useTransform(p, [ini, ini + 0.04], [0.14, 1]);
  return <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">{texto}</motion.span>;
}

export function Painel() {
  const ref = useRef<HTMLElement>(null);
  const reduzir = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useTransform(scrollYProgress, (v) => (reduzir ? 1 : v));

  const angulo = useTransform(p, [0.05, 0.8], [-120, 120]);
  const arco = useTransform(p, [0.05, 0.8], [0, 1]);
  const brilho = useTransform(p, [0.1, 0.85], [0, 0.55]);
  const finalOpacity = useTransform(p, [0.72, 0.8], [0.14, 1]);
  const [nivel, setNivel] = useState(0);
  useMotionValueEvent(p, "change", (v) => setNivel(Math.max(0, Math.min(4, Math.floor((v - 0.1) / 0.17) + 1))));

  return (
    <section ref={ref} className="relative h-[320vh] bg-[#12163A]" aria-label="Por que olhar os números">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <motion.div aria-hidden style={{ opacity: brilho }} className="pointer-events-none absolute right-[-10%] top-1/2 h-[700px] w-[700px] -translate-y-1/2 rounded-full bg-[#63C8FE]/30 blur-[160px]" />

        <div className="relative mx-auto grid w-full max-w-[1320px] items-center gap-6 px-5 sm:gap-10 sm:px-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <div className="order-2 lg:order-1">
            {/* No desktop o tamanho acompanha também a altura da tela: a frase precisa caber abaixo do menu. */}
            <p className="pf-titulo text-[1.7rem] sm:text-[2.5rem] lg:text-[clamp(2.25rem,min(7.2svh,3.4vw),3rem)]">
              {PALAVRAS.map((w, i) => (
                <Palavra key={i} texto={w} i={i} total={PALAVRAS.length} p={p} />
              ))}
              <motion.span style={{ opacity: finalOpacity }} className="pf-tarja inline">{FINAL}</motion.span>
            </p>
          </div>

          {/* Velocímetro */}
          <div className="order-1 mx-auto w-full max-w-[340px] lg:order-2 lg:max-w-[420px]">
            <svg viewBox="0 0 220 182" className="mx-auto w-full max-w-[min(250px,28svh)] sm:max-w-none" aria-hidden>
              <defs>
                <linearGradient id="pf-arco" x1="0" x2="1">
                  <stop offset="0" stopColor="#2B86D6" />
                  <stop offset="1" stopColor="#63C8FE" />
                </linearGradient>
              </defs>
              {/* trilho */}
              <path d="M32.06 155A90 90 0 1 1 187.94 155" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" strokeLinecap="round" />
              <motion.path d="M32.06 155A90 90 0 1 1 187.94 155" fill="none" stroke="url(#pf-arco)" strokeWidth="10" strokeLinecap="round" style={{ pathLength: arco }} />
              {Array.from({ length: 13 }, (_, i) => {
                const a = ((-120 + i * 20) * Math.PI) / 180;
                const r1 = i % 3 === 0 ? 66 : 71;
                return (
                  <line key={i} x1={110 + Math.sin(a) * r1} y1={110 - Math.cos(a) * r1} x2={110 + Math.sin(a) * 77} y2={110 - Math.cos(a) * 77}
                    stroke="rgba(255,255,255,0.35)" strokeWidth={i % 3 === 0 ? 2 : 1} strokeLinecap="round" />
                );
              })}
              <text x="22" y="178" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="var(--font-texto)" fontWeight="700">NO ESCURO</text>
              <text x="140" y="178" fill="#63C8FE" fontSize="9" fontFamily="var(--font-texto)" fontWeight="700">NO CONTROLE</text>
              {/* Ponteiro: círculo invisível centrado em (0,0) para o giro acontecer no centro do mostrador */}
              <g transform="translate(110 110)">
                <motion.g style={{ rotate: angulo }}>
                  <circle r="64" fill="transparent" />
                  <line x1="0" y1="8" x2="0" y2="-62" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                </motion.g>
              </g>
              <circle cx="110" cy="110" r="9" fill="#12163A" stroke="#63C8FE" strokeWidth="3" />
            </svg>

            <ul className="mt-2 grid grid-cols-4 gap-2">
              {LEITURAS.map((l, i) => {
                const aceso = nivel > i;
                return (
                  <li key={l} className={`rounded-xl border px-1 py-3 text-center sm:px-2 transition-all duration-500 ${aceso ? "border-[#63C8FE]/60 bg-[#63C8FE]/10" : "border-white/10"}`}>
                    <span className={`mx-auto mb-2 block h-1.5 w-1.5 rounded-full transition-all duration-500 ${aceso ? "bg-[#63C8FE] shadow-[0_0_12px_#63C8FE]" : "bg-white/20"}`} />
                    <span className={`pf-mono text-[10px] uppercase tracking-[0.06em] transition-colors sm:tracking-[0.12em] duration-500 ${aceso ? "text-white" : "text-white/35"}`}>{l}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
