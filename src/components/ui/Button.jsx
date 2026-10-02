import React from 'react';

/**
 * Reusable Button component adhering to Design System tokens.
 * Supports anchor link or native button rendering.
 */
export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  type = 'button',
  target,
  rel,
  className = '',
  disabled = false,
  ...props
}) {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    borderRadius: 'var(--radius-button)',
    fontWeight: 600,
    textDecoration: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    whiteSpace: 'nowrap',
    transition: 'all var(--transition-fast)',
    border: '1px solid transparent',
    letterSpacing: '-0.01em',
  };

  const sizeStyles = {
    sm: { padding: '8px 16px', fontSize: '0.875rem' },
    md: { padding: '12px 24px', fontSize: '1rem' },
    lg: { padding: '16px 32px', fontSize: '1.0625rem' },
  }[size] || { padding: '12px 24px', fontSize: '1rem' };

  const variantStyles = {
    primary: {
      backgroundColor: 'var(--color-primary)',
      color: 'var(--color-white)',
      borderColor: 'var(--color-primary)',
      boxShadow: '0 2px 8px rgba(217, 91, 22, 0.25)',
    },
    secondary: {
      backgroundColor: 'var(--color-white)',
      color: 'var(--color-ink)',
      borderColor: 'var(--color-border)',
      boxShadow: 'var(--shadow-resting)',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--color-ink)',
      borderColor: 'var(--color-ink)',
    },
    subtle: {
      backgroundColor: 'var(--color-surface)',
      color: 'var(--color-ink)',
      borderColor: 'transparent',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--color-ink)',
      borderColor: 'transparent',
    },
  }[variant] || {};

  const combinedStyles = {
    ...baseStyles,
    ...sizeStyles,
    ...variantStyles,
  };

  const handleMouseEnter = (e) => {
    if (disabled) return;
    if (variant === 'primary') {
      e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)';
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 6px 16px rgba(217, 91, 22, 0.35)';
    } else if (variant === 'secondary') {
      e.currentTarget.style.backgroundColor = 'var(--color-secondary-light)';
      e.currentTarget.style.borderColor = 'var(--color-ink-muted)';
      e.currentTarget.style.transform = 'translateY(-2px)';
    } else if (variant === 'outline') {
      e.currentTarget.style.backgroundColor = 'var(--color-ink)';
      e.currentTarget.style.color = 'var(--color-white)';
    } else if (variant === 'subtle') {
      e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
    }
  };

  const handleMouseLeave = (e) => {
    if (disabled) return;
    if (variant === 'primary') {
      e.currentTarget.style.backgroundColor = 'var(--color-primary)';
      e.currentTarget.style.transform = 'none';
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(217, 91, 22, 0.25)';
    } else if (variant === 'secondary') {
      e.currentTarget.style.backgroundColor = 'var(--color-white)';
      e.currentTarget.style.borderColor = 'var(--color-border)';
      e.currentTarget.style.transform = 'none';
    } else if (variant === 'outline') {
      e.currentTarget.style.backgroundColor = 'transparent';
      e.currentTarget.style.color = 'var(--color-ink)';
    } else if (variant === 'subtle') {
      e.currentTarget.style.backgroundColor = 'var(--color-surface)';
    }
  };

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        style={combinedStyles}
        className={`btn btn--${variant} ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={combinedStyles}
      className={`btn btn--${variant} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  );
}
