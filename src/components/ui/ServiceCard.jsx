import React, { useState } from 'react';

/**
 * ServiceCard: elevated layout with top image, hover zoom, and crisp typography.
 */
export default function ServiceCard({ service, onSelect }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: 'var(--color-white)',
        borderRadius: 'var(--radius-card)',
        border: '1px solid var(--color-border)',
        overflow: 'hidden',
        boxShadow: isHovered ? 'var(--shadow-hover)' : 'var(--shadow-resting)',
        transform: isHovered ? 'translateY(-4px)' : 'none',
        transition: 'transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal)',
        borderColor: isHovered ? 'var(--color-primary-border)' : 'var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 10',
          overflow: 'hidden',
          backgroundColor: 'var(--color-surface)',
        }}
      >
        {!imageError && service.image ? (
          <img
            src={service.image}
            alt={service.title}
            referrerPolicy="no-referrer"
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: isHovered ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease',
              opacity: imageLoaded ? 1 : 0,
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-ink-muted)',
              fontSize: '0.875rem',
              fontWeight: 500,
            }}
          >
            {service.title}
          </div>
        )}

        {/* Editorial Index Badge */}
        {service.number && (
          <div
            style={{
              position: 'absolute',
              top: 'var(--space-16)',
              left: 'var(--space-16)',
              backgroundColor: 'rgba(25, 24, 23, 0.75)',
              backdropFilter: 'blur(4px)',
              color: 'var(--color-white)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              padding: '4px 10px',
              borderRadius: '6px',
            }}
          >
            {service.number}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div
        style={{
          padding: 'var(--space-24)',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        {service.highlight && (
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--color-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: 'var(--space-8)',
            }}
          >
            {service.highlight}
          </span>
        )}

        <h3
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            marginBottom: 'var(--space-8)',
            color: 'var(--color-ink)',
          }}
        >
          {service.title}
        </h3>

        <p
          style={{
            fontSize: '0.95rem',
            lineHeight: 1.6,
            color: 'var(--color-ink-muted)',
            marginBottom: 'var(--space-16)',
            flexGrow: 1,
          }}
        >
          {service.description}
        </p>

        {onSelect && (
          <button
            onClick={() => onSelect(service)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--color-primary)',
              marginTop: 'auto',
              paddingTop: 'var(--space-8)',
              borderTop: '1px solid var(--color-border-subtle)',
              textAlign: 'left',
            }}
          >
            Inquire about {service.title} →
          </button>
        )}
      </div>
    </div>
  );
}
