import { useState } from 'react';
import { Link } from 'wouter';
import { Star, ShoppingBag, Check } from 'lucide-react';
import type { Product } from '@/data/catalog';
import { useStorefront, WishlistButton } from './storefront';
import { formatCurrency } from '@/data/currency';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { currency, addToCart } = useStorefront();
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [justAddedSize, setJustAddedSize] = useState<string | null>(null);

  const activeColor = product.colors[activeColorIndex] || product.colors[0];

  // Image display logic:
  // If hovered and has secondary image, show image[1]
  // Else show color-specific image or image[0]
  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || primaryImage;
  const currentImage = isHovered ? secondaryImage : primaryImage;

  const formattedPrice = formatCurrency(product.price, currency);
  const formattedCompare = product.compareAtPrice
    ? formatCurrency(product.compareAtPrice, currency)
    : null;

  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : null;

  const handleQuickAdd = (size: string) => {
    addToCart(product, {
      color: activeColor.name,
      size,
      quantity: 1,
    });
    setJustAddedSize(size);
    setTimeout(() => {
      setJustAddedSize(null);
      setQuickAddOpen(false);
    }, 1200);
  };

  return (
    <article
      className="product-card-v2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setQuickAddOpen(false);
      }}
      data-testid={`card-product-${product.id}`}
    >
      <div className="product-media-frame">
        <Link href={`/products/${product.slug}`} data-testid={`link-product-image-${product.id}`}>
          <img
            src={currentImage}
            alt={product.name}
            loading="lazy"
            className={`product-img ${isHovered && product.images[1] ? 'flipped' : ''}`}
            data-testid={`img-product-${product.id}`}
          />
        </Link>

        {/* Wishlist Button */}
        <WishlistButton productId={product.id} />

        {/* Badges */}
        <div className="card-badge-stack">
          {product.tag && (
            <span className={`product-badge ${product.tag.toLowerCase()}`}>
              {product.tag}
            </span>
          )}
          {discountPercent && (
            <span className="product-badge sale-discount">-{discountPercent}%</span>
          )}
        </div>

        {/* Quick Add Hover Drawer */}
        <div className={`quick-add-tray ${quickAddOpen || isHovered ? 'visible' : ''}`}>
          {product.sizes && product.sizes.length > 0 ? (
            <div className="quick-size-selector">
              <span className="quick-add-label">Quick Add Size:</span>
              <div className="quick-sizes-row">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`quick-size-btn ${justAddedSize === size ? 'added' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleQuickAdd(size);
                    }}
                    aria-label={`Quick add size ${size}`}
                    data-testid={`quick-add-${product.id}-${size.replace('/', '-')}`}
                  >
                    {justAddedSize === size ? <Check size={11} /> : size}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button
              type="button"
              className="quick-add-btn-single"
              onClick={(e) => {
                e.preventDefault();
                handleQuickAdd('One Size');
              }}
            >
              <ShoppingBag size={13} style={{ marginRight: 6 }} /> Quick Add
            </button>
          )}
        </div>
      </div>

      {/* Card Information */}
      <div className="product-details-frame">
        {/* Color Swatch Dots */}
        {product.colors.length > 1 && (
          <div className="card-swatches-row" aria-label="Product color swatches">
            {product.colors.map((col, idx) => (
              <button
                key={col.name}
                type="button"
                className={`card-swatch-dot ${idx === activeColorIndex ? 'active' : ''}`}
                style={{ backgroundColor: col.value }}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveColorIndex(idx);
                }}
                onMouseEnter={() => setActiveColorIndex(idx)}
                aria-label={`Select ${col.name}`}
                title={col.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="swatches-more">+{product.colors.length - 4}</span>
            )}
          </div>
        )}

        {/* Fabric / Category Tag */}
        <div className="card-category-eyebrow">{product.fabric} · {product.category}</div>

        {/* Product Title */}
        <Link
          href={`/products/${product.slug}`}
          className="product-card-title"
          data-testid={`link-product-name-${product.id}`}
        >
          {product.name}
        </Link>

        {/* Star Rating */}
        <div className="card-stars-row">
          <div className="card-stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={11}
                fill={i < Math.floor(product.rating) ? '#063d42' : 'none'}
                stroke="#063d42"
              />
            ))}
          </div>
          <span className="card-review-count">({product.reviewCount})</span>
        </div>

        {/* Price display with currency */}
        <div className="product-card-pricing" data-testid={`text-price-${product.id}`}>
          <span className="current-price">{formattedPrice}</span>
          {formattedCompare && <s className="compare-price">{formattedCompare}</s>}
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="product-grid-v2" data-testid="grid-products">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
