import { useState } from 'react';
import { ChevronDown, Heart, Minus, Plus, Ruler } from 'lucide-react';
import { Link, useParams } from 'wouter';
import { catalog, formatPrice } from '@/data/catalog';
import { Breadcrumbs, ProductGrid, useStorefront, WishlistButton } from '@/components/storefront';

export default function ProductPage() {
  const params = useParams<{ slug?: string }>();
  const product = catalog.find((item) => item.slug === params.slug) ?? catalog[0];
  const { addToCart } = useStorefront();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[1] ?? '');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!product.stock) return;
    addToCart(product, { color: selectedColor.name, size: selectedSize || undefined, quantity });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2400);
  };
  const related = catalog.filter((item) => item.collection === product.collection && item.id !== product.id).slice(0, 4);
  return (
    <>
      <Breadcrumbs items={['Abayas', product.collection, product.name]} />
      <section className="page-width product-detail" data-testid="section-product-detail">
        <div className="product-detail-layout">
          <div className="gallery" data-testid="gallery-product">
            {product.images.map((image, index) => <div className="image-frame" key={image + index}><img src={image} alt={`${product.name}, view ${index + 1}`} data-testid={`img-product-gallery-${index}`} /></div>)}
          </div>
          <div className="detail-info">
            <div className="eyebrow" style={{ color: '#768480', marginBottom: 12 }}>{product.category}</div>
            <h1 data-testid="text-product-title">{product.name}</h1>
            <div className="detail-price" data-testid="text-product-price">{formatPrice(product.price)}{product.compareAtPrice && <s style={{ marginLeft: 8, color: '#98a2a1' }}>{formatPrice(product.compareAtPrice)}</s>}</div>
            <div className="detail-label">Colour: <strong>{selectedColor.name}</strong></div>
            <div className="swatches" role="radiogroup" aria-label="Choose a colour">
              {product.colors.map((color) => <button key={color.name} className={`swatch ${selectedColor.name === color.name ? 'selected' : ''}`} style={{ background: color.value }} onClick={() => setSelectedColor(color)} aria-label={color.name} aria-pressed={selectedColor.name === color.name} data-testid={`button-color-${color.name.toLowerCase().replaceAll(' ', '-')}`} />)}
            </div>
            {product.sizes && <><div className="detail-label">Size</div><div className="size-row" role="radiogroup" aria-label="Choose a size">{product.sizes.map((size) => <button key={size} className={`size-button ${selectedSize === size ? 'selected' : ''}`} onClick={() => setSelectedSize(size)} aria-pressed={selectedSize === size} data-testid={`button-size-${size.replace('/', '-')}`}>{size}</button>)}</div><button className="guide" data-testid="button-size-guide"><Ruler size={12} strokeWidth={1.3} /> Size guide</button></>}
            <div className="buy-row">
              <div className="quantity-control"><button onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity" data-testid="button-product-decrease"><Minus size={13} /></button><span data-testid="text-product-quantity">{quantity}</span><button onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity" data-testid="button-product-increase"><Plus size={13} /></button></div>
              <button className="add-button" onClick={handleAdd} disabled={!product.stock} data-testid="button-add-to-bag">{!product.stock ? 'Sold out' : added ? 'Added to bag' : 'Add to bag'}</button>
              <WishlistButton productId={product.id} large />
            </div>
            {added && <div className="status-message" data-testid="status-added-to-bag"><Heart size={13} fill="currentColor" style={{ verticalAlign: -2, marginRight: 5 }} />Your piece is waiting in your bag.</div>}
            <div className="installment" data-testid="text-payment-message"><strong>clearpay</strong> &nbsp; Pay in 4 interest-free instalments of {formatPrice(product.price / 4)}. <u>Learn more</u></div>
            <div className="detail-sections">
              <details className="detail-section" open><summary>Product description <ChevronDown size={14} strokeWidth={1.2} /></summary><p data-testid="text-product-description">{product.description}</p></details>
              <details className="detail-section"><summary>Delivery & returns <ChevronDown size={14} strokeWidth={1.2} /></summary><p>Complimentary delivery on orders over KSh 18,000. We accept returns within 14 days of delivery, provided your piece is unworn and in its original packaging.</p></details>
              <details className="detail-section"><summary>Details / materials / care <ChevronDown size={14} strokeWidth={1.2} /></summary><p>Designed in London. Handle with care, steam lightly and store folded away from direct sunlight.</p></details>
              <details className="detail-section"><summary>Reviews <ChevronDown size={14} strokeWidth={1.2} /></summary><p>Our community is wearing this edit beautifully. Reviews will appear here after your first order.</p></details>
            </div>
          </div>
        </div>
      </section>
      <section className="section page-width related" data-testid="section-related-products">
        <div className="section-heading"><div className="eyebrow" style={{ color: '#71817e' }}>Complete the look</div><h2>You may also like</h2></div>
        <ProductGrid products={related} />
      </section>
      <section className="page-width" style={{ paddingBottom: 90, textAlign: 'center' }}><Link href={product.collection === 'Abayas' ? '/collections/abayas' : '/collections/hijabs'} className="button-light" data-testid="link-back-to-collection">Back to {product.collection.toLowerCase()}</Link></section>
    </>
  );
}