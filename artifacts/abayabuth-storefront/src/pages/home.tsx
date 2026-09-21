import { Link } from 'wouter';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { catalog, referenceImages } from '@/data/catalog';
import { ProductGrid } from '@/components/storefront';

const categoryTiles = [
  { label: 'Occasion abayas', image: referenceImages.categories, href: '/collections/abayas' },
  { label: 'Hajj / Umrah clothing', image: referenceImages.categoryHajj, href: '/collections/abayas' },
  { label: 'Essential abayas', image: referenceImages.categoryEssential, href: '/collections/abayas' },
];

export default function Home() {
  const featured = catalog.filter((product) => product.featured);
  return (
    <>
      <section className="hero" data-testid="section-hero">
        <img className="hero-image" src={referenceImages.hero} alt="Model wearing a flowing lilac hijab from the New Hijab Range" data-testid="img-hero" />
        <div className="hero-copy">
          <div className="eyebrow">The new hijab range</div>
          <h1 data-testid="text-hero-title">Beautiful drapes</h1>
          <p>Light-catching layers for every day.</p>
          <Link href="/collections/hijabs" className="button-light" data-testid="link-hero-shop">Shop now <ArrowRight size={13} style={{ marginLeft: 12 }} /></Link>
        </div>
      </section>

      <section className="section page-width" data-testid="section-collection-introduction">
        <div className="section-heading">
          <div className="eyebrow" style={{ color: '#71817e' }}>AbayaButh edit</div>
          <h2>Online abaya collection;<br />discover modest clothing for women</h2>
          <p>Here at AbayaButh, we pride ourselves on fusing traditional modest clothing with contemporary fashion for men, women and children. Explore considered pieces for every occasion.</p>
        </div>
        <div className="category-grid">
          {categoryTiles.map((tile, index) => <Link href={tile.href} className="category-tile" key={tile.label} data-testid={`link-category-tile-${index}`}>
            <div className="image-frame"><img src={tile.image} alt={tile.label} loading="lazy" data-testid={`img-category-${index}`} /></div>
            <div className="category-label" data-testid={`text-category-${index}`}>{tile.label}</div>
          </Link>)}
        </div>
      </section>

      <section className="section page-width" style={{ paddingTop: 20 }} data-testid="section-new-arrivals">
        <div className="section-heading"><div className="eyebrow" style={{ color: '#71817e' }}>A quiet beginning</div><h2>New arrivals</h2><p>Refined shapes, soft layers and the details that make getting dressed feel easy.</p></div>
        <ProductGrid products={featured} />
        <div className="section-link"><Link href="/collections/abayas" className="button-light" data-testid="link-view-all-new-arrivals">View all new arrivals <ArrowRight size={13} style={{ marginLeft: 12 }} /></Link></div>
      </section>

      <section className="editorial-strip" data-testid="section-editorial-story">
        <div className="image-frame"><img src={referenceImages.hijabs} alt="Editorial portrait showing softly draped modest styling" loading="lazy" data-testid="img-editorial-story" /></div>
        <div className="editorial-copy"><div className="eyebrow" style={{ color: '#73817f' }}>More than a wardrobe</div><h2>Made for the moments between.</h2><p>From the first coffee to the long table, from quiet prayer to an evening worth dressing for — AbayaButh brings ease, elegance and intention to modest dressing.</p><Link href="/collections/abayas" className="button-dark" style={{ alignSelf: 'flex-start' }} data-testid="link-editorial-discover">Discover the collection <ArrowRight size={13} style={{ marginLeft: 12 }} /></Link></div>
      </section>

      <section className="section page-width" data-testid="section-styling-inspiration">
        <div className="section-heading"><div className="eyebrow" style={{ color: '#71817e' }}>See it styled</div><h2>Modest styling inspiration</h2><p>From effortless hijab tutorials to elevated abaya layering. Watch how we style our latest collections and shop your favourite directly from the feed.</p></div>
        <div className="social-grid">
          {[referenceImages.hijabs, referenceImages.product, referenceImages.abayas, referenceImages.categories].map((image, index) => <Link href={index % 2 ? '/products/luxury-georgette-hijab' : '/collections/abayas'} className="social-card" key={image + index} data-testid={`link-social-card-${index}`}><img src={image} alt="AbayaButh styling inspiration" loading="lazy" /><span><Play size={11} fill="currentColor" style={{ verticalAlign: -2, marginRight: 6 }} />Shop the look</span></Link>)}
        </div>
      </section>

      <section className="section page-width" style={{ paddingTop: 25 }} data-testid="section-gifting">
        <div className="editorial-strip">
          <div className="editorial-copy"><div className="eyebrow" style={{ color: '#73817f' }}>For a beautiful gesture</div><h2>Thoughtful gifting, wrapped well.</h2><p>Choose an edit for Eid, Umrah or simply because. Every gift arrives beautifully presented, ready for the person you had in mind.</p><Link href="/collections/hijabs" className="button-dark" style={{ alignSelf: 'flex-start' }} data-testid="link-gifting-shop">Explore gifting <ArrowRight size={13} style={{ marginLeft: 12 }} /></Link></div>
          <div className="image-frame"><img src={referenceImages.hijabs} alt="A considered AbayaButh gift edit" loading="lazy" data-testid="img-gifting" /></div>
        </div>
      </section>

      <section style={{ background: '#e9efec', padding: '27px 20px', textAlign: 'center' }} data-testid="section-service-note"><Sparkles size={17} strokeWidth={1.2} style={{ verticalAlign: -4, marginRight: 8, color: '#356964' }} /><span style={{ letterSpacing: '.12em', fontSize: 10, textTransform: 'uppercase', color: '#356964' }}>Designed with care · delivered with intention</span></section>
    </>
  );
}