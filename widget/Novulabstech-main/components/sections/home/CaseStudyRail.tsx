import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { caseStudies } from '@/content/caseStudies';
import HorizontalScroll from '@/components/ui/HorizontalScroll';

/**
 * Horizontal case-study rail on the homepage.
 *
 * Two jobs. Visually it is the horizontal-scroll moment on the site. For SEO it
 * closes a linking gap: the homepage teased three case studies and linked to
 * nothing else in /portfolio/*, so six engagements got no link from the site's
 * strongest page. The rail carries all nine without costing the vertical space
 * a nine-card grid would.
 *
 * Interaction lives in HorizontalScroll — a genuine scroll container that the
 * vertical-scroll coupling only assists, so swipe, shift-wheel, drag, keyboard
 * and assistive tech all work regardless.
 */
const CaseStudyRail: React.FC = () => {
  return (
    <section className="sec bg-g z1" id="case-rail">
      <div className="container">
        <div className="row justify-content-between align-items-end mb-5">
          <div className="col-lg-7" data-reveal="up">
            <span className="stag">Every engagement</span>
            <h2 className="stitle mt-3">
              Nine builds, <span className="gtxt">start to finish</span>
            </h2>
            <p className="ssub mt-3 mb-0">
              Scroll sideways, or keep scrolling down and the rail advances with you. Clients
              are described by category — every engagement here is covered by an NDA.
            </p>
          </div>
        </div>
      </div>

      {/* Full-bleed so the rail runs to the viewport edge, which is what signals
          there is more to the right. The container above keeps the heading
          aligned with the rest of the page. */}
      <div className="container-fluid px-3 px-lg-5">
        <HorizontalScroll ariaLabel="Case studies, scroll horizontally">
          {caseStudies.map((cs) => (
            <article className="pcard h-100" key={cs.slug}>
              <div className="pimg-wrap" style={{ height: '170px' }}>
                <Image
                  className="pimg"
                  src={`/portfolio/${cs.slug}.jpg`}
                  alt={`${cs.codename} — ${cs.industry}`}
                  width={1200}
                  height={630}
                  sizes="340px"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="p-4">
                <span className="tbadge">{cs.industry}</span>
                <h3 className="mt-3" style={{ fontSize: '1rem', lineHeight: 1.35 }}>
                  <Link href={`/portfolio/${cs.slug}`}>{cs.title}</Link>
                </h3>
                <p className="ctext mt-2 mb-0" style={{ fontSize: '0.83rem' }}>
                  {cs.summary}
                </p>
              </div>
            </article>
          ))}
        </HorizontalScroll>
      </div>
    </section>
  );
};

export default CaseStudyRail;
