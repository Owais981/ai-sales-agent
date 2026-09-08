import React from 'react';
import Link from 'next/link';
import { FaqItem } from '@/types';
import FaqAccordion from '@/components/ui/FaqAccordion';
import JsonLd from '@/components/seo/JsonLd';
import { faqSchema } from '@/lib/schema';

/**
 * Reusable page FAQ block — visible Q&A plus matching FAQPage schema.
 *
 * Both halves come from one array, so the rendered questions and the structured
 * data cannot drift apart. A FAQPage declaring questions the page does not
 * visibly answer is a structured-data violation, and it is the most common way
 * sites lose FAQ rich results after initially earning them.
 *
 * Server component by design: the answer text and the JSON-LD are both in the
 * raw HTML, so a crawler that does not execute JavaScript still reads the
 * answers. Answer engines in particular fetch without running scripts.
 */
export default function PageFaq({
  items,
  path,
  heading = 'Frequently asked',
  headingAccent = 'questions',
  intro,
  className = 'sec bg-g',
}: {
  items: FaqItem[];
  /** Page path — used for the schema @id so each FAQPage is distinct. */
  path: string;
  heading?: string;
  headingAccent?: string;
  intro?: React.ReactNode;
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section className={className} id="faq">
      <JsonLd data={faqSchema(items, path)} />
      <div className="container">
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-8" data-reveal="up">
            <span className="stag">FAQ</span>
            <h2 className="stitle mt-3">
              {heading} <span className="gtxt">{headingAccent}</span>
            </h2>
            {intro && <p className="ssub mt-3 mb-0">{intro}</p>}
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8" data-reveal="up">
            <FaqAccordion items={items} />
          </div>
        </div>
        <div className="row justify-content-center mt-4">
          <div className="col-lg-8 text-center">
            <p className="mb-0" style={{ fontSize: '0.9rem', color: 'var(--tx3)' }}>
              Question not answered here?{' '}
              <Link href="/contact">Book a technical consultation</Link> — it is taken by an
              architect, not a salesperson.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
