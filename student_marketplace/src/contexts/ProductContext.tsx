import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PRODUCTS } from '../mock/data';

interface ProductContextType {
    products: Product[];
    addProduct: (product: Product) => void;
    getProductsByUser: (userId: string) => Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Dùng sessionStorage để dữ liệu tự reset khi đóng tab/trình duyệt
const STORAGE_KEY = 'marketplace_products_session';

export function ProductProvider({ children }: { children: React.ReactNode }) {
    const [products, setProducts] = useState<Product[]>(() => {
        try {
            const saved = sessionStorage.getItem(STORAGE_KEY);
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (e) {
            return PRODUCTS;
        }
        // Mặc định luôn load Mock Data ban đầu khi mở tab mới
        return PRODUCTS;
    });

    // Lưu vào sessionStorage mỗi khi danh sách thay đổi
    useEffect(() => {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }, [products]);

    const addProduct = (product: Product) => {
        // Thêm sản phẩm mới lên đầu danh sách
        setProducts(prev => [product, ...prev]);
    };

    const getProductsByUser = (userId: string) => {
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