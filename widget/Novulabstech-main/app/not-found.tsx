import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

/**
 * Custom 404.
 *
 * The default Next.js 404 already returned a correct HTTP 404 status (verified
 * — no soft-404 on this site, which many SPA deployments get wrong). What it
 * did not do was give a lost visitor or a crawler anywhere to go. Recovery
 * links here keep both moving instead of terminating the session or the crawl.
 */
export const metadata: Metadata = {
  title: 'Page not found',
  description: 'That page does not exist. Here is where to find what you were probably looking for.',
  robots: { index: false, follow: true },
};

const destinations = [
  { href: '/services/aml-cft-compliance-software', label: 'AML/CFT compliance software', icon: 'bi-shield-check' },
  { href: '/services/fintech-software-development', label: 'Fintech & payments engineering', icon: 'bi-bank' },
  { href: '/services/healthcare-software-development', label: 'Healthcare software development', icon: 'bi-heart-pulse' },
  { href: '/portfolio', label: 'Case studies', icon: 'bi-folder2-open' },
  { href: '/blog', label: 'Technical articles', icon: 'bi-journal-text' },
  { href: '/contact', label: 'Book a technical call', icon: 'bi-calendar-check' },
];

export default function NotFound() {
  return (
    <>
      <section className="phero" style={{ minHeight: 'auto', paddingTop: '150px', paddingBottom: '60px' }}>
        <div className="phero-ov"></div>
        <div className="phero-grid"></div>
        <div className="container phero-inner">
          <span className="stag">404</span>
          <h1 className="hero-title mt-3" style={{ fontSize: '2.4rem' }}>
            That page does not exist
          </h1>
          <p className="hero-sub">
            The link may be out of date, or the address may have a typo. Everything on the site is
            listed on the <Link href="/site-map">sitemap</Link>.
          </p>
        </div>
      </section>
      <div className="divider"></div>

      <section className="sec bg-w">
        <div className="container">
          <div className="row g-4 justify-content-center">
            {destinations.map((d) => (
              <div className="col-md-6 col-lg-4" key={d.href}>
                <div className="gcard h-100">
                  <div className="gcard-body">
                    <div className="sico i-t">
                      <i className={`bi ${d.icon}`}></i>
                    </div>
                    <div className="ctitle">{d.label}</div>
                    <Link href={d.href} className="carr">
                      <i className="bi bi-arrow-right-circle"></i>Go
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
