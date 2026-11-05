import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./performei.css";

// Site da Performei Consultoria (cliente da Slick).
// Urbanist 800 nos títulos, Plus Jakarta Sans no texto
// e nos rótulos, Montserrat só no logo (fonte da marca do cliente).
// Fontes dentro do projeto (fonts/, licença OFL): com next/font/google o build falha
// quando o Google devolve URL com "&" (/l/font?kit=...&skey=...), o que acontece às vezes.

const urbanist = localFont({
  src: "./fonts/urbanist-latin-wght-normal.woff2",
  variable: "--font-urbanist",
  weight: "100 900",
  display: "swap",
  // A área vertical original (0,95 + 0,25) faz o marca-texto cobrir a linha vizinha.
  declarations: [
    { prop: "ascent-override", value: "80%" },
    { prop: "descent-override", value: "25%" },
    { prop: "line-gap-override", value: "0%" },
  ],
});

const texto = localFont({
  src: "./fonts/plus-jakarta-sans-latin-wght-normal.woff2",
  variable: "--font-texto",
  weight: "200 800",
  display: "swap",
});

const montserrat = localFont({
  src: "./fonts/montserrat-latin-wght-normal.woff2",
  variable: "--font-montserrat",
  weight: "100 900",
  display: "swap",
});

// Ainda em prévia: fora do Google até o lançamento. No lançamento, trocar
// robots para index/follow e preencher metadataBase, canonical e openGraph.
export const metadata: Metadata = {
  title: "Performei Consultoria | Consultoria para pequenas empresas em Belém",
  description:
    "Consultoria para pequenas empresas em Belém/PA: diagnóstico empresarial, consultoria financeira e planejamento estratégico com Rubens Queiroz.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export const viewport: Viewport = {
  themeColor: "#12163A",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: o script do preloader marca o <html> antes da hidratação.
    <html lang="pt-BR" className="scroll-smooth" suppressHydrationWarning>
      <body className="bg-[#12163A]">
        <div
          className={`pf ${texto.variable} ${urbanist.variable} ${montserrat.variable} min-h-screen overflow-x-clip bg-[#12163A] text-white antialiased selection:bg-[#63C8FE] selection:text-[#12163A]`}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
