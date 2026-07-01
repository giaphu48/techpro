import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-black pt-16 md:pt-24 lg:pt-32 pb-16">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/10 dark:bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          <div className="flex-1 text-center lg:text-left space-y-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Sống động với <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-500">
                ULT WEAR.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0">
              Cảm nhận sức mạnh của âm trầm đỉnh cao. Tai nghe không dây Sony ULT WEAR (WH-ULT900N) mang đến chất âm bùng nổ, chống ồn chủ động vượt trội và thiết kế siêu thoải mái cho cả ngày dài.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="#register"
                className="w-full sm:w-auto rounded-full bg-black dark:bg-white text-white dark:text-black px-8 py-4 text-base font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Mua ngay
              </Link>
              <Link
                href="#features"
                className="w-full sm:w-auto rounded-full border border-gray-300 dark:border-gray-700 bg-transparent px-8 py-4 text-base font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
              >
                Tìm hiểu thêm
              </Link>
            </div>
          </div>
          <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
            <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square">
              <Image
                src="/sony-ult-wear.png"
                alt="Sony ULT WEAR Headphones"
                fill
                className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
