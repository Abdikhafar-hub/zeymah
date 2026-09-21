import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { ChevronLeft, ChevronRight, Truck, Gift, Sparkles } from 'lucide-react';
import { useStorefront } from '@/components/storefront';
import { CURRENCIES, formatCurrency } from '@/data/currency';
import { CurrencySelector } from './currency-selector';

export function AnnouncementBar() {
  const { currency } = useStorefront();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const thresholdFormatted = formatCurrency(CURRENCIES[currency].freeShippingThreshold, currency);

  const messages = [
    {
      id: 'free-shipping',
      icon: <Truck size={12} strokeWidth={1.5} className="announcement-icon" />,
      text: `FREE UK STANDARD DELIVERY OVER ${thresholdFormatted} · WORLDWIDE SHIPPING AVAILABLE`,
      link: '/collections/abayas',
    },
    {
      id: 'eid-edit',
      icon: <Sparkles size={12} strokeWidth={1.5} className="announcement-icon" />,
      text: 'NEW ARRIVALS: DISCOVER THE OCCASION & EMBROIDERED EDIT',
      link: '/collections/abayas?category=Occasion+Abayas',
    },
    {
      id: 'gifting',
      icon: <Gift size={12} strokeWidth={1.5} className="announcement-icon" />,
      text: 'COMPLIMENTARY LUXURY PRESENTATION PACKAGING ON ALL ORDERS',
      link: '/collections/hijabs?category=Gifts',
    },
  ];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, messages.length]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + messages.length) % messages.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % messages.length);
  };

  const current = messages[currentIndex];

  return (
    <div
      className="announcement-bar"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      data-testid="banner-announcement"
    >
      <div className="announcement-container">
        {/* Left: Store Contact Information */}
        <div className="announcement-side left">
          <span className="contact-item">London: 020 3161 0087</span>
          <span className="contact-divider">|</span>
          <a href="mailto:orders@zeymah.com" className="contact-link">orders@zeymah.com</a>
        </div>

        {/* Center: Dynamic Rotating Announcement */}
        <div className="announcement-center">
          <button
            type="button"
            className="announcement-nav-btn prev"
            onClick={handlePrev}
            aria-label="Previous announcement"
          >
            <ChevronLeft size={12} />
          </button>

          <Link href={current.link} className="announcement-message" data-testid="text-announcement-message">
            {current.icon}
            <span>{current.text}</span>
          </Link>

          <button
            type="button"
            className="announcement-nav-btn next"
            onClick={handleNext}
            aria-label="Next announcement"
          >
            <ChevronRight size={12} />
          </button>
        </div>

        {/* Right: Currency Selector */}
        <div className="announcement-side right">
          <CurrencySelector variant="header" />
        </div>
      </div>
    </div>
  );
}
