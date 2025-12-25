"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
    const { token, user } = useAuth();
    const router = useRouter();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            router.push("/login");
            return;
        }

        const fetchOrders = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shop/orders`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setOrders(data);
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchOrders();
    }, [user, token, router]);

    if (loading) {
        return (
            <section className="container pt-[6rem] pb-[4rem] px-[2.4rem] min-[1000px]:px-[12.8rem]">
                <h2 className="text-[3.2rem] font-black italic uppercase mb-[4rem] tracking-wider">Mis Pedidos</h2>
                <div className="flex flex-col gap-[1.5rem]">
                    {[1, 2].map((i) => (
                        <div key={i} className="border border-white/10 bg-dark-surface p-[2rem] rounded-lg animate-pulse">
                            <div className="flex justify-between items-center mb-[1rem] border-b border-white/5 pb-[1rem]">
                                <div className="space-y-2">
                                    <div className="h-8 w-32 bg-white/10 rounded"></div>
                                    <div className="h-5 w-24 bg-white/5 rounded"></div>
                                </div>
                                <div className="text-right space-y-2">
                                    <div className="h-8 w-20 bg-white/10 rounded ml-auto"></div>
                                    <div className="h-6 w-24 bg-white/5 rounded-full ml-auto"></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-6 w-full bg-white/5 rounded"></div>
                                <div className="h-6 w-2/3 bg-white/5 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="container pt-[6rem] pb-[4rem] px-[2.4rem] min-[1000px]:px-[12.8rem]">
            <h2 className="text-[3.2rem] font-black italic uppercase mb-[2rem] tracking-wider">Mis Pedidos</h2>

            {orders.length === 0 ? (
                <p className="text-[1.8rem]">No has realizado ningún pedido aún.</p>
            ) : (
                <div className="flex flex-col gap-[1rem]">
                    {orders.map((order) => (
                        <div key={order.order_id} className="bg-dark-surface border border-white/5 p-[1.5rem] rounded-xl">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-[1rem] border-b border-white/5 pb-[1rem] gap-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-[1.6rem] font-bold text-white tracking-wide">Orden #{order.order_number}</h3>
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[0.6rem] font-bold uppercase tracking-widest border ${order.status === 'processing'
                                                ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                                : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                            }`}>
                                            {order.status === 'processing' ? 'Completado' : 'Pendiente'}
                                        </span>
                                    </div>
                                    <p className="text-[1.1rem] text-gray-400 font-medium">{new Date(order.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[1rem] text-gray-400 uppercase tracking-widest mb-0.5">Total</p>
                                    <p className="text-[1.6rem] font-light text-primary tracking-tight">$ {order.total_amount}</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-[0.5rem]">
                                {order.OrderItems?.map((item: any) => (
                                    <div key={item.order_item_id} className="flex justify-between items-center py-1">
                                        <div className="flex items-center gap-3">
                                            <span className="text-primary font-bold text-[1.2rem]">{item.quantity}x</span>
                                            <span className="text-gray-300 font-light">{item.product_name}</span>
                                        </div>
                                        <span className="text-white font-medium text-[1.2rem]">$ {item.subtotal}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
