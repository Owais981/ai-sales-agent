import React from 'react';
import GlowCard from '@/components/ui/GlowCard';
import Button from '@/components/ui/Button';

interface SectorItem {
  icon: string;
  title: string;
  desc: string;
  tech: string[];
  color: string;
}

const MoreSectorsSection: React.FC = () => {
  const moreSectors: SectorItem[] = [
    { icon: 'bi-cart-fill', title: 'E-Commerce & Retail', desc: 'B2B and B2C platforms, marketplace solutions, inventory management, order fulfilment automation, and customer loyalty programs.', tech: ['React', 'Shopify', 'WooCommerce'], color: 'i-o' },
    { icon: 'bi-gear-wide-connected', title: 'Manufacturing & Logistics', desc: 'Production planning, quality control, supply chain management, warehouse automation, fleet tracking, and IoT sensor integration.', tech: ['ERP', 'IoT', 'SAP Integration'], color: 'i-v' },
    { icon: 'bi-mortarboard-fill', title: 'Education & EdTech', desc: 'Learning Management Systems (LMS), student information systems, virtual classrooms, assessment tools, and institutional analytics.', tech: ['LMS', 'SCORM', 'xAPI'], color: 'i-c' },
    { icon: 'bi-broadcast-pin', title: 'Telecom & ISP', desc: 'Billing systems, CRM for telecoms, network operations portals, subscriber management, and regulatory compliance platforms.', tech: ['BSS/OSS', 'Diameter', 'RADIUS'], color: 'i-b' },
    { icon: 'bi-lightning-charge-fill', title: 'Energy & Utilities', desc: 'Smart metering, billing automation, grid monitoring dashboards, SCADA integration, and energy trading platforms.', tech: ['SCADA', 'IoT', 'Smart Grid'], color: 'i-y' },
    { icon: 'bi-house-fill', title: 'PropTech & Real Estate', desc: 'Property management platforms, digital transaction workflows, tenant portals, investment management, and virtual tour integrations.', tech: ['PropTech', 'GIS', 'APIs'], color: 'i-g' }
  ];

  return (
    <section className="sec bg-g" id="more-sectors">
      <div className="container">
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-7" data-reveal="up">
            <span className="stag">More Sectors</span>
            <h2 className="stitle mt-3">Other Industries <span className="gtxt">We Serve</span></h2>
          </div>
        </div>
        <div className="row g-4">
          {moreSectors.map((sector, i) => (
            <div className="col-md-6 col-lg-4" data-reveal="up" key={i}>
              <GlowCard className="gcard">
                <div className="gcard-body">
                  <div className={`sico ${sector.color}`}><i className={`bi ${sector.icon}`}></i></div>
                  <div className="ctitle">{sector.title}</div>
                  <p className="ctext">{sector.desc}</p>
                  <div className="d-flex gap-2 flex-wrap mt-2 mb-0">
                    {sector.tech.map((t, idx) => (
                      <span className="tbadge" key={idx}>{t}</span>
                    ))}
                  </div>
                  <Button href="/contact" variant="none" className="carr">
                    <i className="bi bi-arrow-right-circle"></i>Consult About {sector.title.split(' ')[0]}
                  </Button>
                </div>
              </GlowCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreSectorsSection;
