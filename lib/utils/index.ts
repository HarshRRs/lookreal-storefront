import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price to currency string
 */
export function formatPrice(price: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(price);
}

/**
 * Calculate discount percentage
 */
export function calculateDiscount(originalPrice: number, salePrice: number): number {
  if (originalPrice <= 0) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

/**
 * Generate product URL
 */
export function getProductUrl(storeSlug: string, productSlug: string): string {
  return `/${storeSlug}/product/${productSlug}`;
}

/**
 * Generate category URL
 */
export function getCategoryUrl(storeSlug: string, categorySlug: string): string {
  return `/${storeSlug}/category/${categorySlug}`;
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}

/**
 * Debounce function for search inputs
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Get stock status label
 */
export function getStockStatusLabel(status: string): {
  label: string;
  color: string;
} {
  const statusMap: Record<string, { label: string; color: string }> = {
    "in-stock": { label: "In Stock", color: "text-green-600" },
    "low-stock": { label: "Low Stock", color: "text-orange-600" },
    "out-of-stock": { label: "Out of Stock", color: "text-red-600" },
  };
  return statusMap[status] || { label: "Unknown", color: "text-gray-600" };
}

/**
 * Generate star rating array for display
 */
export function getStarRating(rating: number): boolean[] {
  return Array.from({ length: 5 }, (_, index) => index < Math.round(rating));
}

/**
 * Format date to readable string
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Calculate cart totals
 */
export function calculateCartTotals(
  items: { quantity: number; priceSnapshot: number }[],
  shippingCost: number = 0,
  discountAmount: number = 0
) {
  const subtotal = items.reduce(
    (total, item) => total + item.quantity * item.priceSnapshot,
    0
  );
  const total = subtotal + shippingCost - discountAmount;
  return {
    subtotal,
    shipping: shippingCost,
    discount: discountAmount,
    total: Math.max(0, total),
  };
}

/**
 * Build query string from filters
 */
export function buildQueryString(filters: Record<string, any>): string {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v.toString()));
      } else {
        params.append(key, value.toString());
      }
    }
  });
  return params.toString();
}

/**
 * Parse query string to object
 */
export function parseQueryString(queryString: string): Record<string, any> {
  const params = new URLSearchParams(queryString);
  const result: Record<string, any> = {};
  params.forEach((value, key) => {
    if (result[key]) {
      if (Array.isArray(result[key])) {
        result[key].push(value);
      } else {
        result[key] = [result[key], value];
      }
    } else {
      result[key] = value;
    }
  });
  return result;
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Check if browser supports localStorage
 */
export function isLocalStorageAvailable(): boolean {
  try {
    const test = "__localStorage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}
