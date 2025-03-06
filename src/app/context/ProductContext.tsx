'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Product) => void;
  deleteProduct: (id: string) => void;
  getCategories: () => string[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const STORAGE_KEY = 'shine-paints-products';

// Helper function to get initial products from localStorage or default data
const getInitialProducts = (): Product[] => {
  if (typeof window === 'undefined') return []; // Handle server-side rendering
  
  const storedProducts = localStorage.getItem(STORAGE_KEY);
  if (storedProducts) {
    return JSON.parse(storedProducts);
  }
  
  // Default product if no stored data
  return [{
    id: '1',
    name: 'Premium Interior Paint',
    description: 'High-quality interior paint with excellent coverage',
    price: 49.99,
    category: 'Interior',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=80',
    stock: 50
  }];
};

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(getInitialProducts);

  // Sync with localStorage whenever products change
  useEffect(() => {
    if (typeof window !== 'undefined') { // Handle server-side rendering
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }
  }, [products]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: Date.now().toString()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const getCategories = () => {
    return Array.from(new Set(products.map(product => product.category))).sort();
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, getCategories }}>
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