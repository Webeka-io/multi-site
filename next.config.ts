import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Ne bloque plus le build/dev si ESLint trouve des erreurs
    ignoreDuringBuilds: true,
  },
  /* autres options ici */
};

export default nextConfig;
