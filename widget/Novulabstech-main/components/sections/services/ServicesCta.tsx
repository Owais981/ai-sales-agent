import React from 'react';
import Button from '@/components/ui/Button';

const ServicesCta: React.FC = () => {
  return (
    <section id="cta-banner">
      <div className="container">
        <div className="cta-inner" data-reveal="up">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <span className="stag">Not Sure Where to Start?</span>
              <p className="stitle mt-3">That is exactly<br /><span className="gtxt">what the first call is for.</span></p>
              <p className="ssub mt-4 mb-0">Most clients come to us knowing they have a problem but unsure how to frame it. We're used to that. Bring us what you know — we'll help you figure out the right approach, the honest timeline, and what it's actually going to take.</p>
              <div className="cta-trust-row">
                <div className="cta-trust-item"><i className="bi bi-person-check"></i>Speak with an architect who has shipped similar systems</div>
                <div className="cta-trust-item"><i className="bi bi-chat-square-text"></i>We ask more questions than you will — that's the point</div>
                <div className="cta-trust-item"><i className="bi bi-file-earmark-text"></i>Honest written assessment follows within 5 business days</div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="cta-card">
                <div className="cta-card-label">Book your call</div>
                <Button href="/contact" variant="grad" className="w-100 justify-content-center mb-3">
                  <i className="bi bi-calendar-check me-1"></i>Book a Free Call
                </Button>
                <Button href="mailto:info@novulabs.net" variant="glass" className="w-100 justify-content-center">
                  <i className="bi bi-envelope me-1"></i>Send Us Your Brief
                </Button>
                <p className="cta-card-note">If our services aren't the right fit for your project, we'll tell you that clearly — and often point you in a better direction.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesCta;
