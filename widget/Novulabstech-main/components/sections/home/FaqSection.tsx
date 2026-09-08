import React from 'react';
import Link from 'next/link';
import { faqs } from '@/content/siteData';
import FaqAccordion from '@/components/ui/FaqAccordion';
import JsonLd from '@/components/seo/JsonLd';
import { faqSchema } from '@/lib/schema';

/**
 * Homepage FAQ.
 *
 * This is the fastest available route to a rich result on this site: the Q&A
 * text was already written and already visible, and the only thing missing was
 * the JSON-LD. Converted from a client component to a server component so both
 * the answer text and the schema are in the raw HTML — the previous version
 * hid answers behind React state and clipped them at a fixed max-height.
 */
const FaqSection: React.FC = () => {
  return (
    <section className="sec bg-g z1" id="faq">
      <JsonLd data={faqSchema(faqs, '/')} />
      <div className="container">
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-6" data-reveal="up">
            <span className="stag">FAQ</span>
            <h2 className="stitle mt-3">Frequently asked <span className="gtxt">questions</span></h2>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8" data-reveal="up">
            <FaqAccordion items={faqs} />
          </div>
        </div>
        <div className="row justify-content-center mt-4">
          <div className="col-lg-8 text-center">
            <p className="mb-0" style={{ fontSize: '0.9rem', color: 'var(--tx3)' }}>
              These are the short answers.{' '}
              <Link href="/faq">See all frequently asked questions</Link> for engagement models,
              compliance scope and technology choices.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
