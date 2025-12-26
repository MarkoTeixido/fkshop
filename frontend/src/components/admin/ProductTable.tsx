import Link from 'next/link';
import { PiPencilSimpleLineDuotone, PiTrashSimpleDuotone } from "react-icons/pi";
import { Product } from '@/types/product.types';

interface ProductTableProps {
    products: Product[];
    onDelete: (id: number) => void;
}

export default function ProductTable({ products, onDelete }: ProductTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[600px]">
                <thead>
                    <tr className="border-b border-gray-100">
                        <th className="py-3 font-bold uppercase text-xs text-gray-500 w-[5%]">ID</th>
                        <th className="py-3 font-bold uppercase text-xs text-gray-500 w-[10%]">Código</th>
                        <th className="py-3 font-bold uppercase text-xs text-gray-500 w-[30%]">Nombre del Producto</th>
                        <th className="py-3 font-bold uppercase text-xs text-gray-500 w-[20%]">Categoria</th>
                        <th className="py-3 font-bold uppercase text-xs text-gray-500 w-[15%]">Precio</th>
                        <th className="py-3 font-bold uppercase text-xs text-gray-500 w-[10%]">Stock</th>
                        <th className="py-3 w-[10%]"></th>
                    </tr>
                </thead>
                <tbody className="font-medium text-gray-700">
                    {products.map((p) => (
                        <tr key={p.product_id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                            <td className="py-3 text-gray-500 text-xs">#{p.product_id}</td>
                            <td className="py-3 text-xs">{p.sku}</td>
                            <td className="py-3">{p.product_name}</td>
                            {/* Assuming some join or optional chaining if not populated */}
                            <td className="py-3">{(p as any).Category?.category_name || (p as any).category_name || 'N/A'}</td>
                            <td className="py-3 text-gray-900">${Number(p.price).toFixed(2)}</td>
                            <td className="py-3">{p.stock}</td>
                            <td className="py-3 flex gap-2 justify-end">
                                <Link
                                    href={`/admin/products/${p.product_id}/edit`}
                                    className="hover:scale-110 transition-transform p-1.5 rounded-lg hover:bg-blue-50 text-blue-600"
                                >
                                    <PiPencilSimpleLineDuotone size={18} />
                                </Link>
                                <button
                                    onClick={() => onDelete(p.product_id)}
                                    className="hover:scale-110 transition-transform p-1.5 rounded-lg hover:bg-red-50 text-red-600"
                                >
                                    <PiTrashSimpleDuotone size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
