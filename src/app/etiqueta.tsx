// Etiqueta acima do título: diz ao visitante em que parte da página ele está.
// Texto vazio (o cliente pode apagar no painel) não mostra nada.
export function Etiqueta({ texto, tema, className = "mb-6" }: { texto: string; tema: "claro" | "escuro"; className?: string }) {
  if (!texto.trim()) return null;
  const cores = tema === "claro"
    ? "border-[#12163A]/15 text-[#12163A]/70 [--pf-ponto:#1A7BB8]"
    : "border-white/15 bg-white/[0.04] text-white/70 [--pf-ponto:#63C8FE]";
  return (
    <p data-revelar className={`pf-mono inline-flex items-center gap-2 self-start whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[12px] uppercase tracking-[0.14em] ${className} ${cores}`}>
      <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--pf-ponto)]" />
      {texto}
    </p>
  );
}
