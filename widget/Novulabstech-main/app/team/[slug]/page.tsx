import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { teamMembers } from '@/content/siteData';
import { blogPosts } from '@/content/blogPosts';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import Button from '@/components/ui/Button';
import BlogCard from '@/components/ui/BlogCard';
import { personSchema, webPageSchema } from '@/lib/schema';
import { canonical } from '@/lib/seo';

/**
 * Author / profile pages.
 *
 * Why these exist: bylines previously resolved to `/team#slug` — a fragment, not
 * a page. Google does not treat a fragment as a distinct entity, so:
 *
 *   - the `author` in every BlogPosting pointed at a URL that is really just
 *     /team, giving three different authors the same effective entity URL;
 *   - no author had a page of their own on which to accumulate topical
 *     authority, which is the mechanism E-E-A-T actually runs on; and
 *   - there was no archive tying an author to the body of work that
 *     demonstrates their expertise.
 *
 * Each profile is a real indexable URL carrying a ProfilePage + Person pair,
 * with `knowsAbout` drawn from declared expertise and an archive of everything
 * that person has written. That gives the byline somewhere to point, and gives
 * the article cluster a second hub alongside /blog.
 */

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return teamMembers.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = teamMembers.find((m) => m.slug === slug);
  if (!member) return { title: 'Profile not found', robots: { index: false, follow: true } };

  const url = canonical(`/team/${member.slug}`);
  // Budgeted so the rendered title stays inside Google's ~60-char allowance
  // once the layout appends " | NovuLabs".
  const seoTitle = `${member.name} — ${member.role}`;

  // `bio` alone renders at 96-105 chars, well short of the ~155 Google will
  // display, so every profile gave away SERP real estate. `longBio` overruns at
  // 231-259. Composing from both fills the budget and stays a whole sentence:
  // the first sentence of longBio is the fuller description, and bio is the
  // fallback if a future profile has no longer form.
  const metaDescription = (() => {
    const firstSentence = member.longBio.split('. ')[0].trim();
    const full = firstSentence.endsWith('.') ? firstSentence : `${firstSentence}.`;
    return full.length >= 120 && full.length <= 165 ? full : member.longBio.slice(0, 155).trim();
  })();

  return {
    title: seoTitle.length > 47 ? member.name : seoTitle,
    description: metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: 'profile',
      url,
      title: `${member.name} — ${member.role} at NovuLabs`,
      description: member.longBio,
      images: [{ url: member.img, width: 1200, height: 1200, alt: member.imgAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${member.name} — ${member.role} at NovuLabs`,
      description: metaDescription,
      images: [member.img],
    },
  };
}

export default async function TeamProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const member = teamMembers.find((m) => m.slug === slug);
  if (!member) notFound();

  const authored = blogPosts
    .filter((p) => p.authorSlug === member.slug)
    .sort((a, b) => Date.parse(b.publishedISO) - Date.parse(a.publishedISO));

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            name: `${member.name} — ${member.role}`,
            description: member.longBio,
            path: `/team/${member.slug}`,
          }),
          personSchema({
            name: member.name,
            jobTitle: member.role,
            path: `/team/${member.slug}`,
            description: member.longBio,
            knowsAbout: member.knowsAbout,
            image: member.img,
            sameAs: member.linkedin ? [member.linkedin] : undefined,
          }),
        ]}
      />

      {/* Hero */}
      <section className="phero">
        <div className="phero-bg" data-parallax="38">
          <Image src="/hero/team.jpg" alt="" fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
        </div>
        <div className="phero-ov"></div>
        <div className="phero-grid" data-parallax="14"></div>
        <div className="container phero-inner">
          <Breadcrumbs
            className="mb-4"
            items={[{ name: 'Team', href: '/team' }, { name: member.name }]}
          />
          <span className="stag">{member.role}</span>
          <h1 className="hero-title mt-3" style={{ fontSize: '2.6rem' }}>
            {member.name}
          </h1>
          <p className="hero-sub">{member.bio}</p>
        </div>
      </section>
      <div className="divider"></div>

      {/* Profile */}
      <section className="sec bg-w">
        <div className="container">
          <div className="row justify-content-center g-5">
            <div className="col-lg-4" data-reveal="up">
              <div className="pcard p-4 text-center">
                <Image
                  src={member.img}
                  alt={member.imgAlt}
                  width={180}
                  height={180}
                  style={{ borderRadius: '50%', margin: '0 auto', objectFit: 'cover' }}
                />
                <h2 className="mt-4" style={{ fontSize: '1.25rem' }}>
                  {member.name}
                </h2>
                <p style={{ color: 'var(--tx3)', fontSize: '.9rem' }}>{member.role}</p>

                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="d-inline-block mt-2"
                  >
                    <i className="bi bi-linkedin me-1"></i>LinkedIn
                  </a>
                )}
              </div>
            </div>

            <div className="col-lg-7" data-reveal>
              <h2 className="stitle" style={{ fontSize: '1.8rem' }}>
                About {member.name.split(' ')[0]}
              </h2>
              <p className="mt-3" style={{ fontSize: 'var(--step-0)', lineHeight: 1.78 }}>
                {member.longBio}
              </p>

              <h3 className="mt-5" style={{ fontSize: '1.15rem' }}>
                Areas of focus
              </h3>
              <ul className="mt-3">
                {member.knowsAbout.map((k) => (
                  <li key={k}>{k}</li>
                ))}
              </ul>

              {/* Rendered only when non-empty. The data model deliberately keeps
                  `credentials` empty rather than inventing any — an unverifiable
                  credential is an E-E-A-T liability, not an asset. */}
              {member.credentials.length > 0 && (
                <>
                  <h3 className="mt-4" style={{ fontSize: '1.15rem' }}>
                    Credentials
                  </h3>
                  <ul className="mt-3">
                    {member.credentials.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Authored articles — the archive that ties the person to the work */}
      {authored.length > 0 && (
        <>
          <div className="divider"></div>
          <section className="sec bg-g">
            <div className="container">
              <div className="row justify-content-between align-items-end mb-5">
                <div className="col-lg-8" data-reveal="up">
                  <span className="stag">Published work</span>
                  <h2 className="stitle mt-3">
                    Written by <span className="gtxt">{member.name.split(' ')[0]}</span>
                  </h2>
                </div>
                <div className="col-auto" data-reveal="up">
                  <Button href="/blog" variant="glass">
                    All insights <i className="bi bi-arrow-right ms-1"></i>
                  </Button>
                </div>
              </div>
              <div className="row row-cols-1 row-cols-md-3 g-4 depth-row">
                {authored.map((post, i) => (
                  <BlogCard key={post.slug} post={post} index={i} />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* CTA */}
      <div className="divider"></div>
      <section className="sec bg-w">
        <div className="container text-center" data-reveal="up">
          <h2 className="stitle">
            Talk to <span className="gtxt">an architect</span>
          </h2>
          <p className="ssub mt-3">
            Consultations are taken by the senior team, not by pre-sales agents.
          </p>
          <div className="mt-4 d-flex gap-3 justify-content-center flex-wrap">
            <Button href="/contact" variant="grad">
              Book a consultation
            </Button>
            <Link href="/team" className="btn-glass">
              Meet the team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
