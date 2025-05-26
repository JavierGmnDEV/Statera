'use client';

import { ReactNode } from 'react';

interface MobileProviderProps {
  children: ReactNode;
}

export default function MobileProvider({ children }: MobileProviderProps) {
  // Este componente simplemente envuelve los componentes hijos sin inicializar GSAP
  // Se puede usar para futura lógica específica para móviles si es necesario
  return (
    <>{children}</>
  );
} 