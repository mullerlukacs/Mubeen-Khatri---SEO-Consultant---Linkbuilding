import React, { useState, useEffect } from 'react';
import SectionHeading from './ui/SectionHeading';
import Button from './ui/Button';
import { getAddons, DEFAULT_ADDONS } from '../firebase/addons';

export default function Addons({ onSelectAddon }) {
  const [addons, setAddons] = useState(DEFAULT_ADDONS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAddons().then((data) => {
      if (data && data.length > 0) {
        setAddons(data.filter((a) => a.isActive));
      }
      setLoading(false);
    });
  }, []);

  if (addons.length === 0) return null;

  return (
    <section id="addons" className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Specialized Addons"
          title="Enhance Your Organic Visibility with Custom Add-ons"
          description="Modular technical, speed, and link auditing enhancements tailored to accelerate your search performance."
          align="center"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-24)',
          }}
          className="addons-grid"
        >
          {addons.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: 'var(--color-white)',
                borderRadius: 'var(--radius-card)',
                border: '1px solid var(--color-border)',
                padding: 'var(--space-32)',
                boxShadow: 'var(--shadow-resting)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                e.currentTarget.style.borderColor = 'var(--color-primary-border)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'var(--shadow-resting)';
                e.currentTarget.style.borderColor = 'var(--color-border)';
              }}
            >
              {/* Category Badge & Time */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 'var(--space-16)',
                }}
              >
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--color-primary)',
                    backgroundColor: 'var(--color-primary-subtle)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                  }}
                >
                  {item.category}
                </span>

                {item.deliveryTime && (
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-ink-subtle)' }}>
                    ⏱ {item.deliveryTime}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: 'var(--color-ink)',
                  marginBottom: 'var(--space-12)',
                }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: '0.95rem',
                  lineHeight: 'var(--leading-body)',
                  color: 'var(--color-ink-muted)',
                  marginBottom: 'var(--space-24)',
                  flexGrow: 1,
                }}
              >
                {item.description}
              </p>

              {/* Price & Action */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: 'var(--space-16)',
                  borderTop: '1px solid var(--color-border-subtle)',
                }}
              >
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-ink)' }}>
                  {item.price || 'Flexible Quote'}
                </span>

                <Button
                  onClick={() => onSelectAddon && onSelectAddon(item)}
                  variant="subtle"
                  size="sm"
                >
                  Select Add-on →
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
