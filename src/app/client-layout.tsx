'use client';

import { ReactNode, useEffect } from 'react';
import SmoothScroll from "./components/SmoothScroll";
import GSAPProvider from './components/GSAPProvider';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Pricing from './components/Pricing';
import Contact from './components/Contact';

interface ClientLayoutProps {
  children?: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
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
      <SmoothScroll>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <Hero />
            <About />
            <Features />
            <Pricing />
            <Contact />
            {children}
          </main>
          <footer className="bg-muted py-8 border-t border-border">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Statera. Todos los derechos reservados.
              </p>
            </div>
          </footer>
        </div>
      </SmoothScroll>
    </GSAPProvider>
  );
} 