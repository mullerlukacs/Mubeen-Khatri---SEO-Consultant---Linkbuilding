import React, { useState } from 'react';
import { business } from '../config/business';
import SectionHeading from './ui/SectionHeading';
import Button from './ui/Button';

export default function About() {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <section id="about" className="section">
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-64)',
            alignItems: 'center',
          }}
          className="about-grid"
        >
          {/* Left Column: Image with Subtle Framing */}
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-image)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-resting)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface)',
              aspectRatio: '4 / 3',
            }}
          >
            {!imgError && (
              <img
                src={business.about.image}
                alt={business.shortName}
                referrerPolicy="no-referrer"
                loading="lazy"
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: imgLoaded ? 1 : 0,
                  transition: 'opacity 300ms ease',
                }}
              />
            )}
            
            {/* Subtle caption overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(25, 24, 23, 0.85) 0%, transparent 100%)',
                padding: 'var(--space-24)',
                color: 'var(--color-white)',
              }}
            >
              <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                {business.shortName}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#D6CEC5' }}>
                {business.contact.cityArea}
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Grounded Credentials */}
          <div>
            <SectionHeading
              eyebrow={business.about.eyebrow}
              title={business.about.title}
            />

            <p
              style={{
                fontSize: '1.125rem',
                lineHeight: 'var(--leading-body)',
                color: 'var(--color-ink)',
                marginBottom: 'var(--space-16)',
                fontWeight: 500,
              }}
            >
              {business.about.lead}
            </p>

            <p
              style={{
                fontSize: '1rem',
                lineHeight: 'var(--leading-body)',
                color: 'var(--color-ink-muted)',
                marginBottom: 'var(--space-32)',
              }}
            >
              {business.about.body}
            </p>

            {/* Quiet clean metadata details (Zero-Pill discipline) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 'var(--space-16)',
                paddingTop: 'var(--space-24)',
                borderTop: '1px solid var(--color-border)',
                marginBottom: 'var(--space-32)',
              }}
            >
              {business.about.points.map((pt, idx) => (
                <div key={idx}>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      fontWeight: 600,
                      color: 'var(--color-ink-subtle)',
                      marginBottom: '4px',
                    }}
                  >
                    {pt.label}
                  </div>
                  <div
                    style={{
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: 'var(--color-ink)',
                    }}
                  >
                    {pt.detail}
                  </div>
                </div>
              ))}
            </div>

            <Button
              href={business.mainCta.href}
              target={business.mainCta.target}
              rel={business.mainCta.rel}
              variant="primary"
              size="md"
            >
              {business.mainCta.label}
            </Button>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr 1.15fr !important;
          }
        }
      `}</style>
    </section>
  );
}
