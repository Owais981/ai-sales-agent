"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import emailjs from '@emailjs/browser';
import { servicePages } from '@/content/servicePages';
import { ORG } from '@/lib/seo';

/**
 * The subscribe form previously rendered "✓ Subscribed!" from local state
 * without sending anything anywhere — the address was discarded on the next
 * render. Telling someone they have subscribed when no record of them exists is
 * a trust defect, not a cosmetic one, and it is the first thing a visitor can
 * personally verify is untrue.
 *
 * It now posts through the same EmailJS service the contact and CTA forms
 * already use, so a signup actually reaches NovuLabs, and it reports failure
 * instead of swallowing it. No new dependency: @emailjs/browser is already in
 * the bundle for those two forms.
 */
const SERVICE_ID = 'service_ogn7v0d';
const TEMPLATE_ID = 'template_niiq07k';
const PUBLIC_KEY = 'M34BR02JCVsynFlTi';

type SubscribeState = 'idle' | 'sending' | 'done' | 'error';

const Footer: React.FC = () => {
  const [status, setStatus] = useState<SubscribeState>('idle');
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'sending') return;
    setStatus('sending');

    emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          full_name: 'Newsletter subscriber',
          work_email: email,
          service_needed: 'Newsletter subscription',
          message: `Newsletter signup from the site footer: ${email}`,
        },
        { publicKey: PUBLIC_KEY }
      )
      .then(() => {
        setStatus('done');
        setEmail('');
      })
      .catch((err) => {
        console.error('Newsletter subscribe failed:', err);
        setStatus('error');
      });
  };

  return (
    <>
      <div className="ft-wave-wrap">
        <svg className="ft-wave-svg" viewBox="0 0 2880 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path className="ft-wave-p1" d="M0,45 C240,0 480,90 720,45 C960,0 1200,90 1440,45 C1680,0 1920,90 2160,45 C2400,0 2640,90 2880,45 L2880,90 L0,90 Z" />
          <path className="ft-wave-p2" d="M0,62 C300,15 600,90 900,62 C1200,15 1440,78 1440,62 C1740,46 2040,90 2340,62 C2520,46 2700,18 2880,62 L2880,90 L0,90 Z" />
        </svg>
      </div>
      <footer>
        <div className="container">
          <div className="row g-5 ft-top">
            <div className="col-lg-3">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                {/* Same 154KB PNG as the header, below the fold — lazy, sized. */}
                <Image
                  src="/logo.png"
                  alt="NovuLabs"
                  className="ft-logo"
                  width={40}
                  height={40}
                  loading="lazy"
                  sizes="40px"
                  style={{ height: '40px', width: 'auto' }}
                />
                <span 
                  style={{
                    fontFamily: 'var(--fh)',
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    letterSpacing: '-.03em',
                    background: 'var(--g-main)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 1
                  }}
                >
                  NovuLabs
                </span>
              </div>
              {/* "across 40+ countries since 2026" was removed. The country
                  count is unevidenced anywhere on the site (lib/seo.ts declares
                  five served markets), and "since 2026" is the current year and
                  contradicted /about. Same claim class as the certification
                  wording removed in 6daaa0c — see artifacts/FINDINGS.md. */}
              <p className="ft-tag">
                An enterprise software house headquartered in Islamabad, engineering
                mission-critical platforms for regulated finance, healthcare and government.
              </p>
              <div className="ft-contact-items">
                <a href="mailto:info@novulabs.net" className="ft-contact-item">
                  <i className="bi bi-envelope-fill"></i>info@novulabs.net
                </a>
                {/* Full NAP in the footer, on every page. Google and answer
                    engines corroborate an entity by finding the same name,
                    address and phone repeated consistently — a city-only line
                    matched nothing the verified Business Profile carried.
                    Rendered from ORG so footer, contact page and schema stay in
                    lockstep. */}
                {ORG.telephone && (
                  <a
                    href={`tel:${ORG.telephone.replace(/\s+/g, '')}`}
                    className="ft-contact-item"
                  >
                    <i className="bi bi-telephone-fill"></i>
                    {ORG.telephone}
                  </a>
                )}
                <span className="ft-contact-item">
                  <i className="bi bi-geo-alt-fill"></i>
                  {ORG.address.streetAddress
                    ? `${ORG.address.streetAddress}, ${ORG.address.addressLocality}, Pakistan`
                    : `${ORG.address.addressLocality}, Pakistan`}
                </span>
              </div>
              <div className="ft-socs">
                <a href="https://www.linkedin.com/company/novu-labs/" target="_blank" rel="noopener noreferrer" className="fsoc" title="LinkedIn"><i className="bi bi-linkedin"></i></a>
                <a href="https://www.facebook.com/profile.php?id=61592003789179" target="_blank" rel="noopener noreferrer" className="fsoc" title="Facebook"><i className="bi bi-facebook"></i></a>
                <a href="https://www.instagram.com/novu_labs" target="_blank" rel="noopener noreferrer" className="fsoc" title="Instagram"><i className="bi bi-instagram"></i></a>
              </div>
            </div>

            <div className="col-6 col-lg-3">
              <div className="ft-head">Services</div>
              <ul className="ft-links">
                {/* Previously seven /services#anchor fragments. Fragments pass
                    no independent link equity — the footer looked like it linked
                    to seven places and linked to one. */}
                {servicePages.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`}>
                      <i className="bi bi-chevron-right"></i>
                      {s.navLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-6 col-lg-2">
              <div className="ft-head">Company</div>
              <ul className="ft-links">
                <li><Link href="/about"><i className="bi bi-chevron-right"></i>About NovuLabs</Link></li>
                <li><Link href="/portfolio"><i className="bi bi-chevron-right"></i>Case Studies</Link></li>
                <li><Link href="/industries"><i className="bi bi-chevron-right"></i>Industries</Link></li>
                <li><Link href="/solutions"><i className="bi bi-chevron-right"></i>Solutions</Link></li>
                <li><Link href="/contact"><i className="bi bi-chevron-right"></i>Contact Us</Link></li>
                <li><Link href="/blog"><i className="bi bi-chevron-right"></i>Insights</Link></li>
                <li><Link href="/team"><i className="bi bi-chevron-right"></i>Our Team</Link></li>
                <li><Link href="/testimonials"><i className="bi bi-chevron-right"></i>Testimonials</Link></li>
                <li><Link href="/faq"><i className="bi bi-chevron-right"></i>FAQ</Link></li>
              </ul>
            </div>

            <div className="col-lg-4">
              <div className="ft-head">Subscribe For Updates</div>
              <p className="ft-tag" style={{ marginBottom: '18px' }}>
                Monthly fintech, compliance &amp; enterprise tech insights. No spam.
              </p>
              <form className="ft-subscribe-form" onSubmit={handleSubscribe}>
                {/* The input had no label of any kind — a placeholder is not an
                    accessible name, so screen readers announced it as an
                    unlabelled edit field. WCAG 3.3.2. */}
                <label htmlFor="ft-subscribe-email" className="visually-hidden">
                  Email address for the NovuLabs newsletter
                </label>
                <input
                  id="ft-subscribe-email"
                  type="email"
                  name="work_email"
                  autoComplete="email"
                  className="ft-sub-input"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'sending'}
                  required
                />
                <button
                  type="submit"
                  className="btn-grad ft-sub-btn"
                  style={{ whiteSpace: 'nowrap' }}
                  disabled={status === 'sending' || status === 'done'}
                >
                  {status === 'done'
                    ? '✓ Subscribed'
                    : status === 'sending'
                      ? 'Subscribing…'
                      : 'Subscribe'}
                </button>
                {/* aria-live so the outcome is announced, not only shown. */}
                <p className="ft-sub-status" role="status" aria-live="polite">
                  {status === 'done' &&
                    'Thanks — your address has been sent to our team.'}
                  {status === 'error' && (
                    <>
                      That did not go through. Email{' '}
                      <a href="mailto:info@novulabs.net">info@novulabs.net</a> and we will add
                      you.
                    </>
                  )}
                </p>
              </form>
            </div>
          </div>
          <div className="ft-bot">
            <div className="ft-copy">© 2026 NovuLabs Technology Pvt Ltd. All rights reserved.</div>
            {/* These four were all href="#" on every page — 4 dead links x
                every route. /privacy and /privacy-policy both 404'd. */}
            <div className="ft-legal">
              <Link href="/legal/privacy-policy">Privacy Policy</Link>
              <Link href="/legal/terms-of-service">Terms of Service</Link>
              <Link href="/legal/cookie-policy">Cookie Policy</Link>
              <Link href="/site-map">Sitemap</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
