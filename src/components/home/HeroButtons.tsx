'use client';

import Link from 'next/link';
import { toast } from 'sonner';

export function HeroButtons() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
      <Link
        href="#register"
        onClick={() => toast.info('Bạn đã click vào nút Mua ngay!')}
        className="w-full sm:w-auto rounded-full bg-black dark:bg-white text-white dark:text-black px-8 py-4 text-base font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
      >
        Mua ngay
      </Link>
      <Link
        href="#features"
        onClick={() => toast.info('Đang chuyển đến phần Tính năng!')}
        className="w-full sm:w-auto rounded-full border border-gray-300 dark:border-gray-700 bg-transparent px-8 py-4 text-base font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
      >
        Tìm hiểu thêm
      </Link>
    </div>
  );
}
