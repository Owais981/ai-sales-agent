import React from 'react';
import Button from '@/components/ui/Button';

const PaySection: React.FC = () => {
  return (
    <section id="pay" className="sec bg-w">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6" data-reveal="right">
            <span className="stag">Solution 03</span>
            <h2 className="stitle mt-3">NovuPay<br /><span className="gtxt">Payment Infrastructure</span></h2>
            {/* "certified" removed for the same reason it was removed in app/layout.tsx:121 —
                scheme certification is issued to the entity operating the platform, not to the
                development firm. The /services FAQ already states this correctly ("We have taken
                payment platforms through scheme certification"). Volume and uptime figures also
                removed: they described a client platform, not a NovuLabs SLA, and are
                unevidenced on this site. See CLIENT-ACTIONS.md item 7. */}
            <p className="ssub mb-4">Enterprise payment processing platform — engineered to PCI-DSS, and taken through Mastercard and Visa scheme certification with the institutions that operate it.</p>
            <ul className="chk mb-4">
              <li><span className="chk-ico"><i className="bi bi-check"></i></span>Mastercard MDES tokenization</li>
              <li><span className="chk-ico"><i className="bi bi-check"></i></span>Visa VTS &amp; Visa Direct</li>
              <li><span className="chk-ico"><i className="bi bi-check"></i></span>RAAST instant payment system (SBP)</li>
              <li><span className="chk-ico"><i className="bi bi-check"></i></span>1LINK ATM/POS switching</li>
              <li><span className="chk-ico"><i className="bi bi-check"></i></span>Built to PCI-DSS Level 1 controls</li>
            </ul>
            <Button href="/contact" variant="grad"><i className="bi bi-calendar-check me-1"></i>Consult About NovuPay</Button>
          </div>
          <div className="col-lg-6" data-reveal="left">
            <div className="sec-img">
              <img
                src="/portfolio/tranzaxis-payment-gateway.jpg"
                alt="NovuPay payment processing platform"
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

export default PaySection;
