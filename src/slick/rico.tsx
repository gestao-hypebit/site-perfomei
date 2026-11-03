import { Fragment, type CSSProperties, type ReactNode } from "react";

// Texto vindo do painel com marcações simples, sem HTML:
//   *trecho*   → destaque (marca-texto azul por padrão)
//   **trecho** → negrito
//   ~trecho~   → apagado
// O texto é sempre renderizado como texto pelo React (nada de innerHTML).

const MARCAS = /(\*\*[^*]+\*\*|\*[^*]+\*|~[^~]+~)/g;

export function Rico({
  texto,
  destaque = "pf-tarja",
  negrito = "font-semibold",
  apagado = "opacity-35",
  estiloDestaque,
}: {
  texto: string;
  destaque?: string;
  negrito?: string;
  apagado?: string;
  estiloDestaque?: CSSProperties;
}) {
  const partes = texto.split(MARCAS).filter(Boolean);
  return (
    <>
      {partes.map((p, i): ReactNode => {
        if (p.startsWith("**") && p.endsWith("**") && p.length > 4) return <strong key={i} className={negrito}>{p.slice(2, -2)}</strong>;
        if (p.startsWith("*") && p.endsWith("*") && p.length > 2) return <span key={i} className={destaque} style={estiloDestaque}>{p.slice(1, -1)}</span>;
        if (p.startsWith("~") && p.endsWith("~") && p.length > 2) return <span key={i} className={apagado}>{p.slice(1, -1)}</span>;
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}

// Parágrafos separados por linha em branco.
export function paragrafos(texto: string) {
  return texto.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
}

// Lista "um por linha".
export function linhas(texto: string, max = 12) {
  return texto.split("\n").map((l) => l.trim()).filter(Boolean).slice(0, max);
}

// (91) 98404-7100 → 5591984047100
export function numeroWhats(telefone: string) {
  let d = telefone.replace(/\D/g, "");
  if (d.length === 10 || d.length === 11) d = `55${d}`;
  return d;
}

export function emailValido(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) ? e : null;
}
