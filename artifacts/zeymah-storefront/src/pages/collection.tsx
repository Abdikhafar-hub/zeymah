import { useMemo, useState, useEffect } from 'react';
import { ChevronDown, SlidersHorizontal, X, Filter, RotateCcw, Check } from 'lucide-react';
import { Link, useSearch } from 'wouter';
import { catalog, type Collection, type Product } from '@/data/catalog';
import { Breadcrumbs, LoadingGrid } from '@/components/storefront';
import { ProductGrid } from '@/components/product-card';
import { SizeGuideModal } from '@/components/size-guide-modal';

interface CollectionPageProps {
  type: Collection;
}

const AVAILABLE_SIZES = ['50', '52', '54', '56', '58', '60', '62'];
const AVAILABLE_COLORS = [
  { name: 'Noir Black', hex: '#1e2424' },
  { name: 'Oatmeal Taupe', hex: '#d5cfc5' },
  { name: 'Midnight Navy', hex: '#1a2233' },
  { name: 'Sage Leaf', hex: '#798b7e' },
  { name: 'Espresso Plum', hex: '#341b20' },
  { name: 'Stone & Cloud', hex: '#eee9e2' },
  { name: 'Silver Mist', hex: '#c5c7c7' },
];
const AVAILABLE_FABRICS = ['Nidha', 'Georgette', 'Chiffon', 'Jersey', 'Modal', 'Linen', 'Silk Satin'];

const ABAYA_SUBCATEGORIES = [
  'All Abayas',
  'Open Abayas',
  'Closed Abayas',
  'Kimono Collection',
  'Occasion Abayas',
  'Slip Dresses',
  'Prayer Abayas',
];

const HIJAB_SUBCATEGORIES = [
  'All Hijabs',
  'Luxury Hijabs',
  'Everyday Hijabs',
  'Chiffon Hijabs',
  'Accessories',
  'Gifts',
];

