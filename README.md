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
