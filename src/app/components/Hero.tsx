'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { createSafeTimeline, isElementConnected, isMobileDevice } from '../utils/gsap-utils';

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const animationsRef = useRef<gsap.core.Animation[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Detectar si estamos en móvil
    const isMobile = isMobileDevice();
    
    try {
      const tl = createSafeTimeline();
      animationsRef.current.push(tl);
      
      if (isElementConnected(titleRef.current) && titleRef.current) {
        tl.from(titleRef.current, {
          y: isMobile ? 30 : 50,
          opacity: 0,
          duration: isMobile ? 0.6 : 0.8,
          ease: 'power3.out',
        });
      }
      
      if (isElementConnected(subtitleRef.current) && subtitleRef.current) {
        tl.from(subtitleRef.current, {
          y: isMobile ? 20 : 30,
          opacity: 0,
          duration: isMobile ? 0.6 : 0.8,
          ease: 'power3.out',
        }, '-=0.4');
      }
      
      if (isElementConnected(ctaRef.current) && ctaRef.current) {
        tl.from(ctaRef.current, {
          y: isMobile ? 15 : 20,
          opacity: 0,
          duration: isMobile ? 0.5 : 0.6,
          ease: 'power2.out',
        }, '-=0.2');
      }
      
      if (isElementConnected(imageRef.current) && imageRef.current) {
        tl.from(imageRef.current, {
          y: isMobile ? 20 : 30,
          opacity: 0,
          duration: isMobile ? 0.8 : 1,
          ease: 'power2.out',
        }, '-=0.3');
      }
      
      // Escuchar cambios de visibilidad para pausar animaciones cuando no son visibles
      const handleVisibilityChange = () => {
        if (document.hidden) {
          animationsRef.current.forEach(anim => {
            try {
              if (anim && !anim.paused()) anim.pause();
            } catch (error) {
              console.error("Error al pausar animación:", error);
            }
          });
        } else {
          animationsRef.current.forEach(anim => {
            try {
              if (anim && anim.paused()) anim.resume();
            } catch (error) {
              console.error("Error al reanudar animación:", error);
            }
          });
        }
      };
      
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      // Manejar cambios de tamaño de ventana
      const handleResize = () => {
        try {
          // Limpiar animaciones al cambiar tamaño de ventana
          animationsRef.current.forEach(anim => {
            if (anim) anim.kill();
          });
          animationsRef.current = [];
        } catch (error) {
          console.error("Error al limpiar animaciones en resize:", error);
        }
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('resize', handleResize);
        
        try {
          // Limpiar todas las animaciones
          animationsRef.current.forEach(anim => {
            if (anim) anim.kill();
          });
          animationsRef.current = [];
        } catch (error) {
          console.error("Error al limpiar animaciones:", error);
        }
      };
    } catch (error) {
      console.error("Error configurando animaciones:", error);
      return () => {};
    }
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-background text-foreground overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[40%] -right-[10%] w-[70%] h-[70%] bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-[30%] -left-[10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 ref={titleRef} className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Software que <span className="text-primary">potencia</span> tu negocio
            </h1>
            <p ref={subtitleRef} className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-xl">
              Soluciones de software inteligentes para <span className="font-semibold">pequeñas, medianas y grandes empresas</span> que optimizan procesos y maximizan resultados.
            </p>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl">
              Desde una simple landing page hasta complejos sistemas empresariales, creamos software a medida de tus necesidades y presupuesto.
            </p>
            
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#pricing" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 shadow-lg"
              >
                Ver planes
              </a>
              <a 
                href="#features" 
                className="inline-flex items-center justify-center px-6 py-3 border border-border text-base font-medium rounded-md bg-background hover:bg-secondary"
              >
                Explorar características
              </a>
            </div>
            
            <div className="mt-10 flex items-center gap-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-medium`}>
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <div className="font-medium">+1,000 empresas</div>
                <div className="text-muted-foreground">confían en nosotros</div>
              </div>
            </div>
          </div>
          
          <div ref={imageRef} className="relative lg:h-[500px] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-lg transform -rotate-3"></div>
            <div className="relative bg-card rounded-xl shadow-2xl overflow-hidden border border-border w-full h-[400px] lg:h-[450px]">
              <div className="absolute top-0 w-full h-8 bg-muted flex items-center px-3 gap-1.5">
               
                <div className="w-3 h-3 rounded-full bg-muted-foreground/60"></div>
              </div>
              <div className="w-full h-full pt-8 bg-secondary/30">
                <div className="p-4 h-full flex flex-col">
                  
                  
                  <pre className="bg-card rounded-lg p-4 overflow-auto text-xs font-mono flex-1 border border-border">
{`'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SecureLogin() {
  const [user, setUser] = useState('');
  const router = useRouter();

  // Función de autenticación segura
  async function login() {}

  return (
    <div className="p-4 rounded-md">
      <h2>¡Hola cliente!</h2>
      <p>Bienvenido a tu servicio seguro</p>
      
      <input 
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="Usuario"
        className="mt-2 w-full"
      />
      
      <button 
        onClick={login}
        className="mt-2 w-full py-2 bg-blue-500"
      >
        Acceder de forma segura
      </button>
    </div>
  );
}`}
                  </pre>
                  
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 