"use client";
import React, { use } from 'react';
import { useProductForm } from '@/hooks/useProductForm';
import ProductForm from '@/components/admin/products/ProductForm';

export default function EditProduct({ params }: { params: Promise<{ product_id: string }> }) {
    const { product_id } = use(params);
    const {
        formData,
        categories,
        licences,
        loading,
        handleChange,
        handleSubmit,
        resetForm
    } = useProductForm(product_id);

    return (
        <ProductForm
            isEditing={true}
            productId={product_id}
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
