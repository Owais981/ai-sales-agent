import React from 'react';
import GlowCard from '@/components/ui/GlowCard';
import Button from '@/components/ui/Button';

const FintechDeepDive: React.FC = () => {
  return (
    <section id="banking" className="sec bg-w">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6" data-reveal="right">
            <span className="stag">Industry 01</span>
            <h2 className="stitle mt-3">Banking &amp; <span className="gtxt">Fintech</span></h2>
            <p className="mb-3">NovuLabs is the trusted technology partner for Tier-1 banks, microfinance institutions, digital banks, and fintech startups across Pakistan, UAE, and the wider MENA region.</p>
            <p className="mb-4" dangerouslySetInnerHTML={{ __html: 'AML/CFT is our deepest specialisation: goAML XML integration, STR/CTR reporting automation, sanctions and PEP screening, and transaction monitoring built for SBP-regulated institutions under FMU and FATF frameworks. <a href="/services/aml-cft-compliance-software">See how we build it</a>.' }} />
            <div className="row g-3 mb-4">
              <div className="col-6">
                <GlowCard className="gcard p-3">
                  <div className="sico i-t mb-2" style={{ width: '36px', height: '36px', fontSize: '0.9rem' }}><i className="bi bi-shield-lock-fill"></i></div>
                  <div className="ctitle" style={{ fontSize: '0.85rem' }}>AML/CFT</div>
                  <p className="ctext" style={{ fontSize: '0.77rem' }}>GOAML, STR/CTR, FMU Pakistan</p>
                </GlowCard>
              </div>
              <div className="col-6">
                <GlowCard className="gcard p-3">
                  <div className="sico i-b mb-2" style={{ width: '36px', height: '36px', fontSize: '0.9rem' }}><i className="bi bi-credit-card-2-front"></i></div>
                  <div className="ctitle" style={{ fontSize: '0.85rem' }}>Payments</div>
                  <p className="ctext" style={{ fontSize: '0.77rem' }}>Mastercard, Visa, RAAST, 1LINK</p>
                </GlowCard>
              </div>
              <div className="col-6">
                <GlowCard className="gcard p-3">
                  <div className="sico i-v mb-2" style={{ width: '36px', height: '36px', fontSize: '0.9rem' }}><i className="bi bi-bank"></i></div>
                  <div className="ctitle" style={{ fontSize: '0.85rem' }}>Core Banking</div>
                  <p className="ctext" style={{ fontSize: '0.77rem' }}>Retail, SME, corporate banking</p>
                </GlowCard>
              </div>
              <div className="col-6">
                <GlowCard className="gcard p-3">
                  <div className="sico i-o mb-2" style={{ width: '36px', height: '36px', fontSize: '0.9rem' }}><i className="bi bi-phone-fill"></i></div>
                  <div className="ctitle" style={{ fontSize: '0.85rem' }}>Digital Banking</div>
                  <p className="ctext" style={{ fontSize: '0.77rem' }}>Neobank, mobile-first platforms</p>
                </GlowCard>
              </div>
            </div>
            <Button href="/contact" variant="grad"><i className="bi bi-calendar-check me-1"></i>Consult About Banking Solutions</Button>
          </div>
          <div className="col-lg-6" data-reveal="left">
            <div className="sec-img text-center">
              <img
                src="/og/fintech-software-development.jpg"
                alt="Core banking and fintech platform engineering"
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

export default FintechDeepDive;
