import React from 'react';
import { industries } from '@/content/siteData';
import IndustryCard from '@/components/ui/IndustryCard';

const IndustriesSection: React.FC = () => {
  return (
    <section className="sec bg-g z1" id="industries">
      <div className="container">
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-7" data-reveal="up">
            <span className="stag">Sectors We Serve</span>
            <h2 className="stitle mt-3">Where our <span className="gtxt">domain depth</span> is</h2>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
          {industries.map((item, i) => (
            <IndustryCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
