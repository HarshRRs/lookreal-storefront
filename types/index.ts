// Store Configuration
export interface StoreConfig {
  slug: string;
  name: string;
  description: string;
  theme: {
    primaryColor: string;
    accentColor: string;
    logo: string;
  };
  settings: {
    currency: string;
    shippingRegions: string[];
    paymentMethods: string[];
  };
  status: 'active' | 'inactive';
}

// Product Types
export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  shortDescription: string;
  fullDescription: string;
  basePrice: number;
  salePrice?: number;
  discountPercentage?: number;
  qualityTier: 'mirror' | 'premium' | 'standard';
  stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock';
  images: ProductImage[];
  categories: Category[];
  variants: ProductVariant[];
  specifications: Record<string, string>;
  seoMeta: SEOMeta;
  createdAt: string;
  featured: boolean;
  bestSeller: boolean;
  averageRating: number;
  reviewCount: number;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  altText: string;
  displayOrder: number;
  type: 'primary' | 'gallery' | 'lifestyle' | 'detail';
}

export interface ProductVariant {
  id: string;
  productId: string;
  type: 'color' | 'size';
  value: string;
  priceModifier?: number;
  sku: string;
  stockQuantity: number;
  images?: string[];
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  parentCategory?: string;
  image: string;
  productCount: number;
  displayOrder: number;
}

// Review Types
export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  reviewText: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  createdAt: string;
}

// Cart Types
export interface CartItem {
  productId: string;
  variantId?: string;
  quantity: number;
  priceSnapshot: number;
  product?: Product;
  variant?: ProductVariant;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
}

// Order Types
export interface Order {
  id: string;
  customerContact: {
    email: string;
    phone: string;
  };
  shippingAddress: ShippingAddress;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  discountAmount: number;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  estimatedDeliveryDate?: string;
}

export interface OrderItem {
  productId: string;
  variantId?: string;
  productName: string;
  variantDetails?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  estimatedDays: string;
  cost: number;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'cod' | 'online';
}

// SEO Types
export interface SEOMeta {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

// Filter Types
export interface ProductFilters {
  categories?: string[];
  brands?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  sizes?: string[];
  colors?: string[];
  inStockOnly?: boolean;
}

export interface SortOption {
  value: string;
  label: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
