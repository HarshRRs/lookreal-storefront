/**
 * Application constants for LOOKREAL storefront
 */

export const STORE_SLUG = process.env.NEXT_PUBLIC_STORE_SLUG || 'duplicategags';
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'LOOKREAL';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

// Navigation Links
export const NAV_LINKS = {
  shop: {
    label: 'Shop',
    items: [
      { label: 'All Products', href: `/${STORE_SLUG}/products` },
      { label: 'Categories', href: `/${STORE_SLUG}/categories` },
    ],
  },
  collections: {
    label: 'Collections',
    items: [
      { label: 'Best Sellers', href: `/${STORE_SLUG}/products?filter=best-sellers` },
      { label: 'New Arrivals', href: `/${STORE_SLUG}/products?filter=new-arrivals` },
      { label: 'Featured', href: `/${STORE_SLUG}/products?filter=featured` },
    ],
  },
  about: {
    label: 'About',
    href: `/${STORE_SLUG}/about`,
  },
  contact: {
    label: 'Contact',
    href: `/${STORE_SLUG}/contact`,
  },
};

// Footer Links
export const FOOTER_LINKS = {
  shop: {
    title: 'Shop',
    links: [
      { label: 'Products', href: `/${STORE_SLUG}/products` },
      { label: 'Categories', href: `/${STORE_SLUG}/categories` },
      { label: 'Best Sellers', href: `/${STORE_SLUG}/products?filter=best-sellers` },
    ],
  },
  information: {
    title: 'Information',
    links: [
      { label: 'About', href: `/${STORE_SLUG}/about` },
      { label: 'Contact', href: `/${STORE_SLUG}/contact` },
      { label: 'FAQ', href: `/${STORE_SLUG}/faq` },
    ],
  },
  policies: {
    title: 'Policies',
    links: [
      { label: 'Shipping', href: `/${STORE_SLUG}/shipping-policy` },
      { label: 'Returns', href: `/${STORE_SLUG}/return-refund-policy` },
      { label: 'Privacy', href: `/${STORE_SLUG}/privacy-policy` },
      { label: 'Terms', href: `/${STORE_SLUG}/terms-conditions` },
    ],
  },
  social: {
    title: 'Follow Us',
    links: [
      { label: 'Instagram', href: 'https://instagram.com/lookreal', icon: 'instagram' },
      { label: 'Pinterest', href: 'https://pinterest.com/lookreal', icon: 'pinterest' },
      { label: 'Facebook', href: 'https://facebook.com/lookreal', icon: 'facebook' },
    ],
  },
};

// Product Categories
export const PRODUCT_CATEGORIES = [
  { name: 'Tote Bags', slug: 'tote-bags' },
  { name: 'Shoulder Bags', slug: 'shoulder-bags' },
  { name: 'Crossbody Bags', slug: 'crossbody-bags' },
  { name: 'Mini Bags', slug: 'mini-bags' },
];

// Brands
export const BRANDS = [
  'Gucci',
  'Louis Vuitton',
  'Dior',
  'Chanel',
  'Hermès',
  'Prada',
];

// Shipping Methods
export const SHIPPING_METHODS = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: 'Delivery in 5-7 business days',
    estimatedDays: '5-7 days',
    cost: 9.99,
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: 'Delivery in 2-3 business days',
    estimatedDays: '2-3 days',
    cost: 19.99,
  },
  {
    id: 'overnight',
    name: 'Overnight Shipping',
    description: 'Next business day delivery',
    estimatedDays: '1 day',
    cost: 29.99,
  },
];

// Payment Methods
export const PAYMENT_METHODS = [
  {
    id: 'cod',
    name: 'Cash on Delivery',
    type: 'cod' as const,
  },
  {
    id: 'online',
    name: 'Online Payment',
    type: 'online' as const,
  },
];

// Sort Options
export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'price-low-high', label: 'Price: Low to High' },
  { value: 'price-high-low', label: 'Price: High to Low' },
  { value: 'best-sellers', label: 'Best Sellers' },
  { value: 'most-reviewed', label: 'Most Reviewed' },
];

// Bag Sizes
export const BAG_SIZES = [
  'Small',
  'Medium',
  'Large',
  'Extra Large',
];

// Quality Badges
export const QUALITY_BADGES = {
  mirror: { label: 'Mirror Quality', color: 'bg-accent text-white' },
  premium: { label: 'Premium Quality', color: 'bg-primary text-white' },
  standard: { label: 'Standard Quality', color: 'bg-gray-600 text-white' },
};

// Why LOOKREAL Value Propositions
export const VALUE_PROPOSITIONS = [
  {
    icon: 'shield-check',
    title: 'Premium Quality Replicas',
    description: 'Mirror-quality craftsmanship with authentic materials',
  },
  {
    icon: 'tag',
    title: 'Affordable Luxury',
    description: '90% savings vs authentic, no compromise on style',
  },
  {
    icon: 'truck',
    title: 'Worldwide Shipping',
    description: 'Fast delivery, secure packaging, tracking included',
  },
];

// FAQ Categories
export const FAQ_CATEGORIES = [
  'Ordering & Payment',
  'Shipping & Delivery',
  'Product Quality',
  'Returns & Refunds',
  'Account & Privacy',
];

// SEO Default Meta
export const DEFAULT_SEO = {
  title: 'LOOKREAL - Premium Replica Luxury Bags | Affordable Luxury',
  description: 'Shop high-quality replica luxury bags at LOOKREAL. Mirror quality craftsmanship, affordable prices, and worldwide shipping. Experience luxury you can feel.',
  keywords: ['replica luxury bags', 'duplicate designer bags', 'affordable luxury', 'mirror quality bags'],
};

// Image Placeholders
export const PLACEHOLDER_IMAGE = '/images/placeholder.jpg';
export const LOGO_IMAGE = '/images/logo.svg';

// Breakpoints (matching Tailwind config)
export const BREAKPOINTS = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1920,
};

// Animation Durations (ms)
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
};

// Cart Constants
export const CART_STORAGE_KEY = 'lookreal_cart';
export const FREE_SHIPPING_THRESHOLD = 100;

// Pagination
export const PRODUCTS_PER_PAGE = 12;
export const REVIEWS_PER_PAGE = 10;
