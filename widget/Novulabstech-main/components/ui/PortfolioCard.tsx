import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { CaseStudy } from '@/content/caseStudies';

interface PortfolioCardProps {
  project: CaseStudy;
  index: number;
}

/**
 * Case study card.
 *
 * The primary link now targets the case study detail page rather than /contact.
 * Previously all ten cards linked only to the contact form, which meant the
 * portfolio's most compelling material was ~30 words per project on a single
 * URL, and no card passed link equity to anything indexable.
 */
const PortfolioCard: React.FC<PortfolioCardProps> = ({ project, index }) => {
  const href = `/portfolio/${project.slug}`;

  return (
    <div className="col" data-reveal="up">
      <div className="pcard">
        <Link href={href} className="pimg-wrap d-block" aria-hidden="true" tabIndex={-1}>
          <Image
            className="pimg"
            src={`/portfolio/${project.slug}.jpg`}
            alt=""
            width={1200}
            height={630}
            // Explicit intrinsic dimensions reserve layout space, which removes
            // this grid as a cumulative layout shift source.
            sizes="(max-width: 768px) 100vw, 33vw"
            loading={index < 3 ? 'eager' : 'lazy'}
          />
        </Link>
        <div className="pbody">
          <div className="ptag">
            {project.industry} · {project.codename}
          </div>
          <div className="ptitle">
            <Link href={href}>{project.title}</Link>
          </div>
          <p className="pdesc">{project.summary}</p>
          <div className="d-flex gap-2 mt-3 flex-wrap">
            {project.tech.map((t) => (
              <span className="tbadge" key={t}>
                {t}
              </span>
            ))}
          </div>
          <div className="mt-3">
            <Link
              href={href}
              className="btn-glass"
              style={{ padding: '7px 16px', fontSize: '0.79rem' }}
            >
              Read the case study →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
