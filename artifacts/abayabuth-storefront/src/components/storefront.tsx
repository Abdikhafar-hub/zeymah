import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
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
  Ruler,
  Search,
  ShoppingBag,
  Trash2,
  UserRound,
  X,
  Youtube,
} from 'lucide-react';
import { catalog, formatPrice, type Product } from '@/data/catalog';

interface CartLine { product: Product; quantity: number; color: string; size?: string; }
interface StorefrontContextValue {
  wishlist: string[];
  cart: CartLine[];
  toggleWishlist: (id: string) => void;
  addToCart: (product: Product, options?: { color?: string; size?: string; quantity?: number }) => void;
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
  if (!context) throw new Error('useStorefront must be used within StorefrontProvider');
  return context;
}

export function StorefrontProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const value = useMemo(() => ({
    wishlist,
    cart,
    toggleWishlist: (id: string) => setWishlist((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]),
    addToCart: (product: Product, options: { color?: string; size?: string; quantity?: number } = {}) => {
      setCart((lines) => {
        const existing = lines.find((line) => line.product.id === product.id && line.color === (options.color ?? product.colors[0].name) && line.size === options.size);
        if (existing) return lines.map((line) => line === existing ? { ...line, quantity: line.quantity + (options.quantity ?? 1) } : line);
        return [...lines, { product, color: options.color ?? product.colors[0].name, size: options.size, quantity: options.quantity ?? 1 }];
      });
      setCartOpen(true);
    },
    updateCart: (id: string, delta: number) => setCart((lines) => lines.map((line) => line.product.id === id ? { ...line, quantity: Math.max(1, line.quantity + delta) } : line)),
    removeFromCart: (id: string) => setCart((lines) => lines.filter((line) => line.product.id !== id)),
    cartOpen,
    setCartOpen,
    searchOpen,
    setSearchOpen,
  }), [cart, cartOpen, searchOpen, wishlist]);

  return <StorefrontContext.Provider value={value}>{children}</StorefrontContext.Provider>;
}

function Logo() {
  return <Link href="/" className="brand" data-testid="link-brand-logo"><em>A</em>BAYABUTH</Link>;
}

function CartButton() {
  const { cart, setCartOpen } = useStorefront();
  const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <button className="icon-button" onClick={() => setCartOpen(true)} aria-label="Open shopping bag" data-testid="button-open-cart">
      <ShoppingBag size={18} strokeWidth={1.4} />
      {quantity > 0 && <span data-testid="text-cart-count" style={{ fontSize: 9, marginLeft: 3 }}>{quantity}</span>}
    </button>
  );
}

