import { useState } from 'react';
import {
  ChevronDown,
  Heart,
  Minus,
  Plus,
  Ruler,
  Star,
  Check,
  Maximize2,
  X,
  Truck,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Link, useParams } from 'wouter';
import { catalog, type Product } from '@/data/catalog';
import {
  Breadcrumbs,
  useStorefront,
  WishlistButton,
} from '@/components/storefront';
import { ProductGrid } from '@/components/product-card';
import { SizeGuideModal } from '@/components/size-guide-modal';
import { InstallmentWidget } from '@/components/installment-widget';
import { CountdownTimer } from '@/components/countdown-timer';
import { ReviewsSection } from '@/components/reviews-section';
import { formatCurrency } from '@/data/currency';

export default function ProductPage() {
  const params = useParams<{ slug?: string }>();
  const product = catalog.find((item) => item.slug === params.slug) ?? catalog[0];
  const { addToCart, currency } = useStorefront();

  // State
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[1] || product.sizes?.[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [bundleAdded, setBundleAdded] = useState(false);

  const isAbaya = product.collection === 'Abayas';

  const handleAdd = () => {
    if (!product.stock) return;
    addToCart(product, {
      color: selectedColor.name,
      size: selectedSize,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2400);
  };

  // Cross-sell complementary bundle
  const bundleItemIds = product.frequentlyBoughtWith || [];
  const bundleItems = catalog.filter((p) => bundleItemIds.includes(p.id));

  const handleAddBundle = () => {
    // Add main product
    addToCart(product, {
      color: selectedColor.name,
      size: selectedSize,
      quantity: 1,
    });
    // Add bundle items
    bundleItems.forEach((bItem) => {
      addToCart(bItem, {
        color: bItem.colors[0]?.name,
        size: bItem.sizes?.[0],
        quantity: 1,
      });
    });
    setBundleAdded(true);
    setTimeout(() => setBundleAdded(false), 2600);
  };

  const bundleTotalPriceGbp =
    product.price + bundleItems.reduce((sum, item) => sum + item.price, 0);

  const related = catalog
    .filter((item) => item.collection === product.collection && item.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <Breadcrumbs items={['Collections', product.collection, product.name]} />

      <section className="page-width pdp-main-section" data-testid="section-product-detail">
        <div className="pdp-layout-grid">
          {/* Media Gallery with Vertical Thumbnails & Lightbox Zoom */}
          <div className="pdp-gallery-column" data-testid="gallery-product">
            {/* Desktop Vertical Thumbnail Rail */}
            <div className="pdp-thumbnails-rail">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`pdp-thumb-btn ${idx === selectedImageIndex ? 'active' : ''}`}
                  onClick={() => setSelectedImageIndex(idx)}
                  onMouseEnter={() => setSelectedImageIndex(idx)}
                  aria-label={`View image ${idx + 1}`}
                >
                  <img src={img} alt={`${product.name} angle ${idx + 1}`} />
                </button>
              ))}
            </div>

            {/* Main Stage Image */}
            <div className="pdp-main-image-stage">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="pdp-main-image"
                data-testid={`img-product-gallery-${selectedImageIndex}`}
              />
              <button
                type="button"
                className="lightbox-zoom-btn"
                onClick={() => setLightboxOpen(true)}
                aria-label="Enlarge image"
                data-testid="button-lightbox-zoom"
              >
                <Maximize2 size={16} />
              </button>

              {/* Mobile swipe indicator dots */}
              <div className="pdp-mobile-dots">
                {product.images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`mobile-dot ${idx === selectedImageIndex ? 'active' : ''}`}
                    onClick={() => setSelectedImageIndex(idx)}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Product Purchasing Box & Information */}
          <div className="pdp-info-column">
            <div className="pdp-eyebrow">
              {product.fabric} · {product.category}
            </div>

            <h1 className="pdp-title" data-testid="text-product-title">
              {product.name}
            </h1>

            {/* Ratings Bar */}
            <div className="pdp-stars-row">
              <div className="pdp-stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < Math.floor(product.rating) ? '#063d42' : 'none'}
                    stroke="#063d42"
                  />
                ))}
              </div>
              <span className="pdp-review-summary">
                {product.rating.toFixed(1)} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price with Currency */}
            <div className="pdp-price-row" data-testid="text-product-price">
              <span className="pdp-current-price">
                {formatCurrency(product.price, currency)}
              </span>
              {product.compareAtPrice && (
                <s className="pdp-compare-price">
                  {formatCurrency(product.compareAtPrice, currency)}
                </s>
              )}
              {product.tag && (
                <span className={`pdp-badge ${product.tag.toLowerCase()}`}>
                  {product.tag}
                </span>
              )}
            </div>

            {/* Klarna & Clearpay Installments */}
            <InstallmentWidget priceInGbp={product.price} />

            {/* Live Same-Day Dispatch Countdown */}
            <CountdownTimer cutoffHourLondon={15} />

            {/* Color Swatches */}
            <div className="pdp-variant-block">
              <div className="pdp-label-row">
                <span>Shade: <strong>{selectedColor.name}</strong></span>
              </div>
              <div className="pdp-swatches-grid" role="radiogroup" aria-label="Select shade">
                {product.colors.map((color) => {
                  const isSelected = selectedColor.name === color.name;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      className={`pdp-swatch-circle ${isSelected ? 'selected' : ''}`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setSelectedColor(color)}
                      aria-label={color.name}
                      aria-pressed={isSelected}
                      title={color.name}
                      data-testid={`button-color-${color.name.toLowerCase().replaceAll(' ', '-')}`}
                    >
                      {isSelected && <Check size={12} className="swatch-check" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size / Length Selector & Height Guide Link */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="pdp-variant-block">
                <div className="pdp-label-row">
                  <span>
                    {isAbaya ? 'Length (Inches): ' : 'Size: '}
                    <strong>{selectedSize}</strong>
                  </span>
                  {isAbaya && (
                    <button
                      type="button"
                      className="pdp-guide-trigger"
                      onClick={() => setSizeGuideOpen(true)}
                      data-testid="button-size-guide"
                    >
                      <Ruler size={13} strokeWidth={1.3} style={{ marginRight: 4 }} />
                      Size & Height Guide
                    </button>
                  )}
                </div>

                <div className="pdp-sizes-grid" role="radiogroup" aria-label="Select size">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        className={`pdp-size-btn ${isSelected ? 'selected' : ''}`}
                        onClick={() => setSelectedSize(size)}
                        aria-pressed={isSelected}
                        data-testid={`button-size-${size.replace('/', '-')}`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Low Stock Indicator */}
            {product.stock <= 10 && product.stock > 0 && (
              <div className="low-stock-alert">
                <Sparkles size={13} className="text-amber" />
                <span>Low stock: Only {product.stock} pieces remaining in this edit.</span>
              </div>
            )}

            {/* Quantity and Primary Add to Bag Action */}
            <div className="pdp-action-row">
              <div className="pdp-quantity-stepper">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  data-testid="button-product-decrease"
                >
                  <Minus size={13} />
                </button>
                <span data-testid="text-product-quantity">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  data-testid="button-product-increase"
                >
                  <Plus size={13} />
                </button>
              </div>

              <button
                type="button"
                className="button-dark pdp-add-btn"
                onClick={handleAdd}
                disabled={product.stock <= 0}
                data-testid="button-add-to-bag"
              >
                {product.stock <= 0 ? 'Sold Out' : added ? '✓ Added To Bag' : 'Add To Bag'}
              </button>

              <WishlistButton productId={product.id} large />
            </div>

            {/* Guaranteed Services Summary */}
            <div className="pdp-perks-strip">
              <div className="perk-item">
                <Truck size={14} className="perk-icon" />
                <span>Free UK standard delivery over £70</span>
              </div>
              <div className="perk-item">
                <ShieldCheck size={14} className="perk-icon" />
                <span>14-day return window & express exchanges</span>
              </div>
            </div>

            {/* 4 Structured Collapsible Product Accordions */}
            <div className="pdp-accordions-group">
              <details className="pdp-accordion-item" open>
                <summary className="pdp-accordion-header">
                  <span>Product Overview & Silhouette</span>
                  <ChevronDown size={14} className="accordion-chevron" />
                </summary>
                <div className="pdp-accordion-content" data-testid="text-product-description">
                  <p>{product.description}</p>
                  <ul className="pdp-details-bullets">
                    {product.details.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </details>

              <details className="pdp-accordion-item">
                <summary className="pdp-accordion-header">
                  <span>Size, Length & Height Fit Guide</span>
                  <ChevronDown size={14} className="accordion-chevron" />
                </summary>
                <div className="pdp-accordion-content">
                  <p>
                    All Zeymah abayas are tailored with a relaxed, generous silhouette across the bust and body. The size represents the exact garment length from high-shoulder to hem:
                  </p>
                  <ul className="pdp-details-bullets">
                    <li><strong>Length 52:</strong> Ideal for heights 5'0" – 5'2" (152–158 cm)</li>
                    <li><strong>Length 54:</strong> Ideal for heights 5'3" – 5'4" (160–163 cm)</li>
                    <li><strong>Length 56:</strong> Ideal for heights 5'5" – 5'6" (165–168 cm)</li>
                    <li><strong>Length 58:</strong> Ideal for heights 5'7" – 5'8" (170–173 cm)</li>
                    <li><strong>Length 60:</strong> Ideal for heights 5'9" – 5'11" (175–180 cm)</li>
                  </ul>
                  <button
                    type="button"
                    className="button-light-sm"
                    onClick={() => setSizeGuideOpen(true)}
                    style={{ marginTop: 8 }}
                  >
                    Open Interactive Size Calculator
                  </button>
                </div>
              </details>

              <details className="pdp-accordion-item">
                <summary className="pdp-accordion-header">
                  <span>Fabric Composition & Artisan Care</span>
                  <ChevronDown size={14} className="accordion-chevron" />
                </summary>
                <div className="pdp-accordion-content">
                  <p>
                    <strong>Fabric:</strong> 100% Premium {product.fabric}
                  </p>
                  <p>{product.careInstructions}</p>
                  <p className="subtle-note">
                    Handle with care. Steam lightly to refresh drapes. Store hung on a padded or velvet hanger to maintain shape.
                  </p>
                </div>
              </details>

              <details className="pdp-accordion-item">
                <summary className="pdp-accordion-header">
                  <span>Worldwide Delivery & Hassle-Free Returns</span>
                  <ChevronDown size={14} className="accordion-chevron" />
                </summary>
                <div className="pdp-accordion-content">
                  <p>
                    <strong>United Kingdom:</strong> Complimentary standard tracked shipping on orders over £70 (2–3 working days). Express next-day dispatch available at checkout.
                  </p>
                  <p>
                    <strong>International:</strong> Tracked DHL Express shipping available worldwide to the US, Europe, GCC (UAE, Saudi Arabia, Qatar), and Australia.
                  </p>
                  <p>
                    <strong>Returns:</strong> We accept returns for unworn pieces with all original tags attached within 14 days of delivery.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Bought Together / Complete The Look Bundle */}
      {bundleItems.length > 0 && (
        <section className="page-width pdp-bundle-section" data-testid="section-complete-the-look">
          <div className="section-heading" style={{ marginBottom: 25, textAlign: 'left' }}>
            <div className="eyebrow" style={{ color: '#71817e' }}>Complete The Look</div>
            <h2>Frequently Styled Together</h2>
          </div>

          <div className="bundle-box">
            <div className="bundle-products-row">
              {/* Main Product */}
              <div className="bundle-item main">
                <img src={product.images[0]} alt={product.name} />
                <div className="bundle-item-info">
                  <span className="bundle-tag">This Piece</span>
                  <h4>{product.name}</h4>
                  <span className="bundle-price">{formatCurrency(product.price, currency)}</span>
                </div>
              </div>

              <span className="bundle-plus">+</span>

              {/* Complementary Items */}
              {bundleItems.map((bItem) => (
                <div key={bItem.id} className="bundle-item">
                  <img src={bItem.images[0]} alt={bItem.name} />
                  <div className="bundle-item-info">
                    <h4>{bItem.name}</h4>
                    <span className="bundle-price">{formatCurrency(bItem.price, currency)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bundle-summary-box">
              <div className="bundle-total-label">Combined Bundle Total:</div>
              <div className="bundle-total-price">
                {formatCurrency(bundleTotalPriceGbp, currency)}
              </div>
              <button
                type="button"
                className="button-dark bundle-add-btn"
                onClick={handleAddBundle}
              >
                {bundleAdded ? '✓ Added Complete Look To Bag' : 'Add Complete Look To Bag'}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Verified Customer Reviews Section */}
      <div className="page-width">
        <ReviewsSection
          productName={product.name}
          rating={product.rating}
          reviewCount={product.reviewCount}
          reviews={product.reviews}
        />
      </div>

      {/* Related Products Section */}
      <section className="section page-width related-section" data-testid="section-related-products">
        <div className="section-heading">
          <div className="eyebrow" style={{ color: '#71817e' }}>Thoughtfully Paired</div>
          <h2>You May Also Like</h2>
        </div>
        <ProductGrid products={related} />
      </section>

      {/* Fullscreen Media Lightbox Zoom Modal */}
      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={() => setLightboxOpen(false)}>
          <button
            type="button"
            className="lightbox-close-btn"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close zoom"
          >
            <X size={24} />
          </button>
          <img
            src={product.images[selectedImageIndex] || product.images[0]}
            alt={product.name}
            className="lightbox-img animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Size & Height Guide Modal */}
      <SizeGuideModal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </>
  );
}