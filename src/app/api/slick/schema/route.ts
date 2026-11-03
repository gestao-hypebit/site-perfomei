import { estruturaParaPainel } from "@/slick/estrutura";

// Seções e campos editáveis, lidos pelo painel da Slick ("Atualizar estrutura do site").
// Público de propósito: só descreve os campos e os textos padrão, que já estão no site.

export const dynamic = "force-static";

export function GET() {
  return Response.json(estruturaParaPainel());
}
