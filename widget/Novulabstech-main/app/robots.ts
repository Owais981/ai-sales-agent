import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

/**
 * robots.txt.
 *
 * Deliberately unchanged in policy: every AI crawler stays allowed.
 *
 * GPTBot, ClaudeBot, PerplexityBot, Google-Extended, OAI-SearchBot and CCBot
 * are all permitted through the wildcard rule. For a firm in a niche this
 * narrow, being citable by ChatGPT or Perplexity for "goAML integration
 * Pakistan" is worth considerably more than any organic click blocking them
 * would protect. Do not add AI crawler disallows here without a specific reason.
 *
 * Only additions: the /llms.txt pointer and an explicit host directive.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
