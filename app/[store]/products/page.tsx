import React from 'react';
import type { Metadata } from 'next';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'Collection Catalog | LOOKREAL - Premium Luxury Bags',
  description: 'Browse our complete catalog of mirror-quality luxury replica bags. Filter by brand, category, or quality to find your perfect piece.',
};

export default function ProductsPage({ params }: { params: { store: string } }) {
  return <ProductsClient params={params} />;
}
