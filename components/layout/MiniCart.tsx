'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { useCart } from '@/lib/context/CartContext';
import { formatPrice } from '@/lib/utils';

interface MiniCartProps {
    isOpen: boolean;
    onClose: () => void;
    storeSlug: string;
}

export const MiniCart: React.FC<MiniCartProps> = ({ isOpen, onClose, storeSlug }) => {
    const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="text-accent" />
                                <h2 className="text-2xl font-heading font-bold text-primary">Your Bag</h2>
                                <span className="bg-accent/10 text-accent px-2 py-0.5 rounded-full text-sm font-bold">
                                    {cartCount}
                                </span>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-4">
                                        <ShoppingBag size={40} className="text-gray-300" />
                                    </div>
                                    <p className="text-xl font-bold text-primary mb-2">Your bag is empty</p>
                                    <p className="text-gray-500 mb-8">Start adding some luxury pieces to your collection.</p>
                                    <Button variant="primary" onClick={onClose}>
                                        <Link href={`/${storeSlug}/products`}>Browse Products</Link>
                                    </Button>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={`${item.productId}-${item.variantId}`} className="flex gap-4 group">
                                        <div className="w-24 h-24 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0">
                                            <img
                                                src={typeof item.product?.images?.[0] === 'string' ? item.product.images[0] : (item.product?.images?.[0] as any)?.url || '/images/placeholder.jpg'}
                                                alt={item.product?.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="font-bold text-primary truncate pr-4">
                                                    {item.product?.name}
                                                </h3>
                                                <button
                                                    onClick={() => removeFromCart(item.productId, item.variantId)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                            <p className="text-sm text-gray-500 mb-3">{item.product?.brand}</p>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center border border-gray-100 rounded-full bg-gray-50 px-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                                                        className="p-1 hover:bg-white rounded-full transition-colors"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                                                        className="p-1 hover:bg-white rounded-full transition-colors"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <span className="font-bold text-accent">
                                                    {formatPrice(item.priceSnapshot * item.quantity)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-6 border-t border-gray-100 space-y-4">
                                <div className="flex justify-between items-center text-lg font-bold">
                                    <span>Subtotal</span>
                                    <span className="text-2xl text-accent">{formatPrice(cartTotal)}</span>
                                </div>
                                <p className="text-sm text-gray-500 text-center">
                                    Shipping and taxes calculated at checkout.
                                </p>
                                <div className="grid grid-cols-1 gap-3">
                                    <Button variant="primary" size="lg" className="w-full py-4 text-lg">
                                        <Link href={`/${storeSlug}/checkout`} className="flex items-center justify-center w-full" onClick={onClose}>
                                            Checkout Now
                                            <ArrowRight className="ml-2 w-5 h-5" />
                                        </Link>
                                    </Button>
                                    <Button variant="outline" size="lg" className="w-full py-4 text-lg border-gray-200">
                                        <Link href={`/${storeSlug}/cart`} className="w-full text-center" onClick={onClose}>
                                            View Bag
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
