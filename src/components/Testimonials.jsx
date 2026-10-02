import React from 'react';
import { business } from '../config/business';
import SectionHeading from './ui/SectionHeading';

/**
 * Testimonials: rendered ONLY if real testimonials exist in business.js.
 * Otherwise returns null to omit the section cleanly without filler.
 */
export default function Testimonials() {
  const testimonials = business.testimonials;

  if (!testimonials || !Array.isArray(testimonials) || testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Client Feedback"
          title="Verified Client Experiences"
          align="center"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-32)',
          }}
        >
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--color-white)',
                padding: 'var(--space-32)',
                borderRadius: 'var(--radius-card)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-resting)',
              }}
            >
              <p
                style={{
                  fontStyle: 'italic',
                  marginBottom: 'var(--space-16)',
                  color: 'var(--color-ink)',
                }}
              >
                "{item.quote}"
              </p>
              <div style={{ fontWeight: 600, color: 'var(--color-ink)' }}>
                {item.author}
              </div>
              {item.role && (
                <div style={{ fontSize: '0.85rem', color: 'var(--color-ink-muted)' }}>
                  {item.role}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
