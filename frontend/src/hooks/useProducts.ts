import { useState, useEffect, useCallback } from 'react';
import { productService } from '@/services/product.service';
import { Product } from '@/types/product.types';
import { ApiError } from '@/types/api.types';

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = useCallback(async (params?: Record<string, string | number>) => {
        setLoading(true);
        setError(null);
        try {
            const data = await productService.getAll(params);
            setProducts(data);
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

    // Initial fetch if needed, can be controlled by arguments or separated
    // For now we leave auto-fetch optional or calling component does it.
    // simpler: Return fetch function.

    return {
        products,
        loading,
        error,
        fetchProducts,
        getProductById
    };
}
