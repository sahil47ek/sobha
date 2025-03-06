import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  isBestSeller?: boolean;
  isSpecialOffer?: boolean;
  specialOfferDiscount?: number;
}

interface ProductState {
  products: Product[];
  categories: string[];
}

const initialState: ProductState = {
  products: [
    {
      id: '1',
      name: 'Premium Interior Paint',
      description: 'High-quality interior paint with excellent coverage and a smooth, durable finish. Perfect for living rooms and bedrooms.',
      price: 49.99,
      category: 'Interior',
      image: 'https://img.freepik.com/free-photo/paint-can-with-paintbrush_23-2148188272.jpg',
      stock: 100,
      isBestSeller: true,
    },
    {
      id: '2',
      name: 'Exterior Weather Shield',
      description: 'Weather-resistant exterior paint designed to protect your home from harsh elements while maintaining its beauty.',
      price: 59.99,
      category: 'Exterior',
      image: 'https://img.freepik.com/free-photo/house-with-blue-wall-background_1150-18021.jpg',
      stock: 75,
      isSpecialOffer: true,
      specialOfferDiscount: 10,
    },
    {
      id: '3',
      name: 'Wood Finish Classic',
      description: 'Premium wood finish that enhances natural grain patterns while providing lasting protection.',
      price: 44.99,
      category: 'Wood Finish',
      image: 'https://img.freepik.com/free-photo/wooden-surface-with-paint-brush_23-2148188259.jpg',
      stock: 50,
      isBestSeller: true,
    },
    {
      id: '4',
      name: 'Metal Paint Pro',
      description: 'Professional-grade metal paint with anti-rust properties and superior adhesion.',
      price: 64.99,
      category: 'Metal Paint',
      image: 'https://img.freepik.com/free-photo/metal-surface-with-paint-brush_23-2148188270.jpg',
      stock: 60,
      isSpecialOffer: true,
      specialOfferDiscount: 15,
    },
    {
      id: '5',
      name: 'Eco-Friendly Wall Paint',
      description: 'Low-VOC, environmentally conscious paint that\'s safe for your family and the planet.',
      price: 54.99,
      category: 'Interior',
      image: 'https://img.freepik.com/free-photo/green-paint-wall-background_53876-88454.jpg',
      stock: 85,
      isBestSeller: true,
    },
    {
      id: '6',
      name: 'Designer Color Collection',
      description: 'Curated collection of trendy colors perfect for modern homes and creative spaces.',
      price: 69.99,
      category: 'Interior',
      image: 'https://img.freepik.com/free-photo/color-palette-guide-close-up_23-2148188273.jpg',
      stock: 40,
      isSpecialOffer: true,
      specialOfferDiscount: 20,
    },
    {
      id: '7',
      name: 'Masonry & Concrete Paint',
      description: 'Specialized paint for concrete surfaces with excellent durability and weather resistance.',
      price: 57.99,
      category: 'Exterior',
      image: 'https://img.freepik.com/free-photo/concrete-wall-with-paint-brush_23-2148188267.jpg',
      stock: 30,
      isBestSeller: false,
    },
    {
      id: '8',
      name: 'Quick-Dry Primer',
      description: 'Fast-drying primer that provides excellent adhesion for top coats.',
      price: 39.99,
      category: 'Primer',
      image: 'https://img.freepik.com/free-photo/white-paint-can-with-brush_23-2148188271.jpg',
      stock: 90,
      isSpecialOffer: true,
      specialOfferDiscount: 15,
    }
  ],
  categories: ['Interior', 'Exterior', 'Wood Finish', 'Metal Paint', 'Primer'],
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<Omit<Product, 'id'>>) => {
      const newProduct = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.products.push(newProduct);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
    addCategory: (state, action: PayloadAction<string>) => {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload);
      }
    },
    initializeFromStorage: (state) => {
      return state;
    },
  },
});

export const { 
  setProducts, 
  addProduct, 
  updateProduct, 
  deleteProduct,
  addCategory,
  initializeFromStorage
} = productSlice.actions;

export const selectAllProducts = (state: RootState) => state.products.products;
export const selectCategories = (state: RootState) => state.products.categories;
export const selectProductById = (state: RootState, productId: string) => 
  state.products.products.find(product => product.id === productId);

export default productSlice.reducer; 
