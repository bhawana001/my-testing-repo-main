/** @type {import('next').NextConfig} */
const nextConfig = {
  // The Auralis eval is a standalone HTML document (own <head>, CDN Tailwind +
  // GSAP, inline scripts), so it lives in /public and is served verbatim at the
  // /interactive-website slug instead of being ported to a React page.
  async rewrites() {
    return [
      { source: "/interactive-website", destination: "/interactive-website.html" },
    ];
  },
};

export default nextConfig;
