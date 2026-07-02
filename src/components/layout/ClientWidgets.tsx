'use client';

import dynamic from 'next/dynamic';

const CartDrawerWrapper = dynamic(
  () =>
    import('@/components/cart/CartDrawerWrapper').then(
      (mod) => mod.CartDrawerWrapper
    ),
  { ssr: false }
);

const ChatWidget = dynamic(
  () =>
    import('@/components/chat/ChatWidget').then(
      (mod) => mod.ChatWidget
    ),
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