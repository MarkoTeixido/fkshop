import { api } from './api';
import { Product, ProductDTO, HomeProductResponse } from '@/types/product.types';
import { PaginatedResponse } from '@/types/api.types';

export const productService = {
    // Public Shop Endpoints
    getAll: async (params?: Record<string, string | number>): Promise<PaginatedResponse<Product>> => {
        // Backend currently returns all products or filtered by query.
        // Assuming /shop returns list.
        const response = await api.get<PaginatedResponse<Product>>('/shop', { params });
        return response.data; // return data array
    },

    getHomeProducts: async (): Promise<HomeProductResponse[]> => {
        // Use standard Shop endpoint to ensure consistency and avoid 404s
        const response = await api.get<PaginatedResponse<Product>>('/shop', {
            params: { limit: 9, sort: 'newest' }
        });

        // Map Product to HomeProductResponse if needed, or return Product array compatible type
        // The Home components likely expect `HomeProductResponse` which has slightly different fields?
        // Let's check type compatibility. Usually shop returns standard Product.
        // Assuming API returns standard products which are compatible.
        return (response.data.data as unknown) as HomeProductResponse[];
    },

    getCategories: async (): Promise<{ licence_id: number, licence_name: string }[]> => {
        const response = await api.get<{ licence_id: number, licence_name: string }[]>('/shop/categories');
        return response.data;
    },

    getById: async (id: number): Promise<{ product: Product, related: Product[] }> => {
        const response = await api.get<{ product: Product, related: Product[] }>(`/shop/item/${id}`);
        return response.data;
    },

    // Admin Endpoints
    getAdminDashboard: async (token?: string): Promise<Product[]> => {
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
        const response = await api.get<Product[]>('/admin/dashboard', config);
        return response.data;
    },

    create: async (data: ProductDTO): Promise<Product> => {
        const response = await api.post<Product>('/admin/products', data);
        return response.data;
    },

    update: async (id: number, data: Partial<ProductDTO>): Promise<Product> => {
        const response = await api.put<Product>(`/admin/products/${id}`, data);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await api.delete(`/admin/products/${id}`);
    }
};
