import React from 'react';
import { FaTrophy } from "react-icons/fa6";
import { TopProduct } from '@/types/report.types';

export default function TopProductsTable({ products }: { products: TopProduct[] }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
                <FaTrophy className="text-gray-400" size={14} />
                <h3 className="font-bold text-gray-800 text-sm">Productos Top</h3>
            </div>

            <div className="overflow-x-auto scrollbar-thin-light">
                <table className="w-full min-w-[400px]">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="text-left py-2 px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Producto</th>
                            <th className="text-right py-2 px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">U.</th>
                            <th className="text-right py-2 px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-dashed divide-gray-100">
                        {products.map((product, idx) => (
                            <tr key={idx} className="group hover:bg-gray-50/50 transition-colors">
                                <td className="py-3 px-3">
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full ${idx === 0 ? 'bg-dark-bg text-white' : 'bg-gray-100 text-gray-500'}`}>
                                            {idx + 1}
                                        </span>
                                        <span className="font-bold text-gray-700 text-xs truncate max-w-[160px]" title={product.name}>{product.name}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-3 text-right">
                                    <span className="font-medium text-gray-500 text-xs">{product.qty}</span>
                                </td>
                                <td className="py-3 px-3 text-right">
                                    <span className="font-bold text-gray-900 text-xs">${product.revenue.toFixed(0)}</span>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan={3} className="text-center py-6 text-gray-400 text-sm">Sin datos de ventas</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
