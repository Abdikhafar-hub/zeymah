import { formatCurrency, type CurrencyCode } from './currency';

export type Collection = 'Abayas' | 'Hijabs' | 'Gifts';

export interface ProductColor {
  name: string;
  value: string;
  image?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  lengthPurchased?: string;
  colorPurchased?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number; // in GBP pounds (e.g. 69.00 = £69.00)
  compareAtPrice?: number;
  collection: Collection;
  category: string;
  fabric: 'Nidha' | 'Georgette' | 'Chiffon' | 'Jersey' | 'Modal' | 'Linen' | 'Silk Satin' | 'Crepe';
  description: string;
  details: string[];
  careInstructions: string;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  tag?: 'Bestseller' | 'New' | 'Sale' | 'Trending';
  stock: number;
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
  rating: number;
  reviewCount: number;
  reviews?: ReviewItem[];
  frequentlyBoughtWith?: string[]; // IDs of complementary cross-sell items
}

export const referenceImages = {
  hero: '/reference/hero-crop.png',
  categories: '/reference/category-occasion.png',
  categoryHajj: '/reference/category-hajj.png',
  categoryEssential: '/reference/category-essential.png',
  abayas: '/reference/abaya-product.png',
  hijabs: '/reference/hijab-product.png',
  product: '/reference/product-main.png',
  productSecondary: '/reference/product-secondary.png',
};

export const sampleReviews: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Amina K.',
    rating: 5,
    date: '3 days ago',
    title: 'Flawless drape and luxurious feel',
    comment: 'The quality of the fabric is exceptional. I wore this for Eid prayers and family dinner; it stayed wrinkle-free and felt weightless all day. Length 54 was perfect with 2-inch kitten heels.',
    verified: true,
    lengthPurchased: '54',
    colorPurchased: 'Espresso Plum',
  },
  {
    id: 'rev-2',
    author: 'Zahra M.',
    rating: 5,
    date: '1 week ago',
    title: 'Best abaya in my wardrobe',
    comment: 'Subtle elegance done right. The stitching on the sleeves is so neat and delicate. Arrived in London within 48 hours in gorgeous signature packaging.',
    verified: true,
    lengthPurchased: '56',
    colorPurchased: 'Noir',
  },
  {
    id: 'rev-3',
    author: 'Fatima H.',
    rating: 5,
    date: '2 weeks ago',
    title: 'Incredible modest silhouette',
    comment: 'Generous cut without feeling oversized or boxy. Completely opaque even under sunlight. Highly recommend following the height guide.',
    verified: true,
    lengthPurchased: '52',
    colorPurchased: 'Silver Mist',
  },
  {
    id: 'rev-4',
    author: 'Mariam S.',
    rating: 4,
    date: '1 month ago',
    title: 'Beautiful color and movement',
    comment: 'The tone is even richer in person than on screen. It flows like a dream when walking. Will definitely order in another shade.',
    verified: true,
    lengthPurchased: '58',
    colorPurchased: 'Stone',
  },
];

