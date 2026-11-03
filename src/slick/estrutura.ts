// O que o cliente pode editar no painel da Slick, seção por seção.
// Os textos "padrao" são o conteúdo atual do site: valem até o cliente
// publicar uma mudança (e continuam valendo para o que ele não mexer).
//
// Marcações aceitas nos textos (ver ./rico.tsx):
//   *trecho*   → destaque azul (marca-texto)
//   **trecho** → negrito
//   ~trecho~   → trecho apagado (só em alguns títulos)
//
// Mudou algo aqui? Publique o site e clique em "Atualizar estrutura do site"
// no editor do administrativo.

type CampoSimples = {
  tipo: "texto" | "textarea" | "imagem" | "link";
  rotulo: string;
  padrao: string;
  ajuda?: string;
  max?: number;
};
type Subcampo = Omit<CampoSimples, "padrao">;
type CampoLista = {
  tipo: "lista";
  rotulo: string;
  itemRotulo: string;
  ajuda?: string;
  min?: number;
  maxItens?: number;
  campos: Record<string, Subcampo>;
  padrao: Record<string, string>[];
};
type Secao = { titulo: string; descricao?: string; campos: Record<string, CampoSimples | CampoLista> };

const DESTAQUE = "Use *asteriscos* no trecho com marca-texto azul.";

