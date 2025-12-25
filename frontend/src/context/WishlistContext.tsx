"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { wishlistService } from '@/services/wishlist.service';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import { useRouter } from 'next/navigation';

interface WishlistContextType {
    wishlistIds: number[];
    addToWishlist: (id: number) => Promise<void>;
    removeFromWishlist: (id: number) => Promise<void>;
    isInWishlist: (id: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const [wishlistIds, setWishlistIds] = useState<number[]>([]);
    const { user } = useAuth(); // Only load if user is logged in
    const { addToast } = useToast();
    const router = useRouter();

    // Load wishlist on mount or user change
    useEffect(() => {
        if (user) {
            loadWishlist();
        } else {
            setWishlistIds([]);
        }
    }, [user]);

    const loadWishlist = async () => {
        try {
            const ids = await wishlistService.getWishlistIds();
            setWishlistIds(ids);
        } catch (error) {
            console.error("Failed to load wishlist", error);
        }
    };

    const addToWishlist = async (id: number) => {
        if (!user) {
            addToast(
                'Inicia sesión para guardar tus favoritos',
                'info',
                'Debes estar registrado para usar tu lista de deseos.',
                {
                    label: 'Ingresar',
                    onClick: () => router.push('/shop/login')
                }
            );
            return;
        }

        // Optimistic update
        setWishlistIds(prev => [...prev, id]);
        try {
            await wishlistService.addToWishlist(id);
            addToast('Producto agregado a tu lista de deseos', 'success');
        } catch (error: any) {
            console.error("Failed to add to wishlist", error);
            // Revert
            setWishlistIds(prev => prev.filter(pid => pid !== id));
            addToast(error.message || 'Error al agregar a deseos', 'error');
        }
    };

    const removeFromWishlist = async (id: number) => {
        if (!user) return;

        // Optimistic update
        setWishlistIds(prev => prev.filter(pid => pid !== id));
        try {
            await wishlistService.removeFromWishlist(id);
            addToast('Producto eliminado de tu lista de deseos', 'info');
        } catch (error: any) {
            console.error("Failed to remove from wishlist", error);
            // Revert
            setWishlistIds(prev => [...prev, id]);
            addToast(error.message || 'Error al eliminar de deseos', 'error');
        }
    };

    const isInWishlist = (id: number) => {
        return wishlistIds.includes(id);
    };

    return (
        <WishlistContext.Provider value={{ wishlistIds, addToWishlist, removeFromWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
}
