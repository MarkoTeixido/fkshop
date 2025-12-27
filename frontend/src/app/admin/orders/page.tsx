"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaEye, FaFilter, FaMagnifyingGlass, FaChevronDown, FaTrash } from "react-icons/fa6";
import ConfirmModal from '@/components/ui/ConfirmModal';
import OrderDetailModal from '@/components/admin/orders/OrderDetailModal';
import { useAdminOrders, OrderItem } from '@/hooks/useAdminOrders';

export default function OrdersPage() {
    const {
        orders,
        loading,
        filterStatus,
        setFilterStatus,
        searchTerm,
        setSearchTerm,
        selectedOrder,
        setSelectedOrder,
        currentPage,
        setCurrentPage,
        totalPages,
        totalItems,
        itemsPerPage,
        deleteOrder,
        updateOrderStatus
    } = useAdminOrders();

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);

    // Modal State for Confirmations
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: () => { },
        variant: 'danger' as 'danger' | 'warning' | 'info'
    });

    // Close filter dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const getStatusColor = (status: string) => {
        const normalizedStatus = status.toLowerCase();
        switch (normalizedStatus) {
            case 'paid': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'completed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'shipped': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'processing': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'cancelled': return 'bg-rose-100 text-rose-700 border-rose-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getStatusLabel = (status: string) => {
        const map: Record<string, string> = {
            all: 'Todos', pending: 'Pendiente', paid: 'Pagado',
            processing: 'En Proceso', shipped: 'Enviado',
            completed: 'Completado', cancelled: 'Cancelado', delivered: 'Entregado'
        };
        return map[status.toLowerCase()] || status;
    };

    const handleDeleteOrder = (orderId: number) => {
        setConfirmModal({
            isOpen: true,
            title: 'Eliminar Pedido',
            message: '¿Estás seguro de eliminar este pedido permanentemente? Esta acción NO se puede deshacer.',
            variant: 'danger',
            onConfirm: () => {
                deleteOrder(orderId);
                setConfirmModal(prev => ({ ...prev, isOpen: false }));
            }
        });
    };



    const handleDetailStatusChange = (orderId: number, newStatus: string) => {
        setConfirmModal({
            isOpen: true,
            title: 'Cambiar Estado',
            message: `¿Estás seguro de cambiar el estado a ${getStatusLabel(newStatus)}?`,
            variant: 'warning',
            onConfirm: () => {
                updateOrderStatus(orderId, newStatus);
                setConfirmModal(prev => ({ ...prev, isOpen: false }));
            }
        });
    };

    const calculateTotalItems = (items: OrderItem[]) => {
        return items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="animate-fade-in-up max-w-[1200px] mx-auto pb-12 relative">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-medium mb-1">
                        <Link href="/admin/dashboard" className="hover:text-primary transition-colors">Panel</Link>
                        <span>/</span>
                        <span className="text-gray-900">Pedidos</span>
                    </div>
                    <div className="flex items-baseline gap-3">
                        <h1 className="text-2xl font-black text-dark-bg tracking-tight">Pedidos Recientes</h1>
                        <span className="text-sm font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{totalItems} total</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">Gestiona y rastrea los pedidos de clientes.</p>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/dashboard"
                        className="flex items-center gap-2 bg-dark-bg text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-dark-bg/20 hover:bg-gray-800 transition-all"
                    >
                        <FaArrowLeft />
                        Volver
                    </Link>
                </div>
            </div>

            {/* Controls Bar */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center z-10 relative">
                {/* Search */}
                <div className="relative group max-w-md w-full">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                        <FaMagnifyingGlass />
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar por ID, Número de Orden o Cliente..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-50 border-none rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium text-gray-700 focus:bg-white focus:ring-2 focus:ring-primary/20 placeholder:text-gray-400 transition-all outline-none"
                    />
                </div>

                {/* Filter Dropdown */}
                <div className="relative w-full md:w-auto" ref={filterRef}>
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="w-full md:w-64 flex items-center justify-between gap-3 bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
                    >
                        <div className="flex items-center gap-2">
                            <FaFilter className="text-gray-400" />
                            <span>Estado: <span className="text-primary">{getStatusLabel(filterStatus)}</span></span>
                        </div>
                        <FaChevronDown className={`text-gray-400 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} size={12} />
                    </button>

                    {isFilterOpen && (
                        <div className="absolute right-0 top-full mt-2 w-full md:w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-[50] animate-fade-in">
                            <div className="p-1.5 flex flex-col gap-0.5">
                                {['all', 'pending', 'paid', 'processing', 'shipped', 'completed', 'cancelled'].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => {
                                            setFilterStatus(status);
                                            setIsFilterOpen(false);
                                        }}
                                        className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                                            ${filterStatus === status ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'}
                                        `}
                                    >
                                        {getStatusLabel(status)}
                                        {filterStatus === status && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto scrollbar-thin-light">
                    <table className="w-full">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">ID Pedido</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Cliente</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Fecha</th>
                                <th className="text-center py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Ítems</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Estado</th>
                                <th className="text-right py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr key={order.order_id} className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex flex-col">
                                                <span className="font-mono text-sm font-bold text-gray-900">#{order.order_number || order.order_id}</span>
                                                <span className="text-[10px] text-gray-400">ID: {order.order_id}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-rose-400 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                                                    {(order.User?.name || 'U').charAt(0).toUpperCase()}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-gray-700 capitalize">{order.User?.name} {order.User?.lastname}</span>
                                                    <span className="text-xs text-gray-400">{order.User?.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-sm text-gray-500 font-medium">
                                                {new Date(order.created_at).toLocaleDateString()}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-bold">
                                                {calculateTotalItems(order.OrderItems)}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-sm font-black text-gray-900">
                                                ${parseFloat(order.final_amount || order.total_amount || '0').toFixed(2)}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusColor(order.status)} uppercase tracking-wide`}>
                                                {getStatusLabel(order.status)}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="text-gray-400 hover:text-primary transition-colors p-2 hover:bg-primary/5 rounded-lg active:scale-95 transform"
                                                title="Ver detalle"
                                            >
                                                <FaEye size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteOrder(order.order_id)}
                                                disabled={!['cancelled', 'completed'].includes(order.status)}
                                                className={`p-2 rounded-lg transition-colors ml-1 ${['cancelled', 'completed'].includes(order.status)
                                                    ? 'text-gray-400 hover:text-rose-600 hover:bg-rose-50 active:scale-95 transform'
                                                    : 'text-gray-200 cursor-not-allowed'
                                                    }`}
                                                title={['cancelled', 'completed'].includes(order.status) ? "Eliminar Pedido" : "No se puede eliminar"}
                                            >
                                                <FaTrash size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="text-center py-12 text-gray-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <FaFilter className="text-gray-300 text-4xl mb-2" />
                                            <p className="font-medium">No se encontraron pedidos con esos filtros.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Footer with Pagination */}
            <div className="border-t border-gray-100 p-4 bg-gray-50/30 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-500 font-medium">
                        Mostrando {orders.length > 0 ? ((currentPage - 1) * itemsPerPage) + 1 : 0}-{Math.min(currentPage * itemsPerPage, totalItems)} de {totalItems} pedidos
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                        <FaTrash size={10} />
                        Los pedidos cancelados se borrarán automáticamente cada 24 horas.
                    </span>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1.5 rounded-lg border border-gray-200 font-bold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs text-gray-700"
                    >
                        Anterior
                    </button>
                    <div className="flex items-center gap-1">
                        <span className="text-xs font-medium text-gray-600 px-2">
                            Página {currentPage} de {totalPages || 1}
                        </span>
                    </div>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="px-3 py-1.5 rounded-lg border border-gray-200 font-bold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs text-gray-700"
                    >
                        Siguiente
                    </button>
                </div>
            </div>

            {selectedOrder && (
                <OrderDetailModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                    onStatusChange={handleDetailStatusChange}
                    getStatusColor={getStatusColor}
                    getStatusLabel={getStatusLabel}
                />
            )}

            <ConfirmModal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                onConfirm={confirmModal.onConfirm}
                title={confirmModal.title}
                message={confirmModal.message}
                variant={confirmModal.variant}
            />
        </div >
    );
}
