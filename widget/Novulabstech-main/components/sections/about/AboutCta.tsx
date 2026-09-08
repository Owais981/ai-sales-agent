import React from 'react';
import Button from '@/components/ui/Button';

const AboutCta: React.FC = () => {
  return (
    <section id="cta-banner">
      <div className="container">
        <div className="cta-inner" data-reveal="up">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <span className="stag">Work With Us</span>
              <p className="stitle mt-3">Good software starts with<br /><span className="gtxt">understanding the problem.</span></p>
              <p className="ssub mt-4 mb-0">We spend our first call listening — to what you're trying to build, what's gone wrong before, and what success actually looks like for your organization. The advice we give you is based on that, not a standard playbook.</p>
              <div className="cta-trust-row">
                <div className="cta-trust-item"><i className="bi bi-person-check"></i>Senior engineer on the call — not a pre-sales team</div>
                <div className="cta-trust-item"><i className="bi bi-file-earmark-lock2"></i>Your IP and project details stay completely confidential</div>
                <div className="cta-trust-item"><i className="bi bi-clock-history"></i>Response within 4 hours — we know your time matters</div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="cta-card">
                <div className="cta-card-label">Start the conversation</div>
                <Button href="/contact" variant="grad" className="w-100 justify-content-center mb-3">
                  <i className="bi bi-calendar-check me-1"></i>Book a Free Call
                </Button>
                <Button href="mailto:info@novulabs.net" variant="glass" className="w-100 justify-content-center">
                  <i className="bi bi-envelope me-1"></i>Email Us Directly
                </Button>
                <p className="cta-card-note">No demos, no pitch scripts. Just a straight conversation about your project and whether we're the right fit.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCta;
