"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FaPlus } from "react-icons/fa6";
import { useAdminDashboard } from '@/hooks/useAdminDashboard';
import { useDashboardLogic } from '@/hooks/useDashboardLogic';
import ProductTable from '@/components/admin/ProductTable';
import Loader from '@/components/ui/Loader';
import ConfirmModal from '@/components/ui/ConfirmModal';
import DashboardStats from '@/components/admin/dashboard/DashboardStats';
import DashboardControls from '@/components/admin/dashboard/DashboardControls';

export default function AdminDashboard() {
    const { products, loading, error, deleteProduct } = useAdminDashboard();
    const { filterState, stats } = useDashboardLogic(products);

    // Modal State
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        confirmText: 'Confirmar',
        cancelText: 'Cancelar',
        onConfirm: () => { },
        variant: 'danger' as 'danger' | 'warning' | 'info'
    });

    const requestDeleteProduct = (id: number) => {
        setConfirmModal({
            isOpen: true,
            title: 'Eliminar Producto',
            message: '¿Estás seguro de eliminar este producto? Esta acción no se puede deshacer.',
            variant: 'danger',
            confirmText: 'Eliminar',
            cancelText: 'Cancelar',
            onConfirm: async () => {
                try {
                    await deleteProduct(id);
                    setConfirmModal(prev => ({ ...prev, isOpen: false }));
                } catch (error: any) {
                    setConfirmModal({
                        isOpen: true,
                        title: 'No se puede eliminar',
                        message: error.message || 'Hubo un error al intentar eliminar el producto.',
                        variant: 'warning',
                        confirmText: 'Entendido',
                        cancelText: '',
                        onConfirm: () => setConfirmModal(prev => ({ ...prev, isOpen: false })),
                    });
                }
            }
        });
    };

    if (loading) return <div className="flex justify-center items-center h-[60vh]"><Loader /></div>;

    const startItem = (filterState.currentPage - 1) * 15 + 1;
    const endItem = Math.min(filterState.currentPage * 15, stats.processedProducts.length);

    return (
        <div className="animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
                <div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-medium mb-1">
                        <span>Inicio</span>
                        <span>/</span>
                    </div>
                    <h1 className="text-2xl font-black text-dark-bg tracking-tight">Inventario de Productos</h1>
                    <p className="text-gray-500 text-sm mt-1">Administra tu catálogo, niveles de stock y precios.</p>
                </div>
                <Link href="/admin/products/create" className="bg-primary hover:bg-rose-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg shadow-primary/25 hover:shadow-rose-600/30 transition-all flex items-center gap-2 group text-sm w-full md:w-auto justify-center">
                    <FaPlus className="group-hover:rotate-90 transition-transform" />
                    <span>Agregar Producto</span>
                </Link>
            </div>

            <DashboardStats
                totalProducts={stats.totalProducts}
                newProductsCount={stats.newProductsCount}
                lowStockItems={stats.lowStockItems}
                totalValue={stats.totalValue}
            />

            <DashboardControls
                {...filterState}
                uniqueCategories={stats.uniqueCategories}
            />

            {/* Products Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {error && (
                    <div className="bg-rose-50 text-rose-600 p-3 font-medium text-center text-sm">
                        {error}
                    </div>
                )}

                <div className="p-4 text-black w-full overflow-x-auto">
                    <ProductTable products={stats.paginatedProducts} onDelete={requestDeleteProduct} />

                    {stats.paginatedProducts.length === 0 && (
                        <div className="text-center py-12 text-gray-500 font-medium">
                            No se encontraron productos.
                        </div>
                    )}
                </div>

                <div className="p-4 border-t border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center text-xs text-gray-500">
                    <span className='font-medium'>
                        Mostrando {stats.processedProducts.length > 0 ? startItem : 0}-{endItem} de {stats.processedProducts.length} productos
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => filterState.setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={filterState.currentPage === 1}
                            className="px-3 py-1.5 rounded-lg border border-gray-200 font-bold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-gray-700"
                        >
                            Anterior
                        </button>
                        <button
                            onClick={() => filterState.setCurrentPage(p => Math.min(stats.totalPages, p + 1))}
                            disabled={filterState.currentPage === stats.totalPages || stats.totalPages === 0}
                            className="px-3 py-1.5 rounded-lg border border-gray-200 font-bold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-gray-700"
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>

            <ConfirmModal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                onConfirm={confirmModal.onConfirm}
                title={confirmModal.title}
                message={confirmModal.message}
                confirmText={confirmModal.confirmText}
                cancelText={confirmModal.cancelText}
                variant={confirmModal.variant}
            />
        </div>
    );
}
