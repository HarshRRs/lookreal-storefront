'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShieldCheck,
    Truck,
    Star,
    Plus,
    Minus,
    ShoppingBag,
    Heart,
    Image as ImageIcon,
    Check,
    ChevronRight,
    ChevronLeft
} from 'lucide-react';
import { Button, Badge, Card } from '@/components/ui';
import { getStoreConfig, getProductBySlug, getProducts } from '@/lib/api';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/types';
import { useCart } from '@/lib/context/CartContext';
import { toast } from 'react-hot-toast';

export default function ProductDetailClient({ params }: { params: { store: string; slug: string } }) {
    const [product, setProduct] = React.useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = React.useState<Product[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [selectedImage, setSelectedImage] = React.useState(0);
    const [quantity, setQuantity] = React.useState(1);
    const [activeTab, setActiveTab] = React.useState<'description' | 'specifications' | 'reviews'>('description');
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, quantity);
            toast.success(`${product.name} added to bag!`, {
                icon: '🛍️'
            });
        }
    };

    React.useEffect(() => {
        async function loadProduct() {
            try {
                setLoading(true);
                const store = await getStoreConfig(params.store);
                const productData = await getProductBySlug(store.id, params.slug);
                setProduct(productData);

                const related = await getProducts(store.id, productData.categories?.[0]?.id, undefined, 1, 4);
                setRelatedProducts(related.products.filter(p => p.id !== productData.id));
            } catch (err) {
                console.error('Failed to load product', err);
                setError('Failed to load product details.');
            } finally {
                setLoading(false);
            }
        }
        loadProduct();
    }, [params.store, params.slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold text-primary mb-4">{error || 'Product not found'}</h2>
                <Button variant="primary">
                    <Link href={`/${params.store}/products`}>Back to Shop</Link>
                </Button>
            </div>
        );
    }

    const allImages = product.images || [];
    const mainImage = allImages[selectedImage]?.url || '/images/placeholder.jpg';

    const qualityTiers = {
        mirror: { label: 'Mirror Quality', color: 'bg-accent text-white', desc: '1:1 replica with original materials.' },
        premium: { label: 'Premium Quality', color: 'bg-primary text-white', desc: 'High-quality replica with excellent details.' },
        standard: { label: 'Standard Quality', color: 'bg-gray-200 text-gray-800', desc: 'Good quality for daily use.' }
    };

    const currentTier = qualityTiers[product.qualityTier as keyof typeof qualityTiers] || qualityTiers.premium;

    return (
        <div className="min-h-screen bg-white pb-20">
            <nav className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex items-center text-sm text-gray-500 space-x-2">
                    <Link href={`/${params.store}`} className="hover:text-accent transition-colors">Home</Link>
                    <ChevronRight size={14} />
                    <Link href={`/${params.store}/products`} className="hover:text-accent transition-colors">Products</Link>
                    <ChevronRight size={14} />
                    <span className="text-primary font-medium line-clamp-1">{product.name}</span>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative aspect-square bg-secondary rounded-3xl overflow-hidden group"
                        >
                            <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
                            {allImages.length > 1 && (
                                <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => setSelectedImage(prev => (prev === 0 ? allImages.length - 1 : prev - 1))}
                                        className="p-2 bg-white/80 hover:bg-white rounded-full shadow-lg"
                                    >
                                        <ChevronLeft size={24} className="text-primary" />
                                    </button>
                                    <button
                                        onClick={() => setSelectedImage(prev => (prev === allImages.length - 1 ? 0 : prev + 1))}
                                        className="p-2 bg-white/80 hover:bg-white rounded-full shadow-lg"
                                    >
                                        <ChevronRight size={24} className="text-primary" />
                                    </button>
                                </div>
                            )}
                        </motion.div>

                        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                            {allImages.map((img, idx) => (
                                <button
                                    key={img.id}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === idx ? 'border-accent' : 'border-transparent hover:border-gray-300'
                                        }`}
                                >
                                    <img src={img.url} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Badge className={currentTier.color}>{currentTier.label}</Badge>
                                {product.featured && <Badge variant="bestSeller">Featured</Badge>}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">{product.name}</h1>
                            <p className="text-xl text-gray-500 font-medium mb-4">{product.brand}</p>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={18} className={i < Math.floor(product.averageRating || 5) ? "fill-accent text-accent" : "text-gray-300"} />
                                    ))}
                                    <span className="ml-2 text-sm text-gray-500">({product.reviewCount || 0} Reviews)</span>
                                </div>
                                <div className="h-4 w-[1px] bg-gray-300"></div>
                                <div className="flex items-center text-green-600 text-sm font-medium">
                                    <Check size={16} className="mr-1" /> In Stock
                                </div>
                            </div>

                            <div className="flex items-baseline gap-4">
                                <span className="text-4xl font-bold text-accent">{formatPrice(product.salePrice || product.basePrice)}</span>
                            </div>
                        </div>

                        <p className="text-gray-600 text-lg leading-relaxed">{product.shortDescription}</p>

                        <div className="space-y-6 pt-6 border-t border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-gray-200 rounded-full p-1 bg-gray-50">
                                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 hover:bg-white rounded-full"><Minus size={20} /></button>
                                    <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                                    <button onClick={() => setQuantity(q => q + 1)} className="p-2 hover:bg-white rounded-full"><Plus size={20} /></button>
                                </div>
                                <Button variant="primary" size="lg" className="flex-1 py-4 text-xl" onClick={handleAddToCart}>
                                    <ShoppingBag className="mr-2" /> Add to Cart
                                </Button>
                                <button className="p-4 border border-gray-200 rounded-full hover:bg-gray-50"><Heart size={24} className="text-gray-400" /></button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 py-8 border-y border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-secondary rounded-2xl"><ShieldCheck className="text-accent" /></div>
                                <div><p className="font-bold text-sm">Quality Guaranteed</p></div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-secondary rounded-2xl"><Truck className="text-accent" /></div>
                                <div><p className="font-bold text-sm">Fast Shipping</p></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tab content and related products would go here, simplified for extraction */}
            </div>
        </div>
    );
}
