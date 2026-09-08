import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import JsonLd from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import FaqAccordion from '@/components/ui/FaqAccordion';
import { faqSchema, webPageSchema } from '@/lib/schema';
import { hubFaqs, faqDirectory, totalAnsweredQuestions } from '@/content/faqHub';

/**
 * /faq — the site's FAQ hub.
 *
 * WHY ONE FAQPage NODE, NOT NINETEEN.
 * Only `hubFaqs` is marked up. The directory below it links to questions whose
 * answers live on the page that owns them, and re-declaring those here would
 * put the same Q&A under two FAQPage nodes at two URLs. See content/faqHub.ts
 * for the full reasoning behind the hub-and-spoke split.
 */

export const metadata: Metadata = {
  // 45 chars + " | NovuLabs" = 56, inside the SERP budget.
  title: 'Frequently Asked Questions About NovuLabs',
  description:
    'What NovuLabs builds, the industries and regulators we work under, the technologies we use, post-launch support, and how an engagement with our team starts.',
  keywords: [
    'NovuLabs FAQ',
    'NovuLabs questions',
    'software house Islamabad questions',
    'enterprise software development FAQ',
    'custom software development questions',
    'AML compliance software FAQ',
  ],
  alternates: { canonical: '/faq' },
  openGraph: {
    type: 'website',
    title: 'Frequently Asked Questions | NovuLabs',
    description:
      'What NovuLabs builds, who we build it for, the standards we engineer to, and how an engagement starts. Answered directly, without a sales layer.',
    url: 'https://www.novulabs.net/faq',
    images: [
      {
        url: '/og/enterprise-software-development.jpg',
        width: 1200,
        height: 630,
        alt: 'NovuLabs frequently asked questions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frequently Asked Questions | NovuLabs',
    description:
      'What NovuLabs builds, the regulators we work under, and how an engagement starts.',
    images: ['/og/enterprise-software-development.jpg'],
  },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            name: 'Frequently Asked Questions',
            description:
              'Answers on what NovuLabs builds, the industries and regulators it works under, technologies, support, and how an engagement starts.',
            path: '/faq',
          }),
          // Only the questions this page itself answers in full.
          faqSchema(hubFaqs, '/faq'),
        ]}
      />

      {/* ---------------------------------------------------------------- */}
      <section className="phero">
        <div className="phero-bg" data-parallax="38">
          <Image src="/hero/contact.jpg" alt="" fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
        </div>
        <div className="phero-ov"></div>
        <div className="phero-grid" data-parallax="14"></div>
        <div className="container phero-inner">
          <Breadcrumbs className="mb-4" items={[{ name: 'FAQ' }]} />
          <span className="stag">FAQ</span>
          <h1 className="hero-title mt-3">
            Frequently asked <span className="gtxt">questions</span>
          </h1>
          <p className="hero-sub">
            The questions buyers actually ask before an engagement, answered directly. The ten below
            are the orientation questions; the directory further down points to the{' '}
            {totalAnsweredQuestions} answers published across the rest of the site, each kept on the
            page that owns it.
          </p>
        </div>
      </section>
      <div className="divider"></div>

      {/* ---------------------------------------------------------------- */}
      <section className="sec bg-w">
        <div className="container">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8" data-reveal="up">
              <h2 className="stitle">
                About <span className="gtxt">NovuLabs</span>
              </h2>
              <p className="ssub mt-3 mb-0">
                Start here if you are working out whether we are the right kind of firm for your
                problem.
              </p>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8" data-reveal="up">
              <FaqAccordion items={hubFaqs} />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="sec bg-g">
        <div className="container">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8" data-reveal="up">
              <span className="stag">Directory</span>
              <h2 className="stitle mt-3">
                Questions by <span className="gtxt">topic</span>
              </h2>
              <p className="ssub mt-3 mb-0">
                Each answer lives on the page it belongs to, so it stays in context. Follow a topic
                to read the full answers there.
              </p>
            </div>
          </div>

          <div className="row g-4">
            {faqDirectory.map((group) => (
              <div className="col-md-6 col-lg-4" key={group.href} data-reveal="up">
                <div className="gcard h-100">
                  <div className="gcard-body">
                    <h3 className="ctitle">
                      <Link href={group.href} className="faq-dir-head">
                        {group.title}
                      </Link>
                    </h3>
                    <p className="ctext" style={{ WebkitLineClamp: 3 }}>
                      {group.blurb}
                    </p>
                    <ul className="faq-dir-list">
                      {group.items.map((item) => (
                        <li key={item.q}>
                          <Link href={group.href}>{item.q}</Link>
                        </li>
                      ))}
                    </ul>
                    <Link href={group.href} className="carr">
                      <i className="bi bi-arrow-right-circle" aria-hidden="true"></i>
                      Read the answers
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="sec bg-w">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8" data-reveal="up">
              <h2 className="stitle">
                Still not <span className="gtxt">answered</span>
              </h2>
              <p className="ssub mt-3">
                Anything not covered here is worth a conversation rather than a longer page. The
                discovery call is 45 minutes, carries no commitment, and is taken by an architect
                who would be accountable for the technical outcome, not a salesperson.
              </p>
              <p className="mb-0">
                <Link href="/contact" className="btn-grad">
                  Book a technical consultation
                </Link>
              </p>
              <p className="mt-4 mb-0" style={{ fontSize: '0.92rem', color: 'var(--tx3)' }}>
                Prefer to read first? See{' '}
                <Link href="/services">what we build</Link>,{' '}
                <Link href="/portfolio">how past engagements were structured</Link>, or{' '}
                <Link href="/testimonials">what clients say about working with us</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
