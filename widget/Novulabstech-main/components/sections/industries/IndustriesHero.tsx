import React from 'react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Image from 'next/image';

const IndustriesHero: React.FC = () => {
  return (
    <section className="phero">
      <div className="phero-bg" data-parallax="38">
        <Image src="/hero/industries.jpg" alt="" fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
      </div>
      <div className="phero-ov"></div>
      <div className="phero-grid" data-parallax="14"></div>
      <div className="container phero-inner">
        <Breadcrumbs className="mb-4" items={[{ name: 'Industries' }]} />
        <span className="stag">Sectors We Serve</span>
        <h1 className="hero-title mt-3">Built for <span className="gtxt">Critical Industries</span></h1>
        <p className="hero-sub">Deep domain expertise in the sectors that matter most — where software failures carry real consequences for institutions, patients, citizens, and economies.</p>
      </div>
    </section>
  );
};

export default IndustriesHero;
