import { createHash, timingSafeEqual } from "node:crypto";
import { mesclarConteudo, type Conteudo } from "./estrutura";

// Busca no painel da Slick o conteúdo que o cliente publicou.
// Cache de 5 min com a tag abaixo; ao publicar, o painel chama
// /api/slick/revalidar e o site busca de novo na hora.
// Sem painel configurado ou fora do ar: usa os textos padrão (estrutura.ts).

export const TAG_CONTEUDO = "slick-conteudo";

export async function getConteudo(): Promise<Conteudo> {
  const url = process.env.SLICK_API_URL?.replace(/\/$/, "");
  const chave = process.env.SLICK_SITE_KEY;
  if (!url || !chave) return mesclarConteudo(null);

  try {
    const res = await fetch(`${url}/api/publico/sites/conteudo`, {
      headers: { "x-site-key": chave },
      next: { revalidate: 300, tags: [TAG_CONTEUDO] },
    });
    if (!res.ok) {
      console.error("[conteudo] painel respondeu", res.status);
      return mesclarConteudo(null);
    }
    const { conteudo } = (await res.json()) as { conteudo: unknown };
    return mesclarConteudo(conteudo);
  } catch (e) {
    console.error("[conteudo] painel fora do ar", e);
    return mesclarConteudo(null);
  }
}

// O painel prova que é ele mandando o hash da chave do site (que só o painel e o site conhecem).
export function assinaturaValida(recebida: string | null) {
  const chave = process.env.SLICK_SITE_KEY;
  if (!chave || !recebida) return false;
  const esperado = Buffer.from(createHash("sha256").update(chave).digest("hex"));
  const veio = Buffer.from(recebida);
  return esperado.length === veio.length && timingSafeEqual(esperado, veio);
}
