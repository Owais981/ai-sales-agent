import React from 'react';

/**
 * Renders a JSON-LD block into the server-rendered HTML.
 *
 * Deliberately a Server Component with no client boundary: structured data must
 * be present in the raw HTML response because GPTBot, ClaudeBot, PerplexityBot
 * and CCBot largely do not execute JavaScript. Anything injected client-side is
 * invisible to every LLM crawler.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // JSON.stringify output is escaped below to prevent breaking out of
          // the script tag if any content ever contains "</script>".
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(block).replace(/</g, '\\u003c'),
          }}
        />
      ))}
    </>
  );
}
