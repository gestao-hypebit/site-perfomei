// WhatsApp do Rubens (Performei). Fica fora do componente cliente para a página (servidor) também usar.
export const WHATS = "5591984047100";
export const linkWhats = (msg: string) => `https://wa.me/${WHATS}?text=${encodeURIComponent(msg)}`;
