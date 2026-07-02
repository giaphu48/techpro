'use client';

import Image from 'next/image';
import { imageLoader } from '@/lib/imageLoader';

export function HeroImage() {
    return (
        <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square">
            <Image
                loader={imageLoader}
                src="https://res.cloudinary.com/dlzfacstr/image/upload/f_auto,q_auto/v1782921657/sony-ult-wear_kd0xqi.png"
                alt="Tai nghe Sony ULT WEAR"
                fill
                className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
                priority
                fetchPriority="high"
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 450px"
            />
        </div>
    );
}