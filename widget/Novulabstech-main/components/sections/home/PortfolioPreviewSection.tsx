import React from 'react';
import { caseStudies } from '@/content/caseStudies';
import PortfolioCard from '@/components/ui/PortfolioCard';
import Button from '@/components/ui/Button';

/**
 * Homepage case-study teaser.
 *
 * Heading changed from "Selected Projects", which competed with /portfolio for
 * the same intent. The homepage previously contained a superset of every inner
 * page's content — including headings byte-identical to /services' and
 * /industries' H1s — so Google would frequently rank the homepage instead of
 * the purpose-built commercial page, and both underperformed.
 */
const PortfolioPreviewSection: React.FC = () => {
  const previewProjects = caseStudies.slice(0, 3);

  return (
    <section className="sec bg-g z1" id="portfolio">
      <div className="container">
        <div className="row justify-content-between align-items-end mb-5">
          <div className="col-lg-7" data-reveal="up">
            <span className="stag">Our work</span>
            <h2 className="stitle mt-3">Three engagements, <span className="gtxt">in detail</span></h2>
            <p className="ssub mt-3 mb-0">
              Each case study covers the problem, the constraints we designed within, and what
              actually changed. Client names are withheld under NDA and described by category.
            </p>
          </div>
          <div className="col-auto" data-reveal="up">
            <Button href="/portfolio" variant="glass">
              All case studies <i className="bi bi-arrow-right ms-1"></i>
            </Button>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4 depth-row">
          {previewProjects.map((project, i) => (
            <PortfolioCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreviewSection;
