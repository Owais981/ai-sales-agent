import React from 'react';
import Link from 'next/link';

/**
 * Long-form /industries content.
 *
 * /industries measured 512 words across four sector deep-dives, which left the
 * page asserting sector experience without demonstrating the reasoning that
 * would evidence it. This section covers what is actually common across
 * regulated delivery — the part a buyer in any of these sectors is testing for
 * when they read an industries page.
 *
 * No client names, project counts, transaction volumes or contract values
 * appear here. None are published anywhere the business can evidence them.
 */
const RegulatedDeliverySection: React.FC = () => {
  return (
    <section className="sec bg-w" id="regulated-delivery">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-9" data-reveal>
            <span className="stag">Across every sector</span>
            <h2 className="stitle mt-3">
              What regulated delivery has <span className="gtxt">in common</span>
            </h2>

            <p className="mt-4" style={{ fontSize: 'var(--step-0)', lineHeight: 1.78 }}>
              Banking, healthcare and government look like three different problems. In
              engineering terms they are largely one problem wearing three regulators. The
              specific obligations differ; the structural demands they place on a system are
              close to identical, and a team that has genuinely internalised them in one sector
              transfers to another far better than sector-specific marketing suggests.
            </p>

            <h3 className="mt-5">You are building for an examiner, not only for a user</h3>
            <p>
              This is the reframing that changes the most decisions. A conventional system is
              designed so that users can accomplish tasks. A regulated system carries a second
              audience who will arrive later, ask what happened months ago, and expect the
              system to answer with evidence.
            </p>
            <p>
              Practically that means current state is not sufficient. You must be able to
              reconstruct what the system knew at the moment a decision was taken — which rules
              were active, which thresholds applied, which version of a policy was in force,
              and who approved the configuration that produced the outcome. Systems that store
              only the latest value can answer &ldquo;what is true now&rdquo; and cannot answer
              &ldquo;why did you do that in March&rdquo;, and the second question is the one
              that gets asked.
            </p>

            <h3 className="mt-5">The audit trail is a feature, with a budget</h3>
            <p>
              Audit logging is routinely treated as infrastructure — something added late,
              sized casually, and never tested against a real retrieval scenario. In regulated
              delivery it is a primary feature with its own data model, retention policy,
              access controls and performance characteristics.
            </p>
            <p>
              Two properties matter more than completeness. It must be append-only, because an
              audit trail that can be edited by the system that writes it evidences nothing.
              And it must be queryable along the axis an investigation actually uses — by
              subject and by time — rather than only as a chronological stream you have to
              grep. Retrofitting either property onto a live system with years of history is
              among the more painful pieces of work we get asked to do.
            </p>

            <h3 className="mt-5">Identity is a risk decision, not a boolean</h3>
            <p>
              Every sector here has to establish who someone is before granting them anything:
              a bank onboarding a customer, a hospital releasing a record, a government portal
              issuing an entitlement. The failure mode is identical too — teams build the happy
              path and discover it covers perhaps seventy per cent of real traffic.
            </p>
            <p>
              The architecture that survives contact with reality treats verification as
              graded evidence feeding a risk decision, with defined assurance tiers and a
              documented route between them, rather than a single gate that a legitimate
              person can fail with nowhere to go. The design detail is in our{' '}
              <Link href="/blog/nadra-ekyc-cnic-verification-integration-guide">
                guide to CNIC and biometric verification
              </Link>
              .
            </p>

            <h3 className="mt-5">Interoperability is a schema you do not control</h3>
            <p>
              Regulated sectors are defined by mandatory external interfaces. A financial
              institution reports to its intelligence unit on that unit&apos;s schema. A
              hospital exchanges records under HL7 FHIR. A government platform integrates with
              national identity and revenue infrastructure on terms it does not set.
            </p>
            <p>
              The common engineering error is treating these as export formats — build the
              internal model, map at the boundary. That holds until the external schema
              requires something the internal model has no room for, at which point it is
              retrofitted under deadline. Let the mandatory interface inform the domain model
              from the start. The same reasoning appears in both our{' '}
              <Link href="/blog/scaling-healthcare-software-hipaa-hl7-fhir">
                HL7 FHIR
              </Link>{' '}
              and{' '}
              <Link href="/blog/goaml-xml-integration-str-ctr-reporting-pakistan">
                goAML
              </Link>{' '}
              write-ups, because it is genuinely the same lesson.
            </p>

            <h3 className="mt-5">Availability obligations are asymmetric</h3>
            <p>
              Consumer software treats downtime as lost revenue. In these sectors an outage can
              be a reportable event, a clinical safety issue, or a citizen unable to access an
              entitlement with a statutory deadline attached. The cost is not symmetric with
              the traffic, and capacity planning that reasons only from average load will get
              this wrong.
            </p>
            <p>
              It also changes how you deploy. Release processes that assume you can push a fix
              forward quickly are a poor fit where a change to a regulated calculation may
              itself require notification. Design for the constraint that rollback, not
              roll-forward, is your primary recovery path.
            </p>

            <h3 className="mt-5">Data minimisation is protective, not restrictive</h3>
            <p>
              Teams new to these sectors treat retention limits as an obstacle. The better
              framing is that data you do not hold cannot be breached, subpoenaed, or
              mishandled by a future integration nobody has designed yet. Biometric templates
              are the clearest case: permanently identifying, impossible to reissue after a
              compromise, and unnecessary to retain once a check has completed.
            </p>
            <p>
              Design to the strict end of whatever regime applies. It is defensible under any
              likely change in the rules, and it is what enterprise and government procurement
              asks for regardless of what the statute currently requires.
            </p>

            <div className="mt-5 pt-4" style={{ borderTop: '1px solid var(--bg-2)' }}>
              <p className="mb-0" style={{ color: 'var(--tx3)' }}>
                See these constraints applied in{' '}
                <Link href="/portfolio">delivered engagements</Link>, the{' '}
                <Link href="/services/aml-cft-compliance-software">
                  compliance engineering
                </Link>{' '}
                practice behind them, or{' '}
                <Link href="/about">how we work</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegulatedDeliverySection;
