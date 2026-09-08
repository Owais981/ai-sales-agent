import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // --- Compiler Optimizations ---
  experimental: {
    // Treeshake large icon/util packages to only include what is actually used
    optimizePackageImports: ['bootstrap-icons'],
  },

  // --- External packages that run on the server (moved from experimental in Next.js 15) ---
  serverExternalPackages: [],

  // --- Image Optimization ---
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    // Serve modern WebP/AVIF formats for smaller payloads
    formats: ['image/avif', 'image/webp'],
  },

  // --- Redirects ---
  async redirects() {
    return [
      // Apex → www. The canonical tag already points at www, but a canonical is
      // a hint and a 301 is an instruction. Without this, the entire site is
      // reachable and potentially indexable on the apex domain as a duplicate.
      // NOTE: if the CDN or host already issues this 301, this rule is harmless
      // and redundant — but verify with `curl -I https://novulabs.net/` rather
      // than assuming, because a 200 here means a full duplicate site.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'novulabs.net' }],
        destination: 'https://www.novulabs.net/:path*',
        permanent: true,
      },

      // /portfolio's own title tag says "Case Studies", so external parties and
      // Google will probe /case-studies. It returned 404. Claim it.
      { source: '/case-studies', destination: '/portfolio', permanent: true },
      { source: '/case-studies/:slug', destination: '/portfolio/:slug', permanent: true },

      // Legal pages did not exist under any slug. These are the addresses a
      // human or a crawler would guess.
      { source: '/privacy', destination: '/legal/privacy-policy', permanent: true },
      { source: '/privacy-policy', destination: '/legal/privacy-policy', permanent: true },
      { source: '/terms', destination: '/legal/terms-of-service', permanent: true },
      { source: '/terms-of-service', destination: '/legal/terms-of-service', permanent: true },
      { source: '/cookies', destination: '/legal/cookie-policy', permanent: true },
      { source: '/cookie-policy', destination: '/legal/cookie-policy', permanent: true },

      // The old fragment-anchor "service pages" now have real URLs. Fragments
      // are never sent to the server, so these only catch the path form — but
      // they cost nothing and catch anyone who typed or mis-copied the path.
      { source: '/services/web', destination: '/services/web-development', permanent: true },
      { source: '/services/enterprise', destination: '/services/enterprise-software-development', permanent: true },
      { source: '/services/fintech', destination: '/services/fintech-software-development', permanent: true },
      { source: '/services/mobile', destination: '/services/mobile-app-development', permanent: true },
      { source: '/services/healthcare', destination: '/services/healthcare-software-development', permanent: true },
      { source: '/services/compliance', destination: '/services/aml-cft-compliance-software', permanent: true },
      { source: '/services/cloud', destination: '/services/cloud-ai-automation', permanent: true },
    ];
  },

  // --- HTTP Headers ---
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/(.*)',
        headers: [
          // The jsdelivr preconnect was removed with the CDN itself: Bootstrap
          // and AOS are now bundled/self-hosted, so there is no third-party
          // origin left on the critical path to preconnect to.
          // Security headers for Lighthouse Best Practices
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // HSTS. The site is HTTPS-only already; this stops the first-request
          // downgrade window and is a baseline expectation in any enterprise
          // or bank vendor security review.
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
      {
        // Generated cover, OG and team images are content-addressed by name and
        // never mutate in place — safe to cache aggressively.
        source: '/:dir(blog|og|portfolio|team)/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/llms.txt',
        headers: [
          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
          { key: 'Cache-Control', value: 'public, max-age=3600' },
        ],
      },
      {
        // Cache static assets for 1 year (images, fonts, icons)
        source: '/:path*.png',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/:path*.jpg',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/:path*.svg',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/:path*.ico',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/vendor/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/:path*.woff2',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },

  // Gzip/Brotli compress responses
  compress: true,
};

export default nextConfig;
