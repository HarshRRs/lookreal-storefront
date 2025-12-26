'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Filter,
    ChevronDown,
    ChevronRight,
    Grid,
    List,
    X,
    Search,
    Image as ImageIcon,
    Sliders,
    Star
} from 'lucide-react';
import { Button, Card, Badge, Input } from '@/components/ui';
import { getStoreConfig, getProducts, getCategories } from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import { Product, Category } from '@/types';

export default function ProductsClient({ params }: { params: { store: string } }) {
    const [products, setProducts] = React.useState<Product[]>([]);
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [total, setTotal] = React.useState(0);
    const [showFilters, setShowFilters] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
    const [sortBy, setSortBy] = React.useState('newest');
    const [page, setPage] = React.useState(1);
    const [searchQuery, setSearchQuery] = React.useState('');

    React.useEffect(() => {
        async function loadInitialData() {
            try {
                const store = await getStoreConfig(params.store);
                const categoriesData = await getCategories(store.id);
                setCategories(categoriesData);
            } catch (err) {
                console.error('Failed to load categories', err);
            }
        }
        loadInitialData();
    }, [params.store]);

    React.useEffect(() => {
        async function loadProducts() {
            try {
                setLoading(true);
                const store = await getStoreConfig(params.store);
                const data = await getProducts(store.id, selectedCategory || undefined, undefined, page, 12);
                setProducts(data.products);
                setTotal(data.total);
            } catch (err) {
                console.error('Failed to load products', err);
            } finally {
                setLoading(false);
            }
        }
        loadProducts();
    }, [params.store, selectedCategory, page, sortBy]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary italic">Our Collection</h1>
                <div className="flex items-center gap-4">
                    <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="rounded-full">
                        <Sliders size={18} className="mr-2" /> Filters
                    </Button>
                    <div className="relative group flex-1 md:w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:border-accent outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <AnimatePresence>
                    {showFilters && (
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="md:col-span-1 space-y-8">
                            <div>
                                <h3 className="text-lg font-bold mb-4">Categories</h3>
                                <div className="space-y-2">
                                    <button onClick={() => setSelectedCategory(null)} className={`block w-full text-left px-4 py-2 rounded-xl ${!selectedCategory ? 'bg-accent text-white' : 'hover:bg-gray-100'}`}>All Products</button>
                                    {categories.map(c => (
                                        <button key={c.id} onClick={() => setSelectedCategory(c.id)} className={`block w-full text-left px-4 py-2 rounded-xl ${selectedCategory === c.id ? 'bg-accent text-white' : 'hover:bg-gray-100'}`}>{c.name}</button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className={`${showFilters ? 'md:col-span-3' : 'md:col-span-4'}`}>
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => <div key={i} className="aspect-[4/5] bg-gray-100 animate-pulse rounded-3xl" />)}
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-20 bg-secondary rounded-3xl"><h3 className="text-2xl font-bold text-gray-400">No products found</h3></div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map(product => (
                                <Link key={product.id} href={`/${params.store}/product/${product.slug}`}>
                                    <Card hover className="group h-full">
                                        <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden rounded-t-3xl">
                                            {product.images?.[0] ? <img src={(product.images[0] as any).url || product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" /> : <div className="w-full h-full flex items-center justify-center text-gray-300"><ImageIcon size={48} /></div>}
                                        </div>
                                        <div className="p-6">
                                            <p className="text-xs text-gray-500 uppercase mb-1">{product.brand}</p>
                                            <h3 className="font-bold mb-4 line-clamp-1 group-hover:text-accent transition-colors">{product.name}</h3>
                                            <div className="flex justify-between items-center"><span className="text-xl font-bold text-accent">{formatPrice(product.basePrice)}</span><div className="flex items-center gap-1 text-sm text-gray-500"><Star size={14} className="fill-accent text-accent" /><span>{(product as any).averageRating || '5.0'}</span></div></div>
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
