import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { assinaturaValida, TAG_CONTEUDO } from "@/slick/conteudo";

// Chamada pelo painel da Slick quando o cliente publica: descarta o cache do
// conteúdo para a próxima visita já buscar o novo.

export async function POST(req: NextRequest) {
  if (!assinaturaValida(req.headers.get("x-slick-assinatura"))) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  revalidateTag(TAG_CONTEUDO, { expire: 0 });
  return Response.json({ ok: true });
}
