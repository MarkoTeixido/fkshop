"use client";
import { useProductForm } from '@/hooks/useProductForm';
import ProductForm from '@/components/admin/products/ProductForm';

export default function CreateProduct() {
    const {
        formData,
        categories,
        licences,
        loading,
        handleChange,
        handleSubmit,
        resetForm
    } = useProductForm();

    return (
        <ProductForm
            isEditing={false}
            formData={formData}
            categories={categories}
            licences={licences}
            loading={loading}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onReset={resetForm}
        />
    );
}