export const ESTRUTURA = {
  hero: {
    titulo: "Topo",
    descricao: "A primeira coisa que o visitante vê.",
    campos: {
      titulo: { tipo: "texto", rotulo: "Título", max: 90, ajuda: DESTAQUE, padrao: "Você trabalha muito. Falta *enxergar o resultado*." },
      texto: { tipo: "textarea", rotulo: "Texto abaixo do título", max: 320, ajuda: "Use **dois asteriscos** para negrito.", padrao: "A Performei organiza as finanças, os preços e a rotina da sua empresa para você decidir com clareza. **Consultoria de verdade, na língua de quem toca o negócio.**" },
      botao: { tipo: "texto", rotulo: "Botão principal", max: 30, padrao: "Agendar um horário" },
      foto: { tipo: "imagem", rotulo: "Foto (sem fundo)", ajuda: "PNG ou WebP com fundo transparente, pessoa recortada da cintura para cima.", padrao: "/fotos/rubens-recorte.webp" },
      selo_nome: { tipo: "texto", rotulo: "Nome de quem está na foto", max: 40, padrao: "Rubens Queiroz" },
      diferenciais: {
        tipo: "lista", rotulo: "Faixa escura do topo", itemRotulo: "Item", min: 2, maxItens: 4,
        ajuda: "Os ícones seguem a ordem: diagnóstico, finanças, estratégia, acompanhamento.",
        campos: {
          titulo: { tipo: "texto", rotulo: "Título", max: 30 },
          texto: { tipo: "texto", rotulo: "Texto", max: 70 },
        },
        padrao: [
          { titulo: "Diagnóstico empresarial", texto: "Raio-x de finanças, preços e operação." },
          { titulo: "Consultoria financeira", texto: "Caixa organizado e preço com margem real." },
          { titulo: "Planejamento estratégico", texto: "Metas, plano e processos definidos." },
          { titulo: "Acompanhamento de perto", texto: "Do diagnóstico até sair do papel." },
        ],
      },
    },
  },
  diferenca: {
    titulo: "Antes × depois",
    descricao: "Comparação entre o improviso e a gestão com a Performei.",
    campos: {
      titulo: { tipo: "texto", rotulo: "Título", max: 90, ajuda: `${DESTAQUE} Use ~til~ no trecho mais apagado.`, padrao: "Mesma empresa. ~Outro jeito de~ *tocar*." },
      texto: { tipo: "textarea", rotulo: "Texto ao lado do título", max: 240, padrao: "O improviso sai riscado, a gestão entra no lugar. Não é mágica: é método, número e acompanhamento." },
      rotulo_antes: { tipo: "texto", rotulo: "Nome da coluna “antes”", max: 30, padrao: "No improviso" },
      rotulo_depois: { tipo: "texto", rotulo: "Nome da coluna “depois”", max: 30, padrao: "Com a Performei" },
      itens: {
        tipo: "lista", rotulo: "Comparações", itemRotulo: "Comparação", min: 1, maxItens: 6,
        campos: {
          tema: { tipo: "texto", rotulo: "Tema", max: 20 },
          antes: { tipo: "textarea", rotulo: "Antes (aparece riscado)", max: 160 },
          depois: { tipo: "textarea", rotulo: "Depois", max: 160 },
        },
        padrao: [
          { tema: "Caixa", antes: "“Entrou dinheiro, então tá bom.” E o rombo só aparece no fim do mês.", depois: "Você sabe quanto entra, quanto sai e quanto sobra. Toda semana, sem susto." },
          { tema: "Preço", antes: "Copiado do concorrente ou no chute. Vende muito e continua apertado.", depois: "Preço calculado com custo e margem: cada venda paga a conta e deixa lucro." },
          { tema: "Rotina", antes: "Tudo passa por você. Férias? Só no feriado, e com o celular na mão.", depois: "Processos e responsáveis definidos. A empresa anda sem você empurrando." },
          { tema: "Futuro", antes: "Quem decide o mês é o boleto que vence amanhã.", depois: "Metas e um plano: você sabe aonde quer chegar e qual é o próximo passo." },
        ],
      },
    },
  },
  servicos: {
    titulo: "Serviços",
    descricao: "Os cartões que se empilham ao rolar. Cada posição tem uma cor fixa (branco, azul, escuro).",
    campos: {
      titulo: { tipo: "texto", rotulo: "Título", max: 110, ajuda: DESTAQUE, padrao: "Três frentes, um objetivo: uma empresa que *dá lucro* e tem rumo." },
      texto: { tipo: "textarea", rotulo: "Texto ao lado do título", max: 240, padrao: "Dá pra começar por uma delas ou combinar as três. O diagnóstico mostra qual faz mais diferença agora." },
      itens: {
        tipo: "lista", rotulo: "Serviços", itemRotulo: "Serviço", min: 1, maxItens: 3,
        campos: {
          nome: { tipo: "texto", rotulo: "Nome do serviço", max: 40 },
          gancho: { tipo: "texto", rotulo: "Frase grande", max: 70, ajuda: DESTAQUE },
          texto: { tipo: "textarea", rotulo: "Descrição", max: 260 },
          entregas: { tipo: "textarea", rotulo: "O que está incluso", max: 300, ajuda: "Um item por linha (até 6)." },
          botao: { tipo: "texto", rotulo: "Texto do botão", max: 30 },
        },
        padrao: [
          { nome: "Diagnóstico empresarial", gancho: "Descubra *onde* o dinheiro está vazando.", texto: "O raio-x da empresa: finanças, preços e operação olhados de perto, para você saber o que resolver primeiro.", entregas: "Raio-x de 10 áreas da empresa\nRelatório de maturidade\nMapa de gargalos\nLista de prioridades", botao: "Quero meu diagnóstico" },
          { nome: "Consultoria financeira", gancho: "Saiba quanto *sobra*, não só quanto entra.", texto: "Caixa organizado, dinheiro da empresa separado do seu e preço com margem real. Números que você entende e usa.", entregas: "Fluxo de caixa\nPrecificação com margem\nSeparação PF × PJ\nLeitura mensal dos números", botao: "Quero organizar o caixa" },
          { nome: "Planejamento estratégico", gancho: "Uma empresa que anda *sem você* empurrando.", texto: "Metas possíveis, plano por etapas, processos e responsáveis definidos, e acompanhamento para tudo sair do papel.", entregas: "Metas e indicadores\nPlano de ação\nProcessos e funções\nAcompanhamento", botao: "Quero um plano" },
        ],
      },
    },
  },
  fatos: {
    titulo: "Credenciais",
    descricao: "A faixa com os números em azul.",
    campos: {
      itens: {
        tipo: "lista", rotulo: "Credenciais", itemRotulo: "Credencial", min: 2, maxItens: 4,
        campos: {
          valor: { tipo: "texto", rotulo: "Destaque (curto)", max: 10 },
          rotulo: { tipo: "texto", rotulo: "Explicação", max: 90 },
        },
        padrao: [
          { valor: "CRA-PA", rotulo: "Administrador registrado no Conselho Regional do Pará" },
          { valor: "ACP", rotulo: "Consultor empresarial certificado pela Associação Comercial do Pará" },
          { valor: "1:1", rotulo: "Você fala direto com o Rubens, do diagnóstico ao acompanhamento" },
          { valor: "3", rotulo: "frentes de trabalho: diagnóstico, finanças e estratégia" },
        ],
      },
    },
  },
  para_quem: {
    titulo: "Para quem é",
    descricao: "Texto ao lado do checklist.",
    campos: {
      titulo: { tipo: "texto", rotulo: "Título", max: 90, ajuda: DESTAQUE, padrao: "Marcou dois ou mais? *É com você* que eu quero falar." },
      texto: { tipo: "textarea", rotulo: "Texto", max: 300, padrao: "Consultoria não precisa ser coisa de empresa grande. A Performei existe para o pequeno empresário que carrega o negócio nas costas e quer crescer com mais controle." },
    },
  },
  sobre: {
    titulo: "Sobre",
    campos: {
      titulo: { tipo: "texto", rotulo: "Título", max: 100, ajuda: DESTAQUE, padrao: "Quero ajudar a transformar o Pará em um estado *mais empreendedor*." },
      texto: { tipo: "textarea", rotulo: "Texto", max: 1200, ajuda: "Deixe uma linha em branco entre os parágrafos. Use **dois asteriscos** para negrito.", padrao: "Oi! Eu sou o Rubens, apaixonado por empreendedorismo. Vejo todo dia pequenos empresários trabalhando demais e colhendo de menos, não por falta de esforço, mas por falta de alguém que traduza a gestão para a realidade deles.\n\nFui estudar e me especializar para isso. Hoje sou Administrador registrado no CRA-PA, consultor empresarial certificado pela Associação Comercial do Pará e fundador da Performei, com uma ideia simples: **consultoria mais acessível, próxima e fácil de entender.**" },
      foto: { tipo: "imagem", rotulo: "Foto", ajuda: "Foto vertical (4:5).", padrao: "/fotos/rubens-notebook.jpg" },
      nome: { tipo: "texto", rotulo: "Selo: nome", max: 40, padrao: "Rubens Queiroz" },
      cargo: { tipo: "texto", rotulo: "Selo: cargo", max: 40, padrao: "Fundador e CEO" },
      link_instagram: { tipo: "texto", rotulo: "Texto do link do Instagram", max: 70, padrao: "Me acompanhe no Instagram · @performeiconsultoria" },
    },
  },
  depoimentos: {
    titulo: "Depoimentos",
    descricao: "O primeiro aparece grande, em azul.",
    campos: {
      titulo: { tipo: "texto", rotulo: "Título", max: 70, ajuda: DESTAQUE, padrao: "Não acredite em mim. *Acredite neles.*" },
      itens: {
        tipo: "lista", rotulo: "Depoimentos", itemRotulo: "Depoimento", min: 1, maxItens: 5,
        campos: {
          nome: { tipo: "texto", rotulo: "Nome", max: 50 },
          empresa: { tipo: "texto", rotulo: "Empresa / cargo", max: 70 },
          destaque: { tipo: "texto", rotulo: "Frase em destaque", max: 90 },
          texto: { tipo: "textarea", rotulo: "Depoimento", max: 600 },
        },
        padrao: [
          { nome: "Renata Almeida", empresa: "Canto das Flores · Psicologia e Arte", destaque: "Um lugar que já era bom se tornou melhor ainda.", texto: "Rubens me trouxe uma perspectiva valiosa, identificando pontos de melhoria que muitas vezes passavam desapercebidos por mim. Suas recomendações práticas e estratégicas me permitiram ter mais saúde e tranquilidade em meu consultório. Também tenho obtido retornos tanto financeiro como de expansão de parcerias a partir dos planejamentos feitos pela consultoria. Recomendo fortemente a Performei!" },
          { nome: "Heitor Pereira", empresa: "CEO · Heitor Pereira Curso de Idiomas", destaque: "Nos ajudaram a chegar onde estamos hoje.", texto: "Os serviços da Performei sempre foram super úteis e nos ajudaram a chegar onde estamos hoje. Sempre fomos bem atendidos com orientações técnicas de finanças e marketing que nos ajudaram a crescer. Muito obrigado, Rubens Queiroz." },
          { nome: "Vera Oyola", empresa: "Sol e Mar Piscinas e Saunas", destaque: "Muito importante para a organização da empresa.", texto: "A Performei vem sendo muito importante para a organização da empresa no âmbito financeiro e organizacional. Com as suas técnicas vem interagindo com a equipe de forma excelente, buscando o engajamento em todas as etapas do processo." },
        ],
      },
    },
  },
  duvidas: {
    titulo: "Dúvidas",
    campos: {
      titulo: { tipo: "texto", rotulo: "Título", max: 60, ajuda: DESTAQUE, padrao: "Ficou alguma *dúvida*?" },
      foto: { tipo: "imagem", rotulo: "Foto pequena", ajuda: "Aparece pequena e quadrada.", padrao: "/fotos/rubens-sala-reuniao.jpg" },
      texto: { tipo: "textarea", rotulo: "Texto ao lado da foto", max: 160, ajuda: "Use **dois asteriscos** para negrito.", padrao: "Se a sua não estiver aqui, me chama no WhatsApp. **Respondo pessoalmente.**" },
      itens: {
        tipo: "lista", rotulo: "Perguntas", itemRotulo: "Pergunta", min: 1, maxItens: 15,
        campos: {
          pergunta: { tipo: "texto", rotulo: "Pergunta", max: 120 },
          resposta: { tipo: "textarea", rotulo: "Resposta", max: 900 },
        },
        padrao: [
          { pergunta: "Minha empresa é pequena demais para ter consultoria?", resposta: "Muito pelo contrário. É justamente quando a empresa é menor que dá para construir bases sólidas, organizar os números e definir a estratégia certa desde o início. Assim o crescimento vem planejado, sem incêndio para apagar depois. Pequeno é o tamanho perfeito para crescer certo." },
          { pergunta: "Já tenho contador. Vocês fazem a mesma coisa?", resposta: "Não. Seu contador é essencial para a saúde fiscal e legal da empresa. A Performei entra para te ajudar a entender o que esses números significam, transformar dados em decisões e criar um plano claro para os seus objetivos. O contador garante que a empresa esteja em dia; a gente pensa junto com você para ela ir além. É trabalho em equipe." },
          { pergunta: "Meus números são um mistério para mim. E agora?", resposta: "É o cenário mais comum, e é exatamente aí que eu entro. Não tenho bola de cristal, mas tenho método: descomplico seus dados, transformo planilha em decisão e mostro onde o lucro está escondido. Chega de adivinhar." },
          { pergunta: "Consultoria não é só para empresa grande e com orçamento?", resposta: "A Performei é feita sob medida para a realidade do pequeno empresário. Acesso a organização e estratégia não deveria ser privilégio de gigante. Depois da primeira conversa você recebe uma proposta clara, com escopo e investimento definidos, sem surpresa." },
          { pergunta: "Já estou afogado em tarefas. A consultoria vai me dar mais trabalho?", resposta: "A ideia é justamente o oposto. No começo há um pequeno esforço conjunto para alinhar tudo, mas o objetivo é organizar a empresa, otimizar processos e liberar o seu tempo e a sua cabeça para o que realmente importa." },
          { pergunta: "O que eu ganho, afinal? Mais números para analisar?", resposta: "Você ganha clareza, direção, um plano de ação e a segurança de estar tomando as melhores decisões. O objetivo não é só entender os números: é usar os números para crescer e ter um negócio mais lucrativo e sustentável." },
          { pergunta: "Depois que a consultoria termina, fico sozinho de novo?", resposta: "De jeito nenhum. A missão é deixar você e sua equipe com autonomia para saber o que fazer. E, se fizer sentido para o seu negócio, a Performei também pode assumir processos que tomam o seu tempo. Eu te ensino a pescar, e também posso pescar por você." },
        ],
      },
    },
  },
  agendar: {
    titulo: "Agendar",
    descricao: "A seção final, com o formulário.",
    campos: {
      titulo: { tipo: "texto", rotulo: "Título", max: 60, ajuda: DESTAQUE, padrao: "Bora colocar *ordem na casa*?" },
      texto: { tipo: "textarea", rotulo: "Texto abaixo do título", max: 240, padrao: "Um bate-papo de 30 minutos, sem compromisso. A gente conversa sobre a sua empresa e você tira todas as dúvidas." },
      form_texto: { tipo: "textarea", rotulo: "Aviso abaixo do formulário", max: 200, padrao: "Leva 30 segundos. A mensagem chega no meu WhatsApp e eu respondo para combinar o melhor dia e horário." },
    },
  },
  contatos: {
    titulo: "Contatos",
    descricao: "Usados nos botões, no formulário e no rodapé.",
    campos: {
      whatsapp: { tipo: "texto", rotulo: "WhatsApp", max: 20, ajuda: "Com DDD, ex.: (91) 98404-7100. É para onde vão os agendamentos.", padrao: "(91) 98404-7100" },
      email: { tipo: "texto", rotulo: "E-mail", max: 80, padrao: "performeiconsultoria@gmail.com" },
      instagram: { tipo: "link", rotulo: "Link do Instagram", padrao: "https://www.instagram.com/performeiconsultoria/" },
      endereco: { tipo: "texto", rotulo: "Endereço (título do mapa)", max: 120, padrao: "Do It Hub · Rua Avertano Rocha, 192 · Campina, Belém" },
      endereco_mapa: { tipo: "texto", rotulo: "Endereço para o mapa", max: 160, ajuda: "Endereço completo, do jeito que você buscaria no Google Maps.", padrao: "Rua Avertano Rocha, 192 - Campina, Belém - PA, 66023-120" },
    },
  },
} satisfies Record<string, Secao>;

