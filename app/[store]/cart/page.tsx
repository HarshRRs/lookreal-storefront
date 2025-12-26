'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { useCart } from '@/lib/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { STORE_SLUG } from '@/lib/utils/constants';

export default function CartPage({ params }: { params: { store: string } }) {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const shippingCharge = cartTotal > 500 ? 0 : 25; // Example logic

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={48} className="text-gray-300" />
        </div>
        <h1 className="text-4xl font-heading font-bold text-primary mb-4">Your Bag is Empty</h1>
        <p className="text-gray-500 text-lg mb-8 max-w-md">
          Looks like you haven't added any premium replica bags to your collection yet.
        </p>
        <Button variant="primary" size="lg">
          <Link href={`/${params.store}/products`}>Explore Our Collection</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items List */}
        <div className="flex-1">
          <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
            <h1 className="text-4xl font-heading font-bold text-primary">Shopping Bag</h1>
            <span className="text-gray-500 font-medium">{cartCount} Items</span>
          </div>

          <div className="space-y-6">
            {cart.map((item) => (
              <motion.div
                key={`${item.productId}-${item.variantId}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row gap-6 p-6 bg-white border border-gray-100 rounded-3xl hover:shadow-luxury transition-shadow"
              >
                <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0">
                  <img
                    src={typeof item.product?.images?.[0] === 'string' ? item.product.images[0] : (item.product?.images?.[0] as any)?.url || '/images/placeholder.jpg'}
                    alt={item.product?.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">
                        {item.product?.name}
                      </h3>
                      <p className="text-gray-500">{item.product?.brand}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId, item.variantId)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center border border-gray-200 rounded-full p-1 bg-gray-50">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                        className="p-2 hover:bg-white rounded-full transition-colors"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="w-12 text-center font-bold text-lg">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                        className="p-2 hover:bg-white rounded-full transition-colors"
                      >
                        <Plus size={18} />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-400 mb-1">Price per item: {formatPrice(item.priceSnapshot)}</p>
                      <p className="text-2xl font-bold text-accent">{formatPrice(item.priceSnapshot * item.quantity)}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* USPs specifically for cart */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-6 bg-secondary rounded-3xl">
              <ShieldCheck className="text-accent w-10 h-10" />
              <div>
                <p className="font-bold">Secure Shopping</p>
                <p className="text-xs text-gray-500">Every transaction is protected</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-secondary rounded-3xl">
              <Truck className="text-accent w-10 h-10" />
              <div>
                <p className="font-bold">Fast Delivery</p>
                <p className="text-xs text-gray-500">Worldwide shipping available</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-secondary rounded-3xl">
              <RotateCcw className="text-accent w-10 h-10" />
              <div>
                <p className="font-bold">Easy Returns</p>
                <p className="text-xs text-gray-500">14-day return policy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:w-96">
          <div className="sticky top-24">
            <Card className="p-8">
              <h2 className="text-2xl font-heading font-bold text-primary mb-6">Order Summary</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-bold">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-bold">{shippingCharge === 0 ? 'FREE' : formatPrice(shippingCharge)}</span>
                </div>
                {shippingCharge > 0 && (
                  <p className="text-xs text-accent bg-accent/5 p-3 rounded-xl">
                    Add {formatPrice(500 - cartTotal)} more to qualify for <strong>FREE SHIPPING</strong>.
                  </p>
                )}
                <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                  <span className="text-xl font-bold">Total</span>
                  <span className="text-3xl font-bold text-accent">{formatPrice(cartTotal + shippingCharge)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button variant="primary" size="lg" className="w-full py-4 text-xl">
                  <Link href={`/${params.store}/checkout`} className="flex items-center justify-center">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 w-6 h-6" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="w-full py-4 text-lg border-gray-200">
                  <Link href={`/${params.store}/products`} className="w-full text-center">
                    Continue Shopping
                  </Link>
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 italic text-sm text-gray-400">
                You're one step away from owning authentic-grade luxury.
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
