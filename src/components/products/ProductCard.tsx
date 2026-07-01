'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const handleAddToCart = () => {
    toast.success(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4 }}
      className="group flex flex-col bg-white dark:bg-zinc-950 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-200 dark:border-gray-800 transition-all"
    >
      <div className="relative w-full h-64 bg-gray-50 dark:bg-zinc-900 overflow-hidden">
        {product.badge && (
          <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full shadow-md">
            {product.badge}
          </div>
        )}
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          priority={priority}
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-col flex-1 p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {product.category}
            </p>
          </div>
          {product.rating && (
            <div className="flex items-center gap-1 text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10 px-2 py-1 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-semibold">{product.rating}</span>
            </div>
          )}
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mt-2 mb-6 flex-1">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-sm"
          >
            Thêm vào giỏ
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
