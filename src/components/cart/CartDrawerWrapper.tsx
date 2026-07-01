'use client';

import { useCart } from '@/context/CartContext';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

// Lazy load the actual drawer so it's not in the initial bundle
const CartDrawer = dynamic(() => import('./CartDrawer').then(mod => mod.CartDrawer));

export function CartDrawerWrapper() {
  const { isCartOpen } = useCart();
  const [hasOpened, setHasOpened] = useState(false);

  useEffect(() => {
    if (isCartOpen && !hasOpened) {
      setHasOpened(true);
    }
  }, [isCartOpen, hasOpened]);

  // Only render the CartDrawer if it has been opened at least once.
  // This keeps it out of the initial JavaScript bundle, improving page load performance.
  if (!hasOpened) return null;

  return <CartDrawer />;
}
