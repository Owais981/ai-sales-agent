import React from 'react';
import Image from 'next/image';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

const ProjectsHero: React.FC = () => (
  <section className="phero">
    <div className="phero-bg" data-parallax="38">
      <Image src="/hero/portfolio.jpg" alt="" fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
    </div>
    <div className="phero-ov"></div>
    <div className="phero-grid" data-parallax="14"></div>
    <div className="container phero-inner">
      <Breadcrumbs className="mb-4" items={[{ name: 'Projects' }]} />
      <span className="stag">Our Projects</span>
      <h1 className="hero-title mt-3">
        Products &amp; Platforms <span className="gtxt">We Built</span>
      </h1>
      <p className="hero-sub">
        Compliance, risk and governance platforms built end to end. Open a project to see what it does, the problems it solves, its features and the technology behind it.
      </p>
    </div>
  </section>
);

export default ProjectsHero;
