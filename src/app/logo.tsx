// Logo da Performei em vetor, redesenhado a partir dos arquivos oficiais do cliente (pasta do Drive):
// "P" arredondado com duas barras internas de crescimento (a curta e a alta, que fecha a barriga do P),
// degradê azul + PERFOR/MEI em Montserrat.

// Geometria no espaço do arquivo original (1080 px): traço de 28, barras com base reta.
export const LOGO_VIEWBOX = "436 282 202 244";
export const LOGO_CONTORNO = "M454 506V341a41 41 0 0 1 41-41h85a41 41 0 0 1 41 41v64a55 55 0 0 1-55 55V356";
export const LOGO_BARRA = "M510 462V380";

export function IconePerformei({ className = "", id = "pm" }: { className?: string; id?: string }) {
  return (
    <svg viewBox={LOGO_VIEWBOX} className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}-g`} gradientUnits="userSpaceOnUse" x1="0" y1="286" x2="0" y2="522">
          <stop offset="0" stopColor="#13C3F2" />
          <stop offset="1" stopColor="#0A84DF" />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#${id}-g)`} strokeWidth="28" strokeLinecap="round" strokeLinejoin="round">
        <path d={LOGO_CONTORNO} />
        <path d={LOGO_BARRA} />
      </g>
      {/* base reta da barra curta, como no original */}
      <rect x="496" y="446" width="28" height="28" fill={`url(#${id}-g)`} />
    </svg>
  );
}

export function LogoPerformei({ claro = false, comSlogan = true, className = "" }: {
  // claro = sobre fundo escuro (PERFOR em branco)
  claro?: boolean;
  comSlogan?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} style={{ fontFamily: "var(--font-montserrat)" }}>
      <IconePerformei className="h-9 w-auto shrink-0" id={claro ? "pm-claro" : "pm-escuro"} />
      <span className="flex flex-col leading-none">
        <span className="text-[1.35rem] font-bold tracking-[0.02em]">
          <span className={claro ? "text-white" : "text-[#1C2149]"}>PERFOR</span>
          <span className="text-[#63C8FE]">MEI</span>
          <sup className={`ml-0.5 text-[0.5rem] font-semibold ${claro ? "text-white/80" : "text-[#1C2149]/70"}`}>®</sup>
        </span>
        {comSlogan && (
          <span className={`mt-1 text-[0.52rem] font-bold tracking-[0.04em] ${claro ? "text-white/85" : "text-[#1C2149]"}`}>
            CONSULTORIA PARA PEQUENAS EMPRESAS
          </span>
        )}
      </span>
    </span>
  );
}
