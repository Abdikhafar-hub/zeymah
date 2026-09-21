import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Sparkles,
  Pause,
} from 'lucide-react';
import { catalog, referenceImages, type Product } from '@/data/catalog';
import { ProductGrid } from '@/components/product-card';
import { TrustpilotBar, BrandGuarantees } from '@/components/trust-badge';
import { SizeGuideModal } from '@/components/size-guide-modal';

interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  image: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    eyebrow: 'The New Hijab Range',
    title: 'Beautiful Drapes',
    description: 'Light-catching layers and whisper-soft luxury georgette crafted for effortless everyday wear.',
    primaryCta: { label: 'Shop Hijabs', href: '/collections/hijabs' },
    secondaryCta: { label: 'Explore Bestsellers', href: '/collections/abayas?sort=Bestselling' },
    image: referenceImages.hero,
  },
  {
    id: 'slide-2',
    eyebrow: 'Occasion & Celebration',
    title: 'Handcrafted Elegance',
    description: 'Artisan sleeve embroidery, flowing bell cuffs, and fluid silk-blend crepes tailored for memorable gatherings.',
    primaryCta: { label: 'Shop Occasion Abayas', href: '/collections/abayas?category=Occasion+Abayas' },
    secondaryCta: { label: 'View Lookbook', href: '/collections/abayas' },
    image: referenceImages.categories,
  },
  {
    id: 'slide-3',
    eyebrow: 'Everyday Essentials',
    title: 'Quiet Luxury In Motion',
    description: 'Fluid Korean Nidha open abayas, tailored slip dresses, and minimal silhouettes that make modest dressing feel easy.',
    primaryCta: { label: 'Shop Open Abayas', href: '/collections/abayas?category=Open+Abayas' },
    secondaryCta: { label: 'Discover Modest Wear', href: '/collections/abayas?category=Modest+Dresses' },
    image: referenceImages.categoryEssential,
  },
];

const STORY_CIRCLES = [
  { label: 'New In', image: referenceImages.hero, href: '/collections/abayas?sort=Newest' },
  { label: 'Occasion', image: referenceImages.categories, href: '/collections/abayas?category=Occasion+Abayas' },
  { label: 'Open Abayas', image: referenceImages.abayas, href: '/collections/abayas?category=Open+Abayas' },
  { label: 'Georgette', image: referenceImages.product, href: '/collections/hijabs?fabric=Georgette' },
  { label: 'Prayer Sets', image: referenceImages.categoryHajj, href: '/collections/abayas?category=Prayer+Abayas' },
  { label: 'Gift Edits', image: referenceImages.productSecondary, href: '/collections/hijabs?category=Gifts' },
];

const STYLING_REELS = [
  {
    title: 'How to Style Open Abayas with Neutral Slip Dresses',
    productName: 'Essential Open Abaya in Noir',
    href: '/products/essential-open-abaya',
    image: referenceImages.abayas,
    duration: '0:32',
  },
  {
    title: '5 Ways to Drape the Luxury Georgette Hijab',
    productName: 'Luxury Georgette Hijab in Espresso Plum',
    href: '/products/luxury-georgette-hijab',
    image: referenceImages.product,
    duration: '0:45',
  },
  {
    title: 'Celebration Styling: Hand-Embroidered Bell Sleeves',
    productName: 'Embroidered Occasion Abaya in Silver Mist',
    href: '/products/embroidered-occasion-abaya',
    image: referenceImages.categories,
    duration: '0:28',
  },
  {
    title: 'Pin-Free Styling with Rayon Jersey',
    productName: 'Everyday Premium Jersey in Dusty Mauve',
    href: '/products/premium-jersey-hijab',
    image: referenceImages.hijabs,
    duration: '0:40',
  },
];

type ShowcaseTab = 'trending' | 'new-in' | 'bestsellers' | 'occasion';

