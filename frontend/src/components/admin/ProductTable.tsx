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
            <table className="w-full text-left text-[1.6rem] min-w-[600px]">
                <thead>
                    <tr>
                        <th className="py-4 font-bold uppercase text-dark w-[5%]">ID</th>
                        <th className="py-4 font-bold uppercase text-dark w-[10%]">Código</th>
                        <th className="py-4 font-bold uppercase text-dark w-[35%]">Nombre del Producto</th>
                        <th className="py-4 font-bold uppercase text-dark w-[25%]">Categoria</th>
                        <th className="py-4 font-bold uppercase text-dark w-[15%]">Stock</th>
                        <th className="py-4 w-[10%]"></th>
                    </tr>
                </thead>
                <tbody className="font-medium text-[1.4rem]">
                    {products.map((p) => (
                        <tr key={p.product_id} className="border-t border-gray-300 hover:bg-gray-50 transition-colors">
                            <td className="py-4">#{p.product_id}</td>
                            <td className="py-4">{p.sku}</td>
                            <td className="py-4">{p.product_name}</td>
                            {/* Assuming some join or optional chaining if not populated */}
                            <td className="py-4">{(p as any).Category?.category_name || (p as any).category_name || 'N/A'}</td>
                            <td className="py-4">{p.stock}</td>
                            <td className="py-4 flex gap-4">
                                <Link
                                    href={`/admin/products/${p.product_id}/edit`}
                                    className="hover:scale-110 transition-transform p-2 rounded-full hover:bg-blue-50"
                                >
                                    <PiPencilSimpleLineDuotone size={26} className="text-[#4F46E5]" />
                                </Link>
                                <button
                                    onClick={() => onDelete(p.product_id)}
                                    className="hover:scale-110 transition-transform p-2 rounded-full hover:bg-red-50"
                                >
                                    <PiTrashSimpleDuotone size={26} className="text-[#E11D48]" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
