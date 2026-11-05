"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* ---------- Pilha de cartões: informa a altura de cada um para o CSS ---------- */

// Cada <li> usa --pf-altura no `top` do sticky: cartão mais alto que a tela só gruda
// depois de mostrar o fim, assim o próximo nunca cobre o botão antes da hora.
export function PilhaCartoes({ children }: { children: ReactNode }) {
  const lista = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const ol = lista.current;
    if (!ol) return;
    const medir = new ResizeObserver((itens) => {
      for (const { target } of itens) {
        const li = target as HTMLElement;
        li.style.setProperty("--pf-altura", `${li.offsetHeight}px`);
      }
    });
    Array.from(ol.children).forEach((li) => medir.observe(li));
    return () => medir.disconnect();
  }, []);

  return <ol ref={lista}>{children}</ol>;
}

/* ---------- Checklist clicável: pra quem é ---------- */

const SINAIS = [
  "Fatura, mas não sabe dizer quanto a empresa lucrou no mês.",
  "Já definiu preço “de olho”, pelo que o concorrente cobra.",
  "Paga conta da casa com o dinheiro da empresa (ou o contrário).",
  "Toda decisão, até a pequena, precisa passar por você.",
  "Quer crescer, contratar ou investir, mas não sabe se pode.",
];

export function Checklist() {
  const [marcados, setMarcados] = useState<boolean[]>(() => SINAIS.map(() => false));
  const total = marcados.filter(Boolean).length;
  const msg =
    total === 0 ? "Marque o que acontece aí na sua empresa." :
    total === 1 ? "Um sinal já merece atenção. Tem mais algum?" :
    "É com você que eu quero falar.";

  return (
    <div>
      <ul className="space-y-3">
        {SINAIS.map((s, i) => {
          const on = marcados[i];
          return (
            <li key={s}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => setMarcados((m) => m.map((v, j) => (j === i ? !v : v)))}
                className={`group flex w-full items-center gap-5 rounded-2xl border px-5 py-5 text-left transition-all duration-300 sm:px-6 ${
                  on ? "border-[#12163A] bg-[#12163A] text-white" : "border-[#12163A]/12 bg-white hover:border-[#12163A]/40"
                }`}
              >
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-[1.5px] transition-all duration-300 ${on ? "border-[#63C8FE] bg-[#63C8FE] text-[#12163A]" : "border-[#12163A]/30"}`}>
                  <motion.svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <motion.path d="m5 12.5 4.2 4.2L19 7" initial={false} animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }} transition={{ duration: 0.3 }} />
                  </motion.svg>
                </span>
                <span className="text-[16px] leading-[1.45] sm:text-[17.5px]">{s}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 flex flex-col gap-5 rounded-2xl bg-[#E7F6FF] p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5">
          <span className="pf-titulo text-[2.6rem] leading-none text-[#12163A]">{total}<span className="text-[#12163A]/30">/5</span></span>
          <AnimatePresence mode="wait">
            <motion.p key={msg} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="max-w-[18rem] font-medium text-[#12163A]">
              {msg}
            </motion.p>
          </AnimatePresence>
        </div>
        <a href="#agendar"
          className={`pf-botao inline-flex shrink-0 items-center justify-center gap-3 rounded-full px-6 py-3.5 text-[14px] font-semibold transition-all duration-500 ${
            total >= 2 ? "bg-[#12163A] text-white [--pf-preenche:#63C8FE] hover:text-[#12163A]" : "bg-[#12163A]/10 text-[#12163A]/50"
          }`}>
          Agendar diagnóstico →
        </a>
      </div>
    </div>
  );
}
