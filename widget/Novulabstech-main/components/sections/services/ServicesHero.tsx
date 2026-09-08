import React from 'react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Image from 'next/image';

const ServicesHero: React.FC = () => {
  return (
    <section className="phero">
      <div className="phero-bg" data-parallax="38">
        <Image src="/hero/services.jpg" alt="" fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
      </div>
      <div className="phero-ov"></div>
      <div className="phero-grid" data-parallax="14"></div>
      <div className="container phero-inner">
        <Breadcrumbs className="mb-4" items={[{ name: 'Services' }]} />
        <span className="stag">What We Build</span>
        <h1 className="hero-title mt-3">Enterprise Software Development <span className="gtxt">Services</span></h1>
        <p className="hero-sub">Seven engineering tracks, each with its own page. Pick the one that matches your problem and read the detail before you talk to anyone.</p>
      </div>
    </section>
  );
};

export default ServicesHero;
