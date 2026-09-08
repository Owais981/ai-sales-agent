"use client";

import Image from 'next/image';
import Button from '@/components/ui/Button';
import TiltCard from '@/components/ui/TiltCard';

// entire right-hand hero visual — the largest element above the fold, and the
// LCP candidate on this page — was absent from the server HTML and only
// appeared after hydration. That delays LCP by the whole JS round trip and
// hides the image from any crawler that does not execute JavaScript.
//
// TiltCard only uses a ref and two pointer handlers, so it server-renders
// perfectly well. It is now a normal import: the markup ships in the HTML and
// the tilt attaches on hydration as a progressive enhancement.

const HeroSection: React.FC = () => {
  return (
    <section id="hero">
      <div className="hero-grid"></div>
      <div className="container">
        <div className="row align-items-center g-5">
          {/* Left */}
          <div className="col-lg-6">
            <div className="hero-inner">
              <div className="hero-badge">
                <span className="hero-dot"></span>
                Architect-led engineering for regulated industries
              </div>
              {/* H1 targets "software house in Islamabad" — the head term for
                  this business, and previously absent from the H1 entirely
                  ("Next-Gen Enterprise Software House" carried no location and
                  no query intent).

                  "Best" is deliberately not used. It is an unverifiable
                  superlative about the business itself, which is an E-E-A-T
                  liability in a YMYL-adjacent vertical, is the kind of
                  self-declared claim Google's helpful-content guidance treats
                  as a negative signal, and in most markets a comparative
                  superiority claim in advertising requires substantiation the
                  site does not publish. The exact-match phrase is carried
                  without it; rankings for "best …" queries come from what the
                  page proves, not from the word appearing in the heading. */}
              <h1 className="hero-title">
                Enterprise Software House{' '}
                <br />
                <span className="gtxt">in Islamabad</span>
              </h1>
              <p className="hero-sub">
                We engineer mission-critical platforms for fintech institutions, government agencies, healthcare networks, and global enterprises — built for scale, security, and compliance.
              </p>
              <div className="hero-btns">
                <Button href="/contact" variant="grad">
                  <i className="bi bi-rocket-takeoff me-1"></i>Book a Free Consultation
                </Button>
                <Button href="/portfolio" variant="glass">
                  <i className="bi bi-folder2-open me-1"></i>View Our Work
                </Button>
              </div>
            </div>
          </div>
          {/* Right: Hero Image */}
          <div className="col-lg-6 hero-visual">
            <TiltCard className="hero-img-wrap">
              {/* `priority` — this is the LCP element. It was carrying
                  loading="lazy", which tells the browser to defer the one image
                  it should fetch first. next/image also emits a preload hint and
                  a responsive srcset, so phones stop downloading a 1200px asset
                  to paint it at ~360px. */}
              <Image
                    src="/hero-office.webp"
                    alt="NovuLabs office interior"
                width={1280}
                height={960}
                    priority
                sizes="(max-width: 991px) 100vw, 50vw"
              />
              <div className="hero-img-overlay"></div>
              <div className="hero-img-shine"></div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
