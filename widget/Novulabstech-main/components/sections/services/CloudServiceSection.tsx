import React from 'react';
import GlowCard from '@/components/ui/GlowCard';
import Button from '@/components/ui/Button';

const CloudServiceSection: React.FC = () => {
  return (
    <section id="cloud" className="sec bg-w">
      <div className="container">
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-7" data-reveal="up">
            <span className="stag">Services 19–22</span>
            <h2 className="stitle mt-3">Cloud, AI &amp; <span className="gtxt">Automation</span></h2>
          </div>
        </div>
        <div className="row g-4">
          <div className="col-md-6" data-reveal="up">
            <GlowCard className="gcard">
              <div className="gcard-body">
                <div className="sico i-c"><i className="bi bi-plug-fill"></i></div>
                <div className="ctitle">API Development &amp; Integration</div>
                <p className="ctext">RESTful &amp; GraphQL APIs with OpenAPI docs, API gateway, rate limiting, versioning, and developer portal.</p>
                <Button href="/contact" variant="none" className="carr"><i className="bi bi-arrow-right-circle"></i>Consult Us</Button>
              </div>
            </GlowCard>
          </div>
          <div className="col-md-6" data-reveal="up">
            <GlowCard className="gcard">
              <div className="gcard-body">
                <div className="sico i-b"><i className="bi bi-cloud-fill"></i></div>
                <div className="ctitle">Cloud-Based Solutions</div>
                <p className="ctext">Multi-cloud AWS/Azure/GCP, FinOps, serverless, Kubernetes, and zero-trust security architecture.</p>
                <Button href="/contact" variant="none" className="carr"><i className="bi bi-arrow-right-circle"></i>Consult Us</Button>
              </div>
            </GlowCard>
          </div>
          <div className="col-md-6" data-reveal="up">
            <GlowCard className="gcard">
              <div className="gcard-body">
                <div className="sico i-t"><i className="bi bi-robot"></i></div>
                <div className="ctitle">AI-Powered Automation</div>
                <p className="ctext">ML pipelines, NLP chatbots, intelligent document processing, and predictive analytics platforms.</p>
                <Button href="/contact" variant="none" className="carr"><i className="bi bi-arrow-right-circle"></i>Consult Us</Button>
              </div>
            </GlowCard>
          </div>
          <div className="col-md-6" data-reveal="up">
            <GlowCard className="gcard">
              <div className="gcard-body">
                <div className="sico i-o"><i className="bi bi-layers-fill"></i></div>
                <div className="ctitle">Custom SaaS Platforms</div>
                <p className="ctext">Multi-tenant SaaS with Stripe billing, white-labeling, role-based access, and analytics dashboards.</p>
                <Button href="/contact" variant="none" className="carr"><i className="bi bi-arrow-right-circle"></i>Consult Us</Button>
              </div>
            </GlowCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CloudServiceSection;
