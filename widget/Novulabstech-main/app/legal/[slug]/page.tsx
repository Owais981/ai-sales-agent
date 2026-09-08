import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { legalPages, getLegalPage } from '@/content/legalPages';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import { webPageSchema } from '@/lib/schema';
import { canonical } from '@/lib/seo';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return legalPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) return { title: 'Not found' };

  return {
    title: page.seoTitle,
    description: page.description,
    alternates: { canonical: canonical(`/legal/${page.slug}`) },
    openGraph: {
      type: 'website',
      url: canonical(`/legal/${page.slug}`),
      title: page.title,
      description: page.description,
      // Was omitted entirely. Because Next.js metadata is inherited only when a
      // field is absent — and `openGraph` here replaces the parent object
      // wholesale — these pages ended up with no og:image at all, so a shared
      // privacy-policy or terms link rendered as a bare text row.
      images: [
        {
          url: '/og/enterprise-software-development.jpg',
          width: 1200,
          height: 630,
          alt: 'NovuLabs — enterprise software for regulated industries',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: ['/og/enterprise-software-development.jpg'],
    },
  };
}

export default async function LegalPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) notFound();

  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: page.title,
          description: page.description,
          path: `/legal/${page.slug}`,
        })}
      />

      <section className="phero" style={{ minHeight: 'auto', paddingTop: '140px', paddingBottom: '60px' }}>
        <div className="phero-ov"></div>
        <div className="phero-grid"></div>
        <div className="container phero-inner">
          <Breadcrumbs className="mb-4" items={[{ name: 'Legal', href: '/legal' }, { name: page.title }]} />
          <h1 className="hero-title mt-3" style={{ fontSize: '2.4rem' }}>
            {page.title}
          </h1>
          <p className="hero-sub">Last updated: {page.lastUpdated}</p>
        </div>
      </section>
      <div className="divider"></div>

      <section className="sec bg-w">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <article
                className="blog-post-content"
                style={{ fontSize: '1.02rem', lineHeight: '1.8', color: 'var(--tx2)' }}
              >
                <p>{page.intro}</p>
                {page.sections.map((s) => (
                  <React.Fragment key={s.heading}>
                    <h2>{s.heading}</h2>
                    {s.body.map((p, i) => (
                      <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                    ))}
                  </React.Fragment>
                ))}
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
