import React from 'react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Image from 'next/image';

const AboutHero: React.FC = () => {
  return (
    <section className="phero">
      <div className="phero-bg" data-parallax="38">
        <Image src="/hero/about.jpg" alt="" fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
      </div>
      <div className="phero-ov"></div>
      <div className="phero-grid" data-parallax="14"></div>
      <div className="container phero-inner">
        <Breadcrumbs className="mb-4" items={[{ name: 'About' }]} />
        <span className="stag">Our Story</span>
        <h1 className="hero-title mt-3">Building the Future of<br /><span className="gtxt">Enterprise Technology</span></h1>
        <p className="hero-sub">A senior engineering team on a single mission: building mission-critical software that the world's most demanding institutions can trust.</p>
      </div>
    </section>
  );
};

export default AboutHero;