export default function CollectionPage({ type }: CollectionPageProps) {
  const isAbaya = type === 'Abayas';
  const subcategories = isAbaya ? ABAYA_SUBCATEGORIES : HIJAB_SUBCATEGORIES;

  // URL search params inspection
  const searchString = useSearch();
  const searchParams = useMemo(() => new URLSearchParams(searchString), [searchString]);

  // Filters state
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(
    searchParams.get('category') || 'All',
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>(
    searchParams.get('length') ? [searchParams.get('length')!] : [],
  );
  const [selectedColors, setSelectedColors] = useState<string[]>(
    searchParams.get('colour') ? [searchParams.get('colour')!] : [],
  );
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>(
    searchParams.get('fabric') ? [searchParams.get('fabric')!] : [],
  );
  const [inStockOnly, setInStockOnly] = useState<boolean>(
    searchParams.get('availability') === 'in-stock',
  );
  const [priceRange, setPriceRange] = useState<'all' | 'under50' | '50to100' | 'over100'>('all');
  const [sort, setSort] = useState<string>(searchParams.get('sort') || 'Featured');

  // UI state
  const [loading, setLoading] = useState<boolean>(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState<boolean>(false);

  // Synchronize when URL search param changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedSubcategory(cat);
    const s = searchParams.get('sort');
    if (s) setSort(s);
  }, [searchParams]);

  // Toggle helpers
  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color],
    );
  };

  const toggleFabric = (fabric: string) => {
    setSelectedFabrics((prev) =>
      prev.includes(fabric) ? prev.filter((f) => f !== fabric) : [...prev, fabric],
    );
  };

  const clearAllFilters = () => {
    setSelectedSubcategory('All');
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedFabrics([]);
    setInStockOnly(false);
    setPriceRange('all');
  };

  const hasActiveFilters =
    selectedSubcategory !== 'All' && !selectedSubcategory.startsWith('All') ||
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    selectedFabrics.length > 0 ||
    inStockOnly ||
    priceRange !== 'all';

  // Products filtering & sorting logic
  const filteredProducts = useMemo(() => {
    let list = catalog.filter((product) => product.collection === type);

    // Subcategory
    if (selectedSubcategory && !selectedSubcategory.startsWith('All')) {
      list = list.filter((p) => p.category.toLowerCase().includes(selectedSubcategory.toLowerCase()));
    }

    // Availability
    if (inStockOnly) {
      list = list.filter((p) => p.stock > 0);
    }

    // Sizes
    if (selectedSizes.length > 0) {
      list = list.filter((p) => p.sizes?.some((s) => selectedSizes.includes(s)));
    }

    // Colors
    if (selectedColors.length > 0) {
      list = list.filter((p) =>
        p.colors.some((c) =>
          selectedColors.some((sc) => c.name.toLowerCase().includes(sc.toLowerCase())),
        ),
      );
    }

    // Fabrics
    if (selectedFabrics.length > 0) {
      list = list.filter((p) => selectedFabrics.includes(p.fabric));
    }

    // Price range
    if (priceRange === 'under50') {
      list = list.filter((p) => p.price < 50);
    } else if (priceRange === '50to100') {
      list = list.filter((p) => p.price >= 50 && p.price <= 100);
    } else if (priceRange === 'over100') {
      list = list.filter((p) => p.price > 100);
    }

    // Sorting
    if (sort === 'Price: low to high') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sort === 'Price: high to low') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sort === 'Newest') {
      list = [...list].sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
    } else if (sort === 'Bestselling') {
      list = [...list].sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
    }

    return list;
  }, [
    type,
    selectedSubcategory,
    inStockOnly,
    selectedSizes,
    selectedColors,
    selectedFabrics,
    priceRange,
    sort,
  ]);

  const handleSortChange = (value: string) => {
    setLoading(true);
    setSort(value);
    setTimeout(() => setLoading(false), 240);
  };

  return (
    <>
      <Breadcrumbs items={['Collections', type]} />

      {/* Collection Hero Header */}
      <section
        className="page-width collection-intro"
        data-testid={`section-collection-${type.toLowerCase()}`}
      >
        <div className="collection-header-row">
          <div>
            <h1 data-testid="text-collection-title">{type}</h1>
            <div className="collection-count-badge" data-testid="text-collection-count">
              {filteredProducts.length} Pieces Available
            </div>
          </div>
          {isAbaya && (
            <button
              type="button"
              className="size-guide-pill-btn"
              onClick={() => setSizeGuideOpen(true)}
              data-testid="button-collection-size-guide"
            >
              📏 Find Your Height / Length Size
            </button>
          )}
        </div>

        <p className="collection-description">
          {isAbaya
            ? 'Discover our complete edit of premium abaya dresses designed in London. From fluid everyday open abayas and minimalist slips to intricately hand-embroidered celebration pieces cut from luxurious Korean Nidha and silk.'
            : 'Explore our curated palette of non-slip luxury georgette, airy chiffon, soft modal, and everyday jersey hijabs. Thoughtfully crafted to drape effortlessly and complete your modest silhouette.'}
        </p>

        {/* Subcategory Pills */}
        <div className="subcategories-pills-row" aria-label={`${type} subcategories`}>
          {subcategories.map((sub) => {
            const isSelected =
              selectedSubcategory === sub || (sub.startsWith('All') && selectedSubcategory === 'All');
            return (
              <button
                key={sub}
                type="button"
                className={`subcategory-pill ${isSelected ? 'active' : ''}`}
                onClick={() => setSelectedSubcategory(sub.startsWith('All') ? 'All' : sub)}
                data-testid={`btn-subcategory-${sub.toLowerCase().replaceAll(' ', '-')}`}
              >
                {sub}
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Browsing Area with Faceted Filtering */}
      <section className="page-width collection-main-layout">
        {/* Controls Toolbar: Mobile Filter trigger & Desktop Sort */}
        <div className="collection-toolbar" data-testid="row-product-filters">
          <div className="toolbar-left">
            <button
              type="button"
              className="mobile-filter-trigger-btn"
              onClick={() => setMobileFilterOpen(true)}
              data-testid="button-open-filter-drawer"
            >
              <SlidersHorizontal size={15} strokeWidth={1.3} />
              <span>Filters {hasActiveFilters ? '• Active' : ''}</span>
            </button>

            {/* In-Stock Toggle */}
            <label className="in-stock-checkbox-label">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                data-testid="checkbox-in-stock-filter"
              />
              <span>In stock only</span>
            </label>
          </div>

          <div className="toolbar-right">
            <label className="sort-control-label">
              <span className="sort-label-text">Sort by:</span>
              <select
                className="sort-dropdown-select"
                value={sort}
                onChange={(e) => handleSortChange(e.target.value)}
                aria-label="Sort products"
                data-testid="select-sort-products"
              >
                <option>Featured</option>
                <option>Newest</option>
                <option>Bestselling</option>
                <option>Price: low to high</option>
                <option>Price: high to low</option>
              </select>
            </label>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="active-filters-bar animate-fade-in" data-testid="bar-active-filters">
            <span className="active-filters-label">Active Filters:</span>
            {selectedSubcategory !== 'All' && !selectedSubcategory.startsWith('All') && (
              <span className="filter-chip">
                {selectedSubcategory}
                <button type="button" onClick={() => setSelectedSubcategory('All')} aria-label="Remove category filter">
                  <X size={11} />
                </button>
              </span>
            )}
            {selectedSizes.map((s) => (
              <span className="filter-chip" key={s}>
                Length {s}"
                <button type="button" onClick={() => toggleSize(s)} aria-label={`Remove size ${s}`}>
                  <X size={11} />
                </button>
              </span>
            ))}
            {selectedColors.map((c) => (
              <span className="filter-chip" key={c}>
                {c}
                <button type="button" onClick={() => toggleColor(c)} aria-label={`Remove color ${c}`}>
                  <X size={11} />
                </button>
              </span>
            ))}
            {selectedFabrics.map((f) => (
              <span className="filter-chip" key={f}>
                {f}
                <button type="button" onClick={() => toggleFabric(f)} aria-label={`Remove fabric ${f}`}>
                  <X size={11} />
                </button>
              </span>
            ))}
            {priceRange !== 'all' && (
              <span className="filter-chip">
                {priceRange === 'under50' ? 'Under £50' : priceRange === '50to100' ? '£50 - £100' : 'Over £100'}
                <button type="button" onClick={() => setPriceRange('all')} aria-label="Remove price filter">
                  <X size={11} />
                </button>
              </span>
            )}
            <button
              type="button"
              className="clear-all-filters-btn"
              onClick={clearAllFilters}
              data-testid="button-clear-all-filters"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Content Layout: Facet Sidebar (Desktop) + Product Grid */}
        <div className="collection-columns-wrap">
          {/* Desktop Facet Sidebar */}
          <aside className="collection-facet-sidebar" data-testid="sidebar-facet-filters">
            {/* Length / Size Facet */}
            {isAbaya && (
              <div className="facet-group">
                <div className="facet-group-title">Length (Inches)</div>
                <div className="size-pill-facet-grid">
                  {AVAILABLE_SIZES.map((size) => {
                    const isChecked = selectedSizes.includes(size);
                    return (
                      <button
                        key={size}
                        type="button"
                        className={`size-facet-btn ${isChecked ? 'active' : ''}`}
                        onClick={() => toggleSize(size)}
                        data-testid={`facet-size-${size}`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Color Swatches Facet */}
            <div className="facet-group">
              <div className="facet-group-title">Colour Tone</div>
              <div className="color-swatches-facet-list">
                {AVAILABLE_COLORS.map((col) => {
                  const isChecked = selectedColors.includes(col.name);
                  return (
                    <button
                      key={col.name}
                      type="button"
                      className={`color-facet-row ${isChecked ? 'active' : ''}`}
                      onClick={() => toggleColor(col.name)}
                      data-testid={`facet-color-${col.name.toLowerCase().replaceAll(' ', '-')}`}
                    >
                      <span className="color-swatch-dot" style={{ backgroundColor: col.hex }} />
                      <span className="color-swatch-name">{col.name}</span>
                      {isChecked && <Check size={12} className="check-icon" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fabric Facet */}
            <div className="facet-group">
              <div className="facet-group-title">Fabric & Material</div>
              <div className="checkbox-facet-list">
                {AVAILABLE_FABRICS.map((fabric) => {
                  const isChecked = selectedFabrics.includes(fabric);
                  return (
                    <label key={fabric} className="checkbox-facet-item">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleFabric(fabric)}
                        data-testid={`facet-fabric-${fabric.toLowerCase()}`}
                      />
                      <span>{fabric}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Price Range Facet */}
            <div className="facet-group">
              <div className="facet-group-title">Price Range</div>
              <div className="radio-facet-list">
                <label className="radio-facet-item">
                  <input
                    type="radio"
                    name="price"
                    checked={priceRange === 'all'}
                    onChange={() => setPriceRange('all')}
                  />
                  <span>All Prices</span>
                </label>
                <label className="radio-facet-item">
                  <input
                    type="radio"
                    name="price"
                    checked={priceRange === 'under50'}
                    onChange={() => setPriceRange('under50')}
                  />
                  <span>Under £50</span>
                </label>
                <label className="radio-facet-item">
                  <input
                    type="radio"
                    name="price"
                    checked={priceRange === '50to100'}
                    onChange={() => setPriceRange('50to100')}
                  />
                  <span>£50 — £100</span>
                </label>
                <label className="radio-facet-item">
                  <input
                    type="radio"
                    name="price"
                    checked={priceRange === 'over100'}
                    onChange={() => setPriceRange('over100')}
                  />
                  <span>Over £100</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Products Grid Area */}
          <div className="collection-grid-column">
            {loading ? (
              <LoadingGrid />
            ) : filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div className="empty-collection-state" data-testid="status-empty-collection">
                <h3>No pieces match your selected filters</h3>
                <p>Try resetting some filters or explore our complete edit.</p>
                <button
                  type="button"
                  className="button-dark"
                  onClick={clearAllFilters}
                  data-testid="button-clear-collection-filter"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile Slide-Up Filter Drawer */}
      {mobileFilterOpen && (
        <div className="modal-backdrop" onClick={() => setMobileFilterOpen(false)}>
          <div
            className="mobile-filter-drawer animate-slide-up"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            data-testid="drawer-mobile-filters"
          >
            <div className="mobile-filter-header">
              <h3>Filter Products</h3>
              <button
                type="button"
                className="icon-button"
                onClick={() => setMobileFilterOpen(false)}
                aria-label="Close filters"
              >
                <X size={20} strokeWidth={1.3} />
              </button>
            </div>

            <div className="mobile-filter-body">
              {isAbaya && (
                <div className="facet-group">
                  <div className="facet-group-title">Length (Inches)</div>
                  <div className="size-pill-facet-grid">
                    {AVAILABLE_SIZES.map((size) => (
                      <button
                        key={size}
                        type="button"
                        className={`size-facet-btn ${selectedSizes.includes(size) ? 'active' : ''}`}
                        onClick={() => toggleSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="facet-group">
                <div className="facet-group-title">Fabric</div>
                <div className="checkbox-facet-list">
                  {AVAILABLE_FABRICS.map((fabric) => (
                    <label key={fabric} className="checkbox-facet-item">
                      <input
                        type="checkbox"
                        checked={selectedFabrics.includes(fabric)}
                        onChange={() => toggleFabric(fabric)}
                      />
                      <span>{fabric}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mobile-filter-footer">
              <button
                type="button"
                className="button-light"
                onClick={clearAllFilters}
              >
                Reset
              </button>
              <button
                type="button"
                className="button-dark"
                onClick={() => setMobileFilterOpen(false)}
              >
                Apply Filters ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Size Guide Modal */}
      <SizeGuideModal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </>
  );
}