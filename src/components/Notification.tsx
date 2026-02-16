'use client';

import { Toaster } from 'sonner';

export const Notification = () => (
  <Toaster
    position="bottom-right"
    toastOptions={{
      classNames: {
        toast: 'bg-card border-border text-foreground',
      },
    }}
  />
);
