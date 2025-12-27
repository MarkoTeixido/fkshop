import { useState, useEffect } from 'react';
import { wishlistService } from '@/services/wishlist.service';
import { useWishlist } from '@/context/WishlistContext';
import { Product } from '@/types/product.types';

export function useWishlistItems(isAuthenticated: boolean) {
    const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const { wishlistIds } = useWishlist();

    const fetchWishlist = async () => {
        try {
            const data = await wishlistService.getWishlist();
            const products = (data as any[])
                .filter(item => item && (item.product || item.Product))
                .map((item: any) => {
                    const p = item.product || item.Product;
                    return {
                        ...p,
                        category_name: p.licence ? p.licence.licence_name :
                            (p.Licence ? p.Licence.licence_name :
                                (p.category ? p.category.category_name : 'GENERIC'))
                    } as Product;
                });
            setWishlistItems(products);
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchWishlist();
        } else {
            const timer = setTimeout(() => setLoading(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [isAuthenticated]);

    // Sync local items with global context IDs
    useEffect(() => {
        if (wishlistItems.length > 0 && wishlistIds.length < wishlistItems.length) {
            setWishlistItems(prev => prev.filter(item => wishlistIds.includes(item.product_id)));
        }
    }, [wishlistIds, wishlistItems]);

    return { wishlistItems, loading };
}
