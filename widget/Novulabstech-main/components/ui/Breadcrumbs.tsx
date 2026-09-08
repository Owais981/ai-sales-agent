import React from 'react';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import { canonical } from '@/lib/seo';

export interface Crumb {
  /** Visible label. Keep it short — this is what renders in the SERP trail. */
  name: string;
  /** Site-relative path. Omit on the final crumb (the current page). */
  href?: string;
}

/**
 * Visual breadcrumb trail + matching BreadcrumbList JSON-LD.
 *
 * Both halves are emitted from the same array, so the rendered trail and the
 * structured data can never disagree — a mismatch is a common cause of Google
 * silently dropping breadcrumb display in the SERP.
 *
 * "Home" is prepended automatically; pass only the deeper levels.
 */
export default function Breadcrumbs({
  items,
  className = '',
}: {
  items: Crumb[];
  className?: string;
}) {
  const trail: Crumb[] = [{ name: 'Home', href: '/' }, ...items];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      // The last item intentionally omits `item` per Google's guidance — the
      // current page should not link to itself in the trail.
      ...(crumb.href && i < trail.length - 1 ? { item: canonical(crumb.href) } : {}),
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="breadcrumb mb-0">
          {trail.map((crumb, i) => {
            const isLast = i === trail.length - 1;
            return (
              <li
                key={`${crumb.name}-${i}`}
                className={`breadcrumb-item${isLast ? ' active' : ''}`}
                {...(isLast ? { 'aria-current': 'page' as const } : {})}
              >
                {isLast || !crumb.href ? crumb.name : <Link href={crumb.href}>{crumb.name}</Link>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
