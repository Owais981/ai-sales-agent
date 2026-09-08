import React from 'react';
import GlowCard from '@/components/ui/GlowCard';
import Button from '@/components/ui/Button';

const MobileServiceSection: React.FC = () => {
  return (
    <section id="mobile" className="sec bg-g">
      <div className="container">
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-7" data-reveal="up">
            <span className="stag">Services 07–09</span>
            <h2 className="stitle mt-3">Mobile App <span className="gtxt">Development</span></h2>
          </div>
        </div>
        <div className="row g-4">
          <div className="col-md-4" data-reveal="up">
            <GlowCard className="gcard text-center">
              <div className="gcard-body">
                <div className="sico i-b mx-auto"><i className="bi bi-phone-fill"></i></div>
                <div className="ctitle">Cross-Platform</div>
                <p className="ctext">Flutter &amp; React Native — one codebase, native performance on iOS &amp; Android.</p>
                <Button href="/contact" variant="none" className="carr justify-content-center"><i className="bi bi-arrow-right-circle"></i>Consult Us</Button>
              </div>
            </GlowCard>
          </div>
          <div className="col-md-4" data-reveal="up">
            <GlowCard className="gcard text-center">
              <div className="gcard-body">
                <div className="sico i-t mx-auto"><i className="bi bi-apple"></i></div>
                <div className="ctitle">iOS Native</div>
                <p className="ctext">Swift &amp; SwiftUI apps with iOS 18 features, WidgetKit, and enterprise MDM deployment.</p>
                <Button href="/contact" variant="none" className="carr justify-content-center"><i className="bi bi-arrow-right-circle"></i>Consult Us</Button>
              </div>
            </GlowCard>
          </div>
          <div className="col-md-4" data-reveal="up">
            <GlowCard className="gcard text-center">
              <div className="gcard-body">
                <div className="sico i-g mx-auto"><i className="bi bi-android2"></i></div>
                <div className="ctitle">Android Native</div>
                <p className="ctext">Kotlin &amp; Jetpack Compose with offline capabilities and Play enterprise deployment.</p>
                <Button href="/contact" variant="none" className="carr justify-content-center"><i className="bi bi-arrow-right-circle"></i>Consult Us</Button>
              </div>
            </GlowCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileServiceSection;
