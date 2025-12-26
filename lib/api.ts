import axios from 'axios';
import type { Product, Category, StoreConfig } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1/shop';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Store Configuration
export const getStoreConfig = async (slug?: string, domain?: string): Promise<StoreConfig> => {
    const params: Record<string, string> = {};
    if (slug) params.slug = slug;
    if (domain) params.domain = domain;

    const response = await api.get('/config', { params });
    return response.data;
};

// Products
export const getProducts = async (
    storeId: string,
    categoryId?: string,
    featured?: boolean,
    page: number = 1,
    limit: number = 20
): Promise<{ products: Product[]; total: number }> => {
    const params: Record<string, any> = { storeId, page, limit };
    if (categoryId) params.categoryId = categoryId;
    if (featured !== undefined) params.featured = featured ? 'true' : 'false';

    const response = await api.get('/products', { params });
    return response.data;
};

// Single Product
export const getProductBySlug = async (storeId: string, slug: string): Promise<Product> => {
    const response = await api.get(`/products/${slug}`, { params: { storeId } });
    return response.data;
};

// Banners
export const getBanners = async (storeId: string, position?: string): Promise<any[]> => {
    const params: Record<string, any> = { storeId };
    if (position) params.position = position;

    const response = await api.get('/banners', { params });
    return response.data;
};

// Categories
export const getCategories = async (storeId: string): Promise<Category[]> => {
    const response = await api.get('/categories', { params: { storeId } });
    return response.data;
};

export default api;
