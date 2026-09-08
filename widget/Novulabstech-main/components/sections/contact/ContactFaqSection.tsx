import React from 'react';
import Link from 'next/link';
import { contactFaqs } from '@/content/siteData';
import FaqAccordion from '@/components/ui/FaqAccordion';
import JsonLd from '@/components/seo/JsonLd';
import { faqSchema } from '@/lib/schema';

const ContactFaqSection: React.FC = () => {
  return (
    <section className="sec bg-w" id="contact-faq">
      <JsonLd data={faqSchema(contactFaqs, '/contact')} />
      <div className="container">
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-6" data-reveal="up">
            <span className="stag">FAQ</span>
            <h2 className="stitle mt-3">Before you <span className="gtxt">book the call</span></h2>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8" data-reveal="up">
            <FaqAccordion items={contactFaqs} />
          </div>
        </div>
        <div className="row justify-content-center mt-4">
          <div className="col-lg-8 text-center">
            <p className="mb-0" style={{ fontSize: '0.9rem', color: 'var(--tx3)' }}>
              More questions are answered on the{' '}
              <Link href="/faq">frequently asked questions</Link> page.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFaqSection;
