import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "./performei.css";

// Site da Performei Consultoria (cliente da Slick).
// Bricolage Grotesque (pesada, tamanho óptico) nos títulos, Plus Jakarta Sans no texto
// e nos rótulos, Montserrat só no logo (fonte da marca do cliente).

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const texto = Plus_Jakarta_Sans({
  variable: "--font-texto",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700"],
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
          className={`pf ${texto.variable} ${bricolage.variable} ${montserrat.variable} min-h-screen overflow-x-clip bg-[#12163A] text-white antialiased selection:bg-[#63C8FE] selection:text-[#12163A]`}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
