'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Image as ImageIcon, Star } from 'lucide-react';
import { Button, Card, Badge } from '@/components/ui';
import { getStoreConfig, getProducts, getCategories } from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import { Product, Category } from '@/types';

export default function CategoryDetailClient({ params }: { params: { store: string; slug: string } }) {
    const [products, setProducts] = React.useState<Product[]>([]);
    const [category, setCategory] = React.useState<Category | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        async function loadCategoryData() {
            try {
                setLoading(true);
                const store = await getStoreConfig(params.store);
                const categories = await getCategories(store.id);
                const foundCategory = categories.find(c => c.slug === params.slug);

                if (!foundCategory) {
                    setError('Category not found');
                    return;
                }

                setCategory(foundCategory);
                const data = await getProducts(store.id, foundCategory.id, undefined, 1, 20);
                setProducts(data.products);
            } catch (err) {
                console.error('Category load error', err);
                setError('Failed to load collection');
            } finally {
                setLoading(false);
            }
        }
        loadCategoryData();
    }, [params.store, params.slug]);

    if (loading) return <div className="min-h-screen bg-white flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div></div>;
    if (error || !category) return <div className="min-h-screen bg-white flex flex-col items-center justify-center"><h2 className="text-2xl font-bold mb-4">{error}</h2><Button variant="primary"><Link href={`/${params.store}/products`}>Back to Collections</Link></Button></div>;

    return (
        <div className="min-h-screen bg-white">
            <div className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden bg-primary">
                {category.image && <img src={category.image} alt={category.name} className="absolute inset-0 w-full h-full object-cover opacity-60" />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="relative z-10 text-center px-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <nav className="flex items-center justify-center text-sm text-white/70 mb-4 space-x-2">
                            <Link href={`/${params.store}`}>Home</Link>
                            <ChevronRight size={14} />
                            <Link href={`/${params.store}/products`}>Collections</Link>
                            <ChevronRight size={14} />
                            <span className="text-accent">{category.name}</span>
                        </nav>
                        <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-4 italic">{category.name}</h1>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <Link key={product.id} href={`/${params.store}/product/${product.slug}`}>
                            <Card hover className="group">
                                <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden rounded-t-2xl">
                                    {product.images?.[0] ? <img src={(product.images[0] as any).url || product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" /> : <div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-12 h-12 text-gray-300" /></div>}
                                </div>
                                <div className="p-5">
                                    <p className="text-xs text-gray-500 uppercase mb-1">{product.brand}</p>
                                    <h3 className="font-bold mb-2 truncate group-hover:text-accent transition-colors">{product.name}</h3>
                                    <div className="flex justify-between items-center"><span className="text-lg font-bold text-accent">{formatPrice(product.basePrice)}</span><div className="flex items-center gap-1 text-xs text-gray-500"><Star size={12} className="fill-accent text-accent" /><span>5.0</span></div></div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
