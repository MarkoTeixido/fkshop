"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import CartItem from "@/components/shop/CartItem";
import OrderSummary from "@/components/shop/OrderSummary";
import CartSkeleton from "@/components/shop/CartSkeleton";
import EmptyCart from "@/components/shop/EmptyCart";
import { useCart } from '@/hooks/useCart';
import { FaArrowLeft } from "react-icons/fa6";

export default function CartPage() {
    const { cartItems, removeItem, updateQuantity, subtotal, fetchCart } = useCart();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);
        fetchCart();
        return () => clearTimeout(timer);
    }, [fetchCart]);

    // Auto-calculate free shipping > $50 (Business logic could be moved to hook ideally, but simple here)
    const shipping = subtotal > 50 ? 0 : 10;
    const tax = subtotal * 0.08;

    const handleCheckout = () => {
        router.push('/shop/checkout');
    };

    if (loading) return <CartSkeleton />;

    return (
        <div className="bg-dark-bg min-h-screen flex flex-col">
            <main className="flex-grow pt-32 pb-20">
                <div className="container-custom">

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                        <div>
                            <h1 className="text-4xl md:text-6xl font-black text-white italic uppercase mb-2">Tu Carrito</h1>
                            <p className="text-gray-400">
                                {subtotal > 50
                                    ? <span className="text-green-500 font-bold">¡Has calificado para Envío Gratis!</span>
                                    : `Agrega $${(50 - subtotal).toFixed(2)} más para Envío Gratis.`
                                }
                            </p>
                        </div>
                        <Link href="/shop" className="text-white hover:text-primary font-bold flex items-center gap-2 transition-colors">
                            <FaArrowLeft /> Continuar Comprando
                        </Link>
                    </div>

                    {cartItems.length === 0 ? (
                        <EmptyCart />
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Cart List */}
                            <div className="lg:col-span-2 space-y-4">
                                <div className="hidden md:flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest px-6 mb-2">
                                    <span>Producto</span>
                                    <div className="flex gap-20 pr-12">
                                        <span>Cantidad</span>
                                        <span>Precio</span>
                                    </div>
                                </div>

                                {cartItems.map((item) => (
                                    <CartItem
                                        key={item.cart_item_id}
                                        id={item.product_id}
                                        name={item.Product?.product_name || "Unknown Product"}
                                        price={typeof item.Product?.price === 'string' ? parseFloat(item.Product.price) : item.Product?.price || 0}
                                        quantity={item.quantity}
                                        image={item.Product?.image_front || "https://res.cloudinary.com/dp7jr9k94/image/upload/v1703182285/ironman_box_placeholder.png"}
                                        stock={item.Product?.stock || 0}
                                        onUpdateQuantity={updateQuantity}
                                        onRemove={removeItem}
                                        category={(item.Product?.licence as any)?.licence_name || item.Product?.licence || "Pop! Vinyl"}
                                        condition="Mint"
                                    />
                                ))}
                            </div>

                            {/* Summary */}
                            <div className="lg:col-span-1">
                                <OrderSummary
                                    subtotal={subtotal}
                                    shipping={shipping}
                                    tax={tax}
                                    onCheckout={handleCheckout}
                                />
                            </div>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}
