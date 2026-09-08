import React from 'react';

const ContactProcessSection: React.FC = () => {
  return (
    <section className="sec-sm bg-w" id="contact-process">
      <div className="container">
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-6" data-reveal="up">
            <span className="stag">Process</span>
            <h2 className="stitle mt-3">What Happens <span className="gtxt">Next</span></h2>
          </div>
        </div>
        <div className="row g-4">
          <div className="col-md-6 col-lg-3" data-reveal="up">
            <div className="wcard text-center">
              <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'var(--g-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--fh)', fontWeight: '800', color: '#1A1208', margin: '0 auto 16px', boxShadow: 'var(--sh-glow)' }}>1</div>
              <h3 className="ctitle">You Reach Out</h3>
              <p className="ctext">Fill in the form. The more context you share, the more specific our advice will be.</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3" data-reveal="up">
            <div className="wcard text-center">
              <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'linear-gradient(135deg,#0ea5a0,#0c8a86)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--fh)', fontWeight: '800', color: '#fff', margin: '0 auto 16px', boxShadow: '0 6px 20px rgba(14,165,160,.3)' }}>2</div>
              <h3 className="ctitle">We Review</h3>
              <p className="ctext">Our architects review your needs and assign the right specialist within 4 business hours.</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3" data-reveal="up">
            <div className="wcard text-center">
              <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#6d28d9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--fh)', fontWeight: '800', color: '#fff', margin: '0 auto 16px', boxShadow: '0 6px 20px rgba(124,58,237,.3)' }}>3</div>
              <h3 className="ctitle">45-Minute Call</h3>
              <p className="ctext">Discovery call with a senior architect to explore requirements and goals — zero commitment.</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3" data-reveal="up">
            <div className="wcard text-center">
              <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'linear-gradient(135deg,#ea580c,#c2410c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--fh)', fontWeight: '800', color: '#fff', margin: '0 auto 16px', boxShadow: '0 6px 20px rgba(234,88,12,.3)' }}>4</div>
              <h3 className="ctitle">Custom Proposal</h3>
              <p className="ctext">A detailed technical proposal with architecture, timeline, and investment within 5 business days.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactProcessSection;
