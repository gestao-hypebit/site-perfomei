"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { LOGO_BARRA, LOGO_CONTORNO, LOGO_VIEWBOX } from "./logo";

const CHAVE = "pf-preloader-visto";

// Roda antes da primeira pintura: pula o preloader em visitas repetidas da sessão
// (ou com movimento reduzido); senão segura as entradas do topo até a cortina subir.
export const SCRIPT_PRELOADER = `try{var d=document.documentElement.dataset;if(sessionStorage.getItem("${CHAVE}")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches)d.pfVisto="";else d.pfCarregando=""}catch(e){document.documentElement.dataset.pfVisto=""}`;

export function Preloader() {
  const [fase, setFase] = useState<"entra" | "sai" | "fim">("entra");

  useEffect(() => {
    const raiz = document.documentElement;
    if ("pfVisto" in raiz.dataset) {
      const f = requestAnimationFrame(() => setFase("fim"));
      return () => cancelAnimationFrame(f);
    }
    raiz.style.overflow = "hidden";
    const t1 = setTimeout(() => {
      try { sessionStorage.setItem(CHAVE, "1"); } catch {}
      delete raiz.dataset.pfCarregando;
      raiz.style.overflow = "";
      setFase("sai");
    }, 1700);
    const t2 = setTimeout(() => setFase("fim"), 2700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      raiz.style.overflow = "";
    };
  }, []);

  if (fase === "fim") return null;
  return (
    <div className={`pf-preloader ${fase === "sai" ? "pf-sai" : ""}`} aria-hidden>
      <div className="flex flex-col items-center gap-6">
        <svg viewBox={LOGO_VIEWBOX} className="h-24 w-auto">
          <defs>
            <linearGradient id="pf-pre-g" gradientUnits="userSpaceOnUse" x1="0" y1="286" x2="0" y2="522">
              <stop offset="0" stopColor="#13C3F2" />
              <stop offset="1" stopColor="#0A84DF" />
            </linearGradient>
          </defs>
          <g fill="none" stroke="url(#pf-pre-g)" strokeWidth="28" strokeLinecap="round" strokeLinejoin="round">
            <path pathLength={1} d={LOGO_CONTORNO} />
            <path pathLength={1} d={LOGO_BARRA} />
          </g>
        </svg>
        <span className="pf-preloader-nome text-[1.6rem] font-bold tracking-[0.04em]" style={{ fontFamily: "var(--font-montserrat)" }}>
          PERFOR<span className="text-[#63C8FE]">MEI</span>
        </span>
      </div>
    </div>
  );
}

/** Linha azul no topo acompanhando a rolagem. */
export function ProgressoRolagem() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 260, damping: 40, mass: 0.2 });
  return <motion.div aria-hidden style={{ scaleX }} className="fixed inset-x-0 top-0 z-[70] h-[2.5px] origin-left bg-[#63C8FE]" />;
}
