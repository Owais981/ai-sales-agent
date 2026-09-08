import React from 'react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Image from 'next/image';

const SolutionsHero: React.FC = () => {
  return (
    <section className="phero">
      <div className="phero-bg" data-parallax="38">
        <Image src="/hero/solutions.jpg" alt="" fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
      </div>
      <div className="phero-ov"></div>
      <div className="phero-grid" data-parallax="14"></div>
      <div className="container phero-inner">
        <Breadcrumbs className="mb-4" items={[{ name: 'Platforms' }]} />
        <span className="stag">Product Platforms</span>
        <h1 className="hero-title mt-3">Proven Enterprise <span className="gtxt">Solutions</span></h1>
        <p className="hero-sub">Four battle-tested platforms — adaptable to your organization's specific requirements, compliance needs, and technology landscape.</p>
      </div>
    </section>
  );
};

export default SolutionsHero;
