export type Collection = 'Abayas' | 'Hijabs' | 'Gifts';

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  collection: Collection;
  category: string;
  description: string;
  images: string[];
  colors: { name: string; value: string }[];
  sizes?: string[];
  tag?: string;
  stock: number;
  featured?: boolean;
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

const imageSet = (primary: string, secondary = referenceImages.productSecondary) => [primary, secondary, referenceImages.categories];

export const catalog: Product[] = [
  {
    id: 'luxury-georgette-hijab',
    slug: 'luxury-georgette-hijab',
    name: 'Luxury Georgette Hijab with Dainty Detailing - Espresso Plum',
    price: 3000,
    collection: 'Hijabs',
    category: 'Luxury Hijabs',
    description: 'A softly structured georgette hijab finished with fine tonal detailing. Designed to sit beautifully and move effortlessly from everyday dressing to special occasions.',
    images: imageSet(referenceImages.product),
    colors: [
      { name: 'Espresso Plum', value: '#341b20' },
      { name: 'Stone', value: '#d9d7d1' },
      { name: 'Cloud', value: '#eee9e2' },
      { name: 'Slate', value: '#858495' },
      { name: 'Rosewood', value: '#a98782' },
    ],
    tag: 'Bestseller',
    stock: 12,
    featured: true,
  },
  {
    id: 'essential-open-abaya',
    slug: 'essential-open-abaya',
    name: 'Essential Open Abaya',
    price: 6900,
    collection: 'Abayas',
    category: 'Essential Abayas',
    description: 'An everyday open abaya cut from a fluid, softly matte fabric with generous movement and a clean front.',
    images: imageSet(referenceImages.abayas, referenceImages.categories),
    colors: [{ name: 'Noir', value: '#1e2424' }, { name: 'Oat', value: '#d5cfc5' }],
    sizes: ['52', '54', '56', '58', '60'],
    tag: 'New',
    stock: 8,
    featured: true,
  },
  {
    id: 'embroidered-occasion-abaya',
    slug: 'embroidered-occasion-abaya',
    name: 'Embroidered Occasion Abaya',
    price: 12500,
    compareAtPrice: 14900,
    collection: 'Abayas',
    category: 'Occasion Abayas',
    description: 'A polished occasion layer with hand-finished embroidery placed along the sleeve and front opening.',
    images: imageSet(referenceImages.categories, referenceImages.product),
    colors: [{ name: 'Silver Mist', value: '#c5c7c7' }, { name: 'Midnight', value: '#273033' }],
    sizes: ['52', '54', '56', '58'],
    tag: 'Sale',
    stock: 3,
    featured: true,
  },
  {
    id: 'prayer-abaya-set',
    slug: 'prayer-abaya-set',
    name: 'Prayer Abaya Set',
    price: 5200,
    collection: 'Abayas',
    category: 'Prayer Abayas',
    description: 'A lightweight two-piece prayer set made for quiet comfort, with a generous hooded silhouette.',
    images: imageSet(referenceImages.abayas),
    colors: [{ name: 'Cloud White', value: '#f1f0ec' }],
    sizes: ['S/M', 'L/XL'],
    stock: 14,
  },
  {
    id: 'premium-jersey-hijab',
    slug: 'premium-jersey-hijab',
    name: 'Premium Jersey Hijab',
    price: 1800,
    collection: 'Hijabs',
    category: 'Everyday Hijabs',
    description: 'A soft, easy jersey essential with a gentle stretch and opaque finish for reliable everyday styling.',
    images: imageSet(referenceImages.hijabs, referenceImages.product),
    colors: [{ name: 'Mauve', value: '#ad929e' }, { name: 'Black', value: '#292525' }],
    tag: 'Everyday',
    stock: 26,
    featured: true,
  },
  {
    id: 'premium-chiffon-hijab',
    slug: 'premium-chiffon-hijab',
    name: 'Premium Chiffon Hijab',
    price: 2200,
    collection: 'Hijabs',
    category: 'Chiffon Hijabs',
    description: 'Airy chiffon with a graceful drape and a softly luminous finish, perfect for polished layering.',
    images: imageSet(referenceImages.hijabs, referenceImages.categories),
    colors: [{ name: 'Cocoa', value: '#755047' }, { name: 'Lilac Grey', value: '#9a9aaa' }],
    stock: 0,
    tag: 'Sold out',
  },
  {
    id: 'kimono-abaya',
    slug: 'kimono-abaya',
    name: 'Silk Touch Kimono Abaya',
    price: 8400,
    collection: 'Abayas',
    category: 'Kimono Collection',
    description: 'An elegant kimono shape with wide sleeves and a subtle satin handfeel for relaxed occasion dressing.',
    images: imageSet(referenceImages.categories, referenceImages.abayas),
    colors: [{ name: 'Biscuit', value: '#cbb7a9' }, { name: 'Deep Teal', value: '#19383a' }],
    sizes: ['52', '54', '56', '58', '60'],
    stock: 6,
  },
  {
    id: 'eid-gift-box',
    slug: 'eid-gift-box',
    name: 'Eid Edit Gift Box',
    price: 4500,
    collection: 'Gifts',
    category: 'Gifts',
    description: 'A considered edit of an everyday hijab, pins and a handwritten note wrapped for gifting.',
    images: imageSet(referenceImages.hijabs, referenceImages.categories),
    colors: [{ name: 'Signature', value: '#d9c7bb' }],
    stock: 10,
  },
];

export const formatPrice = (price: number) => `KSh ${price.toLocaleString('en-KE')}.00`;