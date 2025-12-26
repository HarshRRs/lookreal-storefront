'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronRight,
    MapPin,
    CreditCard,
    Truck,
    ArrowLeft,
    CheckCircle2,
    ShieldCheck,
    ShoppingBag
} from 'lucide-react';
import { Button, Input, Card, Badge } from '@/components/ui';
import { useCart } from '@/lib/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { useRouter } from 'next/navigation';

type CheckoutStep = 'shipping' | 'payment' | 'review';

export default function CheckoutPage({ params }: { params: { store: string } }) {
    const [step, setStep] = React.useState<CheckoutStep>('shipping');
    const { cart, cartTotal, clearCart } = useCart();
    const router = useRouter();

    if (cart.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                <Button variant="primary">
                    <Link href={`/${params.store}/products`}>Go to Shop</Link>
                </Button>
            </div>
        );
    }

    const handleCompleteOrder = () => {
        // In a real app, send order to API here
        clearCart();
        router.push(`/${params.store}/order-success`);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Checkout Navbar */}
            <div className="bg-white border-b border-gray-100 py-6">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    <Link href={`/${params.store}/cart`} className="flex items-center text-gray-500 hover:text-primary transition-colors">
                        <ArrowLeft className="mr-2" size={20} />
                        Back to Cart
                    </Link>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-heading font-bold text-primary">LOOKREAL</span>
                        <Badge variant="quality">Checkout</Badge>
                    </div>
                    <div className="invisible sm:visible flex items-center text-gray-400">
                        <ShieldCheck size={18} className="mr-1" />
                        <span className="text-xs uppercase tracking-wider font-bold">Secure Checkout</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Main Checkout Form */}
                    <div className="flex-1 space-y-6">

                        {/* Step Indicators */}
                        <div className="flex gap-4 mb-8">
                            {[
                                { id: 'shipping', label: 'Shipping', icon: MapPin },
                                { id: 'payment', label: 'Payment', icon: CreditCard },
                                { id: 'review', label: 'Review', icon: CheckCircle2 }
                            ].map((s, idx) => (
                                <div
                                    key={s.id}
                                    className={`flex-1 flex flex-col items-center gap-2 relative ${idx !== 2 ? "after:content-[''] after:absolute after:top-5 after:left-[calc(50%+2rem)] after:w-[calc(100%-4rem)] after:h-[1px] after:bg-gray-200" : ""}`}
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${step === s.id ? 'bg-accent border-accent text-white' : 'border-gray-200 bg-white text-gray-400'
                                        }`}>
                                        <s.icon size={20} />
                                    </div>
                                    <span className={`text-xs font-bold uppercase tracking-widest ${step === s.id ? 'text-accent' : 'text-gray-400'}`}>
                                        {s.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            {step === 'shipping' && (
                                <motion.div
                                    key="shipping"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-6"
                                >
                                    <Card className="p-8">
                                        <h2 className="text-2xl font-heading font-bold text-primary mb-6 flex items-center gap-2">
                                            <MapPin className="text-accent" />
                                            Shipping Address
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Input placeholder="First Name" />
                                            <Input placeholder="Last Name" />
                                            <div className="md:col-span-2">
                                                <Input placeholder="Address" />
                                            </div>
                                            <Input placeholder="City" />
                                            <Input placeholder="Postal Code" />
                                            <div className="md:col-span-2">
                                                <Input placeholder="Country" />
                                            </div>
                                        </div>
                                    </Card>

                                    <Card className="p-8">
                                        <h2 className="text-2xl font-heading font-bold text-primary mb-6 flex items-center gap-2">
                                            <Truck className="text-accent" />
                                            Shipping Method
                                        </h2>
                                        <div className="space-y-3">
                                            <label className="flex items-center justify-between p-4 border border-accent bg-accent/5 rounded-2xl cursor-pointer">
                                                <div className="flex items-center gap-4">
                                                    <input type="radio" name="shipping" checked readOnly className="w-5 h-5 text-accent" />
                                                    <div>
                                                        <p className="font-bold">Priority International Shipping</p>
                                                        <p className="text-xs text-gray-500">7-10 business days • Tracked & Insured</p>
                                                    </div>
                                                </div>
                                                <span className="font-bold">Calculated at Summary</span>
                                            </label>
                                        </div>
                                    </Card>

                                    <Button variant="primary" size="lg" className="w-full py-4 text-xl" onClick={() => setStep('payment')}>
                                        Continue to Payment
                                    </Button>
                                </motion.div>
                            )}

                            {step === 'payment' && (
                                <motion.div
                                    key="payment"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-6"
                                >
                                    <Card className="p-8">
                                        <h2 className="text-2xl font-heading font-bold text-primary mb-6 flex items-center gap-2">
                                            <CreditCard className="text-accent" />
                                            Payment Method
                                        </h2>
                                        <div className="space-y-4">
                                            <label className="flex items-center justify-between p-6 border border-gray-100 bg-gray-50/50 rounded-2xl cursor-pointer hover:border-accent transition-all">
                                                <div className="flex items-center gap-4">
                                                    <input type="radio" name="payment" className="w-5 h-5 text-accent" />
                                                    <div>
                                                        <p className="font-bold">Cryptocurrency (BTC/USDT/ETH)</p>
                                                        <p className="text-xs text-gray-500">5% Discount Applied automatically</p>
                                                    </div>
                                                </div>
                                            </label>
                                            <label className="flex items-center justify-between p-6 border border-accent bg-accent/5 rounded-2xl cursor-pointer transition-all">
                                                <div className="flex items-center gap-4">
                                                    <input type="radio" name="payment" checked readOnly className="w-5 h-5 text-accent" />
                                                    <div>
                                                        <p className="font-bold">Wise / Bank Transfer</p>
                                                        <p className="text-xs text-gray-500">Secure bank to bank transfer</p>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    </Card>

                                    <div className="flex gap-4">
                                        <Button variant="outline" size="lg" className="flex-1" onClick={() => setStep('shipping')}>Back</Button>
                                        <Button variant="primary" size="lg" className="flex-[2] py-4 text-xl" onClick={() => setStep('review')}>Review Order</Button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 'review' && (
                                <motion.div
                                    key="review"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-6"
                                >
                                    <Card className="p-8">
                                        <h2 className="text-2xl font-heading font-bold text-primary mb-6 flex items-center gap-2">
                                            <CheckCircle2 className="text-accent" />
                                            Final Review
                                        </h2>
                                        <p className="text-gray-600 mb-8">
                                            Please ensure all details are correct. Once submitted, our team will verify your payment and begin crafting your luxury piece.
                                        </p>
                                        <div className="space-y-4">
                                            <div className="flex justify-between py-2 border-b border-gray-50 text-sm">
                                                <span className="text-gray-400">Shipping to:</span>
                                                <span className="font-bold text-primary">New York, USA</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b border-gray-50 text-sm">
                                                <span className="text-gray-400">Method:</span>
                                                <span className="font-bold text-primary">Priority Tracked</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b border-gray-50 text-sm">
                                                <span className="text-gray-400">Payment:</span>
                                                <span className="font-bold text-primary">Wise Transfer</span>
                                            </div>
                                        </div>
                                    </Card>

                                    <div className="flex gap-4">
                                        <Button variant="outline" size="lg" className="flex-1" onClick={() => setStep('payment')}>Back</Button>
                                        <Button variant="primary" size="lg" className="flex-[2] py-4 text-xl bg-green-600 border-green-600 hover:bg-green-700" onClick={handleCompleteOrder}>
                                            Confirm & Pay
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Sidebar Summary */}
                    <div className="lg:w-[400px]">
                        <Card className="p-8 sticky top-24">
                            <h3 className="text-xl font-heading font-bold text-primary mb-6 flex items-center gap-2">
                                <ShoppingBag className="text-accent" />
                                Cart Items ({cart.length})
                            </h3>

                            <div className="space-y-4 max-h-[300px] overflow-y-auto mb-8 pr-2 custom-scrollbar">
                                {cart.map((item) => (
                                    <div key={`${item.productId}-${item.variantId}`} className="flex gap-3">
                                        <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                                            <img
                                                src={typeof item.product?.images?.[0] === 'string' ? item.product.images[0] : (item.product?.images?.[0] as any)?.url || '/images/placeholder.jpg'}
                                                alt={item.product?.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-primary truncate">{item.product?.name}</p>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                            <p className="text-sm font-bold text-accent">{formatPrice(item.priceSnapshot * item.quantity)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 pt-6 border-t border-gray-100">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-bold">{formatPrice(cartTotal)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Estimated Shipping</span>
                                    <span className="font-bold text-green-600">FREE</span>
                                </div>
                                <div className="flex justify-between items-center text-xl font-bold pt-4 border-t border-gray-50">
                                    <span>Total</span>
                                    <span className="text-2xl text-accent">{formatPrice(cartTotal)}</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
