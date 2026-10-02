import React from 'react';
import { business } from '../config/business';
import SocialLinks from './ui/SocialLinks';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: '#191817',
        color: '#E5DFD7',
        paddingTop: 'var(--space-64)',
        paddingBottom: 'var(--space-48)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'var(--space-48)',
            marginBottom: 'var(--space-48)',
          }}
          className="footer-grid"
        >
          {/* Col 1: Wordmark & Narrative & Social Icons */}
          <div style={{ maxWidth: '340px' }}>
            <a
              href="#"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: 'var(--color-white)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: 'var(--space-16)',
                letterSpacing: '-0.02em',
              }}
            >
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '2px',
                  backgroundColor: 'var(--color-primary)',
                  display: 'inline-block',
                }}
              />
              {business.shortName}
            </a>
            <p
              style={{
                fontSize: '0.9rem',
                lineHeight: 1.6,
                color: '#9E978F',
                marginBottom: 'var(--space-16)',
              }}
            >
              {business.footer.description}
            </p>
            <div style={{ fontSize: '0.85rem', color: '#D95B16', fontWeight: 600, marginBottom: 'var(--space-16)' }}>
              {business.type} · {business.contact.cityArea}
            </div>

            {/* Social Icons in Footer */}
            <div>
              <div
                style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#8E877E',
                  marginBottom: '10px',
                  fontWeight: 600,
                }}
              >
                Connect With Mubeen
              </div>
              <SocialLinks variant="footer" />
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <div
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--color-white)',
                marginBottom: 'var(--space-16)',
              }}
            >
              Navigation
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {business.navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    style={{
                      fontSize: '0.9rem',
                      color: '#B5ADA4',
                      transition: 'color var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#B5ADA4')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact & Location */}
          <div>
            <div
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--color-white)',
                marginBottom: 'var(--space-16)',
              }}
            >
              Direct Contact
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: '#B5ADA4' }}>
              <div>
                WhatsApp:{' '}
                <a
                  href={business.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#FFFFFF', textDecoration: 'underline' }}
                >
                  {business.contact.whatsappNumber}
                </a>
              </div>
              <div>
                Phone:{' '}
                <a
                  href={business.contact.phoneTel}
                  style={{ color: '#FFFFFF', textDecoration: 'underline' }}
                >
                  {business.contact.phone}
                </a>
              </div>
              <div>
                Email:{' '}
                <a
                  href={business.contact.emailMailto}
                  style={{ color: '#FFFFFF', textDecoration: 'underline' }}
                >
                  {business.contact.email}
                </a>
              </div>
              <div style={{ marginTop: '8px', lineHeight: 1.5 }}>
                {business.contact.fullAddress}
              </div>
            </div>
          </div>

          {/* Col 4: Consultation Hours */}
          <div>
            <div
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--color-white)',
                marginBottom: 'var(--space-16)',
              }}
            >
              Consultation Hours
            </div>
            <p style={{ fontSize: '0.9rem', color: '#B5ADA4', lineHeight: 1.6, marginBottom: 'var(--space-12)' }}>
              {business.hoursSummary}
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#68D391' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#48BB78' }} />
              Open for inquiries & appointments
            </div>
          </div>
        </div>

        {/* Quiet Sub-footer */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: 'var(--space-24)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            fontSize: '0.85rem',
            color: '#7D766E',
          }}
        >
          <div>
            © {currentYear} {business.footer.copyrightNotice}
          </div>
          <div>
            {business.tagline}
          </div>
        </div>
      </div>
    </footer>
  );
}
