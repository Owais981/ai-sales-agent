import React from 'react';
import Button from '@/components/ui/Button';

const HealthcareDeepDive: React.FC = () => {
  return (
    <section id="healthcare" className="sec bg-g">
      <div className="container">
        <div className="row align-items-center g-5 flex-lg-row-reverse">
          <div className="col-lg-6" data-reveal="left">
            <span className="stag">Industry 02</span>
            <h2 className="stitle mt-3">Healthcare &amp; <span className="gtxt">MedTech</span></h2>
            {/* "40+ hospitals" removed — the figure traces to one case-study
                metric flagged as unverified in CLIENT-ACTIONS.md item 7. It can
                be reinstated once the client substantiates it. */}
            <p className="mb-3">Our healthcare work covers HIPAA-aligned EHR systems, telemedicine platforms and medical billing, delivered for hospital groups and providers in Pakistan, the UAE and North America.</p>
            <p className="mb-4">We understand clinical workflows, HL7 FHIR messaging standards, and the regulatory landscape for healthcare data — building systems that clinicians actually use.</p>
            <ul className="chk mb-4">
              <li><span className="chk-ico"><i className="bi bi-check"></i></span>Electronic Health Records (EHR)</li>
              <li><span className="chk-ico"><i className="bi bi-check"></i></span>Telemedicine &amp; remote patient monitoring</li>
              <li><span className="chk-ico"><i className="bi bi-check"></i></span>Medical billing (ICD-10, CPT, RCM)</li>
              <li><span className="chk-ico"><i className="bi bi-check"></i></span>HL7 FHIR &amp; HIPAA compliance</li>
              <li><span className="chk-ico"><i className="bi bi-check"></i></span>Pharmacy management systems</li>
            </ul>
            <Button href="/contact" variant="grad"><i className="bi bi-calendar-check me-1"></i>Consult About Healthcare IT</Button>
          </div>
          <div className="col-lg-6" data-reveal="right">
            <div className="sec-img">
              <img
                src="/og/healthcare-software-development.jpg"
                alt="HIPAA and HL7 FHIR healthcare platform engineering"
                width={1200}
                height={630}
                loading="lazy"
                decoding="async"
                style={{ height: '400px', width: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthcareDeepDive;
