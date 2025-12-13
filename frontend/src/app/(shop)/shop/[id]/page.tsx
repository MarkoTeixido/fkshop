"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductSlider from "@/components/ProductSlider";
import { useParams } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { productService } from "@/services/product.service";
import { Product } from "@/types/product.types";
import Loader from "@/components/ui/Loader";

export default function ProductDetail() {
    const { id } = useParams();
    const { addToCart } = useCart();

    const [product, setProduct] = useState<Product | null>(null);
    const [related, setRelated] = useState<any[]>([]);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    const increment = () => setQuantity(prev => prev + 1);
    const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            try {
                const data = await productService.getById(Number(id));
                setProduct(data.product);

                // Transform related for slider
                setRelated(data.related.map((p: any) => ({
                    id: p.product_id,
                    category: p.licence || 'Generic', // Service returns flattened 'licence' string
                    name: p.product_name,
                    price: p.price,
                    imageFront: p.image_front,
                    imageBack: p.image_back,
                    tag: p.discount ? "OFERTA" : "NUEVO",
                    installments: p.dues ? `${p.dues} CUOTAS SIN INTERÉS` : undefined,
                    stock: p.stock
                })));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product.product_id, quantity);
        }
    };

    if (loading) return <div className="container py-[8rem]"><Loader /></div>;
    if (!product) return <div className="container py-[8rem] text-center text-[2rem]">Producto no encontrado</div>;

    return (
        <main>
            <section className="container px-[2.4rem] min-[1000px]:px-[12rem] py-[6rem] text-dark">
                <article className="flex flex-col md:flex-row items-center gap-[4rem] md:gap-[8rem]">
                    {/* Image */}
                    <picture className="w-full max-w-[400px] md:max-w-1/2 flex justify-center relative aspect-square animate-fade">
                        <Image
                            src={product.image_front || '/placeholder.png'}
                            alt={product.product_name}
                            fill
                            className="object-contain"
                            priority
                        />
                    </picture>

                    {/* Content */}
                    <div className="flex flex-col gap-[2rem] w-full max-w-[500px]">
                        <p className="text-[1.6rem] font-medium uppercase text-gray-500">{product.licence || 'COLLECCIONABLE'}</p>
                        <h3 className="text-[3.2rem] font-bold uppercase leading-tight font-raleway">{product.product_name}</h3>
                        <p className="text-[1.8rem] font-light">
                            {product.product_description}
                        </p>
                        <h3 className="text-[2.8rem] font-medium my-[1rem]">$ {product.price}</h3>

                        <div className="flex gap-[2rem] items-center">
                            <div className="flex items-center gap-0 w-[12rem] relative">
                                <input
                                    type="text"
                                    value={quantity}
                                    readOnly
                                    className="w-full text-center border font-medium border-dark rounded-[50px] py-[0.8rem] text-[1.8rem]"
                                />
                                <div className="absolute right-0 flex flex-col h-full justify-center pr-2">
                                    <button onClick={increment} className="text-[1.4rem] leading-none px-2 font-bold hover:text-primary transition-colors">+</button>
                                    <button onClick={decrement} className="text-[1.4rem] leading-none px-2 font-bold hover:text-primary transition-colors">-</button>
                                </div>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className="bg-dark-bg text-white px-[2.4rem] py-[0.8rem] text-[1.6rem] font-medium hover:bg-primary-900 transition-colors uppercase"
                            >
                                Agregar al Carrito
                            </button>
                        </div>

                        <div className="flex items-center gap-2 mt-[2rem]">
                            <Link href="#" className="text-[1.4rem] text-secondary font-bold hover:underline underline-offset-4 pointer-events-none">Ver métodos de pago</Link>
                            <span className="text-[1.4rem] font-bold text-secondary">- {product.dues || 3} CUOTAS SIN INTERÉS</span>
                        </div>
                    </div>
                </article>
            </section>

            {/* Slider */}
            {related.length > 0 && <ProductSlider title="PRODUCTOS RELACIONADOS" products={related} />}
        </main>
    );
}
