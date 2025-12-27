"use client";

import { useShopAccount } from "@/hooks/useShopAccount";
import { getShopStatusColor, getStatusLabel, formatCurrency } from "@/utils/order.utils";
import { FaBoxOpen, FaBan, FaTruckFast } from "react-icons/fa6";

export default function OrdersPage() {
    const { orders, loading, cancelOrder } = useShopAccount();

    const handleCancelOrder = (orderId: number) => {
        cancelOrder(orderId);
    };

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
        <section className="container pt-24 pb-16 px-4 md:px-8 lg:px-[12.8rem]">
            <h2 className="text-4xl md:text-6xl font-black italic uppercase mb-8 tracking-wider">Mis Pedidos</h2>

            {orders.length === 0 ? (
                <p className="text-lg md:text-xl text-gray-400">No has realizado ningún pedido aún.</p>
            ) : (
                <div className="flex flex-col gap-4 md:gap-6">
                    {orders.map((order) => (
                        <div key={order.order_id} className="bg-dark-surface border border-white/5 p-4 md:p-6 rounded-xl shadow-lg">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 border-b border-white/5 pb-4 gap-4">
                                <div className="flex flex-col gap-1 w-full md:w-auto">
                                    <div className="flex flex-wrap items-center gap-3 mb-1">
                                        <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide">Orden #{order.order_number || order.order_id}</h3>
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest border ${getShopStatusColor(order.status)}`}>
                                            {getStatusLabel(order.status)}
                                        </span>
                                    </div>
                                    <p className="text-sm md:text-base text-gray-400 font-medium">{new Date(order.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                                    {/* Shipped Message */}
                                    {order.status === 'shipped' && (
                                        <div className="mt-2 text-[10px] md:text-xs bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 p-2 rounded-lg flex items-center gap-2">
                                            <FaTruckFast />
                                            Por mail te llegará el nro de seguimiento para que puedas seguir tu pedido.
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-row md:flex-col justify-between md:justify-end items-center md:items-end w-full md:w-auto gap-2 md:gap-1 mt-2 md:mt-0">
                                    <div className="text-right">
                                        <p className="hidden md:block text-xs text-gray-400 uppercase tracking-widest mb-0.5">Total</p>
                                        <p className="text-2xl md:text-3xl font-light text-primary tracking-tight">{formatCurrency(order.total_amount)}</p>
                                    </div>

                                    {/* Action Buttons */}
                                    {['pending', 'paid', 'processing'].includes(order.status) && (
                                        <button
                                            onClick={() => handleCancelOrder(order.order_id)}
                                            className="md:mt-2 text-white bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 px-3 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 whitespace-nowrap"
                                        >
                                            <FaBan /> Cancelar
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                {order.OrderItems?.map((item: any) => (
                                    <div key={item.order_item_id} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0 hover:bg-white/5 px-2 rounded-lg transition-colors">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <span className="text-primary font-bold text-sm md:text-base shrink-0">{item.quantity}x</span>
                                            <span className="text-gray-300 font-light text-sm md:text-base truncate">{item.product_name}</span>
                                        </div>
                                        <span className="text-white font-medium text-sm md:text-base whitespace-nowrap ml-4">{formatCurrency(item.subtotal)}</span>
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
