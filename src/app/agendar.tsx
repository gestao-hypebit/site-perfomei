"use client";

import { useState } from "react";
import { linkWhats } from "./whats";
import { enviarAgendamento } from "./actions";

// O formulário monta a mensagem e abre o WhatsApp do Rubens já preenchido (o pedido
// chega com contexto e ele só confirma o horário). Em paralelo, o pedido vai para o
// painel da Slick, para o Rubens ter a lista de contatos mesmo se a conversa não sair.

const DESAFIOS = [
  "Organizar as finanças e o caixa",
  "Definir preços com margem de verdade",
  "Ter um plano e metas para crescer",
  "Parar de depender só de mim na operação",
  "Ainda não sei, quero um diagnóstico",
];
const PERIODOS = ["Manhã", "Tarde", "Fim de tarde"];

// (91) 98404-7100 enquanto digita.
function mascaraTelefone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function utmDaUrl() {
  const p = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"]) {
    const v = p.get(k);
    if (v) utm[k] = v;
  }
  return utm;
}

const campo =
  "w-full border-0 border-b border-white/25 bg-transparent px-0 py-3 text-[16px] text-white placeholder:text-white/35 transition-colors focus:border-[#63C8FE] focus:outline-none focus:ring-0";

export function FormAgendar() {
  const [periodo, setPeriodo] = useState(PERIODOS[0]);
  const [telefone, setTelefone] = useState("");

  function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const nome = String(f.get("nome") ?? "").trim();
    const empresa = String(f.get("empresa") ?? "").trim();
    const desafio = String(f.get("desafio") ?? "");
    const msg = [
      "Olá, Rubens! Vim pelo site e quero agendar um horário.",
      "",
      `Nome: ${nome}`,
      `Empresa: ${empresa}`,
      `O que mais pesa hoje: ${desafio}`,
      `Melhor período: ${periodo}`,
    ].join("\n");
    // Abre primeiro, ainda dentro do clique: depois de um await o navegador bloquearia a janela.
    window.open(linkWhats(msg), "_blank", "noopener");
    void enviarAgendamento({
      nome,
      telefone,
      empresa,
      desafio,
      periodo,
      pagina: window.location.href,
      utm: utmDaUrl(),
      _hp: String(f.get("site") ?? ""),
    });
  }

  return (
    <form onSubmit={enviar} className="grid gap-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block">
          <span className="text-[13px] font-medium uppercase tracking-[0.12em] text-white/50">Seu nome</span>
          <input name="nome" required autoComplete="name" placeholder="Como posso te chamar?" className={campo} />
        </label>
        <label className="block">
          <span className="text-[13px] font-medium uppercase tracking-[0.12em] text-white/50">Empresa</span>
          <input name="empresa" required autoComplete="organization" placeholder="Nome e ramo do negócio" className={campo} />
        </label>
      </div>

      <label className="block">
        <span className="text-[13px] font-medium uppercase tracking-[0.12em] text-white/50">Seu WhatsApp</span>
        <input
          name="telefone"
          type="tel"
          required
          autoComplete="tel-national"
          inputMode="tel"
          placeholder="(91) 91234-5678"
          pattern="\(\d{2}\) \d{4,5}-\d{4}"
          title="DDD + número, ex.: (91) 91234-5678"
          value={telefone}
          onChange={(e) => setTelefone(mascaraTelefone(e.target.value))}
          className={campo}
        />
      </label>

      {/* Armadilha para robô: escondido de pessoas e leitores de tela. */}
      <input name="site" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-px w-px opacity-0" />

      <label className="block">
        <span className="text-[13px] font-medium uppercase tracking-[0.12em] text-white/50">O que mais pesa hoje?</span>
        <select name="desafio" defaultValue={DESAFIOS[0]} className={`${campo} cursor-pointer appearance-none bg-[length:16px] bg-[right_center] bg-no-repeat`}
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2363C8FE' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }}>
          {DESAFIOS.map((d) => (
            <option key={d} className="bg-[#1C2149] text-white">{d}</option>
          ))}
        </select>
      </label>

      <fieldset>
        <legend className="text-[13px] font-medium uppercase tracking-[0.12em] text-white/50">Melhor período para conversar</legend>
        <div className="mt-4 flex flex-wrap gap-3">
          {PERIODOS.map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={periodo === p}
              onClick={() => setPeriodo(p)}
              className={`rounded-full border px-5 py-2.5 text-[14px] transition-colors ${
                periodo === p ? "border-[#63C8FE] bg-[#63C8FE] text-[#1C2149]" : "border-white/25 text-white/75 hover:border-white/60"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        className="pf-botao mt-2 inline-flex items-center justify-between gap-6 rounded-full bg-[#63C8FE] px-7 py-[18px] text-[15px] font-semibold text-[#1C2149] sm:justify-self-start"
      >
        Enviar e agendar pelo WhatsApp
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className="pf-seta" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12h16" /><path d="m14 6 6 6-6 6" />
        </svg>
      </button>
      <p className="-mt-4 text-[13px] text-white/45">Abre o WhatsApp com a mensagem pronta. É só apertar enviar.</p>
    </form>
  );
}
