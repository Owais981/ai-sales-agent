import React from 'react';
import Button from '@/components/ui/Button';

const CrmSection: React.FC = () => {
  return (
    <section id="crm" className="sec bg-g">
      <div className="container">
        <div className="row align-items-center g-5 flex-lg-row-reverse">
          <div className="col-lg-6" data-reveal="left">
            <span className="stag">Solution 02</span>
            <h2 className="stitle mt-3">NovuCRM<br /><span className="gtxt">AI-Powered Customer Management</span></h2>
            <p className="ssub mb-4">Enterprise CRM with AI-driven lead scoring, revenue forecasting, pipeline automation, and omnichannel engagement across email, SMS, and WhatsApp.</p>
            <div className="d-flex gap-3 mb-4 flex-wrap">
              <div style={{ background: 'rgba(93, 224, 230, 0.08)', border: '1px solid rgba(93, 224, 230, 0.18)', borderRadius: 'var(--r)', padding: '16px 20px', textAlign: 'center', flex: 1, minWidth: '120px' }}>
                <div style={{ fontFamily: 'var(--fh)', fontSize: '1.5rem', fontWeight: '800', background: 'var(--g-main)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>34%</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--tx3)' }}>Higher Conversion</div>
              </div>
              <div style={{ background: 'rgba(0, 72, 141, 0.08)', border: '1px solid rgba(0, 72, 141, 0.18)', borderRadius: 'var(--r)', padding: '16px 20px', textAlign: 'center', flex: 1, minWidth: '120px' }}>
                <div style={{ fontFamily: 'var(--fh)', fontSize: '1.5rem', fontWeight: '800', color: 'var(--p1)' }}>2.1x</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--tx3)' }}>Revenue Growth</div>
              </div>
              <div style={{ background: 'rgba(165, 243, 252, 0.08)', border: '1px solid rgba(165, 243, 252, 0.18)', borderRadius: 'var(--r)', padding: '16px 20px', textAlign: 'center', flex: 1, minWidth: '120px' }}>
                <div style={{ fontFamily: 'var(--fh)', fontSize: '1.5rem', fontWeight: '800', color: 'var(--p3)' }}>89%</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--tx3)' }}>Forecast Accuracy</div>
              </div>
            </div>
            <Button href="/contact" variant="grad"><i className="bi bi-calendar-check me-1"></i>Consult About NovuCRM</Button>
          </div>
          <div className="col-lg-6" data-reveal="right">
            <div className="sec-img">
              <img
                src="/portfolio/novucrm-intelligence-suite.jpg"
                alt="NovuCRM customer intelligence platform"
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

export default CrmSection;
