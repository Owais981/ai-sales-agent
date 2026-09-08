import type { Metadata } from 'next';
import Link from 'next/link';
import { servicePages } from '@/content/servicePages';
import { getSpokesForPillar } from '@/content/serviceSpokes';
import JsonLd from '@/components/seo/JsonLd';
import { serviceSchema, webPageSchema } from '@/lib/schema';
import HashScrollHandler from '@/components/ui/HashScrollHandler';
import ServicesHero from '@/components/sections/services/ServicesHero';
import WebServiceSection from '@/components/sections/services/WebServiceSection';
import EnterpriseServiceSection from '@/components/sections/services/EnterpriseServiceSection';
import FintechServiceSection from '@/components/sections/services/FintechServiceSection';
import MobileServiceSection from '@/components/sections/services/MobileServiceSection';
import HealthcareServiceSection from '@/components/sections/services/HealthcareServiceSection';
import ComplianceServiceSection from '@/components/sections/services/ComplianceServiceSection';
import CloudServiceSection from '@/components/sections/services/CloudServiceSection';
import ServicesCta from '@/components/sections/services/ServicesCta';

export const metadata: Metadata = {
  title: 'Enterprise Software Development Services',
  description:
    'Seven enterprise engineering services: AML/CFT compliance, fintech, healthcare IT, enterprise systems, mobile, cloud & AI, and web. Pick your track.',
  keywords: [
    'enterprise software development services',
    'fintech software development Pakistan',
    'AML CFT compliance software',
    'HIPAA healthcare software development',
    'mobile app development Pakistan',
    'ERP CRM software development',
    'cloud software development',
    'PCI-DSS payment development',
    'GOAML integration Pakistan',
    'custom enterprise software Islamabad',
  ],
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Enterprise Software Services – NovuLabs',
    description:
      'Custom fintech, AML compliance, healthcare, mobile, ERP/CRM, and cloud software development for global enterprises.',
    url: 'https://www.novulabs.net/services',
    images: [{ url: '/hero/services.jpg', width: 1920, height: 1080, alt: 'NovuLabs Services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enterprise Software Development Services – NovuLabs',
    description: 'Fintech, AML/CFT, healthcare, mobile and cloud engineering built to PCI-DSS, HIPAA and ISO 27001 standards.',
    images: ['/hero/services.jpg'],
  },
};

/**
 * Services hub.
 *
 * This page keeps its long-form sections (they are useful context and they
 * rank for the broad "enterprise software development services" head term) but
 * its job has changed: it is now a hub that routes intent to the seven
 * dedicated service pages, rather than trying to be all seven at once.
 */
export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            name: 'Enterprise Software Development Services',
            description:
              'Seven engineering tracks: AML/CFT compliance, fintech, healthcare IT, enterprise systems, mobile, cloud & AI, and web.',
            path: '/services',
            type: 'CollectionPage',
          }),
          serviceSchema({
            name: 'Enterprise software development',
            description:
              'Custom engineering for regulated industries across seven service tracks.',
            path: '/services',
            serviceType: 'Enterprise software development',
            offers: servicePages.map((sp) => sp.h1),
          }),
        ]}
      />
      {/* Tiny client island for hash-anchor scrolling; page stays a Server Component */}
      <HashScrollHandler />
      <ServicesHero />
      <div className="divider"></div>

      {/* Hub grid — every service now has its own indexable URL. This block is
          the internal-linking backbone of the whole commercial cluster. */}
      <section className="sec bg-w" id="service-index">
        <div className="container">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8" data-reveal="up">
              <span className="stag">Seven engineering tracks</span>
              <h2 className="stitle mt-3">
                Pick the <span className="gtxt">track</span> that matches your problem
              </h2>
              <p className="ssub mx-auto">
                Each track has its own page with the detail, the constraints we design within, and the
                questions clients actually ask.
              </p>
            </div>
          </div>
          <div className="row g-4">
            {servicePages.map((sp, i) => (
              <div className="col-md-6 col-lg-4" data-reveal="up" key={sp.slug}>
                <div className="gcard h-100">
                  <div className="gcard-body">
                    <div className="sico i-t"><i className={`bi ${sp.icon}`}></i></div>
                    <h3 className="ctitle">{sp.navLabel}</h3>
                    <p className="ctext">{sp.summary}</p>
                    <Link href={`/services/${sp.slug}`} className="carr">
                      <i className="bi bi-arrow-right-circle"></i>{sp.navLabel} details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All 22 capabilities, grouped under the track that owns them. This is
          the internal-linking backbone for the spoke pages: every one of them
          is reachable from here, not just from the homepage cards that first
          sent a visitor to it. Compact link rows rather than 22 more cards —
          the seven cards above already carry the visual weight this page
          needs, and 22 additional cards would be the "visually excessive"
          version of the same information. */}
      <section className="sec-sm bg-g">
        <div className="container">
          <div className="row justify-content-center text-center mb-4">
            <div className="col-lg-8" data-reveal="up">
              <span className="stag">Full capability list</span>
              <h2 className="stitle mt-3">
                All 22 services, by <span className="gtxt">track</span>
              </h2>
            </div>
          </div>
          <div className="row g-4">
            {servicePages.map((sp) => {
              const spokes = getSpokesForPillar(sp.slug);
              if (spokes.length === 0) return null;
              return (
                <div className="col-md-6 col-lg-4" key={sp.slug} data-reveal="up">
                  <h3 className="service-group-title">
                    <Link href={`/services/${sp.slug}`}>{sp.navLabel}</Link>
                  </h3>
                  <ul className="service-group-list">
                    {spokes.map((spoke) => (
                      <li key={spoke.slug}>
                        <Link href={`/services/${spoke.slug}`}>{spoke.navLabel}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <WebServiceSection />
      <EnterpriseServiceSection />
      <FintechServiceSection />
      <MobileServiceSection />
      <HealthcareServiceSection />
      <ComplianceServiceSection />
      <CloudServiceSection />
      <ServicesCta />
    </>
  );
}
