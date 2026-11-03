"use server";

// Envia o pedido de agendamento para o painel da Slick (aparece para o Rubens no portal).
// Roda no servidor: a chave do site (SLICK_SITE_KEY) nunca vai para o navegador.
// Se o painel estiver fora ou sem configuração, não faz nada: o WhatsApp já abriu.

type Agendamento = {
  nome: string;
  telefone: string;
  empresa: string;
  desafio: string;
  periodo: string;
  pagina?: string;
  utm?: Record<string, string>;
  _hp?: string;
};

export async function enviarAgendamento(dados: Agendamento): Promise<boolean> {
  const url = process.env.SLICK_API_URL;
  const chave = process.env.SLICK_SITE_KEY;
  if (!url || !chave) return false;

  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/api/publico/sites/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-site-key": chave },
      body: JSON.stringify({
        formulario: "agendar",
        nome: dados.nome,
        telefone: dados.telefone,
        campos: [
          { chave: "empresa", rotulo: "Empresa", valor: dados.empresa },
          { chave: "desafio", rotulo: "O que mais pesa hoje", valor: dados.desafio },
          { chave: "periodo", rotulo: "Melhor período", valor: dados.periodo },
        ],
        pagina: dados.pagina,
        utm: dados.utm,
        _hp: dados._hp,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) console.error("[agendar] painel respondeu", res.status);
    return res.ok;
  } catch (e) {
    console.error("[agendar] envio ao painel", e);
    return false;
  }
}
