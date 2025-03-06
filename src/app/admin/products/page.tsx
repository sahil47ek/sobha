'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { 
  addProduct, 
  updateProduct, 
  deleteProduct, 
  selectAllProducts, 
  selectCategories,
  Product 
} from '../../../store/productSlice';

export default function ProductsManagement() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProducts);
  const categories = useAppSelector(selectCategories);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    price: 0,
    category: '',
    image: '',
    stock: 0,
    isBestSeller: false,
    isSpecialOffer: false,
    specialOfferDiscount: 0
  });
  const [newCategory, setNewCategory] = useState('');

  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)', icon: '↑↓' },
    { value: 'price-low', label: 'Price (Low to High)', icon: '↑' },
    { value: 'price-high', label: 'Price (High to Low)', icon: '↓' },
    { value: 'stock-low', label: 'Stock (Low to High)', icon: '↑' },
    { value: 'stock-high', label: 'Stock (High to Low)', icon: '↓' },
  ];

  const getSortLabel = () => {
    return sortOptions.find(option => option.value === sortBy)?.label || 'Sort by';
  };

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
        case 'stock-low':
          return a.stock - b.stock;
        case 'stock-high':
          return b.stock - a.stock;
        default:
          return 0;
      }
    });

  // Get statistics for the header
  const stats = {
    total: products.length,
    categories: categories.length,
    outOfStock: products.filter(p => p.stock === 0).length,
    lowStock: products.filter(p => p.stock > 0 && p.stock <= 10).length
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (name === 'price' || name === 'stock' || name === 'specialOfferDiscount') {
      setFormData(prev => ({
        ...prev,
        [name]: value === '' ? 0 : parseFloat(value)
      }));
    } else if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked,
        // Reset special offer discount if special offer is unchecked
        ...(name === 'isSpecialOffer' && !checkbox.checked ? { specialOfferDiscount: 0 } : {})
      }));
    } else if (name === 'newCategory') {
      setNewCategory(value);
      setFormData(prev => ({
        ...prev,
        category: value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: '',
      image: '',
      stock: 0,
      isBestSeller: false,
      isSpecialOffer: false,
      specialOfferDiscount: 0
    });
    setNewCategory('');
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: '',
      image: '',
      stock: 0,
      isBestSeller: false,
      isSpecialOffer: false,
      specialOfferDiscount: 0
    });
    setNewCategory('');
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      stock: product.stock,
      isBestSeller: product.isBestSeller,
      isSpecialOffer: product.isSpecialOffer,
      specialOfferDiscount: product.specialOfferDiscount
    });
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(productId));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalCategory = formData.category === 'new' ? newCategory : formData.category;
    const productData = {
      ...formData,
      category: finalCategory
    };

    if (editingProduct) {
      // Update existing product
      dispatch(updateProduct({
        ...productData,
        id: editingProduct.id
      }));
    } else {
      // Add new product
      dispatch(addProduct(productData));
    }
    
    resetForm();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products Management</h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        <button
          onClick={handleAddProduct}
          className="px-6 py-3 bg-gradient-to-r from-rose-400 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all duration-300"
        >
          Add New Product
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="text-gray-500 text-sm">Total Products</div>
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="text-gray-500 text-sm">Categories</div>
          <div className="text-2xl font-bold text-gray-900">{stats.categories}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="text-gray-500 text-sm">Out of Stock</div>
          <div className="text-2xl font-bold text-red-500">{stats.outOfStock}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="text-gray-500 text-sm">Low Stock</div>
          <div className="text-2xl font-bold text-yellow-500">{stats.lowStock}</div>
        </div>
      </div>

      {/* Search, Filter, and Sort Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Search & Filter Products</h2>
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
          <div className="relative">
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
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
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
                      <span>All Categories ({products.length})</span>
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
                        <span>{category} ({products.filter(p => p.category === category).length})</span>
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
          <div className="relative">
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
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
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

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-sm text-purple-700 bg-purple-100 rounded-full">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`${
                      product.stock === 0 
                        ? 'text-red-700 bg-red-100' 
                        : product.stock <= 10 
                        ? 'text-yellow-700 bg-yellow-100' 
                        : 'text-green-700 bg-green-100'
                    } px-3 py-1 rounded-full`}>
                      {product.stock === 0 ? 'Out of Stock' : `${product.stock} units`}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400"
                  rows={3}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400"
                    min="0"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                  <option value="new">+ Add New Category</option>
                </select>
              </div>
              {formData.category === 'new' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Category Name
                  </label>
                  <input
                    type="text"
                    name="newCategory"
                    value={newCategory}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400"
                    required
                    placeholder="Enter new category name"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400"
                  required
                />
              </div>
              {/* Product Status Options */}
              <div className="space-y-4 border-t pt-4">
                <h3 className="text-lg font-medium text-gray-900">Product Status</h3>
                
                {/* Best Seller Option */}
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isBestSeller"
                    name="isBestSeller"
                    checked={formData.isBestSeller}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-rose-500 rounded border-gray-300 focus:ring-rose-400"
                  />
                  <label htmlFor="isBestSeller" className="text-sm font-medium text-gray-700">
                    Mark as Best Seller
                  </label>
                </div>

                {/* Special Offer Option */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="isSpecialOffer"
                      name="isSpecialOffer"
                      checked={formData.isSpecialOffer}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-rose-500 rounded border-gray-300 focus:ring-rose-400"
                    />
                    <label htmlFor="isSpecialOffer" className="text-sm font-medium text-gray-700">
                      Mark as Special Offer
                    </label>
                  </div>

                  {/* Discount Input - Only shown when Special Offer is checked */}
                  {formData.isSpecialOffer && (
                    <div className="ml-7">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Discount Percentage
                      </label>
                      <input
                        type="number"
                        name="specialOfferDiscount"
                        value={formData.specialOfferDiscount}
                        onChange={handleInputChange}
                        min="0"
                        max="100"
                        className="w-32 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400"
                        required
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-rose-400 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 