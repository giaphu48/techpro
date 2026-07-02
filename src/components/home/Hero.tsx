'use client';

import Image from 'next/image';
import { HeroButtons } from './HeroButtons';
import { imageLoader } from '@/lib/imageLoader';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-black pt-16 md:pt-24 lg:pt-32 pb-16">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/10 dark:bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          <div className="flex-1 text-center lg:text-left space-y-8 animate-fade-in-left">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Sống động với <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-500">
                ULT WEAR.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0">
              Cảm nhận sức mạnh của âm trầm đỉnh cao. Tai nghe không dây Sony ULT WEAR (WH-ULT900N) mang đến chất âm bùng nổ, chống ồn chủ động vượt trội và thiết kế siêu thoải mái cho cả ngày dài.
            </p>
            <HeroButtons />
          </div>
          <div className="flex-1 relative w-full max-w-lg lg:max-w-none opacity-0 animate-fade-in-right" style={{ animationDelay: '0.2s' }}>
            <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square">
              <Image
                loader={imageLoader}
                src="https://res.cloudinary.com/dlzfacstr/image/upload/f_auto,q_auto/v1782921657/sony-ult-wear_kd0xqi.png"
                alt="Sony ULT WEAR Headphones"
                fill
                className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
                priority
                fetchPriority="high"
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 450px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
