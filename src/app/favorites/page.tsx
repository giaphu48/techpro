'use client';

import { useAuth } from '@/context/AuthContext';
import { ProductCard } from '@/components/products/ProductCard';
import { mockProducts } from '@/data/products';
import Link from 'next/link';

export default function FavoritesPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">Đang tải...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Bạn chưa đăng nhập</h1>
        <p className="text-gray-500 mb-8">Vui lòng đăng nhập để xem danh sách yêu thích của bạn.</p>
        <Link 
          href="/auth"
          className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
        >
          Đăng nhập ngay
        </Link>
      </div>
    );
  }

  const favoriteProductIds = user.favorites || [];
  const favoriteProducts = mockProducts.filter(p => favoriteProductIds.includes(p.id));

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Sản phẩm yêu thích</h1>
      
      {favoriteProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-4">Danh sách trống</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Bạn chưa có sản phẩm yêu thích nào. Hãy khám phá các sản phẩm của chúng tôi và thêm vào danh sách yêu thích nhé.
          </p>
          <Link 
            href="/products"
            className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            Khám phá sản phẩm
          </Link>
        </div>
      )}
    </div>
  );
}
