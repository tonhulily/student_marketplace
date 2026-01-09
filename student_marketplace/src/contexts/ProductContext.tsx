import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PRODUCTS } from '../mock/data';

interface ProductContextType {
    products: Product[];
    addProduct: (product: Product) => void;
    getProductsByUser: (userId: string) => Product[];
    getProductById: (id: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
    const [products, setProducts] = useState<Product[]>(() => {
        const saved = localStorage.getItem('products');
        return saved ? JSON.parse(saved) : PRODUCTS; // Fallback về mock data nếu chưa có
    });

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    const addProduct = (product: Product) => {
        setProducts(prev => [product, ...prev]);
    };

    const getProductsByUser = (userId: string) => {
        return products.filter(p => p.seller.id === userId);
    };
    
    const getProductById = (id: string) => products.find(p => p.id === id);

    return (
        <ProductContext.Provider value={{ products, addProduct, getProductsByUser, getProductById }}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductContext);
    if (context === undefined) throw new Error('useProducts must be used within ProductProvider');
    return context;
}