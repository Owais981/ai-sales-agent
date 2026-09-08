import React from 'react';
import GlowCard from '@/components/ui/GlowCard';
import Button from '@/components/ui/Button';

const ErpSection: React.FC = () => {
  return (
    <section id="erp" className="sec bg-w">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6" data-reveal="right">
            <span className="stag">Solution 01</span>
            <h2 className="stitle mt-3">NovuERP<br /><span className="gtxt">Enterprise Resource Planning</span></h2>
            <p className="ssub mb-4">A fully integrated ERP platform covering every operational domain — finance, HR, production, procurement, inventory, and reporting — in one unified system.</p>
            <div className="row g-3 mb-4">
              <div className="col-6">
                <GlowCard className="gcard p-3">
                  <div className="sico i-b mb-2" style={{ width: '36px', height: '36px', fontSize: '0.9rem' }}><i className="bi bi-currency-dollar"></i></div>
                  <div className="ctitle" style={{ fontSize: '0.85rem' }}>Financial Mgmt</div>
                  <p className="ctext" style={{ fontSize: '0.78rem' }}>GL, AP/AR, budgeting, multi-currency</p>
                </GlowCard>
              </div>
              <div className="col-6">
                <GlowCard className="gcard p-3">
                  <div className="sico i-t mb-2" style={{ width: '36px', height: '36px', fontSize: '0.9rem' }}><i className="bi bi-people-fill"></i></div>
                  <div className="ctitle" style={{ fontSize: '0.85rem' }}>HR &amp; Payroll</div>
                  <p className="ctext" style={{ fontSize: '0.78rem' }}>Workforce management, payroll, EOBI</p>
                </GlowCard>
              </div>
              <div className="col-6">
                <GlowCard className="gcard p-3">
                  <div className="sico i-v mb-2" style={{ width: '36px', height: '36px', fontSize: '0.9rem' }}><i className="bi bi-boxes"></i></div>
                  <div className="ctitle" style={{ fontSize: '0.85rem' }}>Inventory</div>
                  <p className="ctext" style={{ fontSize: '0.78rem' }}>Multi-warehouse, real-time stock tracking</p>
                </GlowCard>
              </div>
              <div className="col-6">
                <GlowCard className="gcard p-3">
                  <div className="sico i-o mb-2" style={{ width: '36px', height: '36px', fontSize: '0.9rem' }}><i className="bi bi-bar-chart-fill"></i></div>
                  <div className="ctitle" style={{ fontSize: '0.85rem' }}>Analytics</div>
                  <p className="ctext" style={{ fontSize: '0.78rem' }}>Real-time KPI dashboards and BI reports</p>
                </GlowCard>
              </div>
            </div>
            <Button href="/contact" variant="grad"><i className="bi bi-calendar-check me-1"></i>Consult About NovuERP</Button>
          </div>
          <div className="col-lg-6" data-reveal="left">
            <div className="sec-img">
              <img
                src="/portfolio/omnierp-manufacturing-suite.jpg"
                alt="NovuERP enterprise resource planning platform"
                width={1200}
                height={630}
                loading="lazy"
                decoding="async"
                style={{ height: '380px', width: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErpSection;
