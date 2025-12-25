"use client";
import React, { useEffect, useState } from 'react';
import { wishlistService } from '@/services/wishlist.service';
import ProductCard from '@/components/ProductCard';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { useRouter } from 'next/navigation';
import { FaHeart } from 'react-icons/fa6';
import { Product } from '@/types/product.types';

// Interface for the Wishlist Item structure returned by backend
interface WishlistItem {
    id: number;
    user_id: number;
    product_id: number;
    product: Product;
}

export default function WishlistPage() {
    const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const { user, isAuthenticated } = useAuth();
    const { wishlistIds } = useWishlist(); // Get IDs from context
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/shop/login');
        }
    }, [isAuthenticated, loading, router]);

    // Sync local items with global context IDs (handles removals from card interaction)
    useEffect(() => {
        if (wishlistItems.length > 0 && wishlistIds.length < wishlistItems.length) {
            setWishlistItems(prev => prev.filter(item => wishlistIds.includes(item.product_id)));
        }
    }, [wishlistIds]);

    useEffect(() => {
        const fetchWishlist = async () => {
            // If we don't have a user token yet (initial load), wait or handle it.
            // But assuming AuthContext handles initial load.
            try {
                const data = await wishlistService.getWishlist();
                console.log("Wishlist Data Raw:", data); // Debugging
                // Map the backend response to extract the nested product
                // items: [{ product: { ... } }, ...]
                const products = (data as any[])
                    .filter(item => item && (item.product || item.Product)) // Filter out items with null/undefined products
                    .map((item: any) => {
                        // The backend includes 'product' (or 'Product' depending on Sequelize alias) 
                        const p = item.product || item.Product;

                        return {
                            ...p,
                            // Ensure category is a string if ProductCard needs it
                            // The backend 'product' model includes 'licence' object
                            category_name: p.licence ? p.licence.licence_name :
                                (p.Licence ? p.Licence.licence_name :
                                    (p.category ? p.category.category_name : 'GENERIC'))
                        };
                    });
                setWishlistItems(products);
            } catch (error) {
                console.error("Error fetching wishlist:", error);
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchWishlist();
        } else {
            // Allow auth check to redirect
            // semi-loading state usually handled by auth provider, but simple timeout fallback
            const timer = setTimeout(() => setLoading(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [isAuthenticated]);

    if (loading) {
        return (
            <div className="bg-dark-bg min-h-screen">
                <main className="pt-32 pb-12 container-custom">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-10 w-10 bg-white/10 rounded-full animate-pulse"></div>
                        <div className="h-8 w-64 bg-white/10 rounded animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-dark-surface border border-white/5 rounded-xl overflow-hidden p-4 animate-pulse h-[450px] flex flex-col">
                                <div className="w-full aspect-square bg-white/5 rounded-lg mb-4"></div>
                                <div className="space-y-3 flex-grow">
                                    <div className="h-4 w-1/3 bg-white/10 rounded"></div>
                                    <div className="h-6 w-3/4 bg-white/10 rounded"></div>
                                    <div className="mt-auto h-10 w-full bg-white/5 rounded-lg"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        );
    }

    if (!user) return null; // Will redirect via useEffect

    return (
        <div className="bg-dark-bg min-h-screen">
            <main className="pt-28 pb-12 container-custom px-4 md:px-0">

                <header className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black italic uppercase text-white flex items-center gap-3">
                            <FaHeart className="text-primary" />
                            Lista de Deseos
                        </h1>
                        <p className="text-gray-400 mt-2 text-sm">
                            Tus coleccionables favoritos, guardados para cuando estés listo.
                        </p>
                    </div>
                    <div className="text-right">
                        <span className="text-white font-bold text-xl">{wishlistItems.length}</span>
                        <span className="text-gray-500 text-sm ml-2 font-medium uppercase tracking-wider">Productos</span>
                    </div>
                </header>

                {wishlistItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-white/10 rounded-3xl bg-white/5 p-12">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 text-gray-400">
                            <FaHeart size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Tu lista está vacía</h2>
                        <p className="text-gray-400 max-w-md mx-auto mb-8">
                            Aún no has guardado ningún producto. Explora la tienda y dale al corazón en los que más te gusten.
                        </p>
                        <button
                            onClick={() => router.push('/shop')}
                            className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-8 rounded-full uppercase tracking-wider text-sm transition-all shadow-lg shadow-primary/25 hover:scale-105"
                        >
                            Ir a la Tienda
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlistItems.map((p) => (
                            <ProductCard
                                key={p.product_id}
                                id={p.product_id}
                                category={(p as any).licence?.licence_name || (p as any).Licence?.licence_name || 'COLLECTIBLE'}
                                name={p.product_name}
                                price={p.price}
                                imageFront={p.image_front || 'https://res.cloudinary.com/dp7jr9k94/image/upload/v1703182285/ironman_front_placeholder.png'}
                                imageBack={p.image_back || 'https://res.cloudinary.com/dp7jr9k94/image/upload/v1703182285/ironman_box_placeholder.png'}
                                discount={p.discount || 0}
                                created_at={p.created_at}
                                installments={p.dues ? `${p.dues} CUOTAS SIN INTERÉS` : undefined}
                                stock={p.stock}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
