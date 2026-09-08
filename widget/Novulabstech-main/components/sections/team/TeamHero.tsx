import React from 'react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Image from 'next/image';

const TeamHero: React.FC = () => {
  return (
    <section className="phero">
      <div className="phero-bg" data-parallax="38">
        <Image src="/hero/team.jpg" alt="" fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
      </div>
      <div className="phero-ov"></div>
      <div className="phero-grid" data-parallax="14"></div>
      <div className="container phero-inner">
        <Breadcrumbs className="mb-4" items={[{ name: 'Team' }]} />
        <span className="stag">Our People</span>
        <h1 className="hero-title mt-3">The Engineers Behind the<br /><span className="gtxt">Infrastructure</span></h1>
        <p className="hero-sub">We do not employ pre-sales agents. Every person you interface with at NovuLabs is an active practitioner, engineer, or compliance architect.</p>
      </div>
    </section>
  );
};

export default TeamHero;
