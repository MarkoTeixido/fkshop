import ProductCard from "@/components/shop/ProductCard";

interface ProductGridProps {
    loading: boolean;
    products: any[]; // Ideally typed with Product[], will refine
}

export default function ProductGrid({ loading, products }: ProductGridProps) {
    if (loading) {
        return (
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-12">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-dark-surface border border-white/5 rounded-xl overflow-hidden p-4 animate-pulse h-[450px] flex flex-col">
                        <div className="w-full aspect-square bg-white/5 rounded-lg mb-4"></div>
                        <div className="flex flex-col gap-2 flex-grow">
                            <div className="h-3 w-1/3 bg-white/10 rounded"></div>
                            <div className="h-6 w-3/4 bg-white/10 rounded"></div>
                            <div className="mt-auto flex flex-col gap-3">
                                <div className="h-6 w-1/2 bg-white/10 rounded"></div>
                                <div className="h-10 w-full bg-white/5 rounded-lg"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        );
    }

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-white/10 rounded-2xl bg-white/5 p-12">
                <p className="text-2xl font-bold text-white mb-2">No se encontraron productos</p>
                <p className="text-gray-400">Intenta ajustar tus filtros</p>
            </div>
        );
    }

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-12">
            {products.map((p) => (
                <ProductCard
                    key={p.product_id}
                    id={p.product_id}
                    category={p.Licence ? p.Licence.licence_name : p.Category?.category_name || 'GENERIC'}
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
        </section>
    );
}
