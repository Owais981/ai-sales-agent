import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { servicePages, getServicePage } from '@/content/servicePages';
import { serviceSpokes, getServiceSpoke, type ServiceSpoke } from '@/content/serviceSpokes';
import { blogPosts } from '@/content/blogPosts';
import { caseStudies } from '@/content/caseStudies';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import Button from '@/components/ui/Button';
import FaqAccordion from '@/components/ui/FaqAccordion';
import { faqSchema, serviceSchema, webPageSchema } from '@/lib/schema';
import { canonical } from '@/lib/seo';

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * This one dynamic segment now serves two kinds of page from the same flat
 * /services/{slug} URL space: the 7 pillar pages (content/servicePages.ts,
 * unchanged) and the 22 spoke pages (content/serviceSpokes.ts, added for the
 * homepage's 22 service cards). Slugs across both files are guaranteed
 * distinct, so there is no collision — see the header comment in
 * serviceSpokes.ts for why the split exists and how each spoke's scope was
 * chosen to avoid duplicating its pillar.
 */
export async function generateStaticParams() {
  return [...servicePages.map((s) => ({ slug: s.slug })), ...serviceSpokes.map((s) => ({ slug: s.slug }))];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const svc = getServicePage(slug);
  if (svc) {
    const url = canonical(`/services/${svc.slug}`);
    const og = `/og/${svc.slug}.jpg`;
    return {
      title: svc.seoTitle,
      description: svc.description,
      keywords: svc.keywords,
      // Self-referencing canonical — set explicitly on every route so nothing is
      // ever inherited from a parent segment again.
      alternates: { canonical: url },
      openGraph: {
        type: 'website',
        url,
        title: svc.h1,
        description: svc.description,
        images: [{ url: og, width: 1200, height: 630, alt: svc.h1 }],
      },
      twitter: {
        card: 'summary_large_image',
        title: svc.h1,
        description: svc.description,
        images: [og],
      },
    };
  }

  const spoke = getServiceSpoke(slug);
  if (spoke) {
    const url = canonical(`/services/${spoke.slug}`);
    // Spokes share the parent pillar's OG image rather than needing a bespoke
    // one per page — 22 unique renders is not worth the build cost when the
    // pillar's image already represents the same practice area accurately.
    const og = `/og/${spoke.parentSlug}.jpg`;
    return {
      title: spoke.seoTitle,
      description: spoke.description,
      alternates: { canonical: url },
      openGraph: {
        type: 'website',
        url,
        title: spoke.h1,
        description: spoke.description,
        images: [{ url: og, width: 1200, height: 630, alt: spoke.h1 }],
      },
      twitter: {
        card: 'summary_large_image',
        title: spoke.h1,
        description: spoke.description,
        images: [og],
      },
    };
  }

  return { title: 'Service not found' };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const spoke = getServiceSpoke(slug);
  if (spoke) return <ServiceSpokePage spoke={spoke} />;

  const svc = getServicePage(slug);
  if (!svc) notFound();

  const path = `/services/${svc.slug}`;
  const relatedCases = svc.relatedCaseStudies
    .map((s) => caseStudies.find((c) => c.slug === s))
    .filter(Boolean);
  const relatedArticles = svc.relatedPosts
    .map((s) => blogPosts.find((p) => p.slug === s))
    .filter(Boolean);
  const siblingServices = svc.relatedServices
    .map((s) => getServicePage(s))
    .filter(Boolean);

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ name: svc.h1, description: svc.description, path }),
          serviceSchema({
            name: svc.h1,
            description: svc.description,
            path,
            serviceType: svc.serviceType,
            offers: svc.includes,
          }),
          faqSchema(svc.faqs, path),
        ]}
      />

      {/* Hero */}
      <section className="phero">
        <div className="phero-bg" data-parallax="38">
          <Image
            src="/hero/services.jpg"
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
            items={[{ name: 'Services', href: '/services' }, { name: svc.navLabel }]}
          />
          <span className="stag">Service</span>
          <h1 className="hero-title mt-3">{svc.h1}</h1>
          <p className="hero-sub">{svc.summary}</p>
        </div>
      </section>
      <div className="divider"></div>

      {/* Body */}
      <section className="sec bg-w">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <article
                className="blog-post-content"
                style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--tx2)' }}
              >
                {svc.sections.map((section) => (
                  <React.Fragment key={section.heading}>
                    <h2>{section.heading}</h2>
                    {section.body.map((para, i) => (
                      <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
                    ))}
                  </React.Fragment>
                ))}

                <h2>What is included</h2>
                <ul>
                  {svc.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <h2>Technologies and standards</h2>
                <div className="d-flex gap-2 flex-wrap mb-4">
                  {svc.stack.map((t) => (
                    <span className="tbadge" key={t} style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
                      {t}
                    </span>
                  ))}
                </div>

                {relatedCases.length > 0 && (
                  <>
                    <h2>Related case studies</h2>
                    <ul>
                      {relatedCases.map((c) => (
                        <li key={c!.slug}>
                          <Link href={`/portfolio/${c!.slug}`}>{c!.title}</Link> — {c!.summary}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {relatedArticles.length > 0 && (
                  <>
                    <h2>Further reading</h2>
                    <ul>
                      {relatedArticles.map((p) => (
                        <li key={p!.slug}>
                          <Link href={`/blog/${p!.slug}`}>{p!.title}</Link>
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

      {/* FAQ — visible on the page, which is what makes the FAQPage schema above
          legitimate. Marking up hidden content is a policy violation. */}
      {/* id="faq" so /faq can deep-link into the set that owns these answers.
          Every FAQ block on the site uses the same anchor. */}
      <section className="sec bg-g" id="faq">
        <div className="container">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-7" data-reveal="up">
              <span className="stag">Questions</span>
              <h2 className="stitle mt-3">
                {svc.navLabel} <span className="gtxt">FAQs</span>
              </h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <FaqAccordion items={svc.faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* Sibling services — keeps the service cluster internally linked so link
          equity circulates instead of terminating on each leaf. */}
      {siblingServices.length > 0 && (
        <section className="sec bg-w">
          <div className="container">
            <div className="row justify-content-center text-center mb-4">
              <div className="col-lg-7">
                <h2 className="stitle">
                  Related <span className="gtxt">services</span>
                </h2>
              </div>
            </div>
            <div className="row g-4 justify-content-center">
              {siblingServices.map((s) => (
                <div className="col-md-6 col-lg-4" key={s!.slug}>
                  <div className="gcard">
                    <div className="gcard-body">
                      <div className="sico i-t">
                        <i className={`bi ${s!.icon}`}></i>
                      </div>
                      <div className="ctitle">{s!.navLabel}</div>
                      <p className="ctext">{s!.summary}</p>
                      <Link href={`/services/${s!.slug}`} className="carr">
                        <i className="bi bi-arrow-right-circle"></i>Read more
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              <div className="col-md-6 col-lg-4">
                <div className="gcard">
                  <div className="gcard-body">
                    <div className="sico i-y">
                      <i className="bi bi-grid-3x3-gap"></i>
                    </div>
                    <div className="ctitle">All services</div>
                    <p className="ctext">
                      See every engineering track we run, from AML/CFT compliance to cloud platform work.
                    </p>
                    <Link href="/services" className="carr">
                      <i className="bi bi-arrow-right-circle"></i>Services hub
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA — deliberately not an <h2>. It is a conversion element, not a
          section of the document, and marking it as a heading previously made
          it the highest-weighted heading on every article page. */}
      <section id="cta-banner">
        <div className="container">
          <div className="cta-inner" data-reveal="up">
            <div className="row align-items-center g-5">
              <div className="col-lg-7">
                <span className="stag">Consult our team</span>
                <p className="stitle mt-3 mb-0">
                  Talk to an architect about <span className="gtxt">{svc.navLabel.toLowerCase()}</span>
                </p>
                <p className="ssub mt-4 mb-0">
                  A free 45-minute technical call with a senior engineer who has built this before. No
                  demos, no sales scripts — bring your architecture and get an honest read on it.
                </p>
              </div>
              <div className="col-lg-5 text-lg-end">
                <div className="cta-card text-start">
                  <div className="cta-card-label">Schedule a free technical review</div>
                  <Button href="/contact" variant="grad" className="w-100 justify-content-center mb-3">
                    <i className="bi bi-calendar-check me-1"></i>Book a technical call
                  </Button>
                  <Button href="/portfolio" variant="glass" className="w-100 justify-content-center">
                    <i className="bi bi-folder2-open me-1"></i>See case studies
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

// ---------------------------------------------------------------------------
// Spoke page — one of the 22 narrower service pages nested under a pillar.
// ---------------------------------------------------------------------------
function ServiceSpokePage({ spoke }: { spoke: ServiceSpoke }) {
  const pillar = getServicePage(spoke.parentSlug);
  const path = `/services/${spoke.slug}`;
  const siblingSpokes = spoke.relatedSpokes.map((s) => getServiceSpoke(s)).filter(Boolean);
  const relatedCases = spoke.relatedCaseStudies
    .map((s) => caseStudies.find((c) => c.slug === s))
    .filter(Boolean);
  const relatedArticles = spoke.relatedPosts
    .map((s) => blogPosts.find((p) => p.slug === s))
    .filter(Boolean);

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ name: spoke.h1, description: spoke.description, path }),
          serviceSchema({
            name: spoke.h1,
            description: spoke.description,
            path,
            serviceType: spoke.navLabel,
            offers: spoke.offerings.map((o) => o.title),
          }),
          faqSchema(spoke.faqs, path),
        ]}
      />

      {/* Hero */}
      <section className="phero">
        <div className="phero-bg" data-parallax="38">
          <Image
            src="/hero/services.jpg"
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
            items={[
              { name: 'Services', href: '/services' },
              ...(pillar ? [{ name: pillar.navLabel, href: `/services/${pillar.slug}` }] : []),
              { name: spoke.navLabel },
            ]}
          />
          <span className="stag">Service</span>
          <h1 className="hero-title mt-3">{spoke.h1}</h1>
          <p className="hero-sub">{spoke.summary}</p>
        </div>
      </section>
      <div className="divider"></div>

      {/* Body */}
      <section className="sec bg-w">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <article
                className="blog-post-content"
                style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--tx2)' }}
              >
                {spoke.intro.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}

                <h2>What We Offer</h2>
                {spoke.offerings.map((o) => (
                  <React.Fragment key={o.title}>
                    <h3>{o.title}</h3>
                    <p>{o.body}</p>
                  </React.Fragment>
                ))}

                <h2>How We Help</h2>
                {spoke.howWeHelp.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}

                <h2>Our Approach</h2>
                {spoke.approach.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}

                {spoke.technologies.length > 0 && (
                  <>
                    <h2>Technologies We Use</h2>
                    <div className="d-flex gap-2 flex-wrap mb-4">
                      {spoke.technologies.map((t) => (
                        <span className="tbadge" key={t} style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </>
                )}

                {spoke.industries.length > 0 && (
                  <>
                    <h2>Industries We Support</h2>
                    <div className="d-flex gap-2 flex-wrap mb-4">
                      {spoke.industries.map((t) => (
                        <span className="tbadge" key={t} style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </>
                )}

                {relatedCases.length > 0 && (
                  <>
                    <h2>Related case studies</h2>
                    <ul>
                      {relatedCases.map((c) => (
                        <li key={c!.slug}>
                          <Link href={`/portfolio/${c!.slug}`}>{c!.title}</Link>: {c!.summary}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {relatedArticles.length > 0 && (
                  <>
                    <h2>Further reading</h2>
                    <ul>
                      {relatedArticles.map((p) => (
                        <li key={p!.slug}>
                          <Link href={`/blog/${p!.slug}`}>{p!.title}</Link>
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

      {/* FAQ — visible on the page, which is what makes the FAQPage schema
          above legitimate. id="faq" matches the anchor every FAQ block on the
          site uses, so /faq can deep-link into this set. */}
      <section className="sec bg-g" id="faq">
        <div className="container">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-7" data-reveal="up">
              <span className="stag">Questions</span>
              <h2 className="stitle mt-3">
                {spoke.navLabel} <span className="gtxt">FAQs</span>
              </h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <FaqAccordion items={spoke.faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* Related services — sibling spokes plus the parent pillar, so link
          equity moves both sideways and up rather than dead-ending here. */}
      <section className="sec bg-w">
        <div className="container">
          <div className="row justify-content-center text-center mb-4">
            <div className="col-lg-7">
              <h2 className="stitle">
                Related <span className="gtxt">services</span>
              </h2>
            </div>
          </div>
          <div className="row g-4 justify-content-center">
            {siblingSpokes.map((s) => (
              <div className="col-md-6 col-lg-4" key={s!.slug}>
                <div className="gcard">
                  <div className="gcard-body">
                    <div className="sico i-t">
                      <i className={`bi ${s!.icon}`}></i>
                    </div>
                    <div className="ctitle">{s!.navLabel}</div>
                    <p className="ctext">{s!.summary}</p>
                    <Link href={`/services/${s!.slug}`} className="carr">
                      <i className="bi bi-arrow-right-circle"></i>Read more
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {pillar && (
              <div className="col-md-6 col-lg-4">
                <div className="gcard">
                  <div className="gcard-body">
                    <div className="sico i-y">
                      <i className={`bi ${pillar.icon}`}></i>
                    </div>
                    <div className="ctitle">{pillar.navLabel}</div>
                    <p className="ctext">{pillar.summary}</p>
                    <Link href={`/services/${pillar.slug}`} className="carr">
                      <i className="bi bi-arrow-right-circle"></i>See the full practice area
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA — deliberately not an <h2>, same reasoning as the pillar page:
          it is a conversion element, not a section of the document. */}
      <section id="cta-banner">
        <div className="container">
          <div className="cta-inner" data-reveal="up">
            <div className="row align-items-center g-5">
              <div className="col-lg-7">
                <span className="stag">Consult our team</span>
                <p className="stitle mt-3 mb-0">
                  Talk to an architect about <span className="gtxt">{spoke.navLabel.toLowerCase()}</span>
                </p>
                <p className="ssub mt-4 mb-0">
                  A free 45-minute technical call with a senior engineer who has built this before. No
                  demos, no sales scripts, bring your architecture and get an honest read on it.
                </p>
              </div>
              <div className="col-lg-5 text-lg-end">
                <div className="cta-card text-start">
                  <div className="cta-card-label">Schedule a free technical review</div>
                  <Button href="/contact" variant="grad" className="w-100 justify-content-center mb-3">
                    <i className="bi bi-calendar-check me-1"></i>Book a technical call
                  </Button>
                  <Button href="/portfolio" variant="glass" className="w-100 justify-content-center">
                    <i className="bi bi-folder2-open me-1"></i>See case studies
                  </Button>
                  {/* Same two links on every spoke page, deliberately identical
                      wording. This lives in the CTA widget, not the article body,
                      for the same reason the CTA itself is not an <h2>: it is site
                      chrome (like a footer link), not page content, and repeated
                      chrome across pages is not the duplicate-content problem a
                      repeated paragraph inside <article> was. */}
                  <p className="cta-card-note">
                    <Link href="/testimonials">Client testimonials</Link> ·{' '}
                    <Link href="/about">How we work</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
