import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { Link, useLocation } from 'wouter';
import {
  ArrowRight,
  ChevronDown,
  Facebook,
  Heart,
  Instagram,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Trash2,
  UserRound,
  X,
  Youtube,
  Truck,
  Gift,
  Check,
  ShieldCheck,
  Phone,
  Mail,
  Clock,
} from 'lucide-react';
import { catalog, type Product } from '@/data/catalog';
import {
  CURRENCIES,
  DEFAULT_CURRENCY,
  formatCurrency,
  convertFromGbp,
  type CurrencyCode,
} from '@/data/currency';
import { AnnouncementBar } from './announcement-bar';
import { DesktopMegaMenu, MobileNavigationDrawer } from './mega-menu';
import { CurrencySelector } from './currency-selector';
import { ProductCard, ProductGrid } from './product-card';

// Re-export for convenience across pages
export { ProductCard, ProductGrid };

export interface CartLine {
  product: Product;
  quantity: number;
  color: string;
  size?: string;
}

interface StorefrontContextValue {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  wishlist: string[];
  cart: CartLine[];
  toggleWishlist: (id: string) => void;
  addToCart: (
    product: Product,
    options?: { color?: string; size?: string; quantity?: number },
  ) => void;
  updateCart: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
}

const StorefrontContext = createContext<StorefrontContextValue | null>(null);

export function useStorefront() {
  const context = useContext(StorefrontContext);
  if (!context) {
    throw new Error('useStorefront must be used within StorefrontProvider');
  }
  return context;
}

export function StorefrontProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('zeymah_currency') as CurrencyCode;
      if (saved && CURRENCIES[saved]) return saved;
    }
    return DEFAULT_CURRENCY;
  });

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    if (typeof window !== 'undefined') {
      localStorage.setItem('zeymah_currency', code);
    }
  };

  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const value = useMemo(
    () => ({
      currency,
      setCurrency,
      wishlist,
      cart,
      toggleWishlist: (id: string) =>
        setWishlist((items) =>
          items.includes(id) ? items.filter((item) => item !== id) : [...items, id],
        ),
      addToCart: (
        product: Product,
        options: { color?: string; size?: string; quantity?: number } = {},
      ) => {
        setCart((lines) => {
          const selectedColor = options.color ?? product.colors[0]?.name ?? 'Default';
          const existing = lines.find(
            (line) =>
              line.product.id === product.id &&
              line.color === selectedColor &&
              line.size === options.size,
          );
          if (existing) {
            return lines.map((line) =>
              line === existing
                ? { ...line, quantity: line.quantity + (options.quantity ?? 1) }
                : line,
            );
          }
          return [
            ...lines,
            {
              product,
              color: selectedColor,
              size: options.size,
              quantity: options.quantity ?? 1,
            },
          ];
        });
        setCartOpen(true);
      },
      updateCart: (id: string, delta: number) =>
        setCart((lines) =>
          lines.map((line) =>
            line.product.id === id
              ? { ...line, quantity: Math.max(1, line.quantity + delta) }
              : line,
          ),
        ),
      removeFromCart: (id: string) =>
        setCart((lines) => lines.filter((line) => line.product.id !== id)),
      cartOpen,
      setCartOpen,
      searchOpen,
      setSearchOpen,
    }),
    [currency, cart, cartOpen, searchOpen, wishlist],
  );

  return <StorefrontContext.Provider value={value}>{children}</StorefrontContext.Provider>;
}

function Logo() {
  return (
    <Link href="/" className="brand" data-testid="link-brand-logo">
      <em>Z</em>EYMAH
    </Link>
  );
}

function CartButton() {
  const { cart, setCartOpen } = useStorefront();
  const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <button
      type="button"
      className="icon-button header-cart-trigger"
      onClick={() => setCartOpen(true)}
      aria-label={`Shopping bag containing ${quantity} items`}
      data-testid="button-open-cart"
    >
      <div className="cart-icon-wrapper">
        <ShoppingBag size={19} strokeWidth={1.3} />
        {quantity > 0 && (
          <span className="cart-count-badge" data-testid="text-cart-count">
            {quantity}
          </span>
        )}
      </div>
    </button>
  );
}

