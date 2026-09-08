import React from 'react';
import Button from '@/components/ui/Button';

const HealthcareServiceSection: React.FC = () => {
  return (
    <section id="healthcare" className="sec bg-w">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6" data-reveal="right">
            <span className="stag">Services 10–11</span>
            <h2 className="stitle mt-3">Healthcare Software <span className="gtxt">Development</span></h2>
            {/* "across 40+ hospitals" removed — see CLIENT-ACTIONS.md item 7. */}
            <p className="ssub mb-4">HIPAA-aligned, HL7 FHIR-conformant healthcare platforms — EHR, telemedicine, medical billing and pharmacy management, built to interoperate rather than to translate at the edge.</p>
            <Button href="/contact" variant="grad">
              <i className="bi bi-calendar-check me-1"></i>Consult About Healthcare IT
            </Button>
          </div>
          <div className="col-lg-6" data-reveal="left">
            <div className="sec-img">
              <img
                src="/og/healthcare-software-development.jpg"
                alt="Healthcare software development services"
                width={1200}
                height={630}
                loading="lazy"
                decoding="async"
                style={{ height: '340px', width: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthcareServiceSection;
