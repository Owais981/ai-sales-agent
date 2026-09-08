import React from 'react';
import Link from 'next/link';
import { caseStudies } from '@/content/caseStudies';

/**
 * Sector-to-case-study links on /industries.
 *
 * /industries linked to seven service pages and three articles but to zero case
 * studies — the single strongest contextual link available on a sector page,
 * because a buyer reading about banking wants the banking engagement, not a
 * generic portfolio index.
 *
 * Grouped by the `category` already on each case study, so this stays correct
 * as entries are added rather than needing a second hand-maintained mapping.
 */
const SECTORS: { key: string; label: string; blurb: string }[] = [
  {
    key: 'fintech',
    label: 'Banking & fintech',
    blurb: 'Screening, monitoring, regulatory reporting and payment infrastructure.',
  },
  {
    key: 'healthcare',
    label: 'Healthcare',
    blurb: 'Records platforms, interoperability and remote consultation.',
  },
  {
    key: 'government',
    label: 'Government & public sector',
    blurb: 'Identity verification and revenue collection at population scale.',
  },
  {
    key: 'enterprise',
    label: 'Enterprise',
    blurb: 'Resource planning and customer intelligence across distributed operations.',
  },
];

const SectorCaseStudies: React.FC = () => {
  return (
    <section className="sec bg-g" id="sector-work">
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center" data-reveal="up">
            <span className="stag">Delivered work</span>
            <h2 className="stitle mt-3">
              Engagements in <span className="gtxt">each sector</span>
            </h2>
            <p className="ssub mt-3 mb-0">
              Clients are described by category rather than named — every engagement below is
              covered by an NDA. Each case study sets out the problem, the constraints we
              designed within, and the engineering decisions behind the result.
            </p>
          </div>
        </div>

        <div className="row g-4" data-reveal-group>
          {SECTORS.map((sector) => {
            const items = caseStudies.filter((cs) => cs.category === sector.key);
            if (items.length === 0) return null;

            return (
              <div className="col-md-6" key={sector.key} data-reveal>
                <div className="pcard h-100 p-4">
                  <h3 style={{ fontSize: '1.1rem' }}>{sector.label}</h3>
                  <p className="ctext" style={{ fontSize: '0.86rem' }}>{sector.blurb}</p>
                  <ul className="mt-3 mb-0" style={{ paddingLeft: '1.1rem' }}>
                    {items.map((cs) => (
                      <li key={cs.slug} className="mb-2" style={{ fontSize: '0.9rem' }}>
                        <Link href={`/portfolio/${cs.slug}`}>{cs.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SectorCaseStudies;
