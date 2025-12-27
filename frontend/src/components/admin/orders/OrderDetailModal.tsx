import { FaBox, FaXmark, FaUser, FaTruck } from "react-icons/fa6";
import { Order } from "@/hooks/useAdminOrders";

interface OrderDetailModalProps {
    order: Order;
    onClose: () => void;
    onStatusChange: (orderId: number, status: string) => void;
    getStatusColor: (status: string) => string;
    getStatusLabel: (status: string) => string;
}

export default function OrderDetailModal({ order, onClose, onStatusChange, getStatusColor, getStatusLabel }: OrderDetailModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>
            <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh] animate-scale-up">
                {/* Modal Header */}
                <div className="bg-gray-50 border-b border-gray-100 p-6 flex justify-between items-start">
                    <div className="flex gap-4 items-start">
                        <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 text-primary">
                            <FaBox size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                                Pedido #{order.order_number || order.order_id}
                            </h2>
                            <div className="flex flex-col gap-2 mt-1">
                                <span className="text-sm text-gray-500">
                                    Realizado el {new Date(order.created_at).toLocaleDateString()} A las {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusColor(order.status)} uppercase`}>
                                        {getStatusLabel(order.status)}
                                    </span>

                                    {/* Status Changer */}
                                    <select
                                        value={order.status}
                                        onChange={(e) => onStatusChange(order.order_id, e.target.value)}
                                        className="ml-2 text-xs font-bold bg-white text-gray-900 border border-gray-200 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer hover:bg-gray-50 transition-all"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {['pending', 'paid', 'processing', 'shipped', 'completed', 'cancelled'].map(s => (
                                            <option key={s} value={s}>{getStatusLabel(s)}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <FaXmark size={20} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* User Info */}
                        <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50">
                            <div className="flex items-center gap-2 mb-3 text-gray-900 font-bold text-sm">
                                <FaUser className="text-gray-400" />
                                Cliente
                            </div>
                            <p className="font-bold text-gray-800">{order.User?.name} {order.User?.lastname}</p>
                            <p className="text-sm text-gray-500">{order.User?.email}</p>
                        </div>
                        {/* Shipping Info */}
                        <div className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50">
                            <div className="flex items-center gap-2 mb-3 text-gray-900 font-bold text-sm">
                                <FaTruck className="text-gray-400" />
                                Envío
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {order.shipping_street}<br />
                                {order.shipping_city}, {order.shipping_state}<br />
                                {order.shipping_postal_code}, {order.shipping_country}
                            </p>
                        </div>
                    </div>

                    {/* Items List */}
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Productos</h3>
                    <div className="border rounded-2xl border-gray-100 overflow-hidden mb-6">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase">Producto</th>
                                    <th className="text-center py-3 px-4 text-xs font-bold text-gray-500 uppercase">Cant.</th>
                                    <th className="text-right py-3 px-4 text-xs font-bold text-gray-500 uppercase">Precio Unit.</th>
                                    <th className="text-right py-3 px-4 text-xs font-bold text-gray-500 uppercase">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {order.OrderItems?.map((item) => (
                                    <tr key={item.order_item_id}>
                                        <td className="py-3 px-4">
                                            <div>
                                                <p className="text-sm font-bold text-gray-800">{item.product_name}</p>
                                                <p className="text-xs text-gray-400">SKU: {item.product_sku}</p>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-center text-sm font-medium text-gray-700">{item.quantity}</td>
                                        <td className="py-3 px-4 text-right text-sm text-gray-600">${parseFloat(item.unit_price).toFixed(2)}</td>
                                        <td className="py-3 px-4 text-right text-sm font-bold text-gray-900">${parseFloat(item.subtotal).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Summary */}
                    <div className="flex justify-end">
                        <div className="w-full md:w-1/2 bg-gray-50 rounded-2xl p-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Subtotal</span>
                                <span className="font-medium text-gray-900">${(parseFloat(order.final_amount) * 0.8).toFixed(2)} (Aprox)</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Envío</span>
                                <span className="font-medium text-gray-900">Calculado</span>
                            </div>
                            <div className="pt-2 border-t border-gray-200 mt-2 flex justify-between items-center">
                                <span className="font-bold text-gray-900">Total</span>
                                <span className="text-xl font-black text-primary">${parseFloat(order.final_amount).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-white hover:border-gray-300 transition-all"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}
