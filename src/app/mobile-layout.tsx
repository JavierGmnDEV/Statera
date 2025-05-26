'use client';

import { ReactNode } from 'react';
import { 
  MobileProvider, 
  MobileNavbar, 
  MobileHero, 
  MobileAbout, 
  MobileFeatures, 
  MobilePricing,
  MobileContact 
} from './components/mobile';

interface MobileLayoutProps {
  children?: ReactNode;
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <MobileProvider>
      <div className="flex min-h-screen flex-col">
        <MobileNavbar />
        <main className="flex-1">
          <MobileHero />
          <MobileAbout />
          <MobileFeatures />
          <MobilePricing />
          <MobileContact />
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
    </MobileProvider>
  );
} 