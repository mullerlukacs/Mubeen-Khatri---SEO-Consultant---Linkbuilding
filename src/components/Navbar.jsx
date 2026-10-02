import React, { useState, useEffect } from 'react';
import { business } from '../config/business';
import Button from './ui/Button';
import SocialLinks from './ui/SocialLinks';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: isScrolled
          ? 'rgba(251, 249, 245, 0.96)'
          : 'rgba(251, 249, 245, 0.90)',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${isScrolled ? 'var(--color-border)' : 'var(--color-border-subtle)'}`,
        boxShadow: isScrolled ? 'var(--shadow-header)' : 'none',
        transition: 'all var(--transition-normal)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '76px',
        }}
      >
        {/* Zone 1: Single element brand wordmark */}
        <a
          href="#"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.25rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--color-ink)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
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

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '28px',
          }}
          className="desktop-nav"
        >
          {business.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontSize: '0.95rem',
                fontWeight: 500,
                color: 'var(--color-ink)',
                textDecoration: 'none',
                transition: 'color var(--transition-fast)',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-ink)';
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Social Icons & Primary Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Header Social Icons (Desktop) */}
          <div className="desktop-socials">
            <SocialLinks variant="header" />
          </div>

          <div className="desktop-cta">
            <Button
              href={business.mainCta.href}
              target={business.mainCta.target}
              rel={business.mainCta.rel}
              variant="primary"
              size="sm"
            >
              {business.mainCta.label}
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="mobile-hamburger-btn"
            style={{
              display: 'none',
              padding: '8px',
              borderRadius: '6px',
              color: 'var(--color-ink)',
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'var(--color-white)',
            borderBottom: '1px solid var(--color-border)',
            padding: '24px var(--container-padding) 32px',
            boxShadow: 'var(--shadow-hover)',
          }}
          className="mobile-menu-panel"
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              marginBottom: '20px',
            }}
          >
            {business.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: 'var(--color-ink)',
                  padding: '8px 0',
                  borderBottom: '1px solid var(--color-border-subtle)',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Social Links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 0',
              borderBottom: '1px solid var(--color-border-subtle)',
              marginBottom: '20px',
            }}
          >
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-ink-muted)' }}>
              Follow Us
            </span>
            <SocialLinks variant="header" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Button
              href={business.mainCta.href}
              target={business.mainCta.target}
              rel={business.mainCta.rel}
              variant="primary"
              size="md"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={closeMenu}
            >
              {business.mainCta.label}
            </Button>
            <Button
              href={business.secondaryCta.href}
              variant="secondary"
              size="md"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={closeMenu}
            >
              {business.secondaryCta.label}
            </Button>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 992px) {
          .desktop-nav { display: flex !important; }
          .desktop-socials { display: flex !important; }
          .desktop-cta { display: block !important; }
          .mobile-hamburger-btn { display: none !important; }
        }
        @media (max-width: 991px) {
          .desktop-nav { display: none !important; }
          .desktop-socials { display: none !important; }
          .desktop-cta { display: none !important; }
          .mobile-hamburger-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
