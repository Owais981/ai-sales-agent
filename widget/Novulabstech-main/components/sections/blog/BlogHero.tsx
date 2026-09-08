import React from 'react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Image from 'next/image';

const BlogHero: React.FC = () => {
  return (
    <section className="phero">
      <div className="phero-bg" data-parallax="38">
        <Image src="/hero/blog.jpg" alt="" fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
      </div>
      <div className="phero-ov"></div>
      <div className="phero-grid" data-parallax="14"></div>
      <div className="container phero-inner">
        <Breadcrumbs className="mb-4" items={[{ name: 'Insights' }]} />
        <span className="stag">Perspectives &amp; Insights</span>
        <h1 className="hero-title mt-3">Technical <span className="gtxt">Insights</span></h1>
        <p className="hero-sub">Deep technical articles and strategic research on enterprise systems compliance, cloud scalability, payments infrastructure, and secure technology.</p>
      </div>
    </section>
  );
};

export default BlogHero;
