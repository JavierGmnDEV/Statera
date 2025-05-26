'use client';

import { useEffect, useCallback } from 'react';

interface MobileMenuHandlerProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

/**
 * Componente que maneja la interacción del menú móvil con la navegación
 * y cambios de tamaño de pantalla
 */
export default function MobileMenuHandler({ isMenuOpen, setIsMenuOpen }: MobileMenuHandlerProps) {
  // Memoizar handlers para evitar recreaciones innecesarias
  const handleResize = useCallback(() => {
    // Cerrar el menú cuando se cambia a desktop
    if (window.innerWidth >= 768 && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMenuOpen, setIsMenuOpen]);
  
  const handleHashChange = useCallback(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMenuOpen, setIsMenuOpen]);
  
  const handleAnchorClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    // Verificar si el elemento o alguno de sus padres es un enlace
    const anchorElement = target.tagName === 'A' ? target : target.closest('a');
    
    // Solo proceder si es un enlace interno (que comienza con #)
    if (anchorElement && anchorElement instanceof HTMLAnchorElement && 
        anchorElement.getAttribute('href')?.startsWith('#') && 
        isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMenuOpen, setIsMenuOpen]);

  useEffect(() => {
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
  }, [isMenuOpen, handleResize, handleHashChange, handleAnchorClick]);
  
  // Este componente no renderiza nada visible
  return null;
} 