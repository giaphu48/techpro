'use client';

import dynamic from 'next/dynamic';
import { ChatWidget } from '@/components/chat/ChatWidget';

const CartDrawerWrapper = dynamic(
  () => import('@/components/cart/CartDrawerWrapper').then(mod => mod.CartDrawerWrapper),
  { ssr: false }
);


export function ClientWidgets() {
  return (
    <>
      <CartDrawerWrapper />
      <ChatWidget />
    </>
  );
}
