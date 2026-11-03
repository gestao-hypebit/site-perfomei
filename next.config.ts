import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Fotos enviadas pelo cliente no painel da Slick (Supabase Storage, bucket público).
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/sites-conteudo/**" }],
  },
};

export default nextConfig;
