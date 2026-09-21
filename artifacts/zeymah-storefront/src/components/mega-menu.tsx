import { useState, useRef, useEffect } from 'react';
import { Link } from 'wouter';
import { ChevronDown, ChevronRight, ArrowRight, X } from 'lucide-react';
import { MAIN_NAVIGATION, type NavItem } from '@/data/navigation';
import { CurrencySelector } from './currency-selector';

interface MegaMenuProps {
  onNavigate?: () => void;
}

export function DesktopMegaMenu() {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (id: string, hasMegaMenu: boolean) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (hasMegaMenu) {
      setActiveMenuId(id);
    } else {
      setActiveMenuId(null);
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenuId(null);
    }, 180);
  };

  const activeItem = MAIN_NAVIGATION.find((item) => item.id === activeMenuId);

  return (
    <div
      className="mega-menu-wrapper"
      onMouseLeave={handleMouseLeave}
      data-testid="nav-desktop-mega-menu"
    >
      <nav className="nav-row" aria-label="Main Store Navigation">
        {MAIN_NAVIGATION.map((item) => {
          const isActive = activeMenuId === item.id;
          return (
            <div
              key={item.id}
              className="nav-item-container"
              onMouseEnter={() => handleMouseEnter(item.id, item.hasMegaMenu)}
            >
              <Link
                href={item.href}
                className={`nav-link ${isActive ? 'active' : ''} ${item.id === 'sale' ? 'nav-sale' : ''}`}
                data-testid={`link-nav-${item.id}`}
              >
                <span>{item.label}</span>
                {item.hasMegaMenu && (
                  <ChevronDown
                    size={10}
                    className={`nav-chevron ${isActive ? 'open' : ''}`}
                  />
                )}
              </Link>
            </div>
          );
        })}
      </nav>

      {/* Mega Menu Dropdown Overlay */}
      {activeItem && activeItem.hasMegaMenu && (
        <div
          className="mega-dropdown-panel animate-fade-in"
          onMouseEnter={() => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
          }}
          data-testid={`mega-menu-panel-${activeItem.id}`}
        >
          <div className="mega-dropdown-inner page-width">
            {/* Columns Area */}
            <div className="mega-columns">
              {activeItem.columns?.map((column, colIdx) => (
                <div key={colIdx} className="mega-column">
                  <div className="mega-column-heading">{column.heading}</div>
                  <ul className="mega-column-list">
                    {column.items.map((subItem, itemIdx) => (
                      <li key={itemIdx}>
                        <Link
                          href={subItem.href}
                          className="mega-column-link"
                          onClick={() => setActiveMenuId(null)}
                          data-testid={`link-sub-${subItem.name.toLowerCase().replaceAll(' ', '-')}`}
                        >
                          <span>{subItem.name}</span>
                          {subItem.badge && (
                            <span className="mega-badge">{subItem.badge}</span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Featured Promotional Editorial Card */}
            {activeItem.featuredCard && (
              <div className="mega-featured-card">
                <Link
                  href={activeItem.featuredCard.href}
                  className="mega-featured-image-link"
                  onClick={() => setActiveMenuId(null)}
                >
                  <div className="mega-featured-image-wrap">
                    <img
                      src={activeItem.featuredCard.image}
                      alt={activeItem.featuredCard.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="mega-featured-copy">
                    <div className="mega-featured-title">{activeItem.featuredCard.title}</div>
                    <p className="mega-featured-desc">{activeItem.featuredCard.description}</p>
                    <span className="mega-featured-cta">
                      {activeItem.featuredCard.ctaText}
                      <ArrowRight size={12} style={{ marginLeft: 6 }} />
                    </span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function MobileNavigationDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [expandedId, setExpandedId] = useState<string | null>('abayas');

  const toggleExpand = (id: string) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  return (
    <>
      <div
        className={`drawer-backdrop ${open ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`mobile-menu ${open ? 'open' : ''}`}
        aria-label="Mobile navigation"
        data-testid="drawer-mobile-menu"
      >
        <div className="mobile-menu-header">
          <span className="mobile-menu-title">NAVIGATION</span>
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Close menu"
            data-testid="button-close-mobile-menu"
          >
            <X size={20} strokeWidth={1.3} />
          </button>
        </div>

        <div className="mobile-currency-section">
          <span className="mobile-currency-label">Currency</span>
          <CurrencySelector variant="mobile" />
        </div>

        <nav className="mobile-accordion-nav">
          {MAIN_NAVIGATION.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div key={item.id} className="mobile-nav-group">
                <div className="mobile-nav-top-row">
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="mobile-main-link"
                    data-testid={`link-mobile-${item.id}`}
                  >
                    {item.label}
                  </Link>
                  {item.hasMegaMenu && (
                    <button
                      type="button"
                      className="mobile-expand-btn"
                      onClick={() => toggleExpand(item.id)}
                      aria-label={`Toggle ${item.label} subcategories`}
                    >
                      <ChevronDown
                        size={15}
                        className={`mobile-chevron ${isExpanded ? 'rotated' : ''}`}
                      />
                    </button>
                  )}
                </div>

                {item.hasMegaMenu && isExpanded && (
                  <div className="mobile-sub-list animate-fade-in">
                    {item.columns?.map((col, idx) => (
                      <div key={idx} className="mobile-sub-section">
                        <div className="mobile-sub-heading">{col.heading}</div>
                        {col.items.map((sub, sIdx) => (
                          <Link
                            key={sIdx}
                            href={sub.href}
                            onClick={onClose}
                            className="mobile-sub-link"
                          >
                            <span>{sub.name}</span>
                            {sub.badge && <span className="mega-badge">{sub.badge}</span>}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="mobile-menu-footer">
          <p className="mobile-footer-text">
            Thoughtful modest dressing, crafted with care and delivered worldwide from London.
          </p>
          <div className="mobile-contact-links">
            <a href="tel:02031610087">020 3161 0087</a>
            <span>·</span>
            <a href="mailto:orders@zeymah.com">orders@zeymah.com</a>
          </div>
        </div>
      </aside>
    </>
  );
}
