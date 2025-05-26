'use client';

import { useState, useCallback } from 'react';
import MobileMenuHandler from './MobileMenuHandler';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Cerrar el menú cuando se hace clic en un enlace
  // Usando useCallback para memoizar la función
  const handleLinkClick = useCallback(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMenuOpen]);

  return (
    <>
      {/* Componente invisible que maneja la lógica del menú móvil */}
      <MobileMenuHandler isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      
      <header className="fixed top-0 left-0 right-0 z-40 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a href="#" className="flex-shrink-0" onClick={handleLinkClick}>
                <span className="text-2xl font-bold text-primary">Statera</span>
              </a>
              <nav className="hidden md:ml-10 md:flex md:space-x-8">
                <a href="#" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium">
                  Inicio
                </a>
                <a href="#features" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium">
                  Soluciones
                </a>
                <a href="#pricing" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium">
                  Precios
                </a>
                <a href="#about" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium">
                  Nosotros
                </a>
                <a href="#contact" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium">
                  Contacto
                </a>
              </nav>
            </div>
            <div className="hidden md:flex md:items-center md:space-x-4">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90"
              >
                Ver Planes
              </a>
            </div>
            <div className="flex md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-foreground"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Cerrar menú principal" : "Abrir menú principal"}
              >
                <span className="sr-only">{isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}</span>
                {!isMenuOpen ? (
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.75 5.75H19.25"></path>
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.75 18.25H19.25"></path>
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.75 12H19.25"></path>
                  </svg>
                ) : (
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.25 6.75L6.75 17.25"></path>
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.75 6.75L17.25 17.25"></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Menú móvil con transición suave en lugar de condicional */}
        <div 
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card border-b border-border">
            <a 
              href="#" 
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-secondary"
              onClick={handleLinkClick}
            >
              Inicio
            </a>
            <a 
              href="#features" 
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-secondary"
              onClick={handleLinkClick}
            >
              Soluciones
            </a>
            <a 
              href="#pricing" 
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-secondary"
              onClick={handleLinkClick}
            >
              Precios
            </a>
            <a 
              href="#about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-secondary"
              onClick={handleLinkClick}
            >
              Nosotros
            </a>
            <a 
              href="#contact" 
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-secondary"
              onClick={handleLinkClick}
            >
              Contacto
            </a>
            <a
              href="#pricing"
              className="block px-3 py-2 mt-4 text-center rounded-md text-base font-medium text-primary-foreground bg-primary hover:bg-primary/90"
              onClick={handleLinkClick}
            >
              Ver Planes
            </a>
          </div>
        </div>
      </header>
    </>
  );
} 