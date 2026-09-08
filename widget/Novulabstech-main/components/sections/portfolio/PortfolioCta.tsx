import React from 'react';
import Button from '@/components/ui/Button';

const PortfolioCta: React.FC = () => {
  return (
    <section id="cta-banner">
      <div className="container">
        <div className="cta-inner" data-reveal="up">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <span className="stag">Working on Something Similar?</span>
              <p className="stitle mt-3">Every project in this portfolio<br />started with <span className="gtxt">one conversation.</span></p>
              <p className="ssub mt-4 mb-0">Tell us what you're working on. We'll share what we've learned from projects like it — what worked, what didn't, and what we'd do differently now. That context alone is worth the call.</p>
              <div className="cta-trust-row">
                <div className="cta-trust-item"><i className="bi bi-chat-square-quote"></i>Real technical discussion based on your actual requirements</div>
                <div className="cta-trust-item"><i className="bi bi-file-earmark-lock2"></i>Your project details are fully confidential under NDA</div>
                <div className="cta-trust-item"><i className="bi bi-graph-up"></i>Written proposal with honest timelines and investment estimates</div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="cta-card">
                <div className="cta-card-label">Start a conversation</div>
                <Button href="/contact" variant="grad" className="w-100 justify-content-center mb-3">
                  <i className="bi bi-calendar-check me-1"></i>Book a Free Call
                </Button>
                <Button href="/contact" variant="glass" className="w-100 justify-content-center">
                  <i className="bi bi-file-text me-1"></i>Send Your Project Brief
                </Button>
                <p className="cta-card-note">We respond within 4 business hours. If you share a detailed brief, we'll come to the call already thinking about your problem.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioCta;
