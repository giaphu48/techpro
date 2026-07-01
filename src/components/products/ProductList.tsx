'use client';

import { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { ProductSkeleton } from './ProductSkeleton';
import { mockProducts } from '@/data/products';
import { Product } from '@/types/product';
import { motion } from 'framer-motion';

export function ProductList() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <section className="py-24 bg-gray-50 dark:bg-black min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
            Sản Phẩm Nổi Bật
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Khám phá bộ sưu tập thiết bị âm thanh đỉnh cao từ Sony. Nâng tầm trải nghiệm giải trí của bạn.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
              <ProductSkeleton key={`skeleton-${index}`} />
            ))
            : products.map((product, index) => (
              <ProductCard key={product.id} product={product} priority={index < 4} />
            ))}
        </div>
      </div>
    </section>
  );
}
