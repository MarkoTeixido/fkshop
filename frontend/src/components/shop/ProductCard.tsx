"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { cn } from '@/utils/cn';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useWishlist } from '@/context/WishlistContext';
import { useState } from 'react';

export interface ProductCardProps {
    id: number;
    category: string;
    name: string;
    price: string | number;
    imageFront: string;
    imageBack: string;
    tag?: string;
    installments?: string;
    stock: number;
    discount?: number;
    created_at?: string;
    is_new?: boolean;
}

export default function ProductCard({ id, category, name, price, imageFront, imageBack, tag, installments, stock, discount, created_at, is_new }: ProductCardProps) {
    const { addToCart } = useCart();
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const isWishlisted = isInWishlist(id);
    const [priceNum] = useState(Number(price));

    // Determine Label logic
    // New: If 'is_new' is true (or calculate based on date if needed, but prop is better)
    // Backend logic for "New" usually sets is_new, but we can verify date.
    // User rule: New = < 1 month. Display "NUEVO".
    // Discount: Display "X% OFF".
    // Priority: Discount > New > None

    let displayLabel = null;
    let labelColor = "";

    if (discount && discount > 0) {
        displayLabel = `${discount}% OFF`;
        labelColor = "bg-primary";
    } else if (is_new) {
        displayLabel = "NUEVO";
        labelColor = "bg-primary";
    } else if (created_at) {
        // Fallback date check if is_new not passed
        const createdDate = new Date(created_at);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - createdDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays <= 30) {
            displayLabel = "NUEVO";
            labelColor = "bg-primary";
        }
    }

    // Wishlist Logic
    // We need to know initial state. For now, simple local toggle + API.
    // Ideally we fetch wishlist IDs on load and pass as context, but to save complexity, we'll assume false initially or fetch status if needed. 
    // Optimization: Parent should pass 'isWishlisted' or we fetch.
    // Let's rely on user clicking.

    // Check local storage or context? For now, just handle click.
    const toggleWishlist = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            if (isWishlisted) {
                await removeFromWishlist(id);
            } else {
                await addToWishlist(id);
            }
        } catch (error) {
            console.error("Wishlist error", error);
        }
    };

    // Calculate discounted price
    const finalPrice = discount && discount > 0 ? priceNum - (priceNum * discount / 100) : priceNum;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(id);
    };

    return (
        <article className="w-full h-full">
            <Link href={`/shop/${id}`} className="group block relative h-full bg-dark-surface rounded-xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 flex flex-col">
                <div className="relative aspect-square overflow-hidden bg-white/5 p-3">
                    {displayLabel && (
                        <span className={cn("absolute right-0 top-0 text-white text-xs font-bold uppercase px-2 py-1 pr-3 rounded-bl-xl z-20 shadow-md", labelColor)}>
                            {displayLabel}
                        </span>
                    )}

                    {/* Wishlist Button */}
                    <button
                        onClick={toggleWishlist}
                        className="absolute left-0 top-0 z-20 p-2 text-white/50 hover:text-red-500 transition-colors"
                    >
                        {isWishlisted ? <FaHeart size={18} className="text-red-500" /> : <FaRegHeart size={18} />}
                    </button>

                    {/* Images Container with Crossfade */}
                    <div className="relative w-full h-full">
                        <Image
                            src={imageFront || "https://res.cloudinary.com/dp7jr9k94/image/upload/v1703182285/ironman_front_placeholder.png"}
                            alt={name || "Product Image"}
                            fill
                            className="object-contain transition-opacity duration-300 group-hover:opacity-0"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <Image
                            src={imageBack || "https://res.cloudinary.com/dp7jr9k94/image/upload/v1703182285/ironman_box_placeholder.png"}
                            alt={name ? `${name} Box` : "Product Box"}
                            fill
                            className="object-contain absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                </div>

                <div className="p-3 flex flex-col flex-grow gap-1">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-gray-500">{category}</p>
                    <h4 className="text-base font-bold text-white leading-tight line-clamp-2 min-h-[36px]">{name}</h4>

                    <div className="mt-auto pt-2 flex flex-col gap-2">
                        <div className="flex flex-col">
                            {discount && discount > 0 ? (
                                <div className="flex items-center gap-2">
                                    <p className="text-lg font-light text-primary">$ {finalPrice.toFixed(2)}</p>
                                    <p className="text-[10px] text-gray-500 line-through">$ {priceNum}</p>
                                </div>
                            ) : (
                                <p className="text-lg font-light text-primary">$ {priceNum}</p>
                            )}
                            <p className="text-[9px] text-primary font-bold uppercase tracking-widest">{installments || "3 CUOTAS SIN INTERÉS"}</p>
                        </div>

                        {stock === 0 ? (
                            <button
                                disabled
                                className="w-full bg-gray-700 text-gray-400 font-bold text-xs py-3 rounded-lg cursor-not-allowed uppercase tracking-wider"
                            >
                                Sin Stock
                            </button>
                        ) : (
                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-white text-black font-bold text-xs py-2 rounded-lg hover:bg-primary hover:text-white transition-all transform hover:scale-[1.02] active:scale-95 uppercase tracking-wider shadow-lg"
                            >
                                Agregar al Carrito
                            </button>
                        )}
                    </div>
                </div>
            </Link>
        </article>
    )
}
