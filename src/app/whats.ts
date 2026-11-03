// WhatsApp do Rubens (Performei). O número vem do painel (seção Contatos); este é o reserva.
// Fica fora do componente cliente para a página (servidor) também usar.
export const WHATS = "5591984047100";
export const linkWhats = (msg: string, numero: string = WHATS) => `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`;