export function Header() {
  const { setSearchOpen, wishlist } = useStorefront();
  const [, navigate] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 35) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AnnouncementBar />

      <header className={`site-header ${isScrolled ? 'sticky-compact' : ''}`}>
        <div className="header-main">
          {/* Left: Brand Logo & Mobile Toggle */}
          <div className="header-left">
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile navigation"
              data-testid="button-open-mobile-menu"
            >
              <Menu size={22} strokeWidth={1.3} />
            </button>
            <Logo />
          </div>

          {/* Center: Desktop Search Input Box */}
          <div className="header-search-wrap">
            <button
              type="button"
              className="search-bar"
              onClick={() => setSearchOpen(true)}
              aria-label="Search Zeymah collections"
              data-testid="button-open-search"
            >
              <span className="search-placeholder">Search abayas, hijabs, accessories...</span>
              <Search size={16} strokeWidth={1.3} className="search-icon" />
            </button>
          </div>

          {/* Header Action Tools */}
          <div className="header-tools">
            <button
              type="button"
              className="icon-button mobile-search-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              data-testid="button-mobile-search"
            >
              <Search size={19} strokeWidth={1.3} />
            </button>

            <Link
              href="/collections/abayas"
              className="icon-button wishlist-link"
              aria-label={`Wishlist, ${wishlist.length} saved items`}
              data-testid="link-wishlist"
            >
              <Heart size={19} strokeWidth={1.3} />
              {wishlist.length > 0 && (
                <span className="wishlist-badge">{wishlist.length}</span>
              )}
            </Link>

            <button
              type="button"
              className="icon-button account-button"
              onClick={() => navigate('/')}
              aria-label="Customer Account"
              data-testid="button-account"
            >
              <UserRound size={19} strokeWidth={1.3} />
            </button>

            <CartButton />
          </div>
        </div>

        {/* Desktop Mega-Menu Navigation Bar */}
        <DesktopMegaMenu />
      </header>

      {/* Mobile Accordion Navigation Drawer */}
      <MobileNavigationDrawer
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}

