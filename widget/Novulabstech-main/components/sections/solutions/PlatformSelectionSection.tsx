import React from 'react';
import Link from 'next/link';

/**
 * Long-form /solutions content.
 *
 * /solutions measured 310 words. It is a product-platform page carrying four
 * named platforms, and it gave a buyer nothing to reason with — no basis for
 * choosing between them, no deployment or data-residency detail, no honest
 * statement of when a platform is the wrong answer. That is the material a
 * technical evaluator actually needs, and its absence is why a page like this
 * loses to a competitor's page that has it.
 *
 * No pricing, licensing terms, customer counts or deployment statistics appear
 * here, because none are published anywhere the business can stand behind.
 */
const PlatformSelectionSection: React.FC = () => {
  return (
    <section className="sec bg-g" id="choosing">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-9" data-reveal>
            <span className="stag">Choosing between them</span>
            <h2 className="stitle mt-3">
              Which platform fits, and <span className="gtxt">when none of them do</span>
            </h2>

            <p className="mt-4" style={{ fontSize: 'var(--step-0)', lineHeight: 1.78 }}>
              Four platforms with overlapping capability is genuinely confusing from the
              outside. The distinction that matters is not feature lists — it is which system
              owns the record, and which regulatory obligation the deployment has to satisfy.
            </p>

            <h3 className="mt-5">Start from the system of record, not the feature list</h3>
            <p>
              Every platform decision in an enterprise estate reduces to one question: for a
              given entity — a customer, a transaction, a case, an invoice — which system holds
              the authoritative version, and which systems hold copies?
            </p>
            <p>
              Getting this wrong is the most common cause of the integration problems we are
              called in to remediate. Two systems both believing they own the customer record
              produces reconciliation work that never ends, because there is no principled way
              to resolve a conflict between them. Decide ownership per entity before you decide
              anything about the platforms, and the rest of the architecture follows.
            </p>

            <h3 className="mt-5">Where each platform sits</h3>
            <p>
              <strong>NovuShield</strong> owns compliance decisions and the evidence behind
              them — screening outcomes, monitoring alerts, case dispositions, and the
              regulatory submissions that follow. It is the only one of the four with a hard
              external schema contract, because reporting to a financial intelligence unit is
              validated on submission and rejected outright when it does not conform. That
              constraint shapes everything about how it is deployed, and it is covered in
              detail in our{' '}
              <Link href="/blog/goaml-xml-integration-str-ctr-reporting-pakistan">
                goAML integration guide
              </Link>
              .
            </p>
            <p>
              <strong>NovuPay</strong> owns money movement and the ledger behind it. Its
              defining requirement is finality rather than throughput: on an instant rail a
              credit is applied and irrevocable within seconds, so validation moves ahead of
              the transaction and correction stops being a technical option. The engineering
              consequences — idempotency enforced at the database, reconciliation as a first
              class process rather than an error path — are set out in our{' '}
              <Link href="/blog/raast-integration-guide-instant-payments-pakistan">
                RAAST integration guide
              </Link>
              .
            </p>
            <p>
              <strong>NovuERP</strong> owns operational and financial process — the internal
              record of what the organisation did. <strong>NovuCRM</strong> owns the
              relationship record: who the counterparty is, every interaction with them, and
              the commercial pipeline. The two are frequently deployed together, and the
              boundary between them is the most common place we see duplicated customer data
              take root.
            </p>

            <h3 className="mt-5">Deployment and data residency</h3>
            <p>
              For regulated institutions, where the data physically sits is usually a harder
              constraint than any functional requirement, and it is worth establishing before
              a demo rather than after. Financial and health data frequently carry residency
              obligations that rule out particular hosting arrangements outright, and a
              platform decision taken without that constraint in view is a decision that gets
              revisited.
            </p>
            <p>
              All four platforms are designed to be deployed into infrastructure the client
              controls where that is required, rather than assuming a single shared tenancy.
              What that means concretely for your estate — and what it costs in operational
              overhead — is a conversation to have with an architect, because the honest answer
              depends on your existing infrastructure and your regulator&apos;s position.
            </p>

            <h3 className="mt-5">Integration is where the effort actually lives</h3>
            <p>
              In our experience of these deployments, the platform configuration is rarely the
              long pole. The work is in the integration surface: the core system these
              platforms have to sit alongside, the identity source they authenticate against,
              the data migration from whatever is being replaced, and the reconciliation
              between old and new during the transition window.
            </p>
            <p>
              Migration in particular is routinely underestimated. Historical data almost never
              conforms to the model the new system expects — records with missing mandatory
              fields, identifiers that were free text, duplicate entities that were never
              merged. Deciding what to do with non-conforming history is a business decision
              with regulatory implications, not a technical one, and it needs an owner early.
            </p>

            <h3 className="mt-5">When a platform is the wrong answer</h3>
            <p>
              If your requirement is genuinely standard, a mature commercial product will
              almost always beat anything built or configured for you — on cost, on time to
              value, and on the amount of maintenance you inherit. We say so when that is the
              case, and we have written up the reasoning in{' '}
              <Link href="/blog/why-custom-saas-outperforms-off-the-shelf-erp">
                our note on custom platforms versus off-the-shelf ERPs
              </Link>
              .
            </p>
            <p>
              The case for a platform like these is strongest where the requirement is shaped
              by a regulator whose schema you do not control, wired into systems nobody else
              runs, in a market too small for the large vendors to have built for properly.
              That is a real and specific situation — it is most of what we do — but it is not
              every situation, and a supplier who tells you it is should be treated with
              caution.
            </p>

            <div className="mt-5 pt-4" style={{ borderTop: '1px solid var(--bg-2)' }}>
              <p className="mb-0" style={{ color: 'var(--tx3)' }}>
                See how these platforms have been applied in{' '}
                <Link href="/portfolio">delivered engagements</Link>, the{' '}
                <Link href="/services">engineering services</Link> that surround them, or the{' '}
                <Link href="/industries">sectors</Link> we build for.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformSelectionSection;
