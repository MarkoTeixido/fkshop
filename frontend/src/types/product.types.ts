export interface Product {
    product_id: number;
    product_name: string;
    product_description: string;
    price: number | string;
    stock: number;
    discount: number | null;
    discount_end_date: string | null; // ISO Date string
    is_featured: boolean;
    is_active: boolean;
    is_new?: boolean;
    sku: string;
    dues: number | null;
    image_front: string;
    image_back: string;
    licence_id: number;
    category_id: number;
    created_at?: string;
    updated_at?: string;
    licence?: string;
    category?: string;
    Licence?: Licence; // Backend often sends capitalized Licence object
    category_name?: string;
    Category?: {
        category_name: string;
    };
}

export interface ProductDTO extends Omit<Product, 'product_id' | 'created_at' | 'updated_at'> {
    // For creating/updating, ID and timestamps are optional/omitted
}

export interface Category {
    category_id: number;
    category_name: string;
    category_description?: string;
}

export interface Licence {
    licence_id: number;
    licence_name: string;
    licence_description?: string;
    licence_image?: string;
}
export interface HomeProductResponse {
    product_id: number;
    product_name: string;
    price: number | string;
    image_front: string;
    image_back: string;
    discount: number | null;
    created_at: string;
    stock: number;
    licence?: {
        licence_name: string;
    };
}
