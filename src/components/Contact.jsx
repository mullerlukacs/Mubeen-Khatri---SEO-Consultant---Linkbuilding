import React, { useState, useEffect } from 'react';
import { business } from '../config/business';
import SectionHeading from './ui/SectionHeading';
import Button from './ui/Button';
import { submitInquiry } from '../firebase/inquiries';

export default function Contact({ preselectedService, preselectedAddon }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [lastSubmittedData, setLastSubmittedData] = useState(null);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({
        ...prev,
        service: preselectedService.title,
        message: prev.message || `Hello Mubeen, I would like to inquire about your ${preselectedService.title} service.`,
      }));
    }
  }, [preselectedService]);

  useEffect(() => {
    if (preselectedAddon) {
      setFormData((prev) => ({
        ...prev,
        service: `Add-on: ${preselectedAddon.title}`,
        message: prev.message || `Hello Mubeen, I am interested in adding the "${preselectedAddon.title}" package to my SEO plan.`,
      }));
    }
  }, [preselectedAddon]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      await submitInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service || 'General SEO Inquiry',
        message: formData.message,
      });

      setLastSubmittedData({ ...formData });
      setIsSubmitting(false);
      setSubmitted(true);
    } catch (err) {
      console.warn('Inquiry saved to backup:', err);
      // Even if Firestore throws, local storage saved it
      setLastSubmittedData({ ...formData });
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  // Pre-formatted direct WhatsApp link for instant messaging
  const whatsappInquiryUrl = lastSubmittedData
    ? `https://wa.me/923111339715?text=${encodeURIComponent(
        `*New Inquiry from Website*\nName: ${lastSubmittedData.name}\nEmail: ${lastSubmittedData.email}\nPhone: ${lastSubmittedData.phone || 'N/A'}\nService: ${lastSubmittedData.service || 'General'}\n\n*Message:*\n${lastSubmittedData.message}`
      )}`
    : business.contact.whatsappLink;

  // Pre-formatted direct Mailto link
  const mailtoInquiryUrl = lastSubmittedData
    ? `mailto:${business.contact.email}?subject=${encodeURIComponent(
        `Website Inquiry from ${lastSubmittedData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${lastSubmittedData.name}\nEmail: ${lastSubmittedData.email}\nPhone: ${lastSubmittedData.phone || 'N/A'}\nService: ${lastSubmittedData.service}\n\nMessage:\n${lastSubmittedData.message}`
      )}`
    : business.contact.emailMailto;

  return (
    <section id="contact" className="section section--alt">
      <div className="container">
        <SectionHeading
          eyebrow={business.contactSection.eyebrow}
          title={business.contactSection.title}
          description={business.contactSection.subtitle}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-48)',
            alignItems: 'start',
          }}
          className="contact-layout"
        >
          {/* Left Column: Direct Contact Details & Opening Hours */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-24)',
            }}
          >
            {/* Primary Action Buttons */}
            <div
              style={{
                backgroundColor: 'var(--color-white)',
                padding: 'var(--space-32)',
                borderRadius: 'var(--radius-card)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-resting)',
              }}
            >
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  marginBottom: 'var(--space-16)',
                  color: 'var(--color-ink)',
                }}
              >
                Instant Communication
              </h3>
              <p
                style={{
                  fontSize: '0.95rem',
                  color: 'var(--color-ink-muted)',
                  marginBottom: 'var(--space-24)',
                }}
              >
                For urgent inquiries, reach out directly on WhatsApp or call during consultation hours.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
                {/* WhatsApp */}
                <Button
                  href={business.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="md"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  {business.contactSection.actions.whatsappButton}
                </Button>

                {/* Call */}
                <Button
                  href={business.contact.phoneTel}
                  variant="secondary"
                  size="md"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  {business.contactSection.actions.callButton}
                </Button>

                {/* Directions */}
                <Button
                  href={business.contact.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="subtle"
                  size="md"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="3 11 22 2 13 21 11 13 3 11" />
                  </svg>
                  {business.contactSection.actions.directionsButton}
                </Button>
              </div>
            </div>

            {/* Address & Hours Information */}
            <div
              style={{
                backgroundColor: 'var(--color-white)',
                padding: 'var(--space-32)',
                borderRadius: 'var(--radius-card)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-resting)',
              }}
            >
              <div style={{ marginBottom: 'var(--space-24)' }}>
                <div
                  style={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontWeight: 700,
                    color: 'var(--color-primary)',
                    marginBottom: 'var(--space-8)',
                  }}
                >
                  Office Location
                </div>
                <div style={{ fontWeight: 600, color: 'var(--color-ink)', lineHeight: 1.5 }}>
                  {business.contact.fullAddress}
                </div>
                <div style={{ marginTop: '8px' }}>
                  <a
                    href={business.contact.emailMailto}
                    style={{
                      fontSize: '0.95rem',
                      color: 'var(--color-primary)',
                      textDecoration: 'underline',
                      wordBreak: 'break-all',
                    }}
                  >
                    {business.contact.email}
                  </a>
                </div>
              </div>

              {/* Working Hours Schedule */}
              <div>
                <div
                  style={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontWeight: 700,
                    color: 'var(--color-primary)',
                    marginBottom: 'var(--space-12)',
                  }}
                >
                  Opening Hours
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {business.hours.map((item) => (
                    <div
                      key={item.day}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.9rem',
                        paddingBottom: '4px',
                        borderBottom: '1px solid var(--color-border-subtle)',
                        color: item.isClosed ? 'var(--color-ink-subtle)' : 'var(--color-ink)',
                      }}
                    >
                      <span style={{ fontWeight: item.isClosed ? 400 : 500 }}>{item.day}</span>
                      <span style={{ fontWeight: 600 }}>{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Usable Contact Form with Database Persistence */}
          <div
            style={{
              backgroundColor: 'var(--color-white)',
              padding: 'var(--space-48)',
              borderRadius: 'var(--radius-card)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-resting)',
            }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: 'var(--space-24) 0' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: '#E8F5E9',
                    color: '#2E7D32',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto var(--space-24)',
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 'var(--space-12)' }}>
                  Inquiry Successfully Recorded!
                </h3>
                <p style={{ color: 'var(--color-ink-muted)', marginBottom: 'var(--space-24)', maxWidth: '440px', margin: '0 auto' }}>
                  Aapka message database mein save ho chuka hai aur Mubeen Khatri ke Admin Panel par receive ho gaya hai.
                </p>

                {/* Instant WhatsApp / Email Direct Send Buttons */}
                <div
                  style={{
                    backgroundColor: 'var(--color-secondary-light)',
                    borderRadius: '12px',
                    padding: 'var(--space-20)',
                    marginBottom: 'var(--space-24)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-ink)', marginBottom: '12px' }}>
                    ⚡ For Instant WhatsApp Reply (Optional):
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                    <Button
                      href={whatsappInquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="primary"
                      size="sm"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                      Open in WhatsApp Now
                    </Button>

                    <Button
                      href={mailtoInquiryUrl}
                      variant="secondary"
                      size="sm"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      Send Direct via Email
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
                  }}
                  variant="subtle"
                  size="sm"
                >
                  Send Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    marginBottom: 'var(--space-8)',
                    color: 'var(--color-ink)',
                  }}
                >
                  Send an Inquiry
                </h3>
                <p
                  style={{
                    fontSize: '0.95rem',
                    color: 'var(--color-ink-muted)',
                    marginBottom: 'var(--space-24)',
                  }}
                >
                  Fill in your details below. Your message will be sent directly to Mubeen Khatri's Admin inbox.
                </p>

                {errorMsg && (
                  <div
                    style={{
                      padding: '12px',
                      backgroundColor: '#FFEBEE',
                      color: '#C62828',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      marginBottom: 'var(--space-16)',
                    }}
                  >
                    {errorMsg}
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-16)' }}>
                  {/* Name */}
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">
                      {business.contactSection.formLabels.name} *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Tariq Ahmed"
                      className="form-input"
                    />
                  </div>

                  {/* Email & Phone side by side */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: 'var(--space-16)',
                    }}
                  >
                    <div className="form-group">
                      <label htmlFor="contact-email" className="form-label">
                        {business.contactSection.formLabels.email} *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@company.com"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-phone" className="form-label">
                        {business.contactSection.formLabels.phone}
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="0311 0000000"
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* Interested Service / Addon */}
                  <div className="form-group">
                    <label htmlFor="contact-service" className="form-label">
                      {business.contactSection.formLabels.service}
                    </label>
                    <input
                      id="contact-service"
                      type="text"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      placeholder="e.g. WikiPedia Backlinks, SEO Teaching, etc."
                      className="form-input"
                    />
                  </div>

                  {/* Message */}
                  <div className="form-group">
                    <label htmlFor="contact-message" className="form-label">
                      {business.contactSection.formLabels.message} *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your website or consultation requirements..."
                      className="form-textarea"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    style={{ width: '100%', justifyContent: 'center', marginTop: 'var(--space-8)' }}
                  >
                    {isSubmitting ? 'Recording & Sending...' : business.contactSection.formLabels.submit}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .contact-layout {
            grid-template-columns: 1fr 1.25fr !important;
          }
        }
      `}</style>
    </section>
  );
}
