import React, { useState } from 'react';
import { business } from '../config/business';
import Button from './ui/Button';

export default function Hero() {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '120px',
        paddingBottom: '80px',
        backgroundColor: '#1E1D1B',
        overflow: 'hidden',
      }}
    >
      {/* Background Image with Single Tonal Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
        }}
      >
        <img
          src={business.images.hero}
          alt={business.name}
          referrerPolicy="no-referrer"
          onLoad={() => setImgLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 40%',
            opacity: imgLoaded ? 0.38 : 0,
            transition: 'opacity 500ms ease',
          }}
        />
        {/* Measured gradient scrim for WCAG AA readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(20, 19, 18, 0.94) 0%, rgba(25, 24, 23, 0.86) 60%, rgba(35, 30, 26, 0.78) 100%)',
          }}
        />
      </div>

      {/* Hero Content */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div
          style={{
            maxWidth: '820px',
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: 'var(--text-eyebrow)',
              letterSpacing: 'var(--tracking-eyebrow)',
              textTransform: 'uppercase',
              fontWeight: 700,
              color: '#F48E55',
              marginBottom: 'var(--space-24)',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary)',
              }}
            />
            {business.hero.eyebrow}
          </div>

          {/* Headline */}
          <h1
            style={{
              color: 'var(--color-white)',
              marginBottom: 'var(--space-24)',
              lineHeight: 1.12,
              fontWeight: 800,
            }}
          >
            {business.hero.headline}
          </h1>

          {/* Supporting Text */}
          <p
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
              lineHeight: 1.6,
              color: '#DDD6CE',
              marginBottom: 'var(--space-48)',
              maxWidth: '62ch',
            }}
          >
            {business.hero.supportingText}
          </p>

          {/* CTAs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-16)',
              marginBottom: 'var(--space-48)',
            }}
          >
            <Button
              href={business.mainCta.href}
              target={business.mainCta.target}
              rel={business.mainCta.rel}
              variant="primary"
              size="lg"
            >
              {/* WhatsApp Icon */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              {business.mainCta.label}
            </Button>

            <Button
              href={business.secondaryCta.href}
              variant="secondary"
              size="lg"
            >
              {business.secondaryCta.label}
            </Button>
          </div>

          {/* Quiet Trust Line */}
          {business.hero.trustIndicator && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: '#B0A89F',
                fontSize: '0.9rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                paddingTop: 'var(--space-24)',
                maxWidth: '680px',
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: '#F48E55', flexShrink: 0 }}
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>{business.hero.trustIndicator}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
