import React from 'react';
import { FaUserGroup } from "react-icons/fa6";
import { TopCustomer } from '@/types/report.types';

export default function TopCustomersTable({ customers }: { customers: TopCustomer[] }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
                <FaUserGroup className="text-gray-400" size={14} />
                <h3 className="font-bold text-gray-800 text-sm">Mejores Clientes</h3>
            </div>

            <div className="overflow-x-auto scrollbar-thin-light">
                <table className="w-full min-w-[400px]">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="text-left py-2 px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Cliente</th>
                            <th className="text-right py-2 px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Gasto</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-dashed divide-gray-100">
                        {customers.map((customer, idx) => (
                            <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                <td className="py-3 px-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                                            {customer.name.charAt(0)}
                                        </div>
                                        <span className="font-bold text-gray-700 text-xs">{customer.name}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-3 text-right">
                                    <span className="font-black text-gray-900 text-xs">
                                        ${customer.total.toFixed(2)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {customers.length === 0 && (
                            <tr>
                                <td colSpan={2} className="text-center py-6 text-gray-400 text-sm">Sin datos de clientes</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
