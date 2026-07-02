'use client';

import dynamic from 'next/dynamic';

const CartDrawerWrapper = dynamic(
  () => import('@/components/cart/CartDrawerWrapper').then(mod => mod.CartDrawerWrapper),
  { ssr: false }
);

const AIChatWidget = dynamic(
  () => import('@/components/chat/AIChatWidget').then(mod => mod.AIChatWidget),
  { ssr: false }
);

export function ClientWidgets() {
  return (
    <>
      <CartDrawerWrapper />
      <AIChatWidget />
    </>
  );
}
