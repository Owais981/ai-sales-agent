import React from 'react';
import Link from 'next/link';

/**
 * Long-form /about content.
 *
 * /about measured 270 words of body copy, which for the page an enterprise
 * buyer opens second — right after the service page that brought them in — is
 * far too thin to answer what they came to establish: who these people are,
 * how they work, what they will and will not take on, and whether they can be
 * trusted with a regulated workload.
 *
 * Written to answer procurement questions rather than to hit a word count. Every
 * claim here is one the site can already stand behind: nothing about team size,
 * revenue, client names, certifications or years in operation is asserted,
 * because none of those are verifiable from what the business has published.
 */
const HowWeWorkSection: React.FC = () => {
  return (
    <section className="sec bg-g" id="how-we-work">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-9" data-reveal>
            <span className="stag">How we work</span>
            <h2 className="stitle mt-3">
              What engaging us <span className="gtxt">actually looks like</span>
            </h2>

            <p className="mt-4" style={{ fontSize: 'var(--step-0)', lineHeight: 1.78 }}>
              Most software firms describe their process as a diagram with five arrows in it.
              That is not useful to somebody deciding whether to trust a supplier with a core
              banking integration or a hospital records platform. What follows is the actual
              shape of an engagement, including the parts that are uncomfortable to publish.
            </p>

            <h3 className="mt-5">The first conversation is with an architect</h3>
            <p>
              There is no pre-sales layer here. The first call is taken by someone who would
              be accountable for the technical outcome, and it runs about forty-five minutes.
              That is a deliberate constraint on how we grow: it does not scale the way a
              sales team scales, and it means we talk to fewer prospects than we otherwise
              could. We accept that trade because the alternative — a commercial conversation
              that commits to an architecture nobody technical has examined — is how projects
              acquire the problems that surface in month five.
            </p>
            <p>
              Expect that call to be diagnostic rather than promotional. The most valuable
              outcome is frequently a scoping correction: the thing you asked for is not the
              thing that solves your problem, or it is, but the sequencing is wrong.
            </p>

            <h3 className="mt-5">We will tell you when not to build</h3>
            <p>
              A meaningful share of the enquiries we receive describe requirements that an
              existing product already meets. When that is the case we say so, and we say it
              before there is a proposal on the table rather than after. Recommending a custom
              build against a mature off-the-shelf product that fits just sells you
              maintenance liability at a premium.
            </p>
            <p>
              The honest test is whether the requirement is genuinely differentiating. Payroll
              is not. Regulatory reporting against a schema your regulator controls, wired into
              a core system nobody else runs, generally is. We have written up the reasoning at
              length in{' '}
              <Link href="/blog/why-custom-saas-outperforms-off-the-shelf-erp">
                our note on custom platforms versus off-the-shelf ERPs
              </Link>
              , including the cases where the answer goes the other way.
            </p>

            <h3 className="mt-5">Compliance is designed in, not added on</h3>
            <p>
              In regulated delivery the expensive mistakes are almost never coding mistakes.
              They are architectural decisions taken early, without the compliance constraint
              in the room, that become structurally difficult to reverse once there is
              production data behind them.
            </p>
            <p>
              Screening thresholds that were never governed. An audit trail that records the
              current state but cannot reconstruct what the system knew at decision time. A
              reporting pipeline built as an export at the end rather than as a schema contract
              at the centre. Each of those is cheap to get right at design time and expensive
              to retrofit — and each is the kind of thing an examiner asks about directly.
            </p>
            <p>
              So the compliance owner is in the design sessions, not shown a demo at the end.
              This is the single practice that most distinguishes our delivery from a general
              software supplier taking on a regulated project for the first time. The detail
              is set out in our guides to{' '}
              <Link href="/blog/navigating-aml-cft-regulations-pakistan-2026">
                AML/CFT architecture
              </Link>{' '}
              and{' '}
              <Link href="/blog/goaml-xml-integration-str-ctr-reporting-pakistan">
                goAML reporting pipelines
              </Link>
              .
            </p>

            <h3 className="mt-5">Explainability over sophistication</h3>
            <p>
              There is constant commercial pressure to lead with machine learning in
              compliance and risk work. We push back on that for most institutions, for one
              specific reason: explainability is a regulatory requirement, not a preference.
              When an examiner asks why a transaction was or was not flagged, a model score is
              not a defensible answer.
            </p>
            <p>
              The pattern we favour is layered — deterministic rules produce the decisions of
              record, and a model runs alongside to prioritise the review queue rather than to
              decide it. You get the analyst-efficiency benefit without putting an
              unexplainable artefact on the regulatory critical path. It is a less impressive
              slide and a considerably better system.
            </p>

            <h3 className="mt-5">What we do not do</h3>
            <p>
              We do not take on work where the timeline only closes if testing is compressed,
              because in regulated systems the testing is the deliverable. We do not staff
              engagements with people the client has not met. We do not publish client names
              or logos without written permission, which is why our{' '}
              <Link href="/portfolio">case studies</Link> describe institutions by category
              rather than by name — a constraint that costs us credibility with some buyers and
              which we accept, because the alternative is disclosing a client relationship
              somebody asked us to keep confidential.
            </p>
            <p>
              We also do not claim certifications we cannot evidence. Where the site describes
              alignment with a standard, it means the engineering practice follows it — not
              that a registrar has audited us against it. Buyers in this market are asked to
              take a great deal on trust, and the least we can do is be precise about which
              claims are attestations and which are audited facts.
            </p>

            <h3 className="mt-5">Where we work</h3>
            <p>
              The team is based in Islamabad, and the regulatory environment we know best is
              Pakistan&apos;s — the State Bank&apos;s AML/CFT framework, the Financial
              Monitoring Unit&apos;s reporting requirements, RAAST, and the identity
              infrastructure that financial onboarding depends on. That depth is specific and
              hard to acquire remotely, and it is the reason institutions here come to us
              rather than to a larger generalist.
            </p>
            <p>
              We also deliver into healthcare and public-sector programmes where the
              constraints are structurally similar even when the regulator is different: HIPAA
              safeguards and HL7 FHIR interoperability follow the same discipline of designing
              for audit from the outset. If you are evaluating us for work outside these areas,
              the useful first question is whether your problem is shaped like a regulated one.
              Frequently it is, and the reasoning transfers.
            </p>

            <div className="mt-5 pt-4" style={{ borderTop: '1px solid var(--bg-2)' }}>
              <p className="mb-0" style={{ color: 'var(--tx3)' }}>
                Read more about the people doing this work on our{' '}
                <Link href="/team">team page</Link>, the problems we take on across{' '}
                <Link href="/industries">regulated industries</Link>, or the specific{' '}
                <Link href="/services">engineering services</Link> we deliver.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
