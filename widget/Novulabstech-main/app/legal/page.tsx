import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { legalPages } from '@/content/legalPages';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import { webPageSchema } from '@/lib/schema';
import { canonical } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Legal & Policies',
  description:
    'Privacy policy, terms of service and cookie policy for NovuLabs — written to describe what this site actually does, not from a template.',
  alternates: { canonical: canonical('/legal') },
  // Without an explicit openGraph block this route inherits the root layout's
  // og:url, which points at the homepage — so the page told crawlers and every
  // social scraper it *was* the homepage while its canonical said otherwise.
  openGraph: {
    type: 'website',
    title: 'Legal & Policies — NovuLabs',
    description:
      'Privacy policy, terms of service and cookie policy for NovuLabs, written to describe what this site actually does.',
    url: canonical('/legal'),
    images: [
      {
        url: '/og/enterprise-software-development.jpg',
        width: 1200,
        height: 630,
        alt: 'NovuLabs — enterprise software for regulated industries',
      },
    ],
  },
};

export default function LegalIndexPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: 'Legal & Policies',
          description: 'Privacy, terms and cookie policies for NovuLabs.',
          path: '/legal',
          type: 'CollectionPage',
        })}
      />
      <section className="phero" style={{ minHeight: 'auto', paddingTop: '140px', paddingBottom: '60px' }}>
        <div className="phero-ov"></div>
        <div className="phero-grid"></div>
        <div className="container phero-inner">
          <Breadcrumbs className="mb-4" items={[{ name: 'Legal' }]} />
          <h1 className="hero-title mt-3" style={{ fontSize: '2.4rem' }}>
            Legal &amp; policies
          </h1>
          <p className="hero-sub">
            Written to describe how this site and this company actually operate. If anything here does
            not match what you observe, tell us and we will correct it.
          </p>
        </div>
      </section>
      <div className="divider"></div>

      <section className="sec bg-w">
        <div className="container">
          <div className="row g-4 justify-content-center">
            {legalPages.map((p) => (
              <div className="col-md-6 col-lg-4" key={p.slug}>
                <div className="gcard h-100">
                  <div className="gcard-body">
                    <div className="ctitle">{p.title}</div>
                    <p className="ctext">{p.description}</p>
                    <Link href={`/legal/${p.slug}`} className="carr">
                      <i className="bi bi-arrow-right-circle"></i>Read
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
