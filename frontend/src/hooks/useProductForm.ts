import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { useToast } from "@/context/ToastContext";

import { Category, Licence } from '@/types/product.types';

export interface ProductFormData {
    category_id: string;
    licence_id: string;
    product_name: string;
    product_description: string;
    sku: string;
    price: string;
    stock: string;
    discount: string;
    dues: string;
    image_front: string;
    image_back: string;
}

const INITIAL_STATE: ProductFormData = {
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
};

export function useProductForm(productId?: string) {
    const router = useRouter();
    const { token } = useAdminAuth();
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [licences, setLicences] = useState<Licence[]>([]);
    const [formData, setFormData] = useState<ProductFormData>(INITIAL_STATE);

    // Fetch Options (Categories/Licences) & Product if Editing
    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const promises = [
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/categories`, { headers: { 'Authorization': `Bearer ${token}` } }),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/licences`, { headers: { 'Authorization': `Bearer ${token}` } })
                ];

                if (productId) {
                    promises.push(
                        fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/products/${productId}`, { headers: { 'Authorization': `Bearer ${token}` } })
                    );
                }

                const responses = await Promise.all(promises);
                const [catRes, licRes] = responses;
                const productRes = productId ? responses[2] : null;

                if (catRes.ok) setCategories(await catRes.json());
                if (licRes.ok) setLicences(await licRes.json());

                if (productRes && productRes.ok) {
                    const productData = await productRes.json();
                    setFormData({
                        category_id: productData.category_id || '',
                        licence_id: productData.licence_id || '',
                        product_name: productData.product_name || '',
                        product_description: productData.product_description || '',
                        sku: productData.sku || '',
                        price: productData.price ? String(productData.price) : '',
                        stock: productData.stock ? String(productData.stock) : '',
                        discount: productData.discount ? String(productData.discount) : '',
                        dues: productData.dues ? String(productData.dues) : '',
                        image_front: productData.image_front || '',
                        image_back: productData.image_back || ''
                    });
                }
            } catch (error) {
                console.error("Failed to load data", error);
                toast.error('Error', 'No se pudieron cargar los datos necesarios');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [token, productId, toast]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const resetForm = () => setFormData(INITIAL_STATE);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const url = productId
                ? `${process.env.NEXT_PUBLIC_API_URL}/admin/products/${productId}`
                : `${process.env.NEXT_PUBLIC_API_URL}/admin/products`;

            const method = productId ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                toast.success(
                    productId ? 'Actualizado!' : 'Creado!',
                    `El producto ha sido ${productId ? 'actualizado' : 'creado'} exitosamente`,
                    { label: 'Volver', onClick: () => router.push('/admin/dashboard') }
                );
                setTimeout(() => router.push('/admin/dashboard'), 1500);
            } else {
                toast.error('Error', data.error || 'Operación fallida');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error', 'Error de conexión');
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        categories,
        licences,
        loading,
        handleChange,
        handleSubmit,
        resetForm
    };
}
