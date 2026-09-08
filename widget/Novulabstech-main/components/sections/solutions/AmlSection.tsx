import React from 'react';
import Button from '@/components/ui/Button';

const AmlSection: React.FC = () => {
  return (
    <section id="aml" className="sec bg-g">
      <div className="container">
        <div className="row align-items-center g-5 flex-lg-row-reverse">
          <div className="col-lg-6" data-reveal="left">
            <span className="stag">Solution 04</span>
            <h2 className="stitle mt-3">NovuShield<br /><span className="gtxt">AML &amp; Compliance Platform</span></h2>
            <p className="ssub mb-4">Enterprise AML engine processing millions of daily transactions with ML-powered anomaly detection, UN sanctions screening, PEP database integration, and full GOAML/FMU Pakistan compliance.</p>
            <div className="d-flex gap-3 mb-4 flex-wrap">
              <div style={{ background: 'rgba(93, 224, 230, 0.08)', border: '1px solid rgba(93, 224, 230, 0.18)', borderRadius: 'var(--r)', padding: '16px 20px', textAlign: 'center', flex: 1, minWidth: '110px' }}>
                <div style={{ fontFamily: 'var(--fh)', fontSize: '1.4rem', fontWeight: '800', color: 'var(--p1)' }}>2M+</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--tx3)' }}>Daily Transactions</div>
              </div>
              <div style={{ background: 'rgba(0, 72, 141, 0.08)', border: '1px solid rgba(0, 72, 141, 0.18)', borderRadius: 'var(--r)', padding: '16px 20px', textAlign: 'center', flex: 1, minWidth: '110px' }}>
                <div style={{ fontFamily: 'var(--fh)', fontSize: '1.4rem', fontWeight: '800', background: 'var(--g-main)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>&lt;200ms</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--tx3)' }}>Screening Latency</div>
              </div>
              <div style={{ background: 'rgba(165, 243, 252, 0.08)', border: '1px solid rgba(165, 243, 252, 0.18)', borderRadius: 'var(--r)', padding: '16px 20px', textAlign: 'center', flex: 1, minWidth: '110px' }}>
                <div style={{ fontFamily: 'var(--fh)', fontSize: '1.4rem', fontWeight: '800', color: 'var(--p3)' }}>FATF</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--tx3)' }}>Compliant</div>
              </div>
            </div>
            <Button href="/contact" variant="grad"><i className="bi bi-calendar-check me-1"></i>Consult About NovuShield</Button>
          </div>
          <div className="col-lg-6" data-reveal="right">
            <div className="sec-img">
              <img
                src="/og/aml-cft-compliance-software.jpg"
                alt="NovuShield AML and CFT compliance platform"
                width={1200}
                height={630}
                loading="lazy"
                decoding="async"
                style={{ height: '380px', width: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmlSection;
