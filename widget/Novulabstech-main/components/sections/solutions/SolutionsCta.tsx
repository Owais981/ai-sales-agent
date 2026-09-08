import React from 'react';
import Button from '@/components/ui/Button';

const SolutionsCta: React.FC = () => {
  return (
    <section id="cta-banner">
      <div className="container">
        <div className="cta-inner" data-reveal="up">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <span className="stag">Let's Talk</span>
              <p className="stitle mt-3">Every project we've built<br />started with a <span className="gtxt">phone call.</span></p>
              <p className="ssub mt-4 mb-0">We'll go through exactly what you're working on, where the hard parts are, and whether our experience is actually relevant to your situation. If it's not a good fit, we'll say that too — we'd rather tell you now than waste your time.</p>
              <div className="cta-trust-row">
                <div className="cta-trust-item">
                  <i className="bi bi-person-check"></i>
                  You'll speak directly with an engineer — not a sales rep
                </div>
                <div className="cta-trust-item">
                  <i className="bi bi-file-earmark-lock2"></i>
                  We sign an NDA before any technical discussion starts
                </div>
                <div className="cta-trust-item">
                  <i className="bi bi-clock-history"></i>
                  45-minute call, no commitment, written summary sent after
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="cta-card">
                <div className="cta-card-label">Start with a conversation</div>
                <Button href="/contact" variant="grad" className="w-100 justify-content-center mb-3" style={{ fontSize: '0.94rem' }}>
                  <i className="bi bi-calendar-check me-1"></i>Book a Free Call
                </Button>
                <Button href="mailto:info@novulabs.net" variant="glass" className="w-100 justify-content-center" style={{ fontSize: '0.94rem' }}>
                  <i className="bi bi-envelope me-1"></i>Send Us Your Brief
                </Button>
                <p className="cta-card-note">Most engagements start exactly this way — a straightforward conversation about one specific problem, before anyone writes a proposal.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsCta;
