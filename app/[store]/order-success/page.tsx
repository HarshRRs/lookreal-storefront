'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Package, Mail, ShoppingBag, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui';

export default function OrderSuccessPage({ params }: { params: { store: string } }) {
    const orderNumber = React.useMemo(() => `LR-${Math.floor(100000 + Math.random() * 900000)}`, []);

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 20, stiffness: 200 }}
                className="max-w-2xl w-full text-center space-y-8"
            >
                <div className="flex justify-center">
                    <div className="relative">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600"
                        >
                            <CheckCircle size={56} />
                        </motion.div>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full border-2 border-white"
                        />
                    </div>
                </div>

                <div>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4 italic">
                        Thank you for your order!
                    </h1>
                    <p className="text-xl text-gray-500">
                        Your journey towards luxury ownership has officially begun.
                    </p>
                </div>

                <div className="bg-secondary/50 rounded-3xl p-8 space-y-6">
                    <div className="flex flex-col md:flex-row justify-between gap-6 border-b border-white pb-6">
                        <div className="text-left">
                            <p className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-1">Order Number</p>
                            <p className="text-2xl font-bold text-primary">{orderNumber}</p>
                        </div>
                        <div className="text-left">
                            <p className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-1">Status</p>
                            <p className="text-2xl font-bold text-accent">Payment Pending</p>
                        </div>
                    </div>

                    <div className="space-y-4 text-left">
                        <h3 className="font-bold text-primary flex items-center gap-2">
                            <Mail className="text-accent" size={20} />
                            What's Next?
                        </h3>
                        <ul className="space-y-3 text-gray-600">
                            <li className="flex gap-3">
                                <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold text-primary flex-shrink-0 border border-gray-100">1</span>
                                <span>Check your email for payment instructions (Wise/Bank Transfer details).</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold text-primary flex-shrink-0 border border-gray-100">2</span>
                                <span>Once payment is received, our quality control team will inspect your items.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold text-primary flex-shrink-0 border border-gray-100">3</span>
                                <span>You will receive a tracking number within 2-4 business days.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="primary" size="lg" className="px-8">
                        <Link href={`/${params.store}/products`} className="flex items-center">
                            Continue Shopping
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="px-8 border-gray-200">
                        <Link href={`/${params.store}`} className="flex items-center">
                            Back to Home
                        </Link>
                    </Button>
                </div>

                <div className="pt-8 flex items-center justify-center gap-8 text-gray-400 grayscale opacity-50">
                    <ShoppingBag size={24} />
                    <Package size={24} />
                    <ShieldCheck size={24} />
                </div>
            </motion.div>
        </div>
    );
}
