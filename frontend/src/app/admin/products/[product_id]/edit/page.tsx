"use client";
import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import { useAdminAuth } from "@/context/AdminAuthContext";
import Swal from "sweetalert2";

export default function EditProduct({ params }: { params: Promise<{ product_id: string }> }) {
    const { product_id } = use(params);
    const router = useRouter();
    const { token } = useAdminAuth();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        category_id: '',
        licence_id: '',
        product_name: '',
        product_description: '',
        sku: '',
        price: '',
        stock: '',
        discount: '',
        dues: '',
        image_front: '',
        image_back: ''
    });

    useEffect(() => {
        if (!token) return;

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/products/${product_id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => {
                if (!res.ok) throw new Error("Error fetching product");
                return res.json();
            })
            .then(data => {
                setFormData({
                    category_id: data.category_id || '',
                    licence_id: data.licence_id || '',
                    product_name: data.product_name || '',
                    product_description: data.product_description || '',
                    sku: data.sku || '',
                    price: data.price || '',
                    stock: data.stock || '',
                    discount: data.discount || '',
                    dues: data.dues || '',
                    image_front: data.image_front || '',
                    image_back: data.image_back || ''
                });
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                Swal.fire('Error', 'No se pudo cargar el producto', 'error');
                router.push('/admin/dashboard');
            });
    }, [product_id, token, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/products/${product_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (res.ok) {
                Swal.fire('Actualizado!', 'El producto ha sido actualizado exitosamente', 'success').then(() => {
                    router.push('/admin/dashboard');
                });
            } else {
                Swal.fire('Error', data.error || 'Error al actualizar producto', 'error');
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Error de conexión', 'error');
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="animate-fade-in-up max-w-[1200px] mx-auto pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-medium mb-1">
                        <Link href="/admin/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
                        <span>/</span>
                        <span>Products</span>
                        <span>/</span>
                        <span className="text-gray-900">Edit</span>
                    </div>
                    <div className="flex items-baseline gap-3">
                        <h1 className="text-2xl font-black text-dark-bg tracking-tight">Edit Product</h1>
                        <span className="text-sm font-mono text-gray-400">#{product_id}</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">Update product details and inventory.</p>
                </div>
                <Link
                    href="/admin/dashboard"
                    className="flex items-center gap-2 text-gray-500 hover:text-dark-bg transition-colors font-medium text-sm"
                >
                    <FaArrowLeft />
                    <span>Back to Dashboard</span>
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info Column */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Basic Details Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-primary rounded-full"></span>
                            Basic Information
                        </h2>

                        <div className="flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider" htmlFor="product_name">Product Name</label>
                                    <input
                                        type="text"
                                        id="product_name"
                                        name="product_name"
                                        value={formData.product_name}
                                        onChange={handleChange}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-gray-300"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider" htmlFor="sku">SKU Code</label>
                                    <input
                                        id="sku"
                                        name="sku"
                                        type="text"
                                        value={formData.sku}
                                        onChange={handleChange}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-gray-300 font-mono"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider" htmlFor="product_description">Description</label>
                                <textarea
                                    id="product_description"
                                    name="product_description"
                                    value={formData.product_description}
                                    onChange={handleChange}
                                    rows={6}
                                    placeholder="Detailed description of the product..."
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-gray-300 resize-none"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Media Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-primary rounded-full"></span>
                            Product Images
                        </h2>
                        <div className="space-y-6">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider" htmlFor="image_front">Front Image URL</label>
                                <input
                                    type="text"
                                    id="image_front"
                                    name="image_front"
                                    value={formData.image_front}
                                    onChange={handleChange}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-gray-300"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider" htmlFor="image_back">Back Image URL</label>
                                <input
                                    type="text"
                                    id="image_back"
                                    name="image_back"
                                    value={formData.image_back}
                                    onChange={handleChange}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-gray-300"
                                />
                            </div>

                            {/* Current Images Preview */}
                            <div className="grid grid-cols-2 gap-6 mt-4 pt-4 border-t border-gray-50">
                                {formData.image_front && (
                                    <div className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <div className="relative w-32 h-32">
                                            <Image src={formData.image_front} alt="Frente" fill className="object-contain" sizes="150px" />
                                        </div>
                                        <span className="text-xs font-bold text-gray-500 uppercase">Front View</span>
                                    </div>
                                )}
                                {formData.image_back && (
                                    <div className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <div className="relative w-32 h-32">
                                            <Image src={formData.image_back} alt="Dorso" fill className="object-contain" sizes="150px" />
                                        </div>
                                        <span className="text-xs font-bold text-gray-500 uppercase">Back View</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="flex flex-col gap-6">
                    {/* Organization Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Organization</h2>
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500" htmlFor="category_id">Category</label>
                                <select
                                    id="category_id"
                                    name="category_id"
                                    value={formData.category_id}
                                    onChange={handleChange}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all cursor-pointer"
                                >
                                    <option value="">Select Category</option>
                                    <option value="1">Figuras</option>
                                    <option value="2">Remeras</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500" htmlFor="licence_id">License</label>
                                <select
                                    id="licence_id"
                                    name="licence_id"
                                    value={formData.licence_id}
                                    onChange={handleChange}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all cursor-pointer"
                                >
                                    <option value="">Select License</option>
                                    <option value="1">Star Wars</option>
                                    <option value="2">Pokemon</option>
                                    <option value="3">Harry Potter</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Pricing Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Pricing & Inventory</h2>
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500" htmlFor="price">Price ($)</label>
                                <input
                                    id="price"
                                    name="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-500" htmlFor="stock">Stock</label>
                                    <input
                                        id="stock"
                                        name="stock"
                                        type="number"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-500" htmlFor="discount">Discount (%)</label>
                                    <input
                                        id="discount"
                                        name="discount"
                                        type="number"
                                        value={formData.discount}
                                        onChange={handleChange}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500" htmlFor="dues">Installments</label>
                                <select
                                    id="dues"
                                    name="dues"
                                    value={formData.dues}
                                    onChange={handleChange}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all cursor-pointer"
                                >
                                    <option value="">Select Option</option>
                                    <option value="3">3 Cuotas sin interés</option>
                                    <option value="6">6 Cuotas sin interés</option>
                                    <option value="12">12 Cuotas sin interés</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3 pt-4">
                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-rose-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-primary/25 hover:shadow-rose-600/30 transition-all text-sm uppercase tracking-wide"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
