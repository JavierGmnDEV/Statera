'use client';

import { useEffect } from 'react';

interface MobileMenuHandlerProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

/**
 * Componente que maneja la interacción del menú móvil con la navegación
 * y cambios de tamaño de pantalla
 */
export default function MobileMenuHandler({ isMenuOpen, setIsMenuOpen }: MobileMenuHandlerProps) {
  useEffect(() => {
    // Manejar cambios de tamaño de pantalla
    const handleResize = () => {
      // Cerrar el menú cuando se cambia a desktop
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    // Cerrar el menú cuando se cambia de sección
    const handleHashChange = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    // Cerrar el menú cuando se hace clic en links de anclaje
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isAnchor = target.tagName === 'A' || target.closest('a');
      
      if (isAnchor && isMenuOpen) {
        // Pequeño timeout para permitir que la navegación ocurra primero
        setTimeout(() => {
          setIsMenuOpen(false);
        }, 50);
      }
    };
    
    // Prevenir scroll cuando el menú está abierto
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Añadir event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('hashchange', handleHashChange);
    document.addEventListener('click', handleAnchorClick);
    
    // Limpiar al desmontar
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('hashchange', handleHashChange);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [isMenuOpen, setIsMenuOpen]);
  
  // Este componente no renderiza nada visible
  return null;
} 