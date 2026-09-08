import React from 'react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Image from 'next/image';

const PortfolioHero: React.FC = () => {
  return (
    <section className="phero">
      <div className="phero-bg" data-parallax="38">
        <Image src="/hero/portfolio.jpg" alt="" fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
      </div>
      <div className="phero-ov"></div>
      <div className="phero-grid" data-parallax="14"></div>
      <div className="container phero-inner">
        <Breadcrumbs className="mb-4" items={[{ name: 'Case Studies' }]} />
        <span className="stag">Our Work</span>
        <h1 className="hero-title mt-3">Enterprise Software <span className="gtxt">Case Studies</span></h1>
        <p className="hero-sub">Nine engagements written up in full: the problem, the constraints we designed within, and what actually changed. Client names are withheld under NDA and described by category.</p>
      </div>
    </section>
  );
};

export default PortfolioHero;
