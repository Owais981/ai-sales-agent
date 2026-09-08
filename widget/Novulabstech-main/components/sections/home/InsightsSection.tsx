import React from 'react';
import { blogPosts } from '@/content/blogPosts';
import BlogCard from '@/components/ui/BlogCard';
import Button from '@/components/ui/Button';

/**
 * Homepage insights teaser.
 *
 * Added to close an internal-linking gap: the homepage linked to all seven
 * service pages and three case studies, but to zero blog posts. The homepage is
 * the strongest page on the site by inbound authority, and none of it was
 * reaching /blog/* — the articles were only linked from /blog itself and from
 * each other, so the whole editorial cluster sat one hop further from the
 * homepage than it needed to.
 *
 * Sorted by publication date rather than array order so the section does not
 * silently go stale as posts are added.
 */
const InsightsSection: React.FC = () => {
  const latest = [...blogPosts]
    .sort((a, b) => Date.parse(b.publishedISO) - Date.parse(a.publishedISO))
    .slice(0, 3);

  return (
    <section className="sec bg-w z1" id="insights">
      <div className="container">
        <div className="row justify-content-between align-items-end mb-5">
          <div className="col-lg-7" data-reveal="up">
            <span className="stag">Insights</span>
            {/* Deliberately not "Our Blog" — the heading targets the engineering
                intent the articles actually serve, and avoids competing with
                /blog for the same query the way the old homepage headings
                competed with /services and /industries. */}
            <h2 className="stitle mt-3">
              Engineering notes from <span className="gtxt">regulated delivery</span>
            </h2>
            <p className="ssub mt-3 mb-0">
              Build guides written for the engineer who has to ship the thing — goAML
              submission, instant payment rails, identity verification and healthcare
              interoperability, with primary sources cited throughout.
            </p>
          </div>
          <div className="col-auto" data-reveal="up">
            <Button href="/blog" variant="glass">
              All insights <i className="bi bi-arrow-right ms-1"></i>
            </Button>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4 depth-row">
          {latest.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
