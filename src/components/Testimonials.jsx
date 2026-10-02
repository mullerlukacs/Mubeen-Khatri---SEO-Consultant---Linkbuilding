import React from 'react';
import { business } from '../config/business';
import SectionHeading from './ui/SectionHeading';
import Button from './ui/Button';

/**
 * Google My Business Reviews & Rating Showcase Component
 * Native, clean Google verified reviews with direct review actions.
 */
export default function Testimonials() {
  const gmb = business.gmb;
  const testimonials = business.testimonials;

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section id="reviews" className="section">
      <div className="container">
        {/* Section Header */}
        <SectionHeading
          eyebrow="Google My Business Reviews"
          title="Verified Client Reviews on Google Maps"
          description="Direct feedback from clients and students who have consulted or trained with Mubeen Khatri in Hyderabad."
          align="center"
        />

        {/* Google Trust & Rating Overview Banner */}
        <div
          style={{
            backgroundColor: 'var(--color-white)',
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--color-border)',
            padding: 'var(--space-32)',
            boxShadow: 'var(--shadow-resting)',
            marginBottom: 'var(--space-48)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-24)',
          }}
          className="google-trust-banner"
        >
          {/* Left: Google Brand & Stars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-16)' }}>
            {/* Google "G" Icon */}
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'var(--color-secondary-light)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: 'var(--color-ink)',
                    lineHeight: 1,
                  }}
                >
                  {gmb?.rating ? gmb.rating.toFixed(1) : '5.0'}
                </span>

                {/* 5 Stars */}
                <div style={{ display: 'flex', gap: '2px', color: '#F59E0B' }}>
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
              </div>

              <div
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-ink-muted)',
                  marginTop: '4px',
                }}
              >
                Verified Google Business rating · Hyderabad, Sindh
              </div>
            </div>
          </div>

          {/* Right: Direct Actions */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-12)' }}>
            <Button
              href={gmb?.writeReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="sm"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              Write a Review
            </Button>

            <Button
              href={gmb?.url}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="sm"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
              </svg>
              View on Google Maps
            </Button>
          </div>
        </div>

        {/* Verified Native Google Review Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-24)',
          }}
          className="reviews-grid"
        >
          {testimonials.map((review) => (
            <div
              key={review.id}
              style={{
                backgroundColor: 'var(--color-white)',
                borderRadius: 'var(--radius-card)',
                border: '1px solid var(--color-border)',
                padding: 'var(--space-32)',
                boxShadow: 'var(--shadow-resting)',
                display: 'flex',
                flexDirection: 'column',
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
              {/* Review Header: User Avatar + Stars */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 'var(--space-16)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {/* User Avatar Circle */}
                  <div
                    style={{
                      position: 'relative',
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-surface)',
                      color: 'var(--color-primary)',
                      fontWeight: 700,
                      fontSize: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {review.author.charAt(0)}
                    {/* Mini Google "G" Badge on Avatar */}
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-2px',
                        right: '-2px',
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        backgroundColor: '#FFFFFF',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                    </span>
                  </div>

                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-ink)' }}>
                      {review.author}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-ink-subtle)' }}>
                      {review.location}
                    </div>
                  </div>
                </div>

                {/* 5 Stars */}
                <div style={{ display: 'flex', gap: '2px', color: '#F59E0B' }}>
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <p
                style={{
                  fontSize: '0.975rem',
                  lineHeight: 'var(--leading-body)',
                  color: 'var(--color-ink)',
                  marginBottom: 'var(--space-16)',
                  flexGrow: 1,
                }}
              >
                "{review.text}"
              </p>

              {/* Review Footer: Verified Tag + Service Tag */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: 'var(--space-12)',
                  borderTop: '1px solid var(--color-border-subtle)',
                  fontSize: '0.8rem',
                  color: 'var(--color-ink-muted)',
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#2E7D32', fontWeight: 600 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Verified Google Review
                </span>

                {review.serviceTag && (
                  <span style={{ color: 'var(--color-ink-subtle)' }}>
                    {review.serviceTag}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action */}
        <div
          style={{
            marginTop: 'var(--space-32)',
            textAlign: 'center',
            fontSize: '0.95rem',
            color: 'var(--color-ink-muted)',
          }}
        >
          Have you worked with Mubeen Khatri?{' '}
          <a
            href={gmb?.writeReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--color-primary)',
              fontWeight: 600,
              textDecoration: 'underline',
            }}
          >
            Leave a review on Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
