import { Star, ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react';
import { useStorefront } from './storefront';
import { CURRENCIES, formatCurrency } from '@/data/currency';

export function TrustpilotBar() {
  return (
    <section className="trustpilot-bar" data-testid="section-trustpilot-bar">
      <div className="page-width trustpilot-inner">
        <div className="trustpilot-score">
          <span className="trustpilot-label">Excellent</span>
          <div className="trustpilot-stars" aria-label="5 out of 5 stars">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="tp-star-box">
                <Star size={12} fill="#ffffff" stroke="#ffffff" />
              </span>
            ))}
          </div>
          <span className="trustpilot-rating">4.8 out of 5</span>
          <span className="trustpilot-divider">·</span>
          <span className="trustpilot-count">5,280+ verified reviews</span>
        </div>
      </div>
    </section>
  );
}

export function BrandGuarantees() {
  const { currency } = useStorefront();
  const threshold = formatCurrency(CURRENCIES[currency].freeShippingThreshold, currency);

  const guarantees = [
    {
      icon: <Truck size={20} strokeWidth={1.3} />,
      title: 'Free Express Delivery',
      desc: `Orders over ${threshold} within the UK. Fast worldwide shipping.`,
    },
    {
      icon: <RefreshCw size={20} strokeWidth={1.3} />,
      title: 'Hassle-Free Returns',
      desc: '14-day return policy on all unworn items in original packaging.',
    },
    {
      icon: <Award size={20} strokeWidth={1.3} />,
      title: 'Artisan Quality',
      desc: 'Handcrafted in premium Korean Nidha, Japanese crepe, and georgette.',
    },
    {
      icon: <ShieldCheck size={20} strokeWidth={1.3} />,
      title: 'Secure Checkout',
      desc: 'Encrypted payments via Apple Pay, PayPal, Klarna & Clearpay.',
    },
  ];

  return (
    <section className="brand-guarantees-section" data-testid="section-brand-guarantees">
      <div className="page-width">
        <div className="guarantees-grid">
          {guarantees.map((g, idx) => (
            <div key={idx} className="guarantee-item" data-testid={`guarantee-item-${idx}`}>
              <div className="guarantee-icon-wrap">{g.icon}</div>
              <div className="guarantee-text">
                <div className="guarantee-title">{g.title}</div>
                <div className="guarantee-desc">{g.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
