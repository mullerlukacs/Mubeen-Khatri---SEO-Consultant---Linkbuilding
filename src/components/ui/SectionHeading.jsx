import React from 'react';

/**
 * Standardized Section Heading with eyebrow, H2 title, and description.
 * Adheres strictly to the Typography scale and Zero-Pill discipline.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}) {
  const isCenter = align === 'center';

  return (
    <div
      style={{
        textAlign: isCenter ? 'center' : 'left',
        marginBottom: 'var(--space-48)',
        maxWidth: isCenter ? '760px' : '820px',
        marginLeft: isCenter ? 'auto' : '0',
        marginRight: isCenter ? 'auto' : '0',
      }}
      className={`section-header ${className}`}
    >
      {eyebrow && (
        <span className="section-eyebrow">
          {eyebrow}
        </span>
      )}
      {title && (
        <h2
          style={{
            marginBottom: description ? 'var(--space-16)' : '0',
          }}
        >
          {title}
        </h2>
      )}
      {description && (
        <p
          style={{
            fontSize: '1.125rem',
            lineHeight: 'var(--leading-body)',
            color: 'var(--color-ink-muted)',
            margin: isCenter ? '0 auto' : '0',
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
