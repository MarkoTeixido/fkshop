import { useState, useEffect } from 'react';
import { Product } from '@/types/product.types';

interface RelatedProduct {
    id: number;
    product_id: number;
    name: string;
    price: number | string;
    imageFront: string;
    imageBack: string;
    category: string;
    stock: number;
    discount: number | null;
    installments?: string;
    created_at?: string;
}

export function useProductDetail(id: string | undefined) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shop/item/${id}`);

                if (!res.ok) {
                    setProduct(null);
                    setError("Producto no encontrado");
                    return;
                }

                const data = await res.json();
                setProduct(data.product);

                // Map related products
                const mappedRelated = (data.related || []).map((p: any) => ({
                    id: p.product_id,
                    product_id: p.product_id,
                    name: p.product_name,
                    price: p.price,
                    imageFront: p.image_front,
                    imageBack: p.image_back,
                    category: p.licence_name || 'GENERIC',
                    stock: p.stock,
                    discount: p.discount,
                    installments: p.dues ? `${p.dues} CUOTAS SIN INTERÉS` : undefined,
                    created_at: p.created_at
                }));
                setRelatedProducts(mappedRelated);

            } catch (err: any) {
                console.error("Error fetching product:", err);
                setError(err.message || "Error al cargar el producto");
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    return {
        product,
        relatedProducts,
        loading,
        error
    };
}