export const catalog: Product[] = [
  {
    id: 'luxury-georgette-hijab',
    slug: 'luxury-georgette-hijab',
    name: 'Luxury Georgette Hijab with Dainty Detailing',
    price: 30.0,
    compareAtPrice: 38.0,
    collection: 'Hijabs',
    category: 'Luxury Hijabs',
    fabric: 'Georgette',
    description: 'A softly structured georgette hijab finished with fine tonal detailing. Designed to sit beautifully and move effortlessly from everyday dressing to special occasions.',
    details: [
      'Crafted from high-grade textured luxury georgette',
      'Breathable, airy weave with exceptional opacity',
      'Subtle hand-finished hem with delicate tonal stitching',
      'Dimensions: 195cm x 75cm for generous styling coverage',
    ],
    careInstructions: 'Hand wash in cold water with gentle detergent. Line dry in shade. Cool iron on reverse or steam.',
    images: [referenceImages.product, referenceImages.productSecondary, referenceImages.categories],
    colors: [
      { name: 'Espresso Plum', value: '#341b20' },
      { name: 'Stone', value: '#d9d7d1' },
      { name: 'Cloud', value: '#eee9e2' },
      { name: 'Slate', value: '#858495' },
      { name: 'Rosewood', value: '#a98782' },
    ],
    sizes: ['Standard (195x75cm)'],
    tag: 'Bestseller',
    stock: 18,
    featured: true,
    bestseller: true,
    newArrival: false,
    rating: 4.9,
    reviewCount: 142,
    reviews: sampleReviews,
    frequentlyBoughtWith: ['magnetic-hijab-pins', 'cotton-modal-undercap'],
  },
  {
    id: 'essential-open-abaya',
    slug: 'essential-open-abaya',
    name: 'Essential Fluid Open Abaya',
    price: 69.0,
    collection: 'Abayas',
    category: 'Open Abayas',
    fabric: 'Nidha',
    description: 'An everyday open abaya cut from a fluid, softly matte Korean Nidha fabric with generous movement, clean concealed snap buttons, and deep slip pockets.',
    details: [
      'Premium Korean Nidha with a buttery soft handfeel',
      'Discreet front press-studs to wear fully open or fastened',
      'Deep side in-seam pockets for everyday practicality',
      'Includes matching fabric tie belt for optional waist definition',
    ],
    careInstructions: 'Machine wash on delicate 30°C cycle. Hang dry immediately. Cool iron if needed.',
    images: [referenceImages.abayas, referenceImages.categoryEssential, referenceImages.productSecondary],
    colors: [
      { name: 'Noir Black', value: '#1e2424' },
      { name: 'Oatmeal Taupe', value: '#d5cfc5' },
      { name: 'Midnight Navy', value: '#1a2233' },
      { name: 'Sage Leaf', value: '#798b7e' },
    ],
    sizes: ['52', '54', '56', '58', '60'],
    tag: 'New',
    stock: 24,
    featured: true,
    bestseller: false,
    newArrival: true,
    rating: 4.8,
    reviewCount: 87,
    reviews: sampleReviews,
    frequentlyBoughtWith: ['satin-inner-slip-dress', 'luxury-georgette-hijab'],
  },
  {
    id: 'embroidered-occasion-abaya',
    slug: 'embroidered-occasion-abaya',
    name: 'Embroidered Occasion Silk Abaya',
    price: 125.0,
    compareAtPrice: 149.0,
    collection: 'Abayas',
    category: 'Occasion Abayas',
    fabric: 'Silk Satin',
    description: 'A polished occasion layer with intricate hand-finished embroidery placed along the cascading sleeve and front opening, tailored for celebratory gatherings and Eid.',
    details: [
      'Subtly lustrous silk-blend crepe with weighted drape',
      'Hand-applied tonal beadwork and floral vine embroidery',
      'Flared bell sleeve detail for sophisticated silhouette',
      'Matching embroidered chiffon scarf included',
    ],
    careInstructions: 'Dry clean recommended due to intricate hand embroidery. Steam iron on reverse.',
    images: [referenceImages.categories, referenceImages.product, referenceImages.abayas],
    colors: [
      { name: 'Silver Mist', value: '#c5c7c7' },
      { name: 'Midnight Jet', value: '#16191b' },
      { name: 'Rose Quartz', value: '#d8b9b5' },
    ],
    sizes: ['52', '54', '56', '58', '60'],
    tag: 'Sale',
    stock: 7,
    featured: true,
    bestseller: true,
    newArrival: false,
    rating: 5.0,
    reviewCount: 64,
    reviews: sampleReviews,
    frequentlyBoughtWith: ['satin-inner-slip-dress', 'magnetic-hijab-pins'],
  },
  {
    id: 'prayer-abaya-set',
    slug: 'prayer-abaya-set',
    name: 'Two-Piece Modest Prayer Abaya Set',
    price: 52.0,
    collection: 'Abayas',
    category: 'Prayer Abayas',
    fabric: 'Jersey',
    description: 'A lightweight two-piece prayer set made for quiet comfort. Features an attached generous overhead khimar scarf with elasticated sleeves and a full flowing maxi skirt.',
    details: [
      'Silky stretch modal-cotton blend for complete opacity and breathability',
      'Attached overhead khimar with soft under-chin coverage',
      'Full elasticated waistband skirt with generous step circumference',
      'Includes compact matching travel pouch',
    ],
    careInstructions: 'Machine wash warm. Tumble dry low or line dry.',
    images: [referenceImages.categoryHajj, referenceImages.abayas, referenceImages.product],
    colors: [
      { name: 'Cloud White', value: '#f4f4f0' },
      { name: 'Desert Sand', value: '#cfc4b6' },
      { name: 'Muted Olive', value: '#6a7364' },
    ],
    sizes: ['S/M (Height 5\'0"-5\'4")', 'L/XL (Height 5\'5"-5\'10")'],
    stock: 32,
    featured: false,
    bestseller: true,
    newArrival: false,
    rating: 4.9,
    reviewCount: 112,
    reviews: sampleReviews,
  },
  {
    id: 'premium-jersey-hijab',
    slug: 'premium-jersey-hijab',
    name: 'Everyday Premium Rayon Jersey Hijab',
    price: 18.0,
    collection: 'Hijabs',
    category: 'Everyday Hijabs',
    fabric: 'Jersey',
    description: 'A soft, easy jersey essential with a 4-way gentle stretch and opaque finish for reliable pin-free everyday styling.',
    details: [
      'Ultra-soft natural modal rayon with spandex elasticity',
      '100% opaque without requiring an undercap or pins',
      'Breathable, moisture-wicking and comfortable for all-day wear',
      'Dimensions: 180cm x 70cm',
    ],
    careInstructions: 'Machine wash cold with like colours. Lay flat to dry.',
    images: [referenceImages.hijabs, referenceImages.product, referenceImages.categoryEssential],
    colors: [
      { name: 'Dusty Mauve', value: '#ad929e' },
      { name: 'Deep Noir', value: '#222222' },
      { name: 'Oat Latte', value: '#ded5c5' },
      { name: 'Charcoal Grey', value: '#4c4c52' },
    ],
    sizes: ['Standard (180x70cm)'],
    tag: 'Bestseller',
    stock: 45,
    featured: true,
    bestseller: true,
    newArrival: false,
    rating: 4.9,
    reviewCount: 230,
    reviews: sampleReviews,
    frequentlyBoughtWith: ['cotton-modal-undercap', 'magnetic-hijab-pins'],
  },
  {
    id: 'premium-chiffon-hijab',
    slug: 'premium-chiffon-hijab',
    name: 'Featherlight Premium Chiffon Hijab',
    price: 22.0,
    collection: 'Hijabs',
    category: 'Chiffon Hijabs',
    fabric: 'Chiffon',
    description: 'Airy chiffon with a graceful drape and a softly luminous finish, perfect for polished occasion layering and clean drapes.',
    details: [
      'Fine non-slip chiffon with subtle matte texture',
      'Light catching with elegant translucent movement',
      'Pre-washed fabric to minimize static cling',
      'Dimensions: 185cm x 75cm',
    ],
    careInstructions: 'Hand wash gently in lukewarm water. Line dry.',
    images: [referenceImages.hijabs, referenceImages.categories, referenceImages.productSecondary],
    colors: [
      { name: 'Warm Cocoa', value: '#755047' },
      { name: 'Lilac Mist', value: '#9a9aaa' },
      { name: 'Ivory Cream', value: '#ede8dd' },
    ],
    sizes: ['Standard (185x75cm)'],
    stock: 19,
    featured: false,
    bestseller: false,
    newArrival: true,
    rating: 4.7,
    reviewCount: 53,
    reviews: sampleReviews,
    frequentlyBoughtWith: ['magnetic-hijab-pins', 'cotton-modal-undercap'],
  },
  {
    id: 'kimono-abaya',
    slug: 'kimono-abaya',
    name: 'Silk Touch Draped Kimono Abaya',
    price: 84.0,
    compareAtPrice: 98.0,
    collection: 'Abayas',
    category: 'Kimono Collection',
    fabric: 'Silk Satin',
    description: 'An elegant kimono shape with wide batwing sleeves and a subtle satin handfeel for relaxed occasion dressing and effortless layering.',
    details: [
      'Fluid satin-sheen weave with luxurious drop shoulders',
      'Dramatic wide kimono cuffs with clean seam lines',
      'Can be styled with or without the included matching belt',
      'Non-sheer, graceful ankle-grazing length',
    ],
    careInstructions: 'Delicate hand wash or dry clean. Hang dry. Steam only.',
    images: [referenceImages.categoryEssential, referenceImages.abayas, referenceImages.product],
    colors: [
      { name: 'Biscuit Beige', value: '#cbb7a9' },
      { name: 'Deep Sea Teal', value: '#19383a' },
      { name: 'Rich Terracotta', value: '#8f4f43' },
    ],
    sizes: ['52', '54', '56', '58', '60'],
    tag: 'Trending',
    stock: 11,
    featured: true,
    bestseller: true,
    newArrival: true,
    rating: 4.8,
    reviewCount: 42,
    reviews: sampleReviews,
    frequentlyBoughtWith: ['satin-inner-slip-dress', 'luxury-georgette-hijab'],
  },
  {
    id: 'satin-inner-slip-dress',
    slug: 'satin-inner-slip-dress',
    name: 'Sleeveless Satin Inner Slip Dress',
    price: 35.0,
    collection: 'Abayas',
    category: 'Slip Dresses',
    fabric: 'Silk Satin',
    description: 'The quintessential base layer for open abayas and kimonos. Tailored from anti-static silk touch satin with a flattering round neckline and smooth side slit for walking ease.',
    details: [
      'Silky liquid satin with breathable, cool touch finish',
      'Round modesty neckline designed to sit flush under abayas',
      'Subtle 10" bottom side slits for ease of stride',
      'Available in lengths 52 to 60 for seamless pairing',
    ],
    careInstructions: 'Machine wash 30°C delicate. Cool iron on reverse.',
    images: [referenceImages.categoryHajj, referenceImages.productSecondary, referenceImages.abayas],
    colors: [
      { name: 'Vanilla Cream', value: '#e8e2d5' },
      { name: 'Classic Black', value: '#1c1c1c' },
      { name: 'Caramel Nude', value: '#bca18d' },
    ],
    sizes: ['52', '54', '56', '58', '60'],
    tag: 'Bestseller',
    stock: 35,
    featured: false,
    bestseller: true,
    newArrival: false,
    rating: 4.9,
    reviewCount: 96,
    reviews: sampleReviews,
    frequentlyBoughtWith: ['essential-open-abaya', 'luxury-georgette-hijab'],
  },
  {
    id: 'linen-textured-abaya',
    slug: 'linen-textured-abaya',
    name: 'Organic Washed Linen Button Abaya',
    price: 79.0,
    collection: 'Abayas',
    category: 'Closed Abayas',
    fabric: 'Linen',
    description: 'Crafted from pure breathable European flax linen. Tailored with a relaxed mandarin collar, mock-horn front buttons, and discreet side pockets for quiet luxury.',
    details: [
      '100% sustainably sourced washed European linen',
      'Naturally thermoregulating — keeps you cool in heat and warm in cold',
      'Subtle natural slub texture that softens with each wash',
      'Relaxed straight silhouette with tailored cuffs',
    ],
    careInstructions: 'Machine wash cold. Shake out damp and line dry for natural lived-in linen texture.',
    images: [referenceImages.abayas, referenceImages.categoryEssential, referenceImages.categories],
    colors: [
      { name: 'Natural Oatmeal', value: '#d2c9b8' },
      { name: 'Washed Olive', value: '#6d7565' },
      { name: 'Dark Ink', value: '#242a30' },
    ],
    sizes: ['52', '54', '56', '58', '60'],
    tag: 'New',
    stock: 14,
    featured: true,
    bestseller: false,
    newArrival: true,
    rating: 4.8,
    reviewCount: 38,
    reviews: sampleReviews,
    frequentlyBoughtWith: ['premium-chiffon-hijab', 'magnetic-hijab-pins'],
  },
  {
    id: 'magnetic-hijab-pins',
    slug: 'magnetic-hijab-pins',
    name: 'Ultra-Strong Magnetic Hijab Pins (Set of 4)',
    price: 12.0,
    collection: 'Hijabs',
    category: 'Accessories',
    fabric: 'Modal',
    description: 'Gentle, snag-free magnetic pins engineered with industrial-grade rare-earth magnets. Keeps fine chiffons and silks secure all day without piercing or snagging delicate fabrics.',
    details: [
      'Pack of 4 pairs in Champagne Gold, Rose Gold, Silver, and Matte Noir',
      'Ultra-strong hold that withstands wind and movement',
      'Smooth rounded alloy casing that never damages fine fibers',
      'Hypoallergenic and nickel-free finish',
    ],
    careInstructions: 'Wipe clean with a soft dry microfiber cloth.',
    images: [referenceImages.productSecondary, referenceImages.product, referenceImages.hijabs],
    colors: [{ name: 'Metallic Quartet', value: '#c7b299' }],
    sizes: ['One Size (Set of 4)'],
    tag: 'Bestseller',
    stock: 150,
    featured: false,
    bestseller: true,
    newArrival: false,
    rating: 5.0,
    reviewCount: 340,
    reviews: sampleReviews,
  },
  {
    id: 'cotton-modal-undercap',
    slug: 'cotton-modal-undercap',
    name: 'Breathable Cotton Modal Tube Undercap',
    price: 8.0,
    collection: 'Hijabs',
    category: 'Accessories',
    fabric: 'Modal',
    description: 'A seamless, stay-put tube undercap crafted from organic cotton modal. Keeps hair comfortably tucked without slipping or causing tension headaches.',
    details: [
      '95% organic modal cotton, 5% elastane for ergonomic fit',
      'Open-ended tube design accommodates all hair volumes and buns',
      'Cool-touch, anti-bacterial weave protects hair edges',
    ],
    careInstructions: 'Machine wash warm with similar tones.',
    images: [referenceImages.hijabs, referenceImages.productSecondary, referenceImages.product],
    colors: [
      { name: 'Nude Beige', value: '#e2d3c2' },
      { name: 'Jet Black', value: '#1a1a1a' },
      { name: 'Soft White', value: '#f9f8f4' },
    ],
    sizes: ['One Size'],
    stock: 200,
    featured: false,
    bestseller: true,
    newArrival: false,
    rating: 4.9,
    reviewCount: 180,
    reviews: sampleReviews,
  },
  {
    id: 'eid-gift-box',
    slug: 'eid-gift-box',
    name: 'The Zeymah Curated Gift Box Edit',
    price: 48.0,
    compareAtPrice: 58.0,
    collection: 'Gifts',
    category: 'Gifts',
    fabric: 'Georgette',
    description: 'A beautifully packaged gift edit featuring one luxury georgette hijab, one pair of magnetic pins, an organic undercap, and a handwritten embossed gift card presented in our signature gold-foil magnetic box.',
    details: [
      'Includes: 1x Luxury Georgette Hijab in chosen shade',
      'Includes: 1x Set of 4 Metallic Magnetic Hijab Pins',
      'Includes: 1x Breathable Modal Undercap',
      'Packaged in an embossed rigid keepsake box tied with satin ribbon',
    ],
    careInstructions: 'Store items in keepsake box away from moisture.',
    images: [referenceImages.categories, referenceImages.product, referenceImages.hijabs],
    colors: [
      { name: 'Signature Rosewood', value: '#a98782' },
      { name: 'Midnight Noir', value: '#242424' },
      { name: 'Oatmeal & Gold', value: '#d9c7bb' },
    ],
    sizes: ['Deluxe Gift Box'],
    tag: 'Bestseller',
    stock: 28,
    featured: true,
    bestseller: true,
    newArrival: true,
    rating: 5.0,
    reviewCount: 78,
    reviews: sampleReviews,
  },
];

/**
 * Backwards compatibility helper with multi-currency support.
 */
export function formatPrice(priceInGbp: number, currency: CurrencyCode = 'GBP'): string {
  return formatCurrency(priceInGbp, currency);
}