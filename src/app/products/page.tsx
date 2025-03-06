'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector } from '../../store/hooks';
import { selectAllProducts, selectCategories } from '../../store/productSlice';
import Navbar from '../components/Navbar';

export default function Products() {
  const products = useAppSelector(selectAllProducts);
  const categories = useAppSelector(selectCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setIsCategoryOpen(false);
        setIsSortOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter and sort products
  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === '' || product.category === selectedCategory)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        default:
          return 0;
      }
    });

  // Get best sellers
  const bestSellers = products
    .filter(product => product.isBestSeller)
    .slice(0, 4);

  // Get special offers
  const specialOffers = products
    .filter(product => product.isSpecialOffer)
    .slice(0, 4);

  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)', icon: '↑↓' },
    { value: 'price-low', label: 'Price (Low to High)', icon: '↑' },
    { value: 'price-high', label: 'Price (High to Low)', icon: '↓' },
  ];

  const getSortLabel = () => {
    return sortOptions.find(option => option.value === sortBy)?.label || 'Sort by';
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-0">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://img.freepik.com/free-photo/paint-buckets-with-watercolor-collection_23-2148188263.jpg"
              alt="Paint Products Background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/60" />
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white mb-6">
                Explore Our Collection
              </div>
              <h1 className="text-5xl font-bold mb-6 text-white">
                Premium Paint Collection
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Discover our extensive range of high-quality paints and finishes for every surface. From interior elegance to exterior durability, find the perfect solution for your space.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                  <div className="text-white/80 text-sm">Products</div>
                  <div className="text-white text-2xl font-bold">{products.length}+</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                  <div className="text-white/80 text-sm">Categories</div>
                  <div className="text-white text-2xl font-bold">{categories.length}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                  <div className="text-white/80 text-sm">Best Sellers</div>
                  <div className="text-white text-2xl font-bold">{bestSellers.length}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Best Sellers Section */}
        <section className="py-16 relative">
          {/* Background Pattern */}
          <Image
            src="https://placehold.co/800x600/gray/white/png?text=Paint+Pattern"
            alt="Paint Background"
            fill
            className="object-cover opacity-5"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
          
          <div className="container mx-auto px-6 relative">
            {/* Premium Quality & Best Sellers Header */}
            <div className="bg-gradient-to-r from-rose-400 to-purple-500 rounded-2xl overflow-hidden mb-16">
              <div className="relative">
                <Image
                  src="https://placehold.co/1200x400/purple/white/png?text=Premium+Quality"
                  alt="Premium Paints"
                  width={1200}
                  height={400}
                  className="object-cover w-full h-[300px] opacity-20"
                />
                <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between p-8 md:p-12">
                  <div className="text-white text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Premium Quality Paints</h2>
                    <p className="text-white/90 text-lg mb-6">Discover our best-selling products trusted by professionals</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Best Sellers Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {bestSellers.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1"
                >
                  <div className="relative h-48">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {product.isBestSeller && (
                      <div className="absolute top-2 right-2">
                        <div className="bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                          Best Seller
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-rose-500 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-500">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{product.category}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Special Offers Section */}
        <section className="py-16 relative">
          {/* Background Pattern */}
          <Image
            src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=80"
            alt="Paint Texture"
            fill
            className="object-cover opacity-5"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-50/90 to-white/90" />

          <div className="container mx-auto px-6 relative">
            {/* Special Offers Header */}
            <div className="bg-gradient-to-r from-purple-500 to-rose-400 rounded-2xl overflow-hidden mb-16">
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&auto=format&fit=crop&q=80"
                  alt="Special Offers"
                  width={1200}
                  height={400}
                  className="object-cover w-full h-[300px] opacity-20"
                />
                <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between p-8 md:p-12">
                  <div className="text-white text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Special Offers</h2>
                    <p className="text-white/90 text-lg mb-6">Limited time deals on premium paints</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Offers Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {specialOffers.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1"
                >
                  <div className="relative h-48">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-2 right-2">
                      <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                        {product.specialOfferDiscount}% OFF
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-rose-500 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-500">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-400 line-through ml-2">
                          ${(product.price / (1 - (product.specialOfferDiscount || 0) / 100)).toFixed(2)}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{product.category}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 bg-gray-50 sticky top-20 z-10">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search Products
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 bg-white"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Category Filter */}
              <div className="relative dropdown-container">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Filter by Category
                </label>
                <div className="relative">
                  <button
                    onClick={() => {
                      setIsSortOpen(false);
                      setIsCategoryOpen(!isCategoryOpen);
                    }}
                    className="w-full px-4 py-2 bg-white border rounded-lg focus:ring-2 focus:ring-rose-400 flex items-center justify-between"
                  >
                    <span className="text-gray-700">
                      {selectedCategory || 'All Categories'}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                        isCategoryOpen ? 'transform rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {isCategoryOpen && (
                    <div className="absolute z-20 w-full mt-1 bg-white border rounded-lg shadow-lg">
                      <div className="py-1 max-h-60 overflow-auto">
                        <button
                          onClick={() => {
                            setSelectedCategory('');
                            setIsCategoryOpen(false);
                          }}
                          className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between ${
                            selectedCategory === '' ? 'bg-rose-50 text-rose-600' : 'text-gray-700'
                          }`}
                        >
                          <span>All Categories</span>
                          {selectedCategory === '' && (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                        {categories.map(category => (
                          <button
                            key={category}
                            onClick={() => {
                              setSelectedCategory(category);
                              setIsCategoryOpen(false);
                            }}
                            className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between ${
                              selectedCategory === category ? 'bg-rose-50 text-rose-600' : 'text-gray-700'
                            }`}
                          >
                            <span>{category}</span>
                            {selectedCategory === category && (
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sort */}
              <div className="relative dropdown-container">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort by
                </label>
                <div className="relative">
                  <button
                    onClick={() => {
                      setIsCategoryOpen(false);
                      setIsSortOpen(!isSortOpen);
                    }}
                    className="w-full px-4 py-2 bg-white border rounded-lg focus:ring-2 focus:ring-rose-400 flex items-center justify-between"
                  >
                    <span className="text-gray-700">{getSortLabel()}</span>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                        isSortOpen ? 'transform rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {isSortOpen && (
                    <div className="absolute z-20 w-full mt-1 bg-white border rounded-lg shadow-lg">
                      <div className="py-1">
                        {sortOptions.map(option => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setSortBy(option.value);
                              setIsSortOpen(false);
                            }}
                            className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between ${
                              sortBy === option.value ? 'bg-rose-50 text-rose-600' : 'text-gray-700'
                            }`}
                          >
                            <div className="flex items-center">
                              <span className="w-6 text-center">{option.icon}</span>
                              <span>{option.label}</span>
                            </div>
                            {sortBy === option.value && (
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative h-64">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {(product.isBestSeller || product.isSpecialOffer) && (
                      <div className="absolute top-4 left-4 flex gap-2">
                        {product.isBestSeller && (
                          <div className="bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                            Best Seller
                          </div>
                        )}
                        {product.isSpecialOffer && (
                          <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                            {product.specialOfferDiscount}% OFF
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-rose-500 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-500">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.isSpecialOffer && (
                          <span className="text-sm text-gray-400 line-through">
                            ${(product.price / (1 - (product.specialOfferDiscount || 0) / 100)).toFixed(2)}
                          </span>
                        )}
                      </div>
                      <span className={`px-3 py-1 text-sm rounded-full ${
                        product.stock === 0 
                          ? 'text-red-700 bg-red-100' 
                          : product.stock <= 10 
                          ? 'text-yellow-700 bg-yellow-100' 
                          : 'text-green-700 bg-green-100'
                      }`}>
                        {product.stock === 0 ? 'Out of Stock' : 'In Stock'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 