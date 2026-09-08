import React from 'react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Image from 'next/image';

const ContactHero: React.FC = () => {
  return (
    <section className="phero">
      <div className="phero-bg" data-parallax="38">
        {/* Was a raw <img> with alt="Contact" — a decorative background given
            a label that describes the page, not the image. Every other page
            hero already uses next/image with an empty alt here. */}
        <Image
          src="/team-working.jpeg"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="phero-ov"></div>
      <div className="phero-grid" data-parallax="14"></div>
      <div className="container phero-inner">
        <Breadcrumbs className="mb-4" items={[{ name: 'Contact' }]} />
        <span className="stag">Let's Talk</span>
        <h1 className="hero-title mt-3">Book a Free <span className="gtxt">Consultation</span></h1>
        <p className="hero-sub">No demos, no sales scripts. Just a genuine conversation about your project — and honest advice on the right path forward.</p>
      </div>
    </section>
  );
};

export default ContactHero;
