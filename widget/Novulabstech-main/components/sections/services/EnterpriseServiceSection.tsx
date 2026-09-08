import React from 'react';
import GlowCard from '@/components/ui/GlowCard';
import Button from '@/components/ui/Button';

const EnterpriseServiceSection: React.FC = () => {
  return (
    <section id="enterprise" className="sec bg-g">
      <div className="container">
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-7" data-reveal="up">
            <span className="stag">Service 02</span>
            <h2 className="stitle mt-3">Enterprise Software <span className="gtxt">Development</span></h2>
            <p className="ssub mx-auto">Custom platforms for complex business problems — multi-tenant SaaS, internal tools, and mission-critical systems engineered for infinite scale.</p>
          </div>
        </div>
        <div className="row g-4">
          <div className="col-md-6 col-lg-3" data-reveal="up">
            <GlowCard className="gcard">
              <div className="gcard-body">
                <div className="sico i-b"><i className="bi bi-layers-fill"></i></div>
                <div className="ctitle">Multi-Tenant SaaS</div>
                <p className="ctext">Scalable SaaS with tenant isolation, custom branding, and usage-based billing.</p>
                <Button href="/contact" variant="none" className="carr"><i className="bi bi-arrow-right-circle"></i>Consult Us</Button>
              </div>
            </GlowCard>
          </div>
          <div className="col-md-6 col-lg-3" data-reveal="up">
            <GlowCard className="gcard">
              <div className="gcard-body">
                <div className="sico i-t"><i className="bi bi-boxes"></i></div>
                <div className="ctitle">Microservices</div>
                <p className="ctext">Event-driven microservice architectures with Kubernetes orchestration and service mesh.</p>
                <Button href="/contact" variant="none" className="carr"><i className="bi bi-arrow-right-circle"></i>Consult Us</Button>
              </div>
            </GlowCard>
          </div>
          <div className="col-md-6 col-lg-3" data-reveal="up">
            <GlowCard className="gcard">
              <div className="gcard-body">
                <div className="sico i-v"><i className="bi bi-bar-chart-fill"></i></div>
                <div className="ctitle">Analytics Platforms</div>
                <p className="ctext">Real-time dashboards, data warehousing, and BI integrations for enterprise decision-making.</p>
                <Button href="/contact" variant="none" className="carr"><i className="bi bi-arrow-right-circle"></i>Consult Us</Button>
              </div>
            </GlowCard>
          </div>
          <div className="col-md-6 col-lg-3" data-reveal="up">
            <GlowCard className="gcard">
              <div className="gcard-body">
                <div className="sico i-o"><i className="bi bi-arrow-repeat"></i></div>
                <div className="ctitle">Legacy Modernization</div>
                <p className="ctext">Re-platforming legacy systems to modern cloud-native architecture with zero disruption.</p>
                <Button href="/contact" variant="none" className="carr"><i className="bi bi-arrow-right-circle"></i>Consult Us</Button>
              </div>
            </GlowCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseServiceSection;
