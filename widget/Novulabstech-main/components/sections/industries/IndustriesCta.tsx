import React from 'react';
import Button from '@/components/ui/Button';

const IndustriesCta: React.FC = () => {
  return (
    <section id="cta-banner">
      <div className="container">
        <div className="cta-inner" data-reveal="up">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <span className="stag">Your Industry</span>
              <p className="stitle mt-3">Don't see your sector listed?<br /><span className="gtxt">We have probably worked in it.</span></p>
              <p className="ssub mt-4 mb-0">We've built software for industries not on this page — logistics companies, insurance platforms, telecom operators, energy firms. If your organization has a real software problem that needs solving, we'd like to hear about it. One call, no strings.</p>
              <div className="cta-trust-row">
                <div className="cta-trust-item"><i className="bi bi-buildings"></i>We adapt to sector-specific regulations and workflows</div>
                <div className="cta-trust-item"><i className="bi bi-person-check"></i>Domain experts on the call, not generalists</div>
                <div className="cta-trust-item"><i className="bi bi-shield-check"></i>All discussions covered by mutual NDA from the start</div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="cta-card">
                <div className="cta-card-label">Talk to us about your sector</div>
                <Button href="/contact" variant="grad" className="w-100 justify-content-center mb-3">
                  <i className="bi bi-calendar-check me-1"></i>Book a Free Call
                </Button>
                <Button href="/portfolio" variant="glass" className="w-100 justify-content-center">
                  <i className="bi bi-folder2-open me-1"></i>See Our Portfolio
                </Button>
                <p className="cta-card-note">No obligation. If we're not the right people for your project, we'll be honest about it — and usually know someone who is.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesCta;
