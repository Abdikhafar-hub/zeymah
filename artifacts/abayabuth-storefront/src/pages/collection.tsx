import { useMemo, useState } from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { Link } from 'wouter';
import { catalog, type Collection } from '@/data/catalog';
import { Breadcrumbs, LoadingGrid, ProductGrid } from '@/components/storefront';

const filterLabels = ['Availability', 'Product Type', 'Length', 'Colour', 'Material'];
const abayaCategories = ['Essential Abayas', 'Hajj/Umrah Collection', 'Jilbabs/Prayer Abayas', 'Occasion Abayas', 'Open Abayas', 'Luxury Abayas', 'Kimono Collection', 'Eid Outfits', 'Modest Dresses'];
const hijabCategories = ['Everyday Hijabs', 'Chiffon Hijabs', 'Jersey Hijabs', 'Luxury Hijabs', 'Hijab Gift Sets'];

export default function CollectionPage({ type }: { type: Collection }) {
  const [activeFilter, setActiveFilter] = useState('');
  const [sort, setSort] = useState('Featured');
  const [loading, setLoading] = useState(false);
  const [showAvailable, setShowAvailable] = useState(false);
  const isAbaya = type === 'Abayas';
  const products = useMemo(() => {
    let list = catalog.filter((product) => product.collection === type);
    if (showAvailable) list = list.filter((product) => product.stock > 0);
    if (sort === 'Price: low to high') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'Price: high to low') list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [showAvailable, sort, type]);
  const handleFilter = (label: string) => {
    if (label === 'Availability') setShowAvailable((value) => !value);
    setActiveFilter((current) => current === label ? '' : label);
  };
  const handleSort = (value: string) => {
    setLoading(true);
    setSort(value);
    window.setTimeout(() => setLoading(false), 280);
  };
  const categories = isAbaya ? abayaCategories : hijabCategories;
  return (
    <>
      <Breadcrumbs items={['Collections', type]} />
      <section className="page-width collection-intro" data-testid={`section-collection-${type.toLowerCase()}`}>
        <h1 data-testid="text-collection-title">{type}</h1>
        <div className="count" data-testid="text-collection-count">{isAbaya ? '768' : '248'} ITEMS</div>
        <p className="collection-description">{isAbaya ? 'Shop all abaya dresses for women, from everyday essentials to beautifully finished occasion pieces.' : 'Discover our exquisite collection of premium-quality hijabs in timeless tones designed to blend elegance, comfort and ease.'}</p>
        <div className="subcategories" aria-label={`${type} subcategories`}>
          {categories.map((category) => <Link href={isAbaya ? '/collections/abayas' : '/collections/hijabs'} key={category} data-testid={`link-subcategory-${category.toLowerCase().replaceAll('/', '-').replaceAll(' ', '-')}`}>{category}</Link>)}
        </div>
      </section>
      <section className="page-width collection-products">
        <div className="filter-row" data-testid="row-product-filters">
          <div className="filter-group">
            {filterLabels.slice(0, isAbaya ? 5 : 4).map((label) => <button className="filter-button" key={label} onClick={() => handleFilter(label)} aria-pressed={activeFilter === label} data-testid={`button-filter-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}{label === 'Availability' && showAvailable ? ' · In stock' : ''}<ChevronDown size={12} strokeWidth={1.2} /></button>)}
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 5 }}><SlidersHorizontal size={13} strokeWidth={1.2} /><select className="sort-select" value={sort} onChange={(event) => handleSort(event.target.value)} aria-label="Sort products" data-testid="select-sort-products"><option>Featured</option><option>Price: low to high</option><option>Price: high to low</option></select></label>
        </div>
        {loading ? <LoadingGrid /> : products.length > 0 ? <ProductGrid products={products} /> : <div className="empty-state" data-testid="status-empty-collection"><h3>Nothing here just yet</h3><p>Try clearing your availability filter to see the full edit.</p><button className="button-light" onClick={() => setShowAvailable(false)} data-testid="button-clear-collection-filter">Clear filter</button></div>}
      </section>
    </>
  );
}