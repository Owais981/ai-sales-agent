"use client";

import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import Button from '@/components/ui/Button';
import { ORG } from '@/lib/seo';

// EmailJS Config
const SERVICE_ID = 'service_ogn7v0d';
const TEMPLATE_ID = 'template_niiq07k';
const PUBLIC_KEY = 'M34BR02JCVsynFlTi';

interface ContactFormData {
  full_name: string;
  organization: string;
  work_email: string;
  phone: string;
  country: string;
  budget_range: string;
  service_needed: string;
  message: string;
}

const ContactFormSection: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    full_name: '',
    organization: '',
    work_email: '',
    phone: '',
    country: 'Pakistan',
    budget_range: '',
    service_needed: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setFormError(false);

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY })
      .then(() => {
        setFormSubmitted(true);
        setTimeout(() => {
          setFormSubmitted(false);
          setFormData({
            full_name: '',
            organization: '',
            work_email: '',
            phone: '',
            country: 'Pakistan',
            budget_range: '',
            service_needed: '',
            message: ''
          });
        }, 4000);
      })
      .catch((err) => {
        console.error('EmailJS error:', err);
        setFormError(true);
      });
  };

  return (
    <section className="sec bg-g" id="contact-form-sec">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-7" data-reveal="right">
            <div className="ccontact">
              <h3 className="mb-1">Tell Us About Your Project</h3>
              <p style={{ color: 'var(--tx3)', fontSize: '0.86rem', marginBottom: '26px' }}>We respond within 4 business hours. For urgent inquiries, call us directly.</p>
              <form id="contact-form" ref={formRef} onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="flabel">Full Name *</label>
                    <input 
                      type="text" 
                      name="full_name"
                      className="finput" 
                      placeholder="John Smith" 
                      value={formData.full_name}
                      onChange={handleInputChange}
                      required 
                      disabled={formSubmitted}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="flabel">Organization *</label>
                    <input 
                      type="text" 
                      name="organization"
                      className="finput" 
                      placeholder="Your Company" 
                      value={formData.organization}
                      onChange={handleInputChange}
                      required 
                      disabled={formSubmitted}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="flabel">Work Email *</label>
                    <input 
                      type="email" 
                      name="work_email"
                      className="finput" 
                      placeholder="john@company.com" 
                      value={formData.work_email}
                      onChange={handleInputChange}
                      required 
                      disabled={formSubmitted}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="flabel">Phone</label>
                    <input 
                      type="tel" 
                      name="phone"
                      className="finput" 
                      placeholder="+92 300 0000000" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={formSubmitted}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="flabel">Country</label>
                    <select 
                      name="country"
                      className="fselect"
                      value={formData.country}
                      onChange={handleInputChange}
                      disabled={formSubmitted}
                    >
                      <option>Pakistan</option>
                      <option>UAE</option>
                      <option>UK</option>
                      <option>USA</option>
                      <option>Saudi Arabia</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="flabel">Budget Range</label>
                    <select 
                      name="budget_range"
                      className="fselect"
                      value={formData.budget_range}
                      onChange={handleInputChange}
                      disabled={formSubmitted}
                    >
                      <option value="">— Optional —</option>
                      <option>$10K – $50K</option>
                      <option>$50K – $150K</option>
                      <option>$150K – $500K</option>
                      <option>$500K+</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="flabel">What do you need? *</label>
                    <select 
                      name="service_needed"
                      className="fselect" 
                      value={formData.service_needed}
                      onChange={handleInputChange}
                      required 
                      disabled={formSubmitted}
                    >
                      <option value="">— Select a Service —</option>
                      <option value="Enterprise Software Development">Enterprise Software Development</option>
                      <option value="Financial Software / Fintech">Financial Software / Fintech</option>
                      <option value="AML / CFT Compliance">AML / CFT Compliance</option>
                      <option value="Healthcare Software">Healthcare Software</option>
                      <option value="Mobile App Development">Mobile App Development</option>
                      <option value="ERP / CRM Systems">ERP / CRM Systems</option>
                      <option value="Government Solutions">Government Solutions</option>
                      <option value="Cloud &amp; AI">Cloud &amp; AI</option>
                      <option value="General Consultation">General Consultation</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="flabel">Describe your project *</label>
                    <textarea 
                      name="message"
                      className="finput" 
                      rows={5} 
                      placeholder="What do you want to build? What problem are you solving? Timeline and compliance requirements..." 
                      value={formData.message}
                      onChange={handleInputChange}
                      required 
                      disabled={formSubmitted}
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <Button 
                      type="submit" 
                      variant="grad"
                      className="w-100 justify-content-center" 
                      style={{ 
                        padding: '15px', 
                        fontSize: '0.97rem',
                        background: formSubmitted ? 'linear-gradient(135deg,#C9A84C,#E8C96A)' : '',
                      }}
                      disabled={formSubmitted}
                    >
                      {formSubmitted ? (
                        <>
                          <i className="bi bi-check-circle me-2"></i>Message Sent — We'll be in touch!
                        </>
                      ) : (
                        <>
                          <i className="bi bi-send-fill me-2"></i>Send Message — We Respond in 4 Hours
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="col-12 text-center">
                    <p style={{ fontSize: '0.73rem', color: 'var(--tx4)', margin: 0 }}>🔒 Your information is confidential and never shared with third parties.</p>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
          <div className="col-lg-5" data-reveal="left">
            <div className="ccontact mb-4">
              <h2 className="mb-4" style={{ fontSize: '1.1rem' }}>Our office</h2>
              <div className="cinfo-item">
                <div className="cico i-b"><i className="bi bi-geo-alt-fill"></i></div>
                <div>
                  <div className="cinfo-label">🇵🇰 Pakistan (HQ)</div>
                  <p>Islamabad, Pakistan</p>
                </div>
              </div>
            </div>
            <div className="ccontact mb-4">
              <h2 className="mb-4" style={{ fontSize: '1.1rem' }}>Direct contacts</h2>
              <div className="cinfo-item">
                <div className="cico i-t"><i className="bi bi-envelope-fill"></i></div>
                <div>
                  <div className="cinfo-label">General Inquiries</div>
                  <p><a href="mailto:info@novulabs.net" style={{ color: 'var(--p1)' }}>info@novulabs.net</a></p>
                </div>
              </div>
              <div className="cinfo-item">
                <div className="cico i-b"><i className="bi bi-envelope-fill"></i></div>
                <div>
                  <div className="cinfo-label">Enterprise Sales</div>
                  <p><a href="mailto:info@novulabs.net" style={{ color: 'var(--p1)' }}>info@novulabs.net</a></p>
                </div>
              </div>
              {/* The page told visitors to "call us directly" while publishing
                  no number anywhere on the site — even though the verified
                  Google Business Profile carried one. The instruction and the
                  number now sit together, and both match GBP for NAP
                  consistency. Rendered from ORG so the page, the footer and the
                  schema cannot drift apart. */}
              {ORG.telephone && (
                <div className="cinfo-item">
                  <div className="cico i-b"><i className="bi bi-telephone-fill"></i></div>
                  <div>
                    <div className="cinfo-label">Phone</div>
                    <p>
                      <a
                        href={`tel:${ORG.telephone.replace(/\s+/g, '')}`}
                        style={{ color: 'var(--p1)' }}
                      >
                        {ORG.telephone}
                      </a>
                    </p>
                  </div>
                </div>
              )}
              {ORG.address.streetAddress && (
                <div className="cinfo-item">
                  <div className="cico i-o"><i className="bi bi-geo-alt-fill"></i></div>
                  <div>
                    <div className="cinfo-label">Office</div>
                    <p>
                      {ORG.address.streetAddress}
                      <br />
                      {ORG.address.addressLocality}, {ORG.address.addressRegion}
                    </p>
                  </div>
                </div>
              )}
              <div className="cinfo-item">
                <div className="cico i-o"><i className="bi bi-clock-fill"></i></div>
                <div>
                  <div className="cinfo-label">Business Hours (PKT)</div>
                  <p>Mon–Fri: 9AM–6PM<br /><small style={{ color: 'var(--p2)' }}>24/7 for enterprise SLA clients</small></p>
                </div>
              </div>
            </div>
            
            <div className="map-box">
              <div>
                <i className="bi bi-map-fill" style={{ fontSize: '2.4rem', color: 'var(--p1)', opacity: 0.35, display: 'block', marginBottom: '10px' }}></i>
                <p style={{ fontWeight: 600, color: 'var(--tx1)', marginBottom: '4px' }}>NovuLabs HQ</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--tx3)', marginBottom: '12px' }}>{ORG.address.streetAddress}, {ORG.address.addressLocality}</p>
                <a href="https://www.google.com/maps/search/?api=1&query=Novu+Labs+I-10%2F4+I-10+Islamabad" target="_blank" rel="noopener noreferrer" className="btn-glass" style={{ padding: '7px 16px', fontSize: '0.8rem', textDecoration: 'none', display: 'inline-block' }}>
                  <i className="bi bi-box-arrow-up-right me-1"></i>Open Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
