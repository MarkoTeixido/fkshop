import { useState, useEffect, useCallback } from 'react';
import { productService } from '@/services/product.service';
import { Product } from '@/types/product.types';
import { ApiError } from '@/types/api.types';

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [pagination, setPagination] = useState({
        total: 0,
        totalPages: 0,
        currentPage: 1,
        limit: 9
    });

    const fetchProducts = useCallback(async (params?: Record<string, string | number>) => {
        setLoading(true);
        setError(null);
        try {
            const response = await productService.getAll(params);

            // Handle legacy backend response (Array) vs New Paginated Response (Object)
            if (Array.isArray(response)) {
                setProducts(response);
                setPagination({ total: response.length, totalPages: 1, currentPage: 1, limit: response.length });
            } else {
                setProducts(response.data || []);
                setPagination(response.pagination || { total: 0, totalPages: 0, currentPage: 1, limit: 9 });
            }
        } catch (err: any) {
            const message = err.message || 'Error fetching products';
            setError(message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const getProductById = useCallback(async (id: number) => {
        setLoading(true);
        try {
            return await productService.getById(id);
        } catch (err: any) {
            const message = err.message || 'Error fetching product';
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        products,
        pagination,
        loading,
        error,
        fetchProducts,
        getProductById
    };
}
