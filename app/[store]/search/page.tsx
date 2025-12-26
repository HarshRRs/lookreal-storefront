'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, X, SlidersHorizontal, Image as ImageIcon, Star, ArrowRight } from 'lucide-react';
import { Button, Input, Card, Badge } from '@/components/ui';
import { getStoreConfig, getProducts } from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/types';

export default function SearchPage({ params }: { params: { store: string } }) {
    const [query, setQuery] = React.useState('');
    const [results, setResults] = React.useState<Product[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [total, setTotal] = React.useState(0);

    // Debounced search
    React.useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            setTotal(0);
            return;
        }

        const timer = setTimeout(async () => {
            try {
                setLoading(true);
                const store = await getStoreConfig(params.store);
                // Note: In a real backend, we'd have a specific search endpoint. 
                // Here we'll use getProducts and rely on backend filtering if supported, or filter on frontend.
                const data = await getProducts(store.id, undefined, undefined, 1, 20);

                // Simple client-side search simulation if backend doesn't have query filter
                const filtered = data.products.filter(p =>
                    p.name.toLowerCase().includes(query.toLowerCase()) ||
                    p.brand.toLowerCase().includes(query.toLowerCase()) ||
                    p.shortDescription.toLowerCase().includes(query.toLowerCase())
                );

                setResults(filtered);
                setTotal(filtered.length);
            } catch (err) {
                console.error('Search failed', err);
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [query, params.store]);

    return (
        <div className="min-h-screen bg-white">
            {/* Search Header */}
            <div className="bg-secondary/30 py-12 border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="relative group">
                        <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors" size={32} />
                        <input
                            autoFocus
                            type="text"
                            placeholder="Search for bags, brands, or collections..."
                            className="w-full pl-20 pr-12 py-8 bg-white text-2xl font-heading font-medium rounded-3xl shadow-luxury border-transparent focus:border-accent/30 focus:ring-4 focus:ring-accent/5 transition-all outline-none"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        {query && (
                            <button
                                onClick={() => setQuery('')}
                                className="absolute right-6 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                                title="Clear search"
                            >
                                <X size={24} className="text-gray-400" />
                            </button>
                        )}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3 items-center text-sm text-gray-500">
                        <span>Popular:</span>
                        {['Chanel Flap', 'LV Speedy', 'Dior Lady', 'Gucci Dionysus'].map(tag => (
                            <button
                                key={tag}
                                onClick={() => setQuery(tag)}
                                className="px-4 py-1.5 bg-white border border-gray-200 rounded-full hover:border-accent hover:text-accent transition-all"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Results Content */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <AnimatePresence mode="wait">
                    {!query ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-secondary rounded-full mb-6">
                                <SearchIcon size={48} className="text-gray-300" />
                            </div>
                            <h2 className="text-3xl font-heading font-bold text-primary mb-2">Find Your Perfection</h2>
                            <p className="text-gray-500 text-lg">Type something above to start searching our luxury catalog.</p>
                        </motion.div>
                    ) : loading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                        >
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="animate-pulse space-y-4">
                                    <div className="aspect-[4/5] bg-gray-100 rounded-2xl" />
                                    <div className="h-4 bg-gray-100 rounded w-1/2" />
                                    <div className="h-6 bg-gray-100 rounded w-3/4" />
                                </div>
                            ))}
                        </motion.div>
                    ) : results.length > 0 ? (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-12"
                        >
                            <div className="flex justify-between items-center border-b border-gray-100 pb-6">
                                <h2 className="text-2xl font-bold text-primary italic">
                                    Search Results for "{query}"
                                </h2>
                                <span className="text-gray-500 font-medium">{total} items found</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {results.map((product) => (
                                    <Link key={product.id} href={`/${params.store}/product/${product.slug}`}>
                                        <Card hover className="group h-full flex flex-col">
                                            <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden rounded-t-2xl">
                                                {product.images?.[0] ? (
                                                    <img
                                                        src={typeof product.images[0] === 'string' ? product.images[0] : (product.images[0] as any).url}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <ImageIcon className="w-12 h-12 text-gray-300" />
                                                    </div>
                                                )}
                                                {product.featured && (
                                                    <div className="absolute top-4 left-4">
                                                        <Badge variant="bestSeller">Featured</Badge>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-6 flex-1 flex flex-col">
                                                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{product.brand}</p>
                                                <h3 className="font-bold text-gray-900 mb-4 line-clamp-1 group-hover:text-accent transition-colors">
                                                    {product.name}
                                                </h3>
                                                <div className="mt-auto flex items-center justify-between">
                                                    <span className="text-xl font-bold text-accent">
                                                        {formatPrice(product.salePrice || product.basePrice)}
                                                    </span>
                                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                                        <Star size={14} className="fill-accent text-accent" />
                                                        <span>5.0</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="no-results"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20 bg-secondary/20 rounded-3xl"
                        >
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-sm mb-6">
                                <X size={48} className="text-gray-300" />
                            </div>
                            <h2 className="text-3xl font-heading font-bold text-primary mb-2">No matching pieces found</h2>
                            <p className="text-gray-500 text-lg mb-8">We couldn't find anything for "{query}". Try a different brand or category.</p>
                            <Button variant="outline" onClick={() => setQuery('')}>
                                Clear Search
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Categories Quick Links */}
                {!query && (
                    <div className="mt-32">
                        <h3 className="text-2xl font-heading font-bold mb-8">Browse Collections</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {['New Arrivals', 'Best Sellers', 'Exclusive Sale', 'Mirror Quality'].map(col => (
                                <Link key={col} href={`/${params.store}/products`} className="group p-8 bg-secondary/50 rounded-3xl hover:bg-accent hover:text-white transition-all">
                                    <h4 className="text-xl font-bold mb-2">{col}</h4>
                                    <div className="flex items-center text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                        Explore <ArrowRight className="ml-2 w-4 h-4" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
