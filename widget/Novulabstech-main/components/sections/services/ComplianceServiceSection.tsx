import React from 'react';
import GlowCard from '@/components/ui/GlowCard';
import Button from '@/components/ui/Button';

const ComplianceServiceSection: React.FC = () => {
  return (
    <section id="compliance" className="sec bg-g">
      <div className="container">
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-7" data-reveal="up">
            <span className="stag">Services 12–18</span>
            <h2 className="stitle mt-3">AML, CFT &amp; <span className="gtxt">Compliance</span></h2>
            <p className="ssub mx-auto">The deepest regulatory compliance engineering expertise in Pakistan and the MENA region.</p>
          </div>
        </div>
        <div className="row g-4">
          <div className="col-md-6 col-lg-4" data-reveal="up">
            <GlowCard className="gcard">
              <div className="gcard-body">
                <div className="sico i-t"><i className="bi bi-shield-lock-fill"></i></div>
                <div className="ctitle">AML Systems</div>
                <p className="ctext">Real-time AML monitoring, customer risk scoring, and automated GOAML reports for FMU Pakistan.</p>
                <Button href="/contact" variant="none" className="carr"><i className="bi bi-arrow-right-circle"></i>Consult Us</Button>
              </div>
            </GlowCard>
          </div>
          <div className="col-md-6 col-lg-4" data-reveal="up">
            <GlowCard className="gcard">
              <div className="gcard-body">
                <div className="sico i-b"><i className="bi bi-flag-fill"></i></div>
                <div className="ctitle">CFT Compliance</div>
                <p className="ctext">Terrorism financing detection with UN sanctions screening, PEP database integration, CTR filing.</p>
                <Button href="/contact" variant="none" className="carr"><i className="bi bi-arrow-right-circle"></i>Consult Us</Button>
              </div>
            </GlowCard>
          </div>
          <div className="col-md-6 col-lg-4" data-reveal="up">
            <GlowCard className="gcard">
              <div className="gcard-body">
                <div className="sico i-p"><i className="bi bi-activity"></i></div>
                <div className="ctitle">Transaction Monitoring</div>
                <p className="ctext">ML-powered behavioral analytics detecting suspicious patterns across millions of daily transactions.</p>
                <Button href="/contact" variant="none" className="carr"><i className="bi bi-arrow-right-circle"></i>Consult Us</Button>
              </div>
            </GlowCard>
          </div>
          <div className="col-md-6 col-lg-4" data-reveal="up">
            <GlowCard className="gcard">
              <div className="gcard-body">
                <div className="sico i-y"><i className="bi bi-filetype-xml"></i></div>
                <div className="ctitle">XML Schema Integration</div>
                <p className="ctext">ISO 20022, SWIFT XML, HL7 FHIR, and custom schema processing for financial messaging.</p>
                <Button href="/contact" variant="none" className="carr"><i className="bi bi-arrow-right-circle"></i>Consult Us</Button>
              </div>
            </GlowCard>
          </div>
          <div className="col-md-6 col-lg-4" data-reveal="up">
            <GlowCard className="gcard">
              <div className="gcard-body">
                <div className="sico i-g"><i className="bi bi-buildings-fill"></i></div>
                <div className="ctitle">Government Portals</div>
                <p className="ctext">National identity portals with NADRA/CNIC API, biometric verification, and PKI infrastructure.</p>
                <Button href="/contact" variant="none" className="carr"><i className="bi bi-arrow-right-circle"></i>Consult Us</Button>
              </div>
            </GlowCard>
          </div>
          <div className="col-md-6 col-lg-4" data-reveal="up">
            <GlowCard className="gcard">
              <div className="gcard-body">
                <div className="sico i-v"><i className="bi bi-bank2"></i></div>
                <div className="ctitle">FMU Pakistan</div>
                <p className="ctext">Full GOAML integration, STR/CTR submission, typology mapping, and SBP regulatory dashboards.</p>
                <Button href="/contact" variant="none" className="carr"><i className="bi bi-arrow-right-circle"></i>Consult Us</Button>
              </div>
            </GlowCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplianceServiceSection;
