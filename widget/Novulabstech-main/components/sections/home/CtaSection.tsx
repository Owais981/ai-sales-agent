"use client";

import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import Button from '@/components/ui/Button';
import { InquiryFormData } from '@/types';

// EmailJS Config
const SERVICE_ID = 'service_ogn7v0d';
const TEMPLATE_ID = 'template_niiq07k';
const PUBLIC_KEY = 'M34BR02JCVsynFlTi';

const CtaSection: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);
  const [formData, setFormData] = useState<InquiryFormData>({
    full_name: '',
    work_email: '',
    service_needed: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCtaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setFormError(false);

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY })
      .then(() => {
        setFormSubmitted(true);
        setTimeout(() => {
          setFormSubmitted(false);
          setFormData({ full_name: '', work_email: '', service_needed: '', message: '' });
        }, 4000);
      })
      .catch((err) => {
        console.error('EmailJS error:', err);
        setFormError(true);
      });
  };

  return (
    <section id="cta-banner" className="z1">
      <div className="container">
        <div className="cta-inner" data-reveal="up">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <span className="stag">Ready to Start?</span>
              <p className="stitle mt-3">
                Tell us what you're building.<br />
                <span className="gtxt">We'll tell you how we can help.</span>
              </p>
              <p className="ssub mt-4 mb-0">
                A 45-minute call with one of our engineers. We'll listen to what you're working on, share what we know from similar projects, and give you honest advice on the right way forward — whether that's working with us or not.
              </p>
              <div className="cta-trust-row">
                <div className="cta-trust-item">
                  <i className="bi bi-person-check"></i>
                  Directly with an engineer who has worked on similar projects
                </div>
                <div className="cta-trust-item">
                  <i className="bi bi-file-earmark-lock2"></i>
                  NDA signed upfront — your ideas stay yours
                </div>
                <div className="cta-trust-item">
                  <i className="bi bi-arrow-right-circle"></i>
                  Written proposal within 5 business days, at no cost
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="cta-card">
                <div className="cta-card-label">Quick Inquiry</div>
                <form ref={formRef} onSubmit={handleCtaSubmit}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input
                      type="text"
                      name="full_name"
                      className="finput"
                      placeholder="Your Name *"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      required
                      disabled={formSubmitted}
                    />
                    <input
                      type="email"
                      name="work_email"
                      className="finput"
                      placeholder="Work Email *"
                      value={formData.work_email}
                      onChange={handleInputChange}
                      required
                      disabled={formSubmitted}
                    />
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
                    <textarea
                      name="message"
                      className="finput"
                      rows={3}
                      placeholder="Tell us about your project *"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      disabled={formSubmitted}
                    ></textarea>
                    <Button
                      type="submit"
                      variant="grad"
                      className="w-100 justify-content-center"
                      style={{ padding: '13px', fontSize: '0.93rem' }}
                      disabled={formSubmitted}
                    >
                      {formSubmitted ? (
                        <><i className="bi bi-check-circle me-1"></i> Sent Successfully!</>
                      ) : (
                        <><i className="bi bi-send me-1"></i> Send Inquiry</>
                      )}
                    </Button>
                    {formError && (
                      <p style={{ color: '#ef4444', fontSize: '0.8rem', margin: 0, textAlign: 'center' }}>
                        Something went wrong. Please try again.
                      </p>
                    )}
                  </div>
                </form>
                <p className="cta-card-note">Most started with a single conversation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
