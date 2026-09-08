import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { blogPosts, getPost } from '@/content/blogPosts';
import { teamMembers } from '@/content/siteData';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import Button from '@/components/ui/Button';
import { blogPostingSchema, webPageSchema } from '@/lib/schema';
import { canonical } from '@/lib/seo';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return { title: 'Post not found', robots: { index: false, follow: true } };
  }

  const url = canonical(`/blog/${post.slug}`);

  return {
    // Was `${post.title} | NovuLabs Insights`, which the root template then
    // suffixed again — producing 95–101 char titles ending "| NovuLabs Insights
    // | NovuLabs". seoTitle is length-budgeted; the layout appends the brand once.
    title: post.seoTitle ?? post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author, url: canonical(`/team/${post.authorSlug}`) }],
    // THE FIX. Previously absent, so the root layout's `alternates.canonical:
    // '/'` was inherited and every post declared rel=canonical → the homepage,
    // instructing Google to drop the entire /blog/ tree from the index.
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedISO,
      modifiedTime: post.modifiedISO,
      authors: [canonical(`/team/${post.authorSlug}`)],
      section: post.category,
      tags: post.tags,
      images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.coverAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const author = teamMembers.find((m) => m.slug === post.authorSlug);
  const related = (post.related ?? []).map((s) => getPost(s)).filter(Boolean);

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            name: post.title,
            description: post.description,
            path: `/blog/${post.slug}`,
          }),
          blogPostingSchema({
            title: post.title,
            description: post.description,
            slug: post.slug,
            image: post.coverImage,
            datePublished: post.publishedISO,
            dateModified: post.modifiedISO,
            authorName: post.author,
            authorPath: `/team/${post.authorSlug}`,
            section: post.category,
            keywords: post.tags,
          }),
        ]}
      />

      {/* Hero */}
      <section className="phero">
        <div className="phero-bg" data-parallax="38">
          <Image
            src="/hero/blog.jpg"
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
            items={[{ name: 'Insights', href: '/blog' }, { name: post.category }]}
          />
          <span className="stag">
            {post.category} • {post.readTime}
          </span>
          <h1 className="hero-title mt-3" style={{ fontSize: '2.5rem', lineHeight: '1.2' }}>
            {post.title}
          </h1>
          <div className="mt-4" style={{ fontSize: '0.9rem', color: 'var(--tx3)' }}>
            {/* Byline links to a real Person entity. It was previously a bare
                string, which is unresolvable for E-E-A-T and for LLM retrieval. */}
            <span>
              By{' '}
              <Link href={`/team/${post.authorSlug}`} rel="author">
                <strong>{post.author}</strong>
              </Link>
            </span>{' '}
            • <time dateTime={post.publishedISO}>{post.date}</time>
          </div>
        </div>
      </section>
      <div className="divider"></div>

      {/* Article */}
      <section className="sec bg-w">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {/* data-reveal is driven by components/ui/ScrollReveal.tsx. Long-form
                  article bodies are outside AOS's reach — AOS is attached to
                  section wrappers, and this content is injected as raw HTML — so
                  the article previously appeared with no entrance at all while
                  every surrounding section animated. A <noscript> guard in
                  layout.tsx forces it visible when JS is unavailable, and the
                  reduced-motion block in globals.css does the same when motion
                  is not wanted. */}
              <article
                data-reveal
                className="blog-post-content"
                style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--tx2)' }}
              >
                <div dangerouslySetInnerHTML={{ __html: post.content }} />

                {/* Primary sources. Regulatory content that names SBP, FMU, FATF
                    and HHS without linking to any of them reads as unverified to
                    quality raters and is rarely cited by AI search. */}
                {post.sources && post.sources.length > 0 && (
                  <>
                    <h2>Primary sources</h2>
                    <ul>
                      {post.sources.map((s) => (
                        <li key={s.href}>
                          <a href={s.href} target="_blank" rel="noopener noreferrer">
                            {s.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Contextual links into commercial pages — previously the only
                    outbound path from any post was the CTA to /contact, so every
                    article was a crawl and PageRank dead end. */}
                {post.relatedServices && post.relatedServices.length > 0 && (
                  <>
                    <h2>How we help with this</h2>
                    <ul>
                      {post.relatedServices.map((s) => (
                        <li key={s.href}>
                          <Link href={s.href}>{s.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Tags */}
                <div
                  className="d-flex gap-2 flex-wrap mt-5 pt-4"
                  style={{ borderTop: '1px solid var(--bg-2)' }}
                >
                  {post.tags.map((tag) => (
                    <span
                      className="tbadge"
                      key={tag}
                      style={{ fontSize: '0.8rem', padding: '6px 14px' }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Author box — E-E-A-T. Google's quality systems and every LLM
                    retrieval pipeline key on author entity resolution, which a
                    bare byline string cannot support. */}
                {author && (
                  <div className="cta-card mt-4" id={`author-${author.slug}`}>
                    <div className="cta-card-label">About the author</div>
                    <div className="d-flex align-items-start gap-3 mt-2">
                      <Image
                        src={author.img}
                        alt={author.imgAlt}
                        width={72}
                        height={72}
                        style={{ borderRadius: '50%', flexShrink: 0 }}
                      />
                      <div>
                        <div style={{ fontWeight: 700 }}>
                          <Link href={`/team/${author.slug}`}>{author.name}</Link>
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--tx3)' }}>{author.role}</div>
                        <p className="mt-2 mb-0" style={{ fontSize: '0.92rem' }}>
                          {author.longBio}
                        </p>
                        {author.credentials.length > 0 && (
                          <div className="d-flex gap-2 flex-wrap mt-2">
                            {author.credentials.map((c) => (
                              <span
                                className="tbadge"
                                key={c}
                                style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                              >
                                {c}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="sec bg-g">
          <div className="container">
            <div className="row justify-content-center text-center mb-4">
              <div className="col-lg-7">
                <h2 className="stitle">
                  Related <span className="gtxt">reading</span>
                </h2>
              </div>
            </div>
            <div className="row g-4 justify-content-center">
              {related.map((r) => (
                <div className="col-md-6 col-lg-5" key={r!.slug}>
                  <div className="gcard h-100">
                    <div className="gcard-body">
                      <span className="stag">{r!.category}</span>
                      <div className="ctitle mt-2">{r!.title}</div>
                      <p className="ctext">{r!.description}</p>
                      <Link href={`/blog/${r!.slug}`} className="carr">
                        <i className="bi bi-arrow-right-circle"></i>Read article
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA. Deliberately NOT an <h2>: it previously carried the only <h2> on
          every post while the article's real subheadings were <h3>, which told
          search engines and LLM chunkers that the sales pitch was the primary
          section of the article. */}
      <section id="cta-banner">
        <div className="container">
          <div className="cta-inner" data-reveal="up">
            <div className="row align-items-center g-5">
              <div className="col-lg-7">
                <span className="stag">Consult our team</span>
                <p className="stitle mt-3 mb-0">
                  Need guidance implementing
                  <br />
                  <span className="gtxt">these solutions?</span>
                </p>
                <p className="ssub mt-4 mb-0">
                  Our engineers build compliance pipelines, scale payment switches and design
                  HIPAA-ready architectures daily. Bring your systems architecture and we will look at
                  it with you.
                </p>
              </div>
              <div className="col-lg-5 text-lg-end">
                <div className="cta-card text-start">
                  <div className="cta-card-label">Schedule a free technical review</div>
                  <Button href="/contact" variant="grad" className="w-100 justify-content-center mb-3">
                    <i className="bi bi-calendar-check me-1"></i>Book a technical call
                  </Button>
                  <Button href="/portfolio" variant="glass" className="w-100 justify-content-center">
                    <i className="bi bi-folder2-open me-1"></i>Explore case studies
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