function Header() {
  const { setSearchOpen, wishlist } = useStorefront();
  const [, navigate] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    ['NEW ARRIVALS', '/collections/abayas'],
    ['ABAYAS', '/collections/abayas'],
    ['THOBES', '/collections/abayas'],
    ['HIJABS', '/collections/hijabs'],
    ['KIDS', '/collections/abayas'],
    ['ACCESSORIES', '/collections/hijabs'],
    ['GIFTS', '/collections/hijabs'],
    ['TV', '/'],
  ];
  return (
    <>
      <div className="announcement" data-testid="banner-announcement">
        <div className="announcement-inner">
          <span>Free delivery on orders over KSh 18,000</span>
          <span className="announcement-contact"><span>020 3161 0087</span><span>orders@abayabuth.com</span><span>KES KSh</span></span>
        </div>
      </div>
      <header>
        <div className="header-main">
          <Logo />
          <button className="search-bar" onClick={() => setSearchOpen(true)} aria-label="Search AbayaButh" data-testid="button-open-search">
            <span style={{ flex: 1, textAlign: 'left' }}>Search</span><Search size={18} strokeWidth={1.3} />
          </button>
          <div className="header-tools">
            <button className="icon-button" onClick={() => setSearchOpen(true)} aria-label="Search" data-testid="button-mobile-search"><Search size={18} strokeWidth={1.4} /></button>
            <Link href="/collections/hijabs" className="icon-button" aria-label={`Wishlist, ${wishlist.length} items`} data-testid="link-wishlist"><Heart size={18} strokeWidth={1.4} /></Link>
            <button className="icon-button account-button" onClick={() => navigate('/')} aria-label="Account" data-testid="button-account"><UserRound size={18} strokeWidth={1.4} /></button>
            <CartButton />
            <button className="icon-button" onClick={() => setMenuOpen(true)} aria-label="Open menu" data-testid="button-open-menu"><Menu size={20} strokeWidth={1.4} /></button>
          </div>
        </div>
        <nav className="nav-row" aria-label="Main navigation">
          {navItems.map(([label, href]) => <Link href={href} key={label} className="nav-link" data-testid={`link-nav-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}</Link>)}
        </nav>
      </header>
      <div className={`drawer-backdrop ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)} aria-hidden="true" />
      <aside className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-label="Mobile navigation">
        <button className="icon-button" onClick={() => setMenuOpen(false)} aria-label="Close menu" data-testid="button-close-menu"><X size={21} strokeWidth={1.3} /></button>
        <nav>
          {navItems.slice(0, 7).map(([label, href]) => <Link href={href} key={label} onClick={() => setMenuOpen(false)} data-testid={`link-mobile-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}</Link>)}
        </nav>
        <p style={{ position: 'absolute', bottom: 28, color: '#7a8585', fontSize: 11, lineHeight: 1.7 }}>Thoughtful modest dressing, delivered from London to you.</p>
      </aside>
    </>
  );
}

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStorefront();
  const [query, setQuery] = useState('');
  const results = query.trim() ? catalog.filter((item) => `${item.name} ${item.category} ${item.collection}`.toLowerCase().includes(query.toLowerCase())).slice(0, 4) : catalog.filter((item) => item.featured).slice(0, 4);
  return (
    <div className={`search-overlay ${searchOpen ? 'open' : ''}`} aria-hidden={!searchOpen}>
      <div className="search-panel">
        <div className="search-panel-header">
          <Search size={20} strokeWidth={1.3} />
          <input autoFocus={searchOpen} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search abayas, hijabs, gifts..." aria-label="Search products" data-testid="input-search-overlay" />
          <button onClick={() => { setSearchOpen(false); setQuery(''); }} aria-label="Close search" data-testid="button-close-search"><X size={21} strokeWidth={1.3} /></button>
        </div>
        <p className="eyebrow" style={{ marginTop: 24 }}>{query ? 'Search results' : 'Explore the edit'}</p>
        <div className="search-results">
          {results.length > 0 ? results.map((product) => (
            <Link href={`/products/${product.slug}`} className="search-result" onClick={() => setSearchOpen(false)} key={product.id} data-testid={`result-search-${product.id}`}>
              <img src={product.images[0]} alt={product.name} />
              <p data-testid={`text-search-result-${product.id}`}>{product.name}<br /><span style={{ color: '#687375' }}>{formatPrice(product.price)}</span></p>
            </Link>
          )) : <p data-testid="text-search-empty">No pieces found. Try a different search.</p>}
        </div>
      </div>
    </div>
  );
}

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateCart, removeFromCart } = useStorefront();
  const subtotal = cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  return (
    <>
      <div className={`drawer-backdrop ${cartOpen ? 'open' : ''}`} onClick={() => setCartOpen(false)} aria-hidden="true" />
      <aside className={`drawer ${cartOpen ? 'open' : ''}`} aria-label="Shopping bag">
        <div className="drawer-header"><h2>Shopping bag <span style={{ color: '#89908f' }}>({cart.length})</span></h2><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close shopping bag" data-testid="button-close-cart"><X size={20} strokeWidth={1.3} /></button></div>
        <div className="drawer-body">
          {cart.length === 0 ? <div className="empty-state"><ShoppingBag size={30} strokeWidth={1} style={{ margin: '0 auto', color: '#78908d' }} /><h3>Your bag is quiet</h3><p data-testid="text-empty-cart">Discover something beautiful for it.</p><Link href="/collections/abayas" className="button-dark" onClick={() => setCartOpen(false)} data-testid="link-empty-cart-shop">Shop the collection</Link></div> : cart.map((line) => (
            <article className="cart-item" key={line.product.id} data-testid={`item-cart-${line.product.id}`}>
              <img className="cart-item-image" src={line.product.images[0]} alt={line.product.name} data-testid={`img-cart-${line.product.id}`} />
              <div><h3 data-testid={`text-cart-name-${line.product.id}`}>{line.product.name}</h3><p>{line.color}{line.size ? ` · ${line.size}` : ''}</p><div className="cart-controls"><button onClick={() => updateCart(line.product.id, -1)} aria-label="Decrease quantity" data-testid={`button-cart-decrease-${line.product.id}`}><Minus size={12} /></button><span data-testid={`text-cart-quantity-${line.product.id}`}>{line.quantity}</span><button onClick={() => updateCart(line.product.id, 1)} aria-label="Increase quantity" data-testid={`button-cart-increase-${line.product.id}`}><Plus size={12} /></button></div></div>
              <div style={{ textAlign: 'right' }}><p style={{ color: '#3b494b' }}>{formatPrice(line.product.price * line.quantity)}</p><button className="cart-remove" onClick={() => removeFromCart(line.product.id)} aria-label={`Remove ${line.product.name}`} data-testid={`button-remove-cart-${line.product.id}`}><Trash2 size={14} strokeWidth={1.3} /></button></div>
            </article>
          ))}
        </div>
        {cart.length > 0 && <div className="drawer-footer"><div className="subtotal"><span>Subtotal</span><strong data-testid="text-cart-subtotal">{formatPrice(subtotal)}</strong></div><p style={{ color: '#72807e', fontSize: 10, marginBottom: 14 }}>Taxes and delivery calculated at checkout.</p><button className="button-dark" data-testid="button-checkout">Proceed to checkout <ArrowRight size={14} style={{ marginLeft: 10 }} /></button></div>}
      </aside>
    </>
  );
}

export function SiteFooter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (event: React.FormEvent) => { event.preventDefault(); if (email.trim()) setSubmitted(true); };
  return (
    <>
      <section className="newsletter" data-testid="section-newsletter">
        <h2>Stay close to the edit</h2>
        <p>New collections, thoughtful styling and early access, sent occasionally.</p>
        <form className="newsletter-form" onSubmit={handleSubmit}><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Your email address" required aria-label="Email address" data-testid="input-newsletter-email" /><button type="submit" data-testid="button-submit-newsletter">Join us</button></form>
        {submitted && <div className="status-message" data-testid="status-newsletter-success">Thank you — you are on the list.</div>}
      </section>
      <footer className="footer">
        <div className="page-width">
          <div className="footer-grid">
            <div><div className="footer-brand">ABAYABUTH</div><p style={{ maxWidth: 220, marginTop: 16 }}>Traditional modest clothing, considered for the way women dress now.</p><div style={{ display: 'flex', gap: 15, marginTop: 14 }}><a href="https://instagram.com" aria-label="Instagram" data-testid="link-footer-instagram"><Instagram size={15} /></a><a href="https://facebook.com" aria-label="Facebook" data-testid="link-footer-facebook"><Facebook size={15} /></a><a href="https://youtube.com" aria-label="YouTube" data-testid="link-footer-youtube"><Youtube size={15} /></a></div></div>
            <FooterColumn title="Shop" links={[['New Arrivals', '/collections/abayas'], ['Abayas', '/collections/abayas'], ['Hijabs', '/collections/hijabs'], ['Gifts', '/collections/hijabs']]} />
            <FooterColumn title="Customer care" links={[['Contact us', '/'], ['Delivery', '/'], ['Returns', '/'], ['Size guide', '/']]} />
            <FooterColumn title="About" links={[['Our story', '/'], ['Journal', '/'], ['Our stores', '/'], ['FAQs', '/']]} />
            <div><div className="footer-title">Find us</div><p>020 3161 0087<br />orders@abayabuth.com<br /><br />London · Nairobi · Online</p></div>
          </div>
          <div className="footer-bottom"><span>© 2025 AbayaButh. All rights reserved.</span><span>Privacy · Terms · KES KSh</span></div>
        </div>
      </footer>
    </>
  );
}

function FooterColumn({ title, links }: { title: string; links: [string, string][] }) {
  return <div><div className="footer-title">{title}</div>{links.map(([label, href]) => <Link href={href} key={label} data-testid={`link-footer-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}</Link>)}</div>;
}

export function SiteChrome({ children }: { children: ReactNode }) {
  return <div className="site-shell"><Header /><SearchOverlay /><main>{children}</main><SiteFooter /><CartDrawer /></div>;
}

export function Breadcrumbs({ items }: { items: string[] }) {
  return <div className="page-width breadcrumb" data-testid="nav-breadcrumbs"><Link href="/" data-testid="link-breadcrumb-home">Home</Link>{items.map((item, index) => <span key={item}> <span style={{ margin: '0 7px', color: '#b1b9b6' }}>/</span><span data-testid={`text-breadcrumb-${index}`}>{item}</span></span>)}</div>;
}

export function WishlistButton({ productId, large = false }: { productId: string; large?: boolean }) {
  const { wishlist, toggleWishlist } = useStorefront();
  const active = wishlist.includes(productId);
  return <button className={large ? 'detail-wishlist' : `product-wishlist ${active ? 'active' : ''}`} onClick={() => toggleWishlist(productId)} aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'} data-testid={`button-wishlist-${productId}`}><Heart size={large ? 18 : 16} fill={active ? 'currentColor' : 'none'} strokeWidth={1.3} /></button>;
}

export function ProductCard({ product }: { product: Product }) {
  return <article className="product-card" data-testid={`card-product-${product.id}`}>
    <div className="image-frame"><Link href={`/products/${product.slug}`} data-testid={`link-product-image-${product.id}`}><img src={product.images[0]} alt={product.name} loading="lazy" data-testid={`img-product-${product.id}`} /></Link><WishlistButton productId={product.id} />{product.tag && <span className="product-tag" data-testid={`badge-product-${product.id}`}>{product.tag}</span>}</div>
    <div className="product-info"><Link className="product-name" href={`/products/${product.slug}`} data-testid={`link-product-name-${product.id}`}>{product.name}</Link><div className="product-price" data-testid={`text-price-${product.id}`}>{formatPrice(product.price)}{product.compareAtPrice && <s>{formatPrice(product.compareAtPrice)}</s>}</div></div>
  </article>;
}

export function ProductGrid({ products }: { products: Product[] }) {
  return <div className="product-grid" data-testid="grid-products">{products.map((product) => <ProductCard product={product} key={product.id} />)}</div>;
}

export function LoadingGrid() {
  return <div className="product-grid loading-grid" data-testid="status-loading-products">{Array.from({ length: 8 }).map((_, index) => <div className="skeleton" key={index} />)}</div>;
}