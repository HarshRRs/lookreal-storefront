'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Tag, Truck, Star, ArrowRight } from 'lucide-react';
import { Button, Card, Badge } from '@/components/ui';
import { STORE_SLUG, VALUE_PROPOSITIONS, PRODUCT_CATEGORIES } from '@/lib/utils/constants';
import { formatPrice } from '@/lib/utils';

// Mock data - In production, this would come from API
const mockBestSellers = [
  {
    id: '1',
    name: 'Classic Flap Bag',
    brand: 'Chanel',
    slug: 'classic-flap-bag',
    basePrice: 299,
    salePrice: 249,
    images: [{ url: '/images/placeholder.jpg', altText: 'Classic Flap Bag' }],
    averageRating: 4.8,
    reviewCount: 124,
  },
  {
    id: '2',
    name: 'Speedy 30',
    brand: 'Louis Vuitton',
    slug: 'speedy-30',
    basePrice: 279,
    salePrice: 229,
    images: [{ url: '/images/placeholder.jpg', altText: 'Speedy 30' }],
    averageRating: 4.9,
    reviewCount: 156,
  },
  {
    id: '3',
    name: 'Dionysus Bag',
    brand: 'Gucci',
    slug: 'dionysus-bag',
    basePrice: 349,
    salePrice: 289,
    images: [{ url: '/images/placeholder.jpg', altText: 'Dionysus Bag' }],
    averageRating: 4.7,
    reviewCount: 98,
  },
  {
    id: '4',
    name: 'Lady Dior',
    brand: 'Dior',
    slug: 'lady-dior',
    basePrice: 399,
    salePrice: 329,
    images: [{ url: '/images/placeholder.jpg', altText: 'Lady Dior' }],
    averageRating: 5.0,
    reviewCount: 201,
  },
];

const mockReviews = [
  {
    id: '1',
    customerName: 'Sarah M.',
    rating: 5,
    reviewText: 'Absolutely stunning quality! The attention to detail is incredible. Feels just like the real thing.',
    productName: 'Classic Flap Bag',
    verifiedPurchase: true,
  },
  {
    id: '2',
    customerName: 'Emily R.',
    rating: 5,
    reviewText: 'Best purchase ever! Fast shipping and the bag exceeded my expectations. Highly recommend!',
    productName: 'Speedy 30',
    verifiedPurchase: true,
  },
  {
    id: '3',
    customerName: 'Jessica L.',
    rating: 4,
    reviewText: 'Great quality for the price. The leather feels premium and all hardware is solid.',
    productName: 'Dionysus Bag',
    verifiedPurchase: true,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] md:h-[90vh] bg-gradient-to-br from-gray-100 to-secondary flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-primary mb-6">
            Luxury You Can Feel.
            <br />
            <span className="text-accent">Style You Deserve.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Experience the essence of luxury with our mirror-quality replica bags. Affordable elegance, uncompromising style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" className="group">
              <Link href={`/${STORE_SLUG}/products`} className="flex items-center">
                Shop Bags
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              <Link href={`/${STORE_SLUG}/categories`}>Explore Collections</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-semibold text-primary mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover your perfect style from our curated collection of luxury replica bags
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCT_CATEGORIES.map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/${STORE_SLUG}/category/${category.slug}`}>
                  <Card hover className="group overflow-hidden">
                    <div className="aspect-[4/5] bg-secondary relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                      <div className="absolute bottom-4 left-4 z-20 text-white">
                        <h3 className="text-2xl font-heading font-semibold mb-1 group-hover:text-accent transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm opacity-90">Explore Collection</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 px-4 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-heading font-semibold text-primary mb-2">
                Best Sellers
              </h2>
              <p className="text-gray-600">Our most loved luxury replicas</p>
            </div>
            <Link
              href={`/${STORE_SLUG}/products?filter=best-sellers`}
              className="hidden md:block text-accent hover:underline font-medium"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockBestSellers.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/${STORE_SLUG}/product/${product.slug}`}>
                  <Card hover className="group">
                    <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden rounded-t-2xl">
                      <div className="absolute top-4 left-4 z-10">
                        <Badge variant="bestSeller">Best Seller</Badge>
                      </div>
                      <div className="absolute top-4 right-4 z-10">
                        <Badge variant="quality">Mirror Quality</Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                      <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-accent transition-colors line-clamp-2">
                        {product.name}
                      </h3>
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
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-accent">
                          {formatPrice(product.salePrice)}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(product.basePrice)}
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why LOOKREAL */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-semibold text-primary mb-4">
              Why Choose LOOKREAL
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUE_PROPOSITIONS.map((prop, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6">
                  {prop.icon === 'shield-check' && <ShieldCheck className="w-8 h-8 text-accent" />}
                  {prop.icon === 'tag' && <Tag className="w-8 h-8 text-accent" />}
                  {prop.icon === 'truck' && <Truck className="w-8 h-8 text-accent" />}
                </div>
                <h3 className="text-2xl font-heading font-semibold text-primary mb-3">
                  {prop.title}
                </h3>
                <p className="text-gray-600">{prop.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-20 px-4 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-semibold text-primary mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600">Thousands of satisfied customers worldwide</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < review.rating ? 'fill-accent text-accent' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 line-clamp-4">{review.reviewText}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{review.customerName}</p>
                        <p className="text-sm text-gray-500">{review.productName}</p>
                      </div>
                      {review.verifiedPurchase && (
                        <Badge variant="quality" className="text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-accent text-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
            Ready to Elevate Your Style?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers and experience luxury without the premium price tag.
          </p>
          <Button variant="secondary" size="lg">
            <Link href={`/${STORE_SLUG}/products`}>Start Shopping Now</Link>
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
