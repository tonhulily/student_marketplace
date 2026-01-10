import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PRODUCTS } from '../mock/data';

interface ProductContextType {
    products: Product[];
    addProduct: (product: Product) => void;
    getProductsByUser: (userId: string) => Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
    // FIX: Dùng key mới '_v2' để đảm bảo load lại Mock Data chuẩn
    const [products, setProducts] = useState<Product[]>(() => {
        const saved = localStorage.getItem('marketplace_products_v3');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                return PRODUCTS;
            }
        }
        return PRODUCTS;
    });

    // Lưu ngay khi có thay đổi
    useEffect(() => {
        localStorage.setItem('marketplace_products_v3', JSON.stringify(products));
    }, [products]);

    const addProduct = (product: Product) => {
        // Thêm sản phẩm mới lên đầu danh sách
        setProducts(prev => [product, ...prev]);
    };

    const getProductsByUser = (userId: string) => {
        // Filter chính xác theo ID
        return products.filter(p => p.seller.id === userId);
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, getProductsByUser }}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
}