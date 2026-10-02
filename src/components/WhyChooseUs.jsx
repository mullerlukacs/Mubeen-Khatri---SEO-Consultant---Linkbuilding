import React from 'react';
import { business } from '../config/business';
import SectionHeading from './ui/SectionHeading';

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="section section--alt">
      <div className="container">
        <SectionHeading
          eyebrow={business.whyChooseUs.eyebrow}
          title={business.whyChooseUs.title}
          align="center"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'var(--space-24)',
          }}
          className="why-grid"
        >
          {business.whyChooseUs.points.map((item) => (
            <div
              key={item.number}
              style={{
                backgroundColor: 'var(--color-white)',
                padding: 'var(--space-32)',
                borderRadius: 'var(--radius-card)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-resting)',
                transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'var(--shadow-resting)';
              }}
            >
              {/* Natural Editorial Numbering */}
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: 'var(--color-primary)',
                  marginBottom: 'var(--space-16)',
                  letterSpacing: '-0.02em',
                }}
              >
                {item.number}
              </div>

              <h3
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  marginBottom: 'var(--space-12)',
                  color: 'var(--color-ink)',
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  fontSize: '0.95rem',
                  lineHeight: 'var(--leading-body)',
                  color: 'var(--color-ink-muted)',
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .why-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
