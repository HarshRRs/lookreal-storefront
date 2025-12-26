import React from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import { getStoreConfig, getCategories } from '@/lib/api';
import CategoryDetailClient from './CategoryDetailClient';

type Props = {
    params: { store: string; slug: string };
};

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    try {
        const store = await getStoreConfig(params.store);
        const categories = await getCategories(store.id);
        const category = categories.find(c => c.slug === params.slug);

        if (!category) return { title: 'Category Not Found' };

        return {
            title: `${category.name} Collection | ${store.name}`,
            description: `Shop our exclusive ${category.name} collection at ${store.name}. Premium mirror-quality luxury bags.`,
            openGraph: {
                title: `${category.name} Collection`,
                description: `Explore the ${category.name} lineup redefined for perfection.`,
                images: category.image ? [{ url: category.image }] : [],
            },
        };
    } catch (error) {
        return { title: 'Category Detail | LOOKREAL' };
    }
}

export default function CategoryDetailPage({ params }: Props) {
    return <CategoryDetailClient params={params} />;
}
