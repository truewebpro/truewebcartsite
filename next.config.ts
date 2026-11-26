import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      // services renamed when the Resources menu was rebuilt (26/11/2026)
      { source: "/services/web-design-development", destination: "/services/web-development", permanent: true },
      { source: "/services/custom-software-web-apps", destination: "/services/web-development", permanent: true },
      { source: "/services/seo-digital-marketing", destination: "/services/seo-services", permanent: true },
    ];
  },
};

export default nextConfig;
