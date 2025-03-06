'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector } from '../../store/hooks';
import { selectProductById, selectAllProducts } from '../../store/productSlice';
import Navbar from './Navbar';

export default function ProductDetails({ id }: { id: string }) {
  const product = useAppSelector(state => selectProductById(state, id));
  const allProducts = useAppSelector(selectAllProducts);
  const relatedProducts = allProducts
    .filter(p => p.category === product?.category && p.id !== id)
    .slice(0, 3);

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-6 pt-32">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
            <Link
              href="/products"
              className="inline-block bg-gradient-to-r from-rose-400 to-purple-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Product Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {(product.isBestSeller || product.isSpecialOffer) && (
                <div className="absolute top-4 left-4 flex gap-2">
                  {product.isBestSeller && (
                    <div className="bg-rose-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                      Best Seller
                    </div>
                  )}
                  {product.isSpecialOffer && (
                    <div className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                      {product.specialOfferDiscount}% OFF
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <div className="text-sm text-rose-500 font-medium mb-2">{product.category}</div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                <p className="text-xl text-gray-600 mb-6">{product.description}</p>
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold bg-gradient-to-r from-rose-400 to-purple-500 bg-clip-text text-transparent">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.isSpecialOffer && (
                    <span className="text-xl text-gray-400 line-through">
                      ${(product.price / (1 - (product.specialOfferDiscount || 0) / 100)).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {/* Stock Information */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-lg font-semibold mb-4">Availability</h3>
                <div className={`inline-flex items-center px-4 py-2 rounded-full ${
                  product.stock > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                }`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    product.stock > 0 ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  {product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock'}
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-gray-100 pt-6 space-y-4">
                <Link
                  href="/contact"
                  className="block text-center bg-gradient-to-r from-rose-400 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Contact for Purchase
                </Link>
                <Link
                  href="/products"
                  className="block text-center bg-gray-100 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Back to Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Related Products</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {(relatedProduct.isBestSeller || relatedProduct.isSpecialOffer) && (
                      <div className="absolute top-4 left-4">
                        {relatedProduct.isBestSeller && (
                          <div className="bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                            Best Seller
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-rose-500 transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-500">
                        ${relatedProduct.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500">{relatedProduct.category}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
} 