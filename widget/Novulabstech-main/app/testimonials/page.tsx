import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import JsonLd from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { webPageSchema } from '@/lib/schema';
import {
  testimonials,
  testimonialSectors,
  whyClientsChoose,
  hasPlaceholderTestimonials,
} from '@/content/testimonials';

/**
 * /testimonials
 *
 * ⚠️  The testimonials on this page are SAMPLES, not real client feedback.
 *     See content/testimonials.ts for what has to happen before they are true.
 *
 * NO Review OR AggregateRating STRUCTURED DATA IS EMITTED HERE, and none
 * should be added later without checking two things first:
 *
 *   1. The reviews are genuine and came from real customers. Marking up
 *      placeholder text as `Review` is exactly the spammy-structured-data
 *      pattern Google issues manual actions for.
 *   2. Even once real, self-published testimonials that the business solicited
 *      and hosts about itself do not qualify for review rich results —
 *      Google's policy excludes reviews written or collected by the subject of
 *      the review. Real testimonials belong on the page for humans; the review
 *      snippet belongs to third-party platforms (Google Business Profile,
 *      Clutch) where the review is independently held.
 *
 * The page therefore emits WebPage + BreadcrumbList only. That is not a
 * limitation to work around — it is the correct markup for what this page is.
 */

export const metadata: Metadata = {
  // 42 chars + " | NovuLabs" = 53.
  title: 'Client Testimonials & Reviews',
  description:
    'What clients say about working with NovuLabs: engineering judgement, audit-ready delivery and long-term support across banking, healthcare and government.',
  keywords: [
    'NovuLabs reviews',
    'NovuLabs testimonials',
    'software development company reviews',
    'enterprise software development testimonials',
    'software house Islamabad reviews',
    'enterprise technology partner',
  ],
  alternates: { canonical: '/testimonials' },
  openGraph: {
    type: 'website',
    title: 'Client Testimonials & Reviews | NovuLabs',
    description:
      'How organisations in banking, healthcare, government and enterprise software describe working with the NovuLabs engineering team.',
    url: 'https://www.novulabs.net/testimonials',
    images: [
      {
        url: '/og/enterprise-software-development.jpg',
        width: 1200,
        height: 630,
        alt: 'NovuLabs client testimonials and reviews',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Client Testimonials & Reviews | NovuLabs',
    description:
      'What clients say about working with NovuLabs across banking, healthcare, government and enterprise software.',
    images: ['/og/enterprise-software-development.jpg'],
  },
};

export default function TestimonialsPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: 'Client Testimonials & Reviews',
          description:
            'Client feedback on working with NovuLabs across banking and fintech, healthcare, government, enterprise software, AI and SaaS.',
          path: '/testimonials',
        })}
      />

      {/* ---------------------------------------------------------------- */}
      <section className="phero">
        <div className="phero-bg" data-parallax="38">
          <Image
            src="/hero/about.jpg"
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
          <Breadcrumbs className="mb-4" items={[{ name: 'Testimonials' }]} />
          <span className="stag">Client Feedback</span>
          <h1 className="hero-title mt-3">
            Client testimonials <span className="gtxt">&amp; reviews</span>
          </h1>
          <p className="hero-sub">
            NovuLabs works with institutions whose software has to answer to a regulator as well as
            to a user, banks, hospital networks, government agencies, and the platforms that serve
            them. What clients consistently describe valuing is the engineering judgement applied
            before a line of code is written, and a system that can still explain its own decisions
            a year later.
          </p>
        </div>
      </section>
      <div className="divider"></div>

      {/* ----------------------------------------------------------------
          The sample notice. Rendered from data, so it cannot be forgotten:
          it disappears on its own once every record has placeholder:false. */}
      {hasPlaceholderTestimonials && (
        <section className="sec-xs">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-9">
                <div className="sample-notice" role="note">
                  <i className="bi bi-info-circle-fill" aria-hidden="true"></i>
                  <p className="mb-0">
                    <strong>Sample content.</strong> The testimonials on this page are illustrative
                    placeholders written to show the format, not statements from real clients. They
                    are here so the page can be reviewed before publication and must be replaced
                    with verified client feedback. A role and a sector is sufficient attribution
                    where an NDA prevents naming the institution. No star ratings, review counts or
                    review structured data appear anywhere on this page, because no client has given
                    any.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      <section className="sec bg-w">
        <div className="container">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8" data-reveal="up">
              <span className="stag">In their words</span>
              <h2 className="stitle mt-3">
                What clients say about <span className="gtxt">working with NovuLabs</span>
              </h2>
              <p className="ssub mt-3 mb-0">
                Clients are not named. Most of this work sits inside institutions bound by
                confidentiality, and the same convention applies here as on our{' '}
                <Link href="/portfolio">case studies</Link>: the role and the sector are described,
                the institution is not.
              </p>
            </div>
          </div>

          <div className="row g-4">
            {testimonials.slice(0, 3).map((t) => (
              <div className="col-lg-4" key={t.quote.slice(0, 40)} data-reveal="up">
                <figure className="tcard h-100">
                  <i className="bi bi-quote tcard-mark" aria-hidden="true"></i>
                  <blockquote className="tcard-quote">
                    <p>{t.quote}</p>
                  </blockquote>
                  <figcaption className="tcard-meta">
                    <span className="tcard-role">{t.role}</span>
                    <span className="tcard-org">{t.organisation}</span>
                    {hasPlaceholderTestimonials && t.placeholder && (
                      <span className="tcard-flag">Sample: awaiting verified testimonial</span>
                    )}
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="sec bg-g">
        <div className="container">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8" data-reveal="up">
              <span className="stag">By sector</span>
              <h2 className="stitle mt-3">
                Client experiences <span className="gtxt">across industries</span>
              </h2>
              <p className="ssub mt-3 mb-0">
                The constraints differ by regulator, so the feedback does too. Each group links to
                the service that engagement type maps to.
              </p>
            </div>
          </div>

          {testimonialSectors.map((sector) => {
            const group = testimonials.filter((t) => t.sector === sector);
            if (group.length === 0) return null;
            return (
              <div className="tsector" key={sector}>
                <h3 className="tsector-title">{sector}</h3>
                <div className="row g-4">
                  {group.map((t) => (
                    <div className="col-md-6" key={t.quote.slice(0, 40)} data-reveal="up">
                      <figure className="tcard tcard-sm h-100">
                        <blockquote className="tcard-quote">
                          <p>{t.quote}</p>
                        </blockquote>
                        <figcaption className="tcard-meta">
                          <span className="tcard-role">{t.role}</span>
                          <span className="tcard-org">{t.organisation}</span>
                          {t.relatedService && (
                            <Link href={t.relatedService.href} className="tcard-link">
                              {t.relatedService.label}
                              <i className="bi bi-arrow-right-short" aria-hidden="true"></i>
                            </Link>
                          )}
                          {hasPlaceholderTestimonials && t.placeholder && (
                            <span className="tcard-flag">Sample: awaiting verified testimonial</span>
                          )}
                        </figcaption>
                      </figure>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="sec bg-w">
        <div className="container">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8" data-reveal="up">
              <span className="stag">Why us</span>
              <h2 className="stitle mt-3">
                Why clients <span className="gtxt">choose NovuLabs</span>
              </h2>
              <p className="ssub mt-3 mb-0">
                Stated as method rather than as outcome, and each one linked to the page where you
                can check it. An unlinked claim is only an assertion.
              </p>
            </div>
          </div>

          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {whyClientsChoose.map((w) => (
              <div className="col" key={w.title} data-reveal="up">
                <div className="gcard h-100">
                  <div className="gcard-body">
                    <div className={`sico ${w.color} mb-3`}>
                      <i className={`bi ${w.icon}`} aria-hidden="true"></i>
                    </div>
                    <h3 className="ctitle">{w.title}</h3>
                    <p className="ctext" style={{ WebkitLineClamp: 'unset' }}>
                      {w.body}
                    </p>
                    {w.link && (
                      <Link href={w.link.href} className="carr">
                        <i className="bi bi-arrow-right-circle" aria-hidden="true"></i>
                        {w.link.label}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="sec bg-g">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8" data-reveal="up">
              <h2 className="stitle">
                Work with <span className="gtxt">NovuLabs</span>
              </h2>
              <p className="ssub mt-3">
                The most useful next step is usually a conversation about constraints rather than
                requirements. The discovery call runs 45 minutes, carries no commitment, and is
                taken by an architect who would be accountable for the outcome.
              </p>
              <p className="mb-0">
                <Link href="/contact" className="btn-grad">
                  Book a technical consultation
                </Link>
              </p>
              <p className="mt-4 mb-0" style={{ fontSize: '0.92rem', color: 'var(--tx3)' }}>
                Or read how past engagements were structured in our{' '}
                <Link href="/portfolio">case studies</Link>, see{' '}
                <Link href="/services">what we build</Link>, or check the{' '}
                <Link href="/faq">frequently asked questions</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
