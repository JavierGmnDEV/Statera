'use client';

import { ReactNode, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface GSAPProviderProps {
  children: ReactNode;
}

export default function GSAPProvider({ children }: GSAPProviderProps) {
  useEffect(() => {
    // Registrar plugins una sola vez
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    return () => {
      // Limpiar al desmontar para evitar memory leaks
      if (typeof window !== 'undefined') {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger) trigger.kill();
        });
        gsap.killTweensOf("*");
      }
    };
  }, []);

  return <>{children}</>;
} 