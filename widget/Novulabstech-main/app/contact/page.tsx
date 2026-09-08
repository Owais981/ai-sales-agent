import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import { webPageSchema } from '@/lib/schema';
import ContactHero from '@/components/sections/contact/ContactHero';
import ContactProcessSection from '@/components/sections/contact/ContactProcessSection';
import ContactFormSection from '@/components/sections/contact/ContactFormSection';
import ContactFaqSection from '@/components/sections/contact/ContactFaqSection';

export const metadata: Metadata = {
  title: 'Contact — Book a Free Technical Call',
  description:
    'Book a free 45-minute technical call with a senior architect. No demos, no sales scripts — bring your architecture and get an honest read on it.',
  keywords: [
    'contact NovuLabs',
    'book enterprise software consultation',
    'software development consultation Pakistan',
    'fintech consultation Islamabad',
    'AML compliance consultation',
    'hire enterprise software developer Pakistan',
    'enterprise software quote',
    'software outsourcing Pakistan inquiry',
  ],
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Book a Free Technical Consultation | NovuLabs',
    description: 'Free 45-minute call with a senior architect. Fintech, AML, healthcare, and enterprise software consulting.',
    url: 'https://www.novulabs.net/contact',
    images: [{ url: '/hero/contact.jpg', width: 1920, height: 1080, alt: 'Contact NovuLabs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book a Free Consultation | NovuLabs',
    description: 'Talk to a senior architect about your enterprise software project. No sales reps, no demos.',
    images: ['/hero/contact.jpg'],
  },
};


export default function ContactPage() {
  return (
    <>
      {/* Organisation details now come from the single ProfessionalService node
          in the root layout (see lib/schema.ts), referenced by @id. The previous
          inline copy duplicated the entity with a differently-cased email and a
          city-only address, which fragments entity resolution. */}
      <JsonLd
        data={webPageSchema({
          name: 'Contact NovuLabs — book a free technical consultation',
          description:
            'Book a free 45-minute technical call with a senior NovuLabs architect. No demos, no sales scripts.',
          path: '/contact',
          type: 'ContactPage',
        })}
      />
      <ContactHero />
      <div className="divider"></div>
      <ContactProcessSection />
      <ContactFormSection />
      <ContactFaqSection />
    </>
  );
}
