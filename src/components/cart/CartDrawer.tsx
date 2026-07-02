'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { imageLoader } from '@/lib/imageLoader';

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, totalPrice } = useCart();

  const handleCheckout = () => {
    toast.success('Chức năng thanh toán đang được phát triển!');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-zinc-950 shadow-2xl z-50 flex flex-col border-l border-gray-200 dark:border-gray-800"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Giỏ hàng</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 hover:bg-gray-150 dark:hover:bg-zinc-900 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-4 text-gray-400">
                    <ShoppingCart className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Giỏ hàng trống</h3>
                  <p className="text-sm text-gray-500 mt-1 max-w-[200px]">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm.</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4 px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-medium rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                  >
                    Tiếp tục mua sắm
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 bg-gray-50 dark:bg-zinc-900 p-4 rounded-2xl">
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-white dark:bg-black border border-gray-100 dark:border-gray-800 flex-shrink-0">
                        <Image
                          loader={imageLoader}
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-contain p-2"
                          sizes="96px"
                        />
                      </div>
                      
                      <div className="flex flex-col justify-between flex-1">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3 bg-white dark:bg-black px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-800">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 bg-gray-50 dark:bg-zinc-900 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">Tổng cộng</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-indigo-600/20"
                >
                  Thanh toán ngay
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
