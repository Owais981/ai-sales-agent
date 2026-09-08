import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { caseStudies, getCaseStudy } from '@/content/caseStudies';
import { getServicePage } from '@/content/servicePages';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import Button from '@/components/ui/Button';
import { caseStudySchema, webPageSchema } from '@/lib/schema';
import { canonical } from '@/lib/seo';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return { title: 'Case study not found' };

  const url = canonical(`/portfolio/${cs.slug}`);
  const img = `/portfolio/${cs.slug}.jpg`;

  return {
    title: cs.seoTitle,
    description: cs.description,
    keywords: cs.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: cs.title,
      description: cs.description,
      images: [{ url: img, width: 1200, height: 630, alt: cs.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: cs.title,
      description: cs.description,
      images: [img],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const services = cs.relatedServices.map((s) => getServicePage(s)).filter(Boolean);
  const siblings = cs.relatedCaseStudies.map((s) => getCaseStudy(s)).filter(Boolean);

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            name: cs.title,
            description: cs.description,
            path: `/portfolio/${cs.slug}`,
          }),
          caseStudySchema({
            title: cs.title,
            description: cs.description,
            slug: cs.slug,
            image: `/portfolio/${cs.slug}.jpg`,
            industry: cs.industry,
            keywords: cs.keywords,
          }),
        ]}
      />

      <section className="phero">
        <div className="phero-bg" data-parallax="38">
          <Image
            src="/hero/portfolio.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="phero-ov"></div>
        <div className="phero-grid" data-parallax="14"></div>
        <div className="container phero-inner">
          <Breadcrumbs
            className="mb-4"
            items={[{ name: 'Case Studies', href: '/portfolio' }, { name: cs.codename }]}
          />
          <span className="stag">{cs.industry}</span>
          <h1 className="hero-title mt-3" style={{ fontSize: '2.5rem', lineHeight: 1.2 }}>
            {cs.title}
          </h1>
          <p className="hero-sub">{cs.summary}</p>
        </div>
      </section>
      <div className="divider"></div>

      <section className="sec bg-w">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <article
                className="blog-post-content"
                style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--tx2)' }}
              >
                {/* Attribution block. Stating the NDA position explicitly is more
                    credible than an invented client name and more credible than
                    silence — a reader can otherwise not tell protected fact from
                    invention. */}
                <div
                  className="cta-card mb-4"
                  style={{ borderLeft: '3px solid var(--p1)' }}
                >
                  <div className="cta-card-label">Client</div>
                  <p className="mb-2">{cs.clientDescriptor}</p>
                  <div className="cta-card-label">Internal project codename</div>
                  <p className="mb-0">
                    {cs.codename} — an internal delivery codename, not a commercial product name.
                  </p>
                </div>

                <h2>The problem</h2>
                {cs.challenge.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}

                <h2>Constraints we had to design within</h2>
                <ul>
                  {cs.constraints.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>

                <h2>Approach</h2>
                {cs.approach.map((a) => (
                  <React.Fragment key={a.heading}>
                    <h3>{a.heading}</h3>
                    {a.body.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </React.Fragment>
                ))}

                {/* Engineering detail — the trade-offs behind the approach.
                    Rendered only when present so a case study without it is
                    unaffected. */}
                {cs.engineeringNotes && cs.engineeringNotes.length > 0 && (
                  <>
                    <h2>Engineering notes</h2>
                    {cs.engineeringNotes.map((n) => (
                      <React.Fragment key={n.heading}>
                        <h3>{n.heading}</h3>
                        {n.body.map((p, i) => (
                          <p key={i}>{p}</p>
                        ))}
                      </React.Fragment>
                    ))}
                  </>
                )}

                <h2>Outcome</h2>
                {cs.outcome.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}

                <div className="row g-3 my-4">
                  {cs.metrics.map((m) => (
                    <div className="col-md-4" key={m.label}>
                      <div className="cta-card h-100">
                        <div
                          className="gtxt"
                          style={{ fontSize: '1.5rem', fontWeight: 800, lineHeight: 1.2 }}
                        >
                          {m.value}
                        </div>
                        <div className="cta-card-label mt-2">{m.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {!cs.metricsVerified && (
                  <p style={{ fontSize: '0.85rem', color: 'var(--tx3)' }}>
                    <em>
                      Figures above are drawn from delivery records held under NDA and are pending
                      independent confirmation. Where a figure cannot be evidenced it will be removed
                      rather than qualified.
                    </em>
                  </p>
                )}

                <h2>Technology and standards</h2>
                <div className="d-flex gap-2 flex-wrap mb-4">
                  {[...cs.tech, ...cs.standards].map((t) => (
                    <span
                      className="tbadge"
                      key={t}
                      style={{ fontSize: '0.8rem', padding: '6px 14px' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {services.length > 0 && (
                  <>
                    <h2>Services applied on this engagement</h2>
                    <ul>
                      {services.map((s) => (
                        <li key={s!.slug}>
                          <Link href={`/services/${s!.slug}`}>{s!.h1}</Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {siblings.length > 0 && (
                  <>
                    <h2>Related case studies</h2>
                    <ul>
                      {siblings.map((s) => (
                        <li key={s!.slug}>
                          <Link href={`/portfolio/${s!.slug}`}>{s!.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="cta-banner">
        <div className="container">
          <div className="cta-inner" data-reveal="up">
            <div className="row align-items-center g-5">
              <div className="col-lg-7">
                <span className="stag">Similar problem?</span>
                <p className="stitle mt-3 mb-0">
                  Bring us the <span className="gtxt">architecture</span>, not the brief
                </p>
                <p className="ssub mt-4 mb-0">
                  A free 45-minute call with the kind of engineer who worked on this. If the honest
                  answer is that you should not build it, we will say so.
                </p>
              </div>
              <div className="col-lg-5 text-lg-end">
                <div className="cta-card text-start">
                  <div className="cta-card-label">Schedule a free technical review</div>
                  <Button href="/contact" variant="grad" className="w-100 justify-content-center mb-3">
                    <i className="bi bi-calendar-check me-1"></i>Book a technical call
                  </Button>
                  <Button href="/portfolio" variant="glass" className="w-100 justify-content-center">
                    <i className="bi bi-folder2-open me-1"></i>All case studies
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
