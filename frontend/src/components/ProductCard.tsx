"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
    id: number; // strictly number now
    category: string;
    name: string;
    price: string | number;
    imageFront: string;
    imageBack: string;
    tag?: string;
    installments?: string;
    stock: number;
}

export default function ProductCard({ id, category, name, price, imageFront, imageBack, tag, installments, stock }: ProductCardProps) {
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(id);
    };

    return (
        <article className="w-full">
            <Link href={`/shop/${id}`} className="block relative group overflow-hidden">
                <figure className="relative group overflow-hidden">
                    {tag && (
                        <span className="absolute right-0 top-0 bg-primary text-white text-[1.4rem] font-medium uppercase px-[1.2rem] py-[0.8rem] z-10 text-[12px]">
                            {tag}
                        </span>
                    )}
                    {/* Front Image */}
                    <div className="block group-hover:hidden animate-fade">
                        <Image
                            src={imageFront}
                            alt={name}
                            width={400}
                            height={400}
                            className="w-full h-auto object-cover aspect-square"
                            priority
                        />
                    </div>
                    {/* Back Image (Box) */}
                    <div className="hidden group-hover:block animate-fade">
                        <Image
                            src={imageBack}
                            alt={`${name} Box`}
                            width={400}
                            height={400}
                            className="w-full h-auto object-cover aspect-square"
                        />
                    </div>
                </figure>
                <div className="p-[1.6rem] flex flex-col gap-[1.2rem]">
                    <p className="text-[1.4rem] font-medium uppercase text-gray-500">{category}</p>
                    <h4 className="text-[1.8rem] font-bold uppercase leading-tight line-clamp-2 min-h-[44px]">{name}</h4>
                    <p className="text-[1.6rem]">{typeof price === 'number' ? `$ ${price}` : price}</p>
                    {installments && (
                        <p className="text-[1.4rem] font-bold text-secondary uppercase whitespace-nowrap">{installments}</p>
                    )}
                    {stock === 0 ? (
                        <button
                            disabled
                            className="w-full bg-gray-400 text-white font-bold text-[1.4rem] py-[1.2rem] rounded-[50px] mt-2 cursor-not-allowed uppercase z-20 relative"
                        >
                            Sin Stock
                        </button>
                    ) : (
                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-primary text-white font-bold text-[1.4rem] py-[1.2rem] rounded-[50px] mt-2 hover:bg-dark-bg transition-colors uppercase z-20 relative"
                        >
                            Agregar al Carrito
                        </button>
                    )}
                </div>
            </Link>
        </article>
    )
}
