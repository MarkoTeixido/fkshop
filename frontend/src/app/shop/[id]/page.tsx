"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import ProductGallery from "@/components/shop/ProductGallery";
import ProductInfo from "@/components/shop/ProductInfo";
import ProductSlider from "@/components/shop/ProductSlider";
import Loader from '@/components/ui/Loader';
import { useCart } from '@/hooks/useCart';
import { useProductDetail } from '@/hooks/useProductDetail';

export default function ProductDetailPage() {
    const params = useParams();
    const id = params?.id as string;
    const { addToCart } = useCart();

    const { product, relatedProducts, loading, error } = useProductDetail(id);

    const handleAddToCart = (quantity: number) => {
        if (product) {
            addToCart(product.product_id, quantity);
        }
    };

    if (loading) return (
        <div className="bg-dark-bg min-h-screen flex items-center justify-center">
            <Loader />
        </div>
    );

    if (error || !product) return (
        <div className="bg-dark-bg min-h-screen flex items-center justify-center text-white font-bold text-xl">
            {error || "Producto no encontrado"}
        </div>
    );

    return (
        <div className="bg-dark-bg min-h-screen flex flex-col">
            <main className="flex-grow pt-24 md:pt-32 pb-12 md:pb-20">
                <div className="container-custom">
                    {/* Breadcrumbs (Simple) */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 uppercase tracking-wider font-bold">
                        <span>Inicio</span> / <span>Tienda</span> / <span className="text-primary">{product.Licence?.licence_name || product.Category?.category_name || "General"}</span>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-20 mb-16 md:mb-32">
                        {/* Gallery */}
                        <div className="h-full">
                            <ProductGallery images={[product.image_front, product.image_back].filter(Boolean)} />
                        </div>

                        {/* Info */}
                        <div className="lg:pl-8">
                            <ProductInfo
                                id={product.product_id}
                                category={product.Licence?.licence_name || product.Category?.category_name || "General"}
                                name={product.product_name}
                                price={Number(product.price)}
                                stock={product.stock}
                                description={product.product_description}
                                licence={product.Licence?.licence_name}
                                onAddToCart={handleAddToCart}
                            />
                        </div>
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <div className="border-t border-white/10 pt-20">
                            <div className="flex justify-between items-end mb-12">
                                <div>
                                    <h3 className="text-primary font-bold tracking-widest uppercase mb-2">Completa tu Colección</h3>
                                    <h2 className="text-2xl md:text-4xl font-black text-white uppercase italic">También te Puede Gustar</h2>
                                </div>
                            </div>
                            <ProductSlider products={relatedProducts} />
                        </div>
                    )}

                    {/* Reviews Section Mockup */}
                    <div className="mt-16 md:mt-32 border-t border-white/10 pt-12 md:pt-20 grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="col-span-1">
                            <h2 className="text-3xl font-black text-white uppercase italic mb-8">Opiniones de Clientes</h2>
                            <div className="flex items-baseline gap-4 mb-4">
                                <span className="text-6xl font-black text-white">4.8</span>
                                <div className="flex text-primary text-xl">{'★'.repeat(5)}</div>
                            </div>
                            <p className="text-gray-400 mb-8">Basado en 124 opiniones</p>
                        </div>
                        <div className="col-span-2 space-y-8">
                            <p className="text-gray-500 italic">Aún no hay opiniones.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
