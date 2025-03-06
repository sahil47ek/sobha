'use client';

import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from '../../store/hooks';
import { selectAllProducts } from '../../store/productSlice';

export default function BestSellers() {
  const products = useAppSelector(selectAllProducts);
  const bestSellers = products.filter(product => product.isBestSeller).slice(0, 4);

  return (
    <section className="py-20 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-50 to-purple-50 opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
      
      <div className="container mx-auto px-6 relative">
        {/* Best Sellers Header */}
        <div className="bg-gradient-to-r from-rose-400 to-purple-500 rounded-2xl overflow-hidden mb-16">
          <div className="relative">
            <div className="bg-black/10 w-full h-[300px]" />
            <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between p-8 md:p-12">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Best Sellers Collection
                </h2>
                <p className="text-xl text-white/90 mb-6 max-w-2xl">
                  Discover our professional-grade paints loved by customers. Premium quality for every surface.
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                    <div className="text-white/80 text-sm">Total Sales</div>
                    <div className="text-white text-2xl font-bold">2,500+</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                    <div className="text-white/80 text-sm">Happy Customers</div>
                    <div className="text-white text-2xl font-bold">1,200+</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                    <div className="text-white/80 text-sm">5-Star Reviews</div>
                    <div className="text-white text-2xl font-bold">95%</div>
                  </div>
                </div>
              </div>
              <Link
                href="/products"
                className="px-8 py-4 bg-white text-gray-900 rounded-lg text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-gray-50"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </div>

        {/* Best Sellers Grid */}
        <div className="grid md:grid-cols-4 gap-8">
          {bestSellers.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1"
            >
              <Link href={`/products/${product.id}`} className="block">
                <div className="relative h-48">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-2 right-2">
                    <div className="bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                      Best Seller
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-rose-500 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-500">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="px-4 py-2 bg-gradient-to-r from-rose-400 to-purple-500 text-white rounded-lg text-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      View Details
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 