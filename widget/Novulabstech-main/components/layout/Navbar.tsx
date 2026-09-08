"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { servicePages } from '@/content/servicePages';
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const pathname = usePathname();

  const lastScrollYRef = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;

      // Solid background styling when scrolled past 50px
      setScrolled(currentScrollY > 50);

      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        if (!servicesOpen && !companyOpen && !mobileMenuOpen) {
          setVisible(false);
        }
      } else {
        setVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [servicesOpen, companyOpen, mobileMenuOpen]);

  // Close mobile menu + dropdown on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setCompanyOpen(false);
    setVisible(true); // make sure it's visible on route switch
  }, [pathname]);

  const hasDarkHero = true;
  const navbarClasses = `navbar navbar-expand-lg ${hasDarkHero && !scrolled ? 'nav-inv' : ''} ${scrolled ? 'scrolled' : ''} ${visible ? 'nav-visible' : 'nav-hidden'}`;

  const handleServicesClick = (e: React.MouseEvent) => {
    if (typeof window !== 'undefined' && window.innerWidth < 992) {
      e.preventDefault();
      setServicesOpen((prev) => !prev);
    }
  };

  const checkActive = (href: string, exact = false) => {
    if (exact) {
      return pathname === href;
    }
    return pathname === href || (href !== '/' && pathname.startsWith(href));
  };

  const handleServicesMouseEnter = () => {
    if (window.innerWidth >= 992) setServicesOpen(true);
  };

  const handleServicesMouseLeave = () => {
    if (window.innerWidth >= 992) setServicesOpen(false);
  };

  const handleCompanyClick = (e: React.MouseEvent) => {
    if (typeof window !== 'undefined' && window.innerWidth < 992) {
      e.preventDefault();
      setCompanyOpen((prev) => !prev);
    }
  };

  const handleCompanyMouseEnter = () => {
    if (window.innerWidth >= 992) setCompanyOpen(true);
  };

  const handleCompanyMouseLeave = () => {
    if (window.innerWidth >= 992) setCompanyOpen(false);
  };

  return (
    <nav className={navbarClasses}>
      <div className="container">
        <Link className="navbar-brand" href="/">
          {/* next/image: logo.png is a 1200x1200 / 154KB PNG rendered at 40px.
              As a raw <img> with no dimensions it was an unsized element in the
              header of all 40 routes — the site's single largest CLS source —
              and shipped 154KB for a 40px slot. The optimizer serves AVIF/WebP
              at 40px instead. */}
          <Image
            src="/logo.png"
            alt="NovuLabs"
            className="nav-logo"
            width={40}
            height={40}
            priority
            sizes="40px"
          />
          <span 
            style={{
              fontFamily: 'var(--fh)',
              fontSize: '1.25rem',
              fontWeight: 800,
              letterSpacing: '-.03em',
              background: 'var(--g-main)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginLeft: '10px',
              lineHeight: 1
            }}
          >
            NovuLabs
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={mobileMenuOpen}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`} id="nvmenu">
          <ul className="navbar-nav mx-auto gap-1">
            <li className="nav-item">
              <Link className={`nav-link ${checkActive('/', true) ? 'active' : ''}`} href="/">Home</Link>
            </li>
            {/* Company dropdown. Testimonials and the FAQ hub need a
                navigation path, but a tenth and eleventh sibling would push the
                bar to wrap at common laptop widths. They sit under About, which
                is where a visitor evaluating the firm already looks. */}
            <li
              className={`nav-item dropdown ${companyOpen ? 'show' : ''}`}
              onMouseEnter={handleCompanyMouseEnter}
              onMouseLeave={handleCompanyMouseLeave}
            >
              <Link
                className={`nav-link dropdown-toggle ${
                  checkActive('/about') || checkActive('/testimonials') || checkActive('/faq')
                    ? 'active'
                    : ''
                }`}
                href="/about"
                id="companyDropdown"
                aria-expanded={companyOpen}
                onClick={handleCompanyClick}
              >
                About
              </Link>
              <ul
                className={`dropdown-menu ${companyOpen ? 'show' : ''}`}
                aria-labelledby="companyDropdown"
                style={{ display: companyOpen ? 'block' : 'none' }}
              >
                <li>
                  <Link className="dropdown-item" href="/about" onClick={() => setCompanyOpen(false)}>
                    About NovuLabs
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/testimonials" onClick={() => setCompanyOpen(false)}>
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="/faq" onClick={() => setCompanyOpen(false)}>
                    FAQ
                  </Link>
                </li>
              </ul>
            </li>
            <li
              className={`nav-item dropdown ${servicesOpen ? 'show' : ''}`}
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
            >
              <Link
                className={`nav-link dropdown-toggle ${checkActive('/services') ? 'active' : ''}`}
                href="/services"
                id="servicesDropdown"
                aria-expanded={servicesOpen}
                onClick={handleServicesClick}
              >
                Services
              </Link>
              <ul
                className={`dropdown-menu ${servicesOpen ? 'show' : ''}`}
                aria-labelledby="servicesDropdown"
                style={{ display: servicesOpen ? 'block' : 'none' }}
              >
                {/* These were /services#anchor fragments. A fragment is not a
                    document — all six resolved to one URL, so the dropdown
                    looked like six internal links and was really one. They now
                    point at the dedicated service pages. */}
                {servicePages.map((s) => (
                  <li key={s.slug}>
                    <Link className="dropdown-item" href={`/services/${s.slug}`} onClick={() => setServicesOpen(false)}>
                      {s.navLabel}
                    </Link>
                  </li>
                ))}
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" href="/services" onClick={() => setServicesOpen(false)}>All services</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${checkActive('/solutions') ? 'active' : ''}`} href="/solutions">Solutions</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${checkActive('/industries') ? 'active' : ''}`} href="/industries">Industries</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${checkActive('/portfolio') ? 'active' : ''}`} href="/portfolio">Case Studies</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${checkActive('/team') ? 'active' : ''}`} href="/team">Team</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${checkActive('/blog') ? 'active' : ''}`} href="/blog">Blog</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${checkActive('/contact') ? 'active' : ''}`} href="/contact">Contact</Link>
            </li>
          </ul>
          <Link href="/contact" className="nav-cta nav-link ms-lg-3">Get a Consultation</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
