import React from 'react';
import { services } from '@/content/siteData';
import ServiceCard from '@/components/ui/ServiceCard';
import Button from '@/components/ui/Button';

const ServicesSection: React.FC = () => {
  return (
    <section className="sec bg-g z1" id="services">
      <div className="container">
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-7" data-reveal="up">
            <span className="stag">What We Build</span>
            <h2 className="stitle mt-3">What we <span className="gtxt">build</span></h2>
            <p className="ssub mx-auto">From compliant fintech platforms to AI-powered automation — mission-critical software that enterprises depend on.</p>
          </div>
        </div>
        <div className="row row-cols-2 row-cols-md-3 row-cols-xl-4 g-4">
          {services.map((item, i) => (
            <ServiceCard key={i} item={item} index={i} />
          ))}
        </div>
        <div className="text-center mt-5" data-reveal="up">
          <Button href="/services" variant="grad">
            <i className="bi bi-arrow-right me-1"></i>Explore All Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
