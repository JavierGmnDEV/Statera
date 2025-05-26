'use client';

import { useEffect } from 'react';
import SmoothScroll from "./components/SmoothScroll";
import GSAPProvider from './components/GSAPProvider';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Verificar preferencia del sistema o tema guardado
    const isDark = 
      localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <GSAPProvider>
      <SmoothScroll>{children}</SmoothScroll>
    </GSAPProvider>
  );
} 