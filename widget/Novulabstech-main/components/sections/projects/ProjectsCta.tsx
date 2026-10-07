import React from 'react';
import Button from '@/components/ui/Button';

const ProjectsCta: React.FC = () => (
  <section id="cta-banner">
    <div className="container">
      <div className="cta-inner" data-reveal="up">
        <div className="row align-items-center g-5">
          <div className="col-lg-7">
            <span className="stag">Working on Something Similar?</span>
            <p className="stitle mt-3 mb-0">
              Bring us the <span className="gtxt">architecture</span>, not the brief
            </p>
            <p className="ssub mt-4 mb-0">
              A free 45-minute call with a senior engineer who has built this before. Bring your architecture and get an honest read on it.
            </p>
          </div>
          <div className="col-lg-5">
            <div className="cta-card">
              <div className="cta-card-label">Start a conversation</div>
              <Button href="/contact" variant="grad" className="w-100 justify-content-center mb-3">
                <i className="bi bi-calendar-check me-1"></i>Book a technical call
              </Button>
              <Button href="/portfolio" variant="glass" className="w-100 justify-content-center">
                <i className="bi bi-folder2-open me-1"></i>View case studies
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ProjectsCta;