export default function Home() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeTab, setActiveTab] = useState<ShowcaseTab>('trending');
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  // Hero carousel auto rotation
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Tabbed products filter
  const displayedProducts: Product[] = (() => {
    switch (activeTab) {
      case 'new-in':
        return catalog.filter((p) => p.newArrival || p.tag === 'New').slice(0, 4);
      case 'bestsellers':
        return catalog.filter((p) => p.bestseller || p.tag === 'Bestseller').slice(0, 4);
      case 'occasion':
        return catalog.filter((p) => p.category.includes('Occasion') || p.fabric === 'Silk Satin').slice(0, 4);
      case 'trending':
      default:
        return catalog.filter((p) => p.featured).slice(0, 4);
    }
  })();

  const currentSlide = HERO_SLIDES[currentSlideIndex];

  return (
    <>
      {/* 1. Multi-Slide Editorial Hero Carousel */}
      <section
        className="hero-carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        data-testid="section-hero-carousel"
      >
        <div className="hero-slides-wrapper">
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className={`hero-slide-item ${idx === currentSlideIndex ? 'active' : ''}`}
              aria-hidden={idx !== currentSlideIndex}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="hero-slide-image"
                data-testid={`img-hero-slide-${idx}`}
              />
              <div className="hero-content-container page-width">
                <div className="hero-text-box">
                  <span className="hero-eyebrow">{slide.eyebrow}</span>
                  <h1 className="hero-title">{slide.title}</h1>
                  <p className="hero-desc">{slide.description}</p>
                  <div className="hero-cta-group">
                    <Link
                      href={slide.primaryCta.href}
                      className="button-light hero-btn primary"
                      data-testid={`link-hero-primary-${idx}`}
                    >
                      {slide.primaryCta.label}
                      <ArrowRight size={13} style={{ marginLeft: 8 }} />
                    </Link>
                    {slide.secondaryCta && (
                      <Link
                        href={slide.secondaryCta.href}
                        className="button-dark hero-btn secondary"
                        data-testid={`link-hero-secondary-${idx}`}
                      >
                        {slide.secondaryCta.label}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          type="button"
          className="hero-arrow-btn prev"
          onClick={() =>
            setCurrentSlideIndex(
              (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length,
            )
          }
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          className="hero-arrow-btn next"
          onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length)}
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>

        {/* Pagination Dots */}
        <div className="hero-pagination-dots" role="tablist">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              className={`hero-dot ${idx === currentSlideIndex ? 'active' : ''}`}
              onClick={() => setCurrentSlideIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              role="tab"
              aria-selected={idx === currentSlideIndex}
            />
          ))}
        </div>
      </section>

      {/* 2. Story / Category Circles Section */}
      <section className="story-circles-section page-width" data-testid="section-story-circles">
        <div className="story-circles-track">
          {STORY_CIRCLES.map((circle, idx) => (
            <Link
              key={circle.label}
              href={circle.href}
              className="story-circle-card"
              data-testid={`link-story-circle-${idx}`}
            >
              <div className="story-ring">
                <div className="story-avatar">
                  <img src={circle.image} alt={circle.label} loading="lazy" />
                </div>
              </div>
              <span className="story-label">{circle.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Trustpilot Social Proof Banner */}
      <TrustpilotBar />

      {/* 4. Tabbed Product Showcase */}
      <section className="section page-width tabbed-showcase" data-testid="section-tabbed-showcase">
        <div className="section-heading">
          <div className="eyebrow" style={{ color: '#71817e' }}>The Curated Edit</div>
          <h2>Modest Clothing Crafted With Intention</h2>
          <p>
            Explore contemporary modest silhouettes, from flowing everyday open abayas to hand-embellished celebration pieces.
          </p>

          {/* Interactive Showcase Tabs */}
          <div className="showcase-tabs-nav" role="tablist" aria-label="Product collections">
            <button
              type="button"
              className={`showcase-tab-btn ${activeTab === 'trending' ? 'active' : ''}`}
              onClick={() => setActiveTab('trending')}
              role="tab"
              aria-selected={activeTab === 'trending'}
              data-testid="tab-showcase-trending"
            >
              Trending Now
            </button>
            <button
              type="button"
              className={`showcase-tab-btn ${activeTab === 'new-in' ? 'active' : ''}`}
              onClick={() => setActiveTab('new-in')}
              role="tab"
              aria-selected={activeTab === 'new-in'}
              data-testid="tab-showcase-new-in"
            >
              New Arrivals
            </button>
            <button
              type="button"
              className={`showcase-tab-btn ${activeTab === 'bestsellers' ? 'active' : ''}`}
              onClick={() => setActiveTab('bestsellers')}
              role="tab"
              aria-selected={activeTab === 'bestsellers'}
              data-testid="tab-showcase-bestsellers"
            >
              Bestsellers
            </button>
            <button
              type="button"
              className={`showcase-tab-btn ${activeTab === 'occasion' ? 'active' : ''}`}
              onClick={() => setActiveTab('occasion')}
              role="tab"
              aria-selected={activeTab === 'occasion'}
              data-testid="tab-showcase-occasion"
            >
              Occasion Edit
            </button>
          </div>
        </div>

        {/* Dynamic Grid for Selected Tab */}
        <ProductGrid products={displayedProducts} />

        <div className="section-cta-wrap">
          <Link
            href="/collections/abayas"
            className="button-dark"
            data-testid="link-view-all-showcase"
          >
            Explore Complete Collection
            <ArrowRight size={13} style={{ marginLeft: 10 }} />
          </Link>
        </div>
      </section>

      {/* 5. Editorial Narrative Strip */}
      <section className="editorial-strip" data-testid="section-editorial-story">
        <div className="image-frame">
          <img
            src={referenceImages.hijabs}
            alt="Editorial modest draping"
            loading="lazy"
            data-testid="img-editorial-story"
          />
        </div>
        <div className="editorial-copy">
          <div className="eyebrow" style={{ color: '#73817f' }}>More than a wardrobe</div>
          <h2>Made For The Moments Between.</h2>
          <p>
            From the quiet morning coffee to family gatherings, from heartfelt prayer to celebrations worth dressing for — Zeymah infuses ease, grace, and refined luxury into modern modest living.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link
              href="/collections/abayas"
              className="button-dark"
              data-testid="link-editorial-discover"
            >
              Discover The Collection
              <ArrowRight size={13} style={{ marginLeft: 10 }} />
            </Link>
            <button
              type="button"
              className="button-light"
              onClick={() => setSizeGuideOpen(true)}
              data-testid="button-home-size-guide"
            >
              Find Your Abaya Length
            </button>
          </div>
        </div>
      </section>

      {/* 6. "See It Styled" Editorial Video / Reels Section */}
      <section className="section page-width reels-section" data-testid="section-styling-inspiration">
        <div className="section-heading">
          <div className="eyebrow" style={{ color: '#71817e' }}>See It Styled</div>
          <h2>Modest Styling Tutorials & Inspiration</h2>
          <p>
            Discover how our London styling team layers fluid abayas with silk slip dresses and drapes non-slip georgette wraps.
          </p>
        </div>

        <div className="reels-grid">
          {STYLING_REELS.map((reel, idx) => (
            <div key={idx} className="reel-card" data-testid={`reel-card-${idx}`}>
              <div className="reel-media-frame">
                <img src={reel.image} alt={reel.title} loading="lazy" />
                <div className="reel-overlay">
                  <div className="reel-play-btn">
                    <Play size={14} fill="currentColor" />
                  </div>
                  <span className="reel-duration">{reel.duration}</span>
                </div>
              </div>
              <div className="reel-info">
                <div className="reel-title">{reel.title}</div>
                <Link href={reel.href} className="reel-shop-link">
                  <span>Shop Featured: {reel.productName}</span>
                  <ArrowRight size={11} style={{ marginLeft: 4 }} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Thoughtful Gifting Section */}
      <section className="section page-width gifting-section" data-testid="section-gifting">
        <div className="editorial-strip reverse">
          <div className="editorial-copy">
            <div className="eyebrow" style={{ color: '#73817f' }}>Considered Details</div>
            <h2>Thoughtful Gifting, Wrapped With Intention.</h2>
            <p>
              Present an unforgettable gesture for Eid, Umrah, or simply because. Each curated gift set arrives enclosed in our signature embossed presentation box with hand-tied satin ribbons.
            </p>
            <Link
              href="/collections/hijabs?category=Gifts"
              className="button-dark"
              data-testid="link-gifting-shop"
            >
              Explore Gifting Collection
              <ArrowRight size={13} style={{ marginLeft: 10 }} />
            </Link>
          </div>
          <div className="image-frame">
            <img
              src={referenceImages.categories}
              alt="Zeymah Luxury Presentation Gift Box"
              loading="lazy"
              data-testid="img-gifting"
            />
          </div>
        </div>
      </section>

      {/* 8. 4-Pillar Brand Guarantees */}
      <BrandGuarantees />

      {/* Interactive Size Guide Modal Triggerable Globally */}
      <SizeGuideModal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </>
  );
}