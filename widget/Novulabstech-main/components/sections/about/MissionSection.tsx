import React from 'react';

const MissionSection: React.FC = () => {
  return (
    <section className="sec bg-w" id="mission">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6" data-reveal="right">
            <span className="stag">Our Mission</span>
            <h2 className="stitle mt-3">Powering <span className="gtxt">Critical Systems</span> Globally</h2>
            <p className="mb-3">NovuLabs was founded in Islamabad by a senior engineering team with a single purpose: build software that matters. Not generic apps — mission-critical platforms that power financial systems, protect public health, and serve governments.</p>
            <p className="mb-3">Our team brings deep hands-on expertise in fintech compliance, healthcare IT, and enterprise architecture — accumulated across years of delivering complex systems for regulated industries.</p>
            <p>We measure success in transaction volumes processed, compliance standards met, and operations made more efficient through better software.</p>
          </div>
          <div className="col-lg-6" data-reveal="left">
            <div className="row g-3">
              <div className="col-6">
                <div className="vcard">
                  <span className="vico" aria-hidden="true"><i className="bi bi-bullseye"></i></span>
                  <h3 className="ctitle">Mission-Driven</h3>
                  <p className="ctext">Every project starts with understanding what success truly means for your organization.</p>
                </div>
              </div>
              <div className="col-6">
                <div className="vcard">
                  <span className="vico" aria-hidden="true"><i className="bi bi-shield-lock-fill"></i></span>
                  <h3 className="ctitle">Security-First</h3>
                  <p className="ctext">Security is the foundation of everything we build — from day one, not bolted on later.</p>
                </div>
              </div>
              <div className="col-6">
                <div className="vcard">
                  <span className="vico" aria-hidden="true"><i className="bi bi-rocket-takeoff-fill"></i></span>
                  <h3 className="ctitle">Innovation</h3>
                  <p className="ctext">We adopt emerging technologies early, keeping our clients ahead of the curve.</p>
                </div>
              </div>
              <div className="col-6">
                <div className="vcard">
                  <span className="vico" aria-hidden="true"><i className="bi bi-people-fill"></i></span>
                  <h3 className="ctitle">Partnership</h3>
                  <p className="ctext">Long-term partnerships with shared goals and shared accountability — not one-off projects.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
