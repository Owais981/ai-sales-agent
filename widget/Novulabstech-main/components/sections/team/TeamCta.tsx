import React from 'react';
import Button from '@/components/ui/Button';

const TeamCta: React.FC = () => {
  return (
    <section id="cta-banner">
      <div className="container">
        <div className="cta-inner" data-reveal="up">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <span className="stag">Join Us</span>
              <p className="stitle mt-3">We are always looking for<br />exceptional <span className="gtxt">engineers.</span></p>
              <p className="ssub mt-4 mb-0">If you are a senior system builder, compliance expert, or performance engineer who values architectural integrity and clean engineering over generic project cycles, we'd like to meet you.</p>
            </div>
            <div className="col-lg-5 text-lg-end">
              <div className="cta-card text-start">
                <div className="cta-card-label">Send us your CV</div>
                <Button href="mailto:info@novulabs.net" variant="grad" className="w-100 justify-content-center mb-3">
                  <i className="bi bi-envelope me-1"></i>Apply Now
                </Button>
                <p className="cta-card-note">All applicants must undergo a rigorous code-writing and architecture challenge. Only senior positions are currently open.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamCta;
