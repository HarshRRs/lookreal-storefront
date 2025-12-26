'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Heart } from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import { formatPrice, calculateDiscount, getProductUrl, truncateText } from '@/lib/utils';
import { STORE_SLUG } from '@/lib/utils/constants';
import type { Product } from '@/types';
import { useCartStore } from '@/lib/store/cart';

interface ProductCardProps {
  product: Product;
  variant?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, variant = 'grid' }) => {
  const addItem = useCartStore((state) => state.addItem);
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const [isAdding, setIsAdding] = React.useState(false);

  const primaryImage = product.images.find(img => img.type === 'primary') || product.images[0];
  const hoverImage = product.images.find(img => img.type === 'gallery') || product.images[1];
  
  const discount = product.salePrice 
    ? calculateDiscount(product.basePrice, product.salePrice)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addItem(product);
    setTimeout(() => setIsAdding(false), 1000);
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  if (variant === 'list') {
    return (
      <Link href={getProductUrl(STORE_SLUG, product.slug)}>
        <Card hover className="group">
          <div className="flex flex-col sm:flex-row gap-4 p-4">
            <div className="relative w-full sm:w-48 aspect-square bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={primaryImage?.url || '/images/placeholder.jpg'}
                alt={primaryImage?.altText || product.name}
                fill
                className="object-cover"
              />
              {discount > 0 && (
                <div className="absolute top-2 left-2">
                  <Badge variant="discount">-{discount}%</Badge>
                </div>
              )}
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-accent transition-colors mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.shortDescription}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-accent">
                    {formatPrice(product.salePrice || product.basePrice)}
                  </span>
                  {product.salePrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(product.basePrice)}
                    </span>
                  )}
                </div>
                <Button variant="primary" size="sm" onClick={handleAddToCart} loading={isAdding}>
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={getProductUrl(STORE_SLUG, product.slug)}>
      <Card hover className="group">
        <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden rounded-t-2xl">
          <Image
            src={primaryImage?.url || '/images/placeholder.jpg'}
            alt={primaryImage?.altText || product.name}
            fill
            className="object-cover transition-opacity duration-300 group-hover:opacity-0"
          />
          {hoverImage && (
            <Image
              src={hoverImage.url}
              alt={hoverImage.altText}
              fill
              className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          )}
          
          {/* Badges */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            {discount > 0 && <Badge variant="discount">-{discount}%</Badge>}
            {product.bestSeller && <Badge variant="bestSeller">Best Seller</Badge>}
            {product.featured && <Badge variant="new">Featured</Badge>}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all hover:scale-110"
            aria-label="Add to wishlist"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-700'
              }`}
            />
          </button>

          {/* Quick Add to Cart */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="primary"
              className="w-full"
              onClick={handleAddToCart}
              loading={isAdding}
            >
              {isAdding ? 'Adding...' : 'Quick Add to Cart'}
            </Button>
          </div>
        </div>

        <div className="p-4">
          <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
          <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-accent transition-colors line-clamp-2">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(product.averageRating)
                      ? 'fill-accent text-accent'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-accent">
              {formatPrice(product.salePrice || product.basePrice)}
            </span>
            {product.salePrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.basePrice)}
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};
