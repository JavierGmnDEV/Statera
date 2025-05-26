'use client';

import { useEffect, useState } from 'react';
import ClientLayout from './client-layout';
import MobileLayout from './mobile-layout';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Verificar si estamos en el cliente
    setIsClient(true);
    
    // Función para detectar dispositivo móvil
    const checkMobile = () => {
      const userAgent = navigator.userAgent;
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      // Considerar también el ancho de pantalla pequeño como móvil
      const isMobileDevice = mobileRegex.test(userAgent) || window.innerWidth < 768;
      setIsMobile(isMobileDevice);
    };
    
    // Verificar inicialmente
    checkMobile();
    
    // Actualizar al cambiar el tamaño de ventana
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Mostrar nada hasta que sepamos si estamos en cliente
  if (!isClient) return null;

  // Renderizar layout basado en dispositivo
  return isMobile ? <MobileLayout /> : <ClientLayout />;
}