// ------------------------------------------------------------------
// Tipos do conteúdo, derivados da estrutura acima.
// ------------------------------------------------------------------

type E = typeof ESTRUTURA;
type ValorDe<C> = C extends { tipo: "lista"; campos: infer S } ? ({ _id: string } & { [K in keyof S]: string })[] : string;
export type Conteudo = { [S in keyof E]: { [K in keyof E[S]["campos"]]: ValorDe<E[S]["campos"][K]> } };

type Bruto = Record<string, Record<string, unknown>>;
const entradas = <T,>(o: Record<string, T>) => Object.entries(o) as [string, T][];

export function conteudoPadrao(): Conteudo {
  const out: Bruto = {};
  for (const [sid, secao] of entradas<Secao>(ESTRUTURA)) {
    out[sid] = {};
    for (const [cid, campo] of entradas(secao.campos)) {
      out[sid][cid] = campo.tipo === "lista" ? campo.padrao.map((item, i) => ({ _id: `p${i}`, ...item })) : campo.padrao;
    }
  }
  return out as unknown as Conteudo;
}

// Publicado por cima dos padrões, campo a campo. Tipo errado ou campo que o
// site não conhece é ignorado: o site nunca quebra por causa do painel.
export function mesclarConteudo(publicado: unknown): Conteudo {
  const base = conteudoPadrao() as unknown as Bruto;
  if (!publicado || typeof publicado !== "object") return base as unknown as Conteudo;
  const pub = publicado as Bruto;
  for (const [sid, secao] of entradas<Secao>(ESTRUTURA)) {
    const vs = pub[sid];
    if (!vs || typeof vs !== "object") continue;
    for (const [cid, campo] of entradas(secao.campos)) {
      const v = vs[cid];
      if (campo.tipo === "lista") {
        if (!Array.isArray(v)) continue;
        const itens = v
          .filter((x): x is Record<string, unknown> => !!x && typeof x === "object")
          .slice(0, campo.maxItens ?? 50)
          .map((x, i) => {
            const item: Record<string, string> = { _id: typeof x._id === "string" ? x._id : `i${i}` };
            for (const sub of Object.keys(campo.campos)) item[sub] = typeof x[sub] === "string" ? (x[sub] as string) : "";
            return item;
          });
        if (itens.length >= (campo.min ?? 0)) base[sid][cid] = itens;
      } else if (typeof v === "string") {
        // Imagem/link vazio volta para o padrão; texto vazio é escolha do cliente.
        if ((campo.tipo === "imagem" || campo.tipo === "link") && !v.trim()) continue;
        base[sid][cid] = v;
      }
    }
  }
  return base as unknown as Conteudo;
}

// Formato que o painel entende (GET /api/slick/schema).
export function estruturaParaPainel() {
  return {
    versao: 1,
    secoes: entradas<Secao>(ESTRUTURA).map(([id, s]) => ({
      id,
      titulo: s.titulo,
      descricao: s.descricao,
      campos: entradas(s.campos).map(([cid, c]) =>
        c.tipo === "lista"
          ? { ...c, id: cid, campos: entradas(c.campos).map(([sid, sub]) => ({ id: sid, ...sub })), padrao: c.padrao.map((item, i) => ({ _id: `p${i}`, ...item })) }
          : { id: cid, ...c },
      ),
    })),
  };
}
