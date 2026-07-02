'use client';

import dynamic from 'next/dynamic';

const AIChatWidget = dynamic(
  () => import('./AIChatWidget').then(mod => mod.AIChatWidget),
  { ssr: false }
);

export function AIChatWidgetWrapper() {
  return <AIChatWidget />;
}

export default AIChatWidgetWrapper;
