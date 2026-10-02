import React, { useState } from 'react';
import { business } from '../config/business';
import SectionHeading from './ui/SectionHeading';

export default function Faq() {
  const faqData = business.faq;
  const [openIndex, setOpenIndex] = useState(0);

  if (!faqData || !faqData.items || faqData.items.length === 0) {
    return null;
  }

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="section">
      <div className="container" style={{ maxWidth: '880px' }}>
        <SectionHeading
          eyebrow={faqData.eyebrow}
          title={faqData.title}
          align="center"
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-16)',
          }}
        >
          {faqData.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                style={{
                  backgroundColor: 'var(--color-white)',
                  borderRadius: 'var(--radius-card)',
                  border: '1px solid var(--color-border)',
                  overflow: 'hidden',
                  transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
                  borderColor: isOpen ? 'var(--color-primary-border)' : 'var(--color-border)',
                  boxShadow: isOpen ? 'var(--shadow-hover)' : 'var(--shadow-resting)',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    padding: 'var(--space-24)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 'var(--space-16)',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.125rem',
                      fontWeight: 700,
                      color: isOpen ? 'var(--color-primary)' : 'var(--color-ink)',
                      transition: 'color var(--transition-fast)',
                    }}
                  >
                    {item.question}
                  </span>
                  
                  {/* Chevron Icon */}
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: isOpen ? 'var(--color-primary-subtle)' : 'var(--color-secondary)',
                      color: isOpen ? 'var(--color-primary)' : 'var(--color-ink)',
                      flexShrink: 0,
                      transition: 'transform var(--transition-fast), background-color var(--transition-fast)',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 var(--space-24) var(--space-24) var(--space-24)',
                      borderTop: '1px solid var(--color-border-subtle)',
                      paddingTop: 'var(--space-16)',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '1rem',
                        lineHeight: 'var(--leading-body)',
                        color: 'var(--color-ink-muted)',
                      }}
                    >
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
