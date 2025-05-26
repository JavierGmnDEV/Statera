'use client';

import { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from '../ThemeToggle';

export default function MobileNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed w-full bg-background/80 backdrop-blur-md z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-primary">Statera</span>
          </Link>

          {/* Navegación Desktop - oculta en móvil */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/#about" className="text-sm font-medium hover:text-primary transition-colors">
              Nosotros
            </Link>
            <Link href="/#features" className="text-sm font-medium hover:text-primary transition-colors">
              Servicios
            </Link>
            <Link href="/#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Precios
            </Link>
            <Link href="/#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contacto
            </Link>
          </nav>

          {/* Botones de acción */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Botón de menú móvil */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-accent/10"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18"></path>
                  <path d="M6 6l12 12"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12h18"></path>
                  <path d="M3 6h18"></path>
                  <path d="M3 18h18"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil - se muestra/oculta con clases en lugar de animaciones */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} border-t border-border`}>
        <nav className="px-4 py-4 space-y-3 bg-background/95 backdrop-blur-md">
          <Link 
            href="/#about" 
            className="block py-2 text-sm font-medium hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Nosotros
          </Link>
          <Link 
            href="/#features" 
            className="block py-2 text-sm font-medium hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Servicios
          </Link>
          <Link 
            href="/#pricing" 
            className="block py-2 text-sm font-medium hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Precios
          </Link>
          <Link 
            href="/#contact" 
            className="block py-2 text-sm font-medium hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Contacto
          </Link>
          <div className="pt-4 mt-4 border-t border-border">
            <a 
              href="#contact" 
              className="block w-full py-2 px-4 text-center text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setIsMenuOpen(false)}
            >
              Consulta gratuita
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
} 