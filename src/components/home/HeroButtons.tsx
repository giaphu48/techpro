'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function HeroButtons() {
  const router = useRouter();
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
      <button
        onClick={() => router.push('/products')}
        className="w-full sm:w-auto rounded-full bg-black dark:bg-white text-white dark:text-black px-8 py-4 text-base font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
      >
        Mua ngay
      </button>
      <Link
        href="#features"
        className="w-full sm:w-auto rounded-full border border-gray-300 dark:border-gray-700 bg-transparent px-8 py-4 text-base font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
      >
        Tìm hiểu thêm
      </Link>
    </div>
  );
}
