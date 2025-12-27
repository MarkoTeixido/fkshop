import Image from 'next/image';

interface CheckoutOrderSummaryProps {
    cartItems: any[];
    subtotal: number;
}

export default function CheckoutOrderSummary({ cartItems, subtotal }: CheckoutOrderSummaryProps) {
    return (
        <div className="sticky top-32">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-10 -mt-10"></div>

                <h3 className="text-xl font-bold text-white uppercase mb-8 border-b border-white/10 pb-4">Resumen de Orden</h3>

                <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto p-4 custom-scrollbar">
                    {cartItems.map((item) => (
                        <div key={item.cart_item_id} className="flex gap-4 group">
                            <div className="w-20 h-20 bg-white/5 rounded-2xl p-2 border border-white/10 relative shrink-0">
                                <Image
                                    src={item.Product.image_front || "https://res.cloudinary.com/dp7jr9k94/image/upload/v1703182285/ironman_box_placeholder.png"}
                                    alt={item.Product.product_name}
                                    width={80}
                                    height={80}
                                    className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500"
                                />
                                <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center border border-dark-bg z-10 shadow-sm">
                                    {item.quantity}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                <h4 className="text-white font-bold truncate text-sm mb-1">{item.Product.product_name}</h4>
                                <p className="text-gray-400 text-xs text-primary">{item.Product.is_new ? 'Nuevo' : 'En Stock'}</p>
                            </div>
                            <div className="flex flex-col justify-center text-right">
                                <span className="text-white font-bold text-sm">${(Number(item.Product.price) * item.quantity).toFixed(2)}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-3 pt-6 border-t border-white/10">
                    <div className="flex justify-between text-gray-400 text-sm">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-400 text-sm">
                        <span>Envío</span>
                        <span className="text-green-400 font-bold">Gratis</span>
                    </div>
                    <div className="flex justify-between items-end pt-4 mt-2 border-t border-white/10">
                        <span className="text-white font-bold text-lg">Total</span>
                        <span className="text-3xl font-black text-white italic">${subtotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
