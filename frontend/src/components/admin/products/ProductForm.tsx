import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft } from "react-icons/fa6";
import { ProductFormData } from '@/hooks/useProductForm';
import { Category, Licence } from '@/types/product.types';

interface ProductFormProps {
    isEditing: boolean;
    productId?: string;
    formData: ProductFormData;
    categories: Category[];
    licences: Licence[];
    loading: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    onReset: () => void;
}

export default function ProductForm({
    isEditing,
    productId,
    formData,
    categories,
    licences,
    loading,
    onChange,
    onSubmit,
    onReset
}: ProductFormProps) {

    if (loading && !formData.product_name && isEditing) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in-up max-w-[1200px] mx-auto pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-medium mb-1">
                        <Link href="/admin/dashboard" className="hover:text-primary transition-colors">Panel</Link>
                        <span>/</span>
                        <span>Productos</span>
                        <span>/</span>
                        <span className="text-gray-900">{isEditing ? 'Editar' : 'Crear'}</span>
                    </div>
                    <div className="flex items-baseline gap-3">
                        <h1 className="text-2xl font-black text-dark-bg tracking-tight">{isEditing ? 'Editar Producto' : 'Nuevo Producto'}</h1>
                        {isEditing && <span className="text-sm font-mono text-gray-400">#{productId}</span>}
                    </div>
                    <p className="text-gray-500 text-sm mt-1">
                        {isEditing ? 'Actualizar detalles e inventario del producto.' : 'Agrega un nuevo ítem a tu catálogo.'}
                    </p>
                </div>
                <Link
                    href="/admin/dashboard"
                    className="flex items-center gap-2 text-gray-500 hover:text-dark-bg transition-colors font-medium text-sm"
                >
                    <FaArrowLeft />
                    <span>Volver al Panel</span>
                </Link>
            </div>

            <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info Column */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Basic Details Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-primary rounded-full"></span>
                            Información Básica
                        </h2>

                        <div className="flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider" htmlFor="product_name">Nombre del Producto</label>
                                    <input
                                        type="text"
                                        id="product_name"
                                        name="product_name"
                                        value={formData.product_name}
                                        onChange={onChange}
                                        placeholder="Ej. Kakashi Hatake Figure"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-gray-300"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider" htmlFor="sku">Código SKU</label>
                                    <input
                                        id="sku"
                                        name="sku"
                                        type="text"
                                        value={formData.sku}
                                        onChange={onChange}
                                        placeholder="Ej. SSK111AB001"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-gray-300 font-mono"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider" htmlFor="product_description">Descripción</label>
                                <textarea
                                    id="product_description"
                                    name="product_description"
                                    value={formData.product_description}
                                    onChange={onChange}
                                    rows={6}
                                    placeholder="Descripción detallada del producto..."
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-gray-300 resize-none"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Media Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-primary rounded-full"></span>
                            Imágenes del Producto
                        </h2>
                        <div className="space-y-6">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider" htmlFor="image_front">URL Imagen Frontal</label>
                                <input
                                    type="text"
                                    id="image_front"
                                    name="image_front"
                                    value={formData.image_front}
                                    onChange={onChange}
                                    placeholder="https://..."
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-gray-300"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider" htmlFor="image_back">URL Imagen Dorsal</label>
                                <input
                                    type="text"
                                    id="image_back"
                                    name="image_back"
                                    value={formData.image_back}
                                    onChange={onChange}
                                    placeholder="https://..."
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-gray-300"
                                />
                            </div>

                            {/* Current Images Preview */}
                            <div className="grid grid-cols-2 gap-6 mt-4 pt-4 border-t border-gray-50">
                                {formData.image_front && (
                                    <div className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <div className="relative w-32 h-32">
                                            <Image src={formData.image_front} alt="Frente" fill className="object-contain" sizes="150px" />
                                        </div>
                                        <span className="text-xs font-bold text-gray-500 uppercase">Vista Frontal</span>
                                    </div>
                                )}
                                {formData.image_back && (
                                    <div className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <div className="relative w-32 h-32">
                                            <Image src={formData.image_back} alt="Dorso" fill className="object-contain" sizes="150px" />
                                        </div>
                                        <span className="text-xs font-bold text-gray-500 uppercase">Vista Dorsal</span>
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
                        <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Organización</h2>
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500" htmlFor="category_id">Categoría</label>
                                <select
                                    id="category_id"
                                    name="category_id"
                                    value={formData.category_id}
                                    onChange={onChange}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white text-gray-900 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all cursor-pointer"
                                >
                                    <option value="">Seleccionar Categoría</option>
                                    {categories.map((cat) => (
                                        <option key={cat.category_id} value={cat.category_id}>
                                            {cat.category_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500" htmlFor="licence_id">Licencia</label>
                                <select
                                    id="licence_id"
                                    name="licence_id"
                                    value={formData.licence_id}
                                    onChange={onChange}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white text-gray-900 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all cursor-pointer"
                                >
                                    <option value="">Seleccionar Licencia</option>
                                    {licences.map((lic) => (
                                        <option key={lic.licence_id} value={lic.licence_id}>
                                            {lic.licence_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Pricing Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Precio e Inventario</h2>
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500" htmlFor="price">Precio ($)</label>
                                <input
                                    id="price"
                                    name="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={onChange}
                                    placeholder="0.00"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
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
                                        onChange={onChange}
                                        placeholder="0"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-500" htmlFor="discount">Descuento (%)</label>
                                    <input
                                        id="discount"
                                        name="discount"
                                        type="number"
                                        value={formData.discount}
                                        onChange={onChange}
                                        placeholder="0"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500" htmlFor="dues">Cuotas</label>
                                <select
                                    id="dues"
                                    name="dues"
                                    value={formData.dues}
                                    onChange={onChange}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white text-gray-900 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all cursor-pointer"
                                >
                                    <option value="">Seleccionar Opción</option>
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
                            disabled={loading}
                            className={`w-full bg-primary hover:bg-rose-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-primary/25 hover:shadow-rose-600/30 transition-all text-sm uppercase tracking-wide ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Publicar Producto')}
                        </button>
                        {!isEditing && (
                            <button
                                type="button"
                                onClick={onReset}
                                className="w-full bg-white border border-gray-200 text-gray-500 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all text-sm uppercase tracking-wide"
                            >
                                Reiniciar Formulario
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}
