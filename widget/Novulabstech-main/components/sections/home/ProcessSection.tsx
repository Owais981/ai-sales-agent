import React from 'react';

const ProcessSection: React.FC = () => {
  return (
    <section className="sec bg-w z1" id="process">
      <div className="container">
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-7" data-reveal="up">
            <span className="stag">How We Work</span>
            <h2 className="stitle mt-3">Our Delivery <span className="gtxt">Process</span></h2>
            {/* "200+ enterprise deployments" removed — no deployment count is
                published or evidenced anywhere on the site. */}
            <p className="ssub mx-auto">A six-phase methodology, applied the same way on every engagement so the audit trail exists from the first sprint rather than the last.</p>
          </div>
        </div>
        
        <div className="proc-tl">
          <div className="row">
            {/* Step 1 */}
            <div className="col-md-5" data-reveal="right">
              <div className="pstep">
                <div className="pstep-inner">
                  <div className="pstep-t">
                    <i className="bi bi-search" style={{ color: 'var(--p1)' }}></i> Discovery &amp; Strategy
                  </div>
                  <p className="pstep-d">Requirements workshops, stakeholder interviews, feasibility analysis, and project roadmap creation.</p>
                </div>
              </div>
            </div>
            <div className="col-md-2 d-none d-md-flex align-items-center justify-content-center position-relative">
              <div className="pnum">01</div>
            </div>
            <div className="col-md-5"></div>

            {/* Step 2 */}
            <div className="col-md-5"></div>
            <div className="col-md-2 d-none d-md-flex align-items-center justify-content-center position-relative">
              <div className="pnum">02</div>
            </div>
            <div className="col-md-5" data-reveal="left">
              <div className="pstep">
                <div className="pstep-inner">
                  <div className="pstep-t">
                    <i className="bi bi-pencil-square" style={{ color: 'var(--p1)' }}></i> Architecture &amp; Design
                  </div>
                  <p className="pstep-d">System architecture, database modeling, UI/UX prototyping, security design, and compliance mapping.</p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="col-md-5" data-reveal="right">
              <div className="pstep">
                <div className="pstep-inner">
                  <div className="pstep-t">
                    <i className="bi bi-code-slash" style={{ color: 'var(--p1)' }}></i> Agile Development
                  </div>
                  <p className="pstep-d">Two-week sprints with CI/CD pipelines, code reviews, and transparent progress reporting.</p>
                </div>
              </div>
            </div>
            <div className="col-md-2 d-none d-md-flex align-items-center justify-content-center position-relative">
              <div className="pnum">03</div>
            </div>
            <div className="col-md-5"></div>

            {/* Step 4 */}
            <div className="col-md-5"></div>
            <div className="col-md-2 d-none d-md-flex align-items-center justify-content-center position-relative">
              <div className="pnum">04</div>
            </div>
            <div className="col-md-5" data-reveal="left">
              <div className="pstep">
                <div className="pstep-inner">
                  <div className="pstep-t">
                    <i className="bi bi-bug-fill" style={{ color: 'var(--p1)' }}></i> QA &amp; Security Testing
                  </div>
                  <p className="pstep-d">Automated testing, penetration testing, load testing, compliance audits, and UAT sign-off.</p>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="col-md-5" data-reveal="right">
              <div className="pstep">
                <div className="pstep-inner">
                  <div className="pstep-t">
                    <i className="bi bi-rocket-takeoff-fill" style={{ color: 'var(--p1)' }}></i> Deployment &amp; Launch
                  </div>
                  <p className="pstep-d">Blue-green deployments, zero-downtime releases, infrastructure provisioning, and go-live support.</p>
                </div>
              </div>
            </div>
            <div className="col-md-2 d-none d-md-flex align-items-center justify-content-center position-relative">
              <div className="pnum">05</div>
            </div>
            <div className="col-md-5"></div>

            {/* Step 6 */}
            <div className="col-md-5"></div>
            <div className="col-md-2 d-none d-md-flex align-items-center justify-content-center position-relative">
              <div className="pnum">06</div>
            </div>
            <div className="col-md-5" data-reveal="left">
              <div className="pstep">
                <div className="pstep-inner">
                  <div className="pstep-t">
                    <i className="bi bi-tools" style={{ color: 'var(--p1)' }}></i> Ongoing Support &amp; Growth
                  </div>
                  <p className="pstep-d">24/7 monitoring, SLA-backed maintenance, security audits, and continuous feature development.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
