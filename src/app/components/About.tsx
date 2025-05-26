'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { createSafeTimeline, isElementConnected, isMobileDevice, cleanupGSAP } from '../utils/gsap-utils';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const animationsRef = useRef<gsap.core.Animation[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Detectar si es móvil
    const isMobile = isMobileDevice();
    
    try {
      // Solo proceder si la sección existe en el DOM
      if (!isElementConnected(sectionRef.current)) return;
      
      const tl = createSafeTimeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        }
      });
      
      animationsRef.current.push(tl);
      
      if (isElementConnected(titleRef.current) && titleRef.current) {
        tl.from(titleRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        });
      }
      
      if (isElementConnected(descriptionRef.current) && descriptionRef.current) {
        tl.from(descriptionRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        }, '-=0.3');
      }
      
      if (isElementConnected(contentRef.current) && contentRef.current) {
        tl.from(contentRef.current, {
          y: isMobile ? 20 : 30,
          opacity: 0,
          duration: isMobile ? 0.5 : 0.6,
          ease: 'power2.out',
        }, '-=0.3');
      }
      
      if (isElementConnected(imageRef.current) && imageRef.current) {
        // En móvil usamos animación vertical en lugar de horizontal
        if (isMobile) {
          tl.from(imageRef.current, {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: 'power2.out',
          }, '-=0.2');
        } else {
          tl.from(imageRef.current, {
            x: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
          }, '-=0.4');
        }
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
          cleanupGSAP();
          animationsRef.current = [];
        } catch (error) {
          console.error("Error al limpiar animaciones en resize:", error);
        }
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('resize', handleResize);
        
        // Limpiar todo GSAP
        cleanupGSAP();
        
        // Para mayor seguridad, también limpiamos nuestras referencias específicas
        animationsRef.current = [];
      };
    } catch (error) {
      console.error("Error configurando animaciones:", error);
      return () => {};
    }
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 px-4 bg-muted text-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-3xl md:text-5xl font-bold mb-4">
            Sobre Statera
          </h2>
          <p ref={descriptionRef} className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Revolucionando la forma en que las empresas gestionan sus operaciones diarias desde 2015.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={contentRef} className="space-y-6">
            <div className="bg-card p-6 rounded-xl border border-border">
              <h3 className="text-xl font-semibold mb-2">Nuestra misión</h3>
              <p className="text-muted-foreground">
                Proporcionar soluciones de software innovadoras que simplifiquen los procesos empresariales, 
                mejoren la productividad y ayuden a nuestros clientes a alcanzar sus objetivos.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl border border-border">
              <h3 className="text-xl font-semibold mb-2">Nuestro equipo</h3>
              <p className="text-muted-foreground">
                Un grupo diverso de expertos en tecnología, diseño y experiencia de usuario unidos por 
                la pasión de crear software excepcional que marque la diferencia.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl border border-border">
              <h3 className="text-xl font-semibold mb-2">Innovación constante</h3>
              <p className="text-muted-foreground">
                Nos mantenemos a la vanguardia de las tendencias tecnológicas, implementando mejoras 
                continuas para ofrecer siempre la mejor experiencia a nuestros usuarios.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="bg-card border border-border rounded-lg px-5 py-3 flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">15+</span>
                <span className="text-sm text-muted-foreground">Años de experiencia</span>
              </div>
              <div className="bg-card border border-border rounded-lg px-5 py-3 flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">50+</span>
                <span className="text-sm text-muted-foreground">Profesionales</span>
              </div>
              <div className="bg-card border border-border rounded-lg px-5 py-3 flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">20+</span>
                <span className="text-sm text-muted-foreground">Países</span>
              </div>
            </div>
          </div>
          
          <div ref={imageRef} className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-20"></div>
            <div className="relative bg-card rounded-xl overflow-hidden border border-border shadow-xl aspect-[4/3]">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <svg className="h-16 w-16 text-primary mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <h3 className="text-2xl font-bold mb-2">Calidad garantizada</h3>
                <p className="text-muted-foreground">
                  Nuestros productos cumplen con los más altos estándares de calidad y seguridad, respaldados por certificaciones internacionales.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4 w-full">
                  <div className="h-16 rounded-lg bg-foreground/5 flex items-center justify-center">
                    <span className="font-medium">ISO 27001</span>
                  </div>
                  <div className="h-16 rounded-lg bg-foreground/5 flex items-center justify-center">
                    <span className="font-medium">GDPR</span>
                  </div>
                  <div className="h-16 rounded-lg bg-foreground/5 flex items-center justify-center">
                    <span className="font-medium">SOC 2</span>
                  </div>
                  <div className="h-16 rounded-lg bg-foreground/5 flex items-center justify-center">
                    <span className="font-medium">HIPAA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 