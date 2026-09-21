export interface MegaMenuSubcategory {
  name: string;
  href: string;
  badge?: string;
}

export interface MegaMenuColumn {
  heading: string;
  items: MegaMenuSubcategory[];
}

export interface MegaMenuFeaturedCard {
  title: string;
  description: string;
  image: string;
  href: string;
  ctaText: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  hasMegaMenu: boolean;
  columns?: MegaMenuColumn[];
  featuredCard?: MegaMenuFeaturedCard;
}

export const MAIN_NAVIGATION: NavItem[] = [
  {
    id: 'new-in',
    label: 'NEW IN',
    href: '/collections/abayas?sort=Newest',
    hasMegaMenu: true,
    columns: [
      {
        heading: 'Latest Arrivals',
        items: [
          { name: 'All New In', href: '/collections/abayas?sort=Newest', badge: 'New' },
          { name: 'New In Abayas', href: '/collections/abayas?sort=Newest' },
          { name: 'New In Hijabs', href: '/collections/hijabs?sort=Newest' },
          { name: 'Back in Stock Favorites', href: '/collections/abayas?availability=in-stock' },
          { name: 'Trending Occasion Edit', href: '/collections/abayas?category=Occasion+Abayas' },
        ],
      },
      {
        heading: 'Seasonal Edits',
        items: [
          { name: 'The Eid Collection', href: '/collections/abayas?category=Occasion+Abayas' },
          { name: 'Hajj & Umrah Essentials', href: '/collections/abayas?category=Hajj%2FUmrah+Collection' },
          { name: 'Lightweight Summer Fabrics', href: '/collections/hijabs?fabric=Chiffon' },
          { name: 'Everyday Neutral Palette', href: '/collections/hijabs?colour=Cream' },
        ],
      },
    ],
    featuredCard: {
      title: 'The New Arrivals Edit',
      description: 'Ethereal layering and flowing silhouettes designed for refined everyday elegance.',
      image: '/reference/hero-crop.png',
      href: '/collections/abayas?sort=Newest',
      ctaText: 'Discover New Arrivals',
    },
  },
  {
    id: 'abayas',
    label: 'ABAYAS',
    href: '/collections/abayas',
    hasMegaMenu: true,
    columns: [
      {
        heading: 'By Style',
        items: [
          { name: 'All Abayas', href: '/collections/abayas' },
          { name: 'Open Abayas', href: '/collections/abayas?category=Open+Abayas' },
          { name: 'Closed Abayas', href: '/collections/abayas?category=Closed+Abayas' },
          { name: 'Kimono Abayas', href: '/collections/abayas?category=Kimono+Collection' },
          { name: 'Occasion & Embellished', href: '/collections/abayas?category=Occasion+Abayas', badge: 'Popular' },
          { name: 'Slip Dresses & Inners', href: '/collections/abayas?category=Slip+Dresses' },
          { name: 'Hajj & Umrah Abayas', href: '/collections/abayas?category=Hajj%2FUmrah+Collection' },
          { name: 'Linen & Textured Abayas', href: '/collections/abayas?fabric=Linen' },
        ],
      },
      {
        heading: 'By Length & Fit',
        items: [
          { name: 'Length 52" (Height 5\'0" - 5\'2")', href: '/collections/abayas?length=52' },
          { name: 'Length 54" (Height 5\'3" - 5\'4")', href: '/collections/abayas?length=54' },
          { name: 'Length 56" (Height 5\'5" - 5\'6")', href: '/collections/abayas?length=56' },
          { name: 'Length 58" (Height 5\'7" - 5\'8")', href: '/collections/abayas?length=58' },
          { name: 'Length 60" - 62" (Tall Fit)', href: '/collections/abayas?length=60' },
          { name: 'Interactive Size & Height Guide', href: '/#size-guide' },
        ],
      },
    ],
    featuredCard: {
      title: 'Handcrafted Occasion Abayas',
      description: 'Intricate embellishments, fluid drapes, and premium satin trims.',
      image: '/reference/category-occasion.png',
      href: '/collections/abayas?category=Occasion+Abayas',
      ctaText: 'Shop Occasion Abayas',
    },
  },
  {
    id: 'hijabs',
    label: 'HIJABS',
    href: '/collections/hijabs',
    hasMegaMenu: true,
    columns: [
      {
        heading: 'By Fabric',
        items: [
          { name: 'All Hijabs', href: '/collections/hijabs' },
          { name: 'Luxury Georgette', href: '/collections/hijabs?fabric=Georgette', badge: 'Bestseller' },
          { name: 'Premium Chiffon', href: '/collections/hijabs?fabric=Chiffon' },
          { name: 'Soft Modal Cotton', href: '/collections/hijabs?fabric=Modal' },
          { name: 'Everyday Premium Jersey', href: '/collections/hijabs?fabric=Jersey' },
          { name: 'Lustrous Silk Satin', href: '/collections/hijabs?fabric=Silk' },
          { name: 'Crinkle Textured Wraps', href: '/collections/hijabs?fabric=Crinkle' },
        ],
      },
      {
        heading: 'Accessories & Sets',
        items: [
          { name: 'Magnetic Hijab Pins', href: '/collections/hijabs?category=Accessories' },
          { name: 'Cotton & Modal Undercaps', href: '/collections/hijabs?category=Accessories' },
          { name: 'Silk Scrunchies', href: '/collections/hijabs?category=Accessories' },
          { name: 'Curated Hijab Gift Boxes', href: '/collections/hijabs?category=Gifts' },
          { name: 'Essential Palette Bundles', href: '/collections/hijabs?category=Gifts' },
        ],
      },
    ],
    featuredCard: {
      title: 'Luxury Georgette Range',
      description: 'Softly textured georgette with effortless non-slip drape in over 20 timeless shades.',
      image: '/reference/product-main.png',
      href: '/collections/hijabs?fabric=Georgette',
      ctaText: 'Explore Georgette Hijabs',
    },
  },
  {
    id: 'modest-wear',
    label: 'MODEST WEAR',
    href: '/collections/abayas?category=Modest+Dresses',
    hasMegaMenu: true,
    columns: [
      {
        heading: 'Garments',
        items: [
          { name: 'Two-Piece Prayer Sets', href: '/collections/abayas?category=Prayer+Abayas', badge: 'Must Have' },
          { name: 'Jilbabs & Khimar Sets', href: '/collections/abayas?category=Prayer+Abayas' },
          { name: 'Co-ord Sets', href: '/collections/abayas?category=Co-ords' },
          { name: 'Modest Maxi Dresses', href: '/collections/abayas?category=Modest+Dresses' },
          { name: 'Inner Slip Dresses', href: '/collections/abayas?category=Slip+Dresses' },
          { name: 'Travel & Hajj Wear', href: '/collections/abayas?category=Hajj%2FUmrah+Collection' },
        ],
      },
    ],
    featuredCard: {
      title: 'Comfort In Prayer & Ease',
      description: 'Two-piece prayer abaya sets cut from whisper-weight breathable fabric with integrated head coverings.',
      image: '/reference/category-hajj.png',
      href: '/collections/abayas?category=Prayer+Abayas',
      ctaText: 'Shop Modest Wear',
    },
  },
  {
    id: 'gifting',
    label: 'GIFTS',
    href: '/collections/hijabs?category=Gifts',
    hasMegaMenu: false,
  },
  {
    id: 'sale',
    label: 'SALE',
    href: '/collections/abayas?tag=Sale',
    hasMegaMenu: false,
  },
];
