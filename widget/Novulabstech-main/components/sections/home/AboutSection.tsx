import React from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';

const AboutSection: React.FC = () => {
  return (
    <section className="sec bg-w z1" id="about">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-5" data-reveal="right">
            <div style={{ position: 'relative' }}>
              {/* next/image: the raw <img> shipped a 1280x960 / 147KB JPEG with
                  no width or height, so it was an unsized above-the-fold
                  element on the homepage — a CLS source and an oversized
                  payload for a 440px slot. */}
              <div className="about-img">
                <Image
                  src="/team-working.jpeg"
                  alt="NovuLabs engineers working together in the Islamabad office"
                  width={1280}
                  height={960}
                  sizes="(max-width: 991px) 100vw, 40vw"
                  style={{ width: '100%', height: '440px', objectFit: 'cover' }}
                />
              </div>
              {/* These two pills counted up to "12+ Years of Excellence" and
                  "500+ Engineers Worldwide". Neither is evidenced: the founding
                  year is an open CLIENT-ACTIONS item, and /team lists three
                  people. A headcount claim two orders of magnitude off what the
                  same site shows is the kind of thing a buyer checks first.
                  Replaced with two things the site can actually substantiate on
                  its own pages, which is why each links to one. */}
              <div className="about-glass-pill agp1">
                <div className="agp-label">Architect-led</div>
                <div className="agp-sub">No pre-sales layer — ever</div>
              </div>
              <div className="about-glass-pill agp2">
                <div className="agp-label">Islamabad HQ</div>
                <div className="agp-sub">One in-house engineering team</div>
              </div>
            </div>
          </div>
          <div className="col-lg-7" data-reveal="left">
            <span className="stag">Who We Are</span>
            <h2 className="stitle mt-3">Building Digital Infrastructure <span className="gtxt">for Tomorrow</span></h2>
            {/* "across 40+ countries" removed — unevidenced. lib/seo.ts
                declares five served markets (PK, AE, GB, US, SA). */}
            <p className="ssub mb-4">NovuLabs is an enterprise software house headquartered in Islamabad. We engineer platforms that power financial systems, healthcare networks and government portals, for institutions that answer to a regulator as well as to a user.</p>
            
            <div className="d-flex gap-3 flex-wrap">
              <Button href="/about" variant="grad">
                <i className="bi bi-arrow-right me-1"></i>About NovuLabs
              </Button>
              <Button href="/contact" variant="glass">
                <i className="bi bi-calendar-check me-1"></i>Book a Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
