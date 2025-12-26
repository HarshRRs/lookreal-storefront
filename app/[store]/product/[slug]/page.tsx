import React from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import { getStoreConfig, getProductBySlug } from '@/lib/api';
import ProductDetailClient from './ProductDetailClient';

type Props = {
    params: { store: string; slug: string };
};

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    try {
        const store = await getStoreConfig(params.store);
        const product = await getProductBySlug(store.id, params.slug);

        if (!product) return { title: 'Product Not Found' };

        const previousImages = (await parent).openGraph?.images || [];

        return {
            title: `${product.name} | ${product.brand} | ${store.name}`,
            description: product.shortDescription,
            openGraph: {
                title: product.name,
                description: product.shortDescription,
                images: [
                    ...(product.images?.[0] ? [{ url: (product.images[0] as any).url || product.images[0] }] : []),
                    ...previousImages,
                ],
            },
            keywords: [product.name, product.brand, 'luxury replica', ...product.categories.map(c => c.name)],
        };
    } catch (error) {
        return { title: 'Product Detail | LOOKREAL' };
    }
}

export default function ProductDetailPage({ params }: Props) {
    return <ProductDetailClient params={params} />;
}
