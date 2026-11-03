"use client";

import { useEffect } from "react";

// Movimento ao rolar: marca [data-revelar] com .pf-visivel quando entra na tela
// (dispara as entradas, o risco do "antes" e os desenhos dos serviços).
// Quem pede menos movimento no sistema vê tudo pronto, sem animação.
export function Coreografia() {
  useEffect(() => {
    const raiz = document.querySelector<HTMLElement>(".pf");
    if (!raiz) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    raiz.classList.add("pf-anim");
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("pf-visivel");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    raiz.querySelectorAll("[data-revelar]").forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      raiz.classList.remove("pf-anim");
    };
  }, []);

  return null;
}
