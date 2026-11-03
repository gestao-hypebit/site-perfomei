# Performei Consultoria — site

Site institucional da Performei Consultoria (Rubens Queiroz, Belém/PA). Feito pela Slick.

Next.js 16 + Tailwind 4 + framer-motion. Página única em `src/app/page.tsx`;
o visual fica em `src/app/performei.css` (classes `.pf-*`) e as fotos em `public/fotos/`.

```bash
npm install
npm run dev      # http://localhost:3002
npm run build
```

## Pendências

- Ainda em prévia: `robots` está como `noindex` em `src/app/layout.tsx`. Liberar no lançamento.

## Leads

O formulário de agendamento (`src/app/agendar.tsx`) abre o WhatsApp do Rubens com a mensagem pronta
e, em paralelo, envia o pedido para o painel da Slick (`src/app/actions.ts`, pelo servidor).
O Rubens vê os pedidos no portal do cliente, aba "Meu site".

Configure `SLICK_API_URL` e `SLICK_SITE_KEY` (veja `.env.example`) na Vercel e no `.env.local`.
Sem elas, o site funciona normalmente e só não envia para o painel.

## Conteúdo editável (painel da Slick)

Os textos, fotos e listas da página vêm do painel (`src/slick/`). Os textos atuais ficam como padrão em
`src/slick/estrutura.ts`: valem enquanto o cliente não publicar nada (e o site funciona igual sem o painel).

- Mudou campos em `estrutura.ts`? Depois do deploy, no administrativo: **Editar conteúdo → Atualizar estrutura do site**.
- Marcações nos textos: `*destaque azul*`, `**negrito**`, `~apagado~`.
- O painel avisa o site ao publicar (`/api/slick/revalidar`); o cache também expira sozinho em 5 min.