export function SearchOverlay() {
  const { searchOpen, setSearchOpen, currency } = useStorefront();
  const [query, setQuery] = useState('');

  const results = query.trim()
    ? catalog
        .filter((item) =>
          `${item.name} ${item.category} ${item.collection} ${item.fabric}`
            .toLowerCase()
            .includes(query.toLowerCase()),
        )
        .slice(0, 6)
    : catalog.filter((item) => item.featured).slice(0, 6);

  const popularSearches = [
    'Open Abayas',
    'Georgette Hijabs',
    'Occasion Abayas',
    'Slip Dresses',
    'Magnetic Pins',
    'Prayer Sets',
  ];

  return (
    <div
      className={`search-overlay ${searchOpen ? 'open' : ''}`}
      aria-hidden={!searchOpen}
      onClick={() => setSearchOpen(false)}
    >
      <div
        className="search-panel animate-slide-down"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="search-panel-header">
          <Search size={20} strokeWidth={1.3} />
          <input
            autoFocus={searchOpen}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search abayas, hijabs, gifts..."
            aria-label="Search products"
            data-testid="input-search-overlay"
          />
          <button
            type="button"
            className="icon-button"
            onClick={() => {
              setSearchOpen(false);
              setQuery('');
            }}
            aria-label="Close search"
            data-testid="button-close-search"
          >
            <X size={20} strokeWidth={1.3} />
          </button>
        </div>

        {/* Popular Search Suggestions */}
        {!query && (
          <div className="search-quick-tags">
            <span className="quick-tags-label">Popular Searches:</span>
            <div className="quick-tags-row">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  className="quick-tag-pill"
                  onClick={() => setQuery(term)}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="search-results-section">
          <p className="eyebrow" style={{ marginTop: 18 }}>
            {query ? `Search results for "${query}"` : 'Featured Pieces'}
          </p>
          <div className="search-results-grid">
            {results.length > 0 ? (
              results.map((product) => (
                <Link
                  href={`/products/${product.slug}`}
                  className="search-result-card"
                  onClick={() => setSearchOpen(false)}
                  key={product.id}
                  data-testid={`result-search-${product.id}`}
                >
                  <img src={product.images[0]} alt={product.name} />
                  <div className="search-result-info">
                    <span className="search-res-cat">{product.category}</span>
                    <h4 data-testid={`text-search-result-${product.id}`}>{product.name}</h4>
                    <span className="search-res-price">
                      {formatCurrency(product.price, currency)}
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <p className="search-empty-note" data-testid="text-search-empty">
                No matching pieces found for "{query}". Try checking your spelling or browse our collections.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateCart, removeFromCart, currency, addToCart } =
    useStorefront();

  const [orderNote, setOrderNote] = useState('');
  const [showNoteField, setShowNoteField] = useState(false);

  const subtotalGbp = cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const formattedSubtotal = formatCurrency(subtotalGbp, currency);

  // Free shipping threshold calculation in local currency
  const thresholdLocal = CURRENCIES[currency].freeShippingThreshold;
  const currentTotalLocal = convertFromGbp(subtotalGbp, currency);
  const remainingLocal = Math.max(0, thresholdLocal - currentTotalLocal);
  const progressPercent = Math.min(100, Math.round((currentTotalLocal / thresholdLocal) * 100));

  // In-cart impulse upsells (accessories not already in cart)
  const upsellItems = catalog
    .filter((p) => p.category === 'Accessories' && !cart.some((c) => c.product.id === p.id))
    .slice(0, 3);

  return (
    <>
      <div
        className={`drawer-backdrop ${cartOpen ? 'open' : ''}`}
        onClick={() => setCartOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`drawer cart-drawer-v2 ${cartOpen ? 'open' : ''}`}
        aria-label="Shopping bag"
        data-testid="drawer-cart"
      >
        <div className="drawer-header">
          <div className="drawer-title-wrap">
            <h2>Shopping Bag</h2>
            <span className="drawer-count">({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
          </div>
          <button
            type="button"
            className="icon-button"
            onClick={() => setCartOpen(false)}
            aria-label="Close shopping bag"
            data-testid="button-close-cart"
          >
            <X size={20} strokeWidth={1.3} />
          </button>
        </div>

        {/* Free Shipping Dynamic Progress Bar */}
        <div className="shipping-progress-banner" data-testid="banner-free-shipping-progress">
          <div className="shipping-progress-message">
            <Truck size={15} className="truck-icon" />
            {remainingLocal > 0 ? (
              <span>
                Add{' '}
                <strong>
                  {CURRENCIES[currency].prefix}
                  {remainingLocal.toFixed(2)}
                </strong>{' '}
                more to qualify for <strong>FREE Delivery</strong>!
              </span>
            ) : (
              <span className="qualified-text">
                🎉 Congratulations! You have qualified for <strong>FREE Delivery</strong>!
              </span>
            )}
          </div>
          <div className="shipping-progress-track">
            <div
              className="shipping-progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="empty-cart-state">
              <ShoppingBag size={40} strokeWidth={1} className="empty-cart-icon" />
              <h3>Your bag is currently empty</h3>
              <p data-testid="text-empty-cart">
                Explore our latest modest edits, elegant abayas, and luxury georgette wraps.
              </p>
              <Link
                href="/collections/abayas"
                className="button-dark"
                onClick={() => setCartOpen(false)}
                data-testid="link-empty-cart-shop"
              >
                Discover Abayas
              </Link>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((line, idx) => {
                const lineTotalFormatted = formatCurrency(line.product.price * line.quantity, currency);
                return (
                  <article
                    className="cart-line-item"
                    key={`${line.product.id}-${line.color}-${line.size}-${idx}`}
                    data-testid={`item-cart-${line.product.id}`}
                  >
                    <img
                      className="cart-item-image"
                      src={line.product.images[0]}
                      alt={line.product.name}
                      data-testid={`img-cart-${line.product.id}`}
                    />
                    <div className="cart-item-details">
                      <h4
                        className="cart-item-name"
                        data-testid={`text-cart-name-${line.product.id}`}
                      >
                        {line.product.name}
                      </h4>
                      <div className="cart-item-options">
                        <span className="cart-opt-color">Shade: {line.color}</span>
                        {line.size && <span className="cart-opt-size">Length: {line.size}"</span>}
                      </div>
                      <div className="cart-item-row">
                        <div className="cart-controls">
                          <button
                            type="button"
                            onClick={() => updateCart(line.product.id, -1)}
                            aria-label="Decrease quantity"
                            data-testid={`button-cart-decrease-${line.product.id}`}
                          >
                            <Minus size={11} />
                          </button>
                          <span data-testid={`text-cart-quantity-${line.product.id}`}>
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateCart(line.product.id, 1)}
                            aria-label="Increase quantity"
                            data-testid={`button-cart-increase-${line.product.id}`}
                          >
                            <Plus size={11} />
                          </button>
                        </div>
                        <div className="cart-item-price">{lineTotalFormatted}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="cart-remove-btn"
                      onClick={() => removeFromCart(line.product.id)}
                      aria-label={`Remove ${line.product.name}`}
                      data-testid={`button-remove-cart-${line.product.id}`}
                    >
                      <Trash2 size={14} strokeWidth={1.3} />
                    </button>
                  </article>
                );
              })}

              {/* In-Cart Impulse Upsells */}
              {upsellItems.length > 0 && (
                <div className="cart-upsells-section">
                  <div className="cart-upsell-heading">Complete Your Order</div>
                  <div className="cart-upsells-tray">
                    {upsellItems.map((item) => (
                      <div key={item.id} className="cart-upsell-item">
                        <img src={item.images[0]} alt={item.name} />
                        <div className="upsell-text">
                          <div className="upsell-title">{item.name}</div>
                          <div className="upsell-price">{formatCurrency(item.price, currency)}</div>
                        </div>
                        <button
                          type="button"
                          className="upsell-add-btn"
                          onClick={() => addToCart(item, { color: item.colors[0]?.name })}
                        >
                          + Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Order Notes / Gift Message Accordion */}
              <div className="order-note-accordion">
                <button
                  type="button"
                  className="order-note-toggle"
                  onClick={() => setShowNoteField(!showNoteField)}
                >
                  <Gift size={13} style={{ marginRight: 6 }} />
                  <span>Add a gift message or order note</span>
                  <ChevronDown
                    size={13}
                    className={`note-chevron ${showNoteField ? 'rotated' : ''}`}
                  />
                </button>
                {showNoteField && (
                  <textarea
                    rows={2}
                    className="order-note-textarea animate-fade-in"
                    placeholder="Enter instructions or a personalized gift message..."
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="subtotal-row">
              <span className="subtotal-label">Subtotal</span>
              <strong className="subtotal-amount" data-testid="text-cart-subtotal">
                {formattedSubtotal}
              </strong>
            </div>
            <p className="shipping-tax-note">
              Taxes calculated at checkout. Free shipping applies above threshold.
            </p>

            <button
              type="button"
              className="button-dark checkout-btn"
              data-testid="button-checkout"
            >
              Proceed to Secure Checkout
              <ArrowRight size={14} style={{ marginLeft: 8 }} />
            </button>

            {/* Payment Method Badges */}
            <div className="payment-badges-row">
              <span className="pay-badge">Apple Pay</span>
              <span className="pay-badge">PayPal</span>
              <span className="pay-badge">Klarna</span>
              <span className="pay-badge">Clearpay</span>
              <span className="pay-badge">Visa</span>
              <span className="pay-badge">Mastercard</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

export function SiteFooter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <footer className="footer" data-testid="site-footer">
      {/* 1. Compact Luxury Newsletter Banner */}
      <div className="footer-newsletter-banner" data-testid="section-newsletter">
        <div className="page-width footer-newsletter-container">
          <div className="footer-newsletter-info">
            <span className="footer-newsletter-pill">10% VIP DISCOUNT</span>
            <div>
              <h3 className="footer-newsletter-heading">Join The Zeymah Circle</h3>
              <p className="footer-newsletter-sub">
                Private collection drops, London studio edits & 10% off your first order.
              </p>
            </div>
          </div>
          <div className="footer-newsletter-action">
            {submitted ? (
              <div className="footer-newsletter-success" data-testid="status-newsletter-success">
                <Check size={15} />
                <span>You're on the list — check your inbox for 10% off.</span>
              </div>
            ) : (
              <form className="footer-newsletter-form" onSubmit={handleSubmit}>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  placeholder="Enter your email address"
                  required
                  aria-label="Email address"
                  data-testid="input-newsletter-email"
                />
                <button type="submit" data-testid="button-submit-newsletter">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Compact Footer Grid */}
      <div className="page-width footer-main">
        <div className="footer-grid">
          {/* Col 1: Brand & Social */}
          <div className="footer-brand-col">
            <Link href="/" className="footer-brand-logo">
              ZEYMAH
            </Link>
            <p className="footer-bio">
              Refined modest wear crafted for modern living. Designed in London, loved worldwide.
            </p>
            <div className="footer-trustpilot-badge">
              <span className="trust-stars">★★★★★</span>
              <span className="trust-score"><strong>4.8</strong> · 3,200+ Reviews</span>
            </div>
            <div className="footer-social-links" aria-label="Social links">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <Instagram size={14} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                <Facebook size={14} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                <Youtube size={14} />
              </a>
            </div>
          </div>

          {/* Col 2: Shop Collections */}
          <FooterColumn
            title="Collections"
            links={[
              ['New In Arrivals', '/collections/abayas?sort=Newest'],
              ['All Abayas', '/collections/abayas'],
              ['Occasion Abayas', '/collections/abayas?category=Occasion+Abayas'],
              ['Open Abayas', '/collections/abayas?category=Open+Abayas'],
              ['Luxury Hijabs', '/collections/hijabs'],
              ['Modest Dresses', '/collections/abayas?category=Modest+Dresses'],
              ['Sale Edit', '/collections/abayas?tag=Sale'],
            ]}
          />

          {/* Col 3: Client Services */}
          <FooterColumn
            title="Client Care"
            links={[
              ['Delivery & Shipping', '/'],
              ['Returns & Portal', '/'],
              ['Size & Height Guide', '/#size-guide'],
              ['Help & FAQs', '/'],
              ['Our Story & Philosophy', '/'],
              ['Contact Support', '/'],
            ]}
          />

          {/* Col 4: London Studio & Currency */}
          <div className="footer-contact-col">
            <div className="footer-title">London Studio</div>
            <ul className="footer-contact-list">
              <li>
                <Phone size={13} className="footer-icon" />
                <span>020 3161 0087</span>
              </li>
              <li>
                <Mail size={13} className="footer-icon" />
                <span>orders@zeymah.com</span>
              </li>
              <li>
                <Clock size={13} className="footer-icon" />
                <span>Mon – Fri: 9:00am – 5:30pm GMT</span>
              </li>
            </ul>

            <div className="footer-currency-control">
              <span className="currency-label">Store Currency</span>
              <CurrencySelector variant="footer" />
            </div>
          </div>
        </div>

        {/* 3. Bottom Legal & Payment Badges */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            © {new Date().getFullYear()} Zeymah Limited · London, UK. All rights reserved.
          </div>
          <div className="footer-bottom-payment-badges">
            <span className="footer-pay-chip">Apple Pay</span>
            <span className="footer-pay-chip">PayPal</span>
            <span className="footer-pay-chip">Klarna</span>
            <span className="footer-pay-chip">Clearpay</span>
            <span className="footer-pay-chip">Visa</span>
            <span className="footer-pay-chip">Mastercard</span>
          </div>
          <div className="footer-legal-links">
            <Link href="/">Privacy Policy</Link>
            <span>·</span>
            <Link href="/">Terms</Link>
            <span>·</span>
            <Link href="/">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div className="footer-nav-col">
      <div className="footer-title">{title}</div>
      <ul className="footer-links-list">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link
              href={href}
              className="footer-link"
              data-testid={`link-footer-${label.toLowerCase().replaceAll(' ', '-')}`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <Header />
      <SearchOverlay />
      <main>{children}</main>
      <SiteFooter />
      <CartDrawer />
    </div>
  );
}

export function Breadcrumbs({ items }: { items: string[] }) {
  return (
    <nav className="page-width breadcrumb" aria-label="Breadcrumb" data-testid="nav-breadcrumbs">
      <Link href="/" data-testid="link-breadcrumb-home">
        Home
      </Link>
      {items.map((item, index) => (
        <span key={item} className="breadcrumb-item">
          <span className="breadcrumb-sep">/</span>
          <span data-testid={`text-breadcrumb-${index}`}>{item}</span>
        </span>
      ))}
    </nav>
  );
}

export function WishlistButton({
  productId,
  large = false,
}: {
  productId: string;
  large?: boolean;
}) {
  const { wishlist, toggleWishlist } = useStorefront();
  const active = wishlist.includes(productId);
  return (
    <button
      type="button"
      className={large ? 'detail-wishlist' : `product-wishlist ${active ? 'active' : ''}`}
      onClick={() => toggleWishlist(productId)}
      aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
      data-testid={`button-wishlist-${productId}`}
    >
      <Heart
        size={large ? 18 : 15}
        fill={active ? 'currentColor' : 'none'}
        strokeWidth={1.3}
      />
    </button>
  );
}

export function LoadingGrid() {
  return (
    <div className="product-grid-v2 loading-grid" data-testid="status-loading-products">
      {Array.from({ length: 8 }).map((_, index) => (
        <div className="skeleton-card" key={index} />
      ))}
    </div>
  );
}