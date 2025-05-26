'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { isElementConnected, safeFrom, createSafeTimeline, isMobileDevice, cleanupGSAP } from '../utils/gsap-utils';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRefs = useRef<Array<HTMLInputElement | HTMLTextAreaElement | null>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const decorativeElements = useRef<Array<HTMLDivElement | null>>([]);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const animationsRef = useRef<gsap.core.Animation[]>([]);

  const setElementRef = (index: number) => (el: HTMLDivElement | null) => {
    decorativeElements.current[index] = el;
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Detectar si es móvil
    const isMobile = isMobileDevice();
    
    // Función para matar todas las animaciones de forma segura
    const killAllAnimations = () => {
      animationsRef.current.forEach(anim => {
        try {
          if (anim) anim.kill();
        } catch (error) {
          console.error("Error al matar animación:", error);
        }
      });
      animationsRef.current = [];
    };
    
    // Escuchar cambios de tamaño de ventana para detener animaciones
    const handleResize = () => {
      killAllAnimations();
    };
    window.addEventListener('resize', handleResize);
    
    // Gestionar cambios de visibilidad para pausar animaciones cuando la página no es visible
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
    
    // Usar un timeout para asegurar que el DOM está listo (crucial para móvil)
    const initTimeout = setTimeout(() => {
      try {
        // Comprobar que la sección existe
        if (!isElementConnected(sectionRef.current)) return;
        
        // Crear timeline principal con ScrollTrigger
        if (sectionRef.current) {
          const tl = createSafeTimeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          });
          
          // Guardar la animación para limpiarla después
          animationsRef.current.push(tl);
          
          // Animar el título
          if (isElementConnected(titleRef.current) && titleRef.current) {
            const titleAnim = safeFrom(titleRef.current, {
              y: 30,
              opacity: 0,
              duration: 0.6,
              ease: 'power2.out'
            });
            if (titleAnim) tl.add(titleAnim);
          }
          
          // Animar el formulario
          if (isElementConnected(formRef.current) && formRef.current) {
            const formAnim = safeFrom(formRef.current, {
              y: 20,
              opacity: 0,
              duration: 0.6,
              ease: 'power2.out'
            });
            if (formAnim) tl.add(formAnim, '-=0.2');
          }
        }
        
        // Para móvil, reducimos animaciones a lo mínimo esencial
        if (isMobile) {
          // En móvil solo animamos los dos círculos principales con animaciones simples
          if (isElementConnected(decorativeElements.current[0])) {
            const anim = gsap.to(decorativeElements.current[0], {
              x: 20,
              y: -20,
              duration: 12,
              repeat: -1,
              yoyo: true,
              ease: "none"
            });
            animationsRef.current.push(anim);
          }
          
          if (isElementConnected(decorativeElements.current[1])) {
            const anim = gsap.to(decorativeElements.current[1], {
              x: -20,
              y: 20,
              duration: 15,
              repeat: -1,
              yoyo: true,
              ease: "none"
            });
            animationsRef.current.push(anim);
          }
        } else {
          // En desktop, animaciones completas
          // Animar círculos grandes con blur
          if (isElementConnected(decorativeElements.current[0])) {
            const anim = gsap.to(decorativeElements.current[0], {
              x: 80,
              y: -80,
              duration: 10,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut"
            });
            animationsRef.current.push(anim);
          }
          
          if (isElementConnected(decorativeElements.current[1])) {
            const anim = gsap.to(decorativeElements.current[1], {
              x: -90,
              y: 90,
              duration: 9,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: 0.5
            });
            animationsRef.current.push(anim);
          }
          
          // Animar círculos medianos
          for (let i = 2; i <= 4; i++) {
            const element = decorativeElements.current[i];
            if (!isElementConnected(element)) continue;
            
            const anim = gsap.to(element, {
              x: gsap.utils.random(-50, 50),
              y: gsap.utils.random(-50, 50),
              duration: gsap.utils.random(4, 6),
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: i * 0.2
            });
            animationsRef.current.push(anim);
          }
          
          // Animar círculos pequeños
          for (let i = 5; i <= 10; i++) {
            const element = decorativeElements.current[i];
            if (!isElementConnected(element)) continue;
            
            const anim = gsap.to(element, {
              x: gsap.utils.random(-40, 40),
              y: gsap.utils.random(-40, 40),
              duration: gsap.utils.random(3, 5),
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: i * 0.1
            });
            animationsRef.current.push(anim);
          }
        }
      } catch (error) {
        console.error("Error inicializando animaciones:", error);
      }
    }, isMobile ? 500 : 100); // Mayor retraso en móvil para estabilidad del DOM
    
    // Limpieza al desmontar
    return () => {
      clearTimeout(initTimeout);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      // Limpiar todo GSAP
      cleanupGSAP();
      
      // Para mayor seguridad, también limpiamos nuestras referencias específicas
      killAllAnimations();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulación de envío de formulario
    setTimeout(() => {
      setFormStatus('success');
      // Resetear después de 3 segundos
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section 
      ref={sectionRef} 
      id="contact" 
      className="py-24 px-4 bg-background text-foreground relative overflow-hidden"
    >
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div 
          ref={setElementRef(0)} 
          className="absolute -top-[20%] -right-[5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-3xl will-change-transform"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        ></div>
        <div 
          ref={setElementRef(1)} 
          className="absolute -bottom-[10%] -left-[5%] w-[30%] h-[30%] bg-accent/10 rounded-full blur-3xl will-change-transform"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        ></div>
        
        <div 
          ref={setElementRef(2)} 
          className="absolute top-[10%] left-[5%] w-8 h-8 border-2 border-primary/50 rounded-full will-change-transform"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        ></div>
        <div 
          ref={setElementRef(3)} 
          className="absolute top-[40%] right-[10%] w-12 h-12 border-2 border-accent/50 rounded-full will-change-transform"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        ></div>
        <div 
          ref={setElementRef(4)} 
          className="absolute bottom-[15%] left-[15%] w-16 h-16 border-2 border-primary/40 rounded-full will-change-transform"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        ></div>
        
        <div 
          ref={setElementRef(5)} 
          className="absolute top-[20%] right-[20%] w-5 h-5 bg-primary/30 rounded-full will-change-transform hidden md:block"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        ></div>
        <div 
          ref={setElementRef(6)} 
          className="absolute bottom-[30%] left-[30%] w-7 h-7 bg-accent/20 rounded-full will-change-transform hidden md:block"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        ></div>
      </div>
      
      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-block mb-3">
            <span className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">
              ¿Listo para comenzar?
            </span>
          </div>
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-6">
            Hablemos de tu <span className="text-primary">proyecto</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Estamos aquí para ayudarte a crear la solución perfecta para tu negocio.
            Contáctanos y te responderemos en menos de 24 horas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Información de contacto */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-card border border-border p-6 rounded-xl relative overflow-hidden z-10">
              <div className="relative z-10">
                <h3 className="font-semibold text-xl mb-6">Información de contacto</h3>
                
                <div className="space-y-5">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Teléfono</h4>
                      <p className="text-muted-foreground mt-1">+34 912 345 678</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-muted-foreground mt-1">info@statera.cu</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Ubicación</h4>
                      <p className="text-muted-foreground mt-1">La Habana, Cuba</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-border">
                  <h4 className="font-medium mb-3">Síguenos</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="p-2 bg-muted rounded-full hover:bg-muted/80 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </a>
                    <a href="#" className="p-2 bg-muted rounded-full hover:bg-muted/80 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                    <a href="#" className="p-2 bg-muted rounded-full hover:bg-muted/80 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                      </svg>
                    </a>
                    <a href="#" className="p-2 bg-muted rounded-full hover:bg-muted/80 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Micro decoraciones en la tarjeta */}
              <div 
                ref={setElementRef(7)}
                className="absolute top-10 right-10 w-20 h-20 bg-primary/8 rounded-full will-change-transform"
                style={{ transform: 'translate3d(0, 0, 0)' }}
              ></div>
              <div 
                ref={setElementRef(8)}
                className="absolute -bottom-8 -left-8 w-24 h-24 bg-accent/8 rounded-full will-change-transform"
                style={{ transform: 'translate3d(0, 0, 0)' }}
              ></div>
            </div>
          </div>
          
          {/* Formulario */}
          <div className="lg:col-span-3">
            <div className="bg-card border border-border p-8 rounded-xl shadow-sm relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-semibold text-xl mb-6">Envíanos un mensaje</h3>
                
                {formStatus === 'success' ? (
                  <div className="bg-green-50 text-green-800 border border-green-200 rounded-lg p-6 text-center">
                    <div className="mb-4">
                      <svg className="mx-auto h-12 w-12 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-medium mb-2">¡Mensaje enviado!</h4>
                    <p>Gracias por contactarnos. Te responderemos lo antes posible.</p>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium">
                          Nombre completo
                        </label>
                        <input
                          ref={(el) => { inputRefs.current[0] = el; return undefined; }}
                          type="text"
                          id="name"
                          placeholder="Juan Pérez"
                          className="w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                          required
                          disabled={formStatus === 'submitting'}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium">
                          Email
                        </label>
                        <input
                          ref={(el) => { inputRefs.current[1] = el; return undefined; }}
                          type="email"
                          id="email"
                          placeholder="ejemplo@email.com"
                          className="w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                          required
                          disabled={formStatus === 'submitting'}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block mb-2 text-sm font-medium">
                        Asunto
                      </label>
                      <input
                        ref={(el) => { inputRefs.current[2] = el; return undefined; }}
                        type="text"
                        id="subject"
                        placeholder="¿Cómo podemos ayudarte?"
                        className="w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        required
                        disabled={formStatus === 'submitting'}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block mb-2 text-sm font-medium">
                        Mensaje
                      </label>
                      <textarea
                        ref={(el) => { inputRefs.current[3] = el; return undefined; }}
                        id="message"
                        rows={5}
                        placeholder="Describe tu proyecto o consulta..."
                        className="w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        required
                        disabled={formStatus === 'submitting'}
                      ></textarea>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="terms"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/50"
                        required
                        disabled={formStatus === 'submitting'}
                      />
                      <label htmlFor="terms" className="ml-2 block text-sm text-muted-foreground">
                        Acepto la <a href="#" className="text-primary hover:underline">política de privacidad</a>
                      </label>
                    </div>
                    
                    <button
                      ref={buttonRef}
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors relative overflow-hidden"
                    >
                      {formStatus === 'submitting' ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Enviando...
                        </span>
                      ) : (
                        "Enviar mensaje"
                      )}
                    </button>
                  </form>
                )}
              </div>
              
              {/* Micro decoraciones en el formulario */}
              <div 
                ref={setElementRef(9)}
                className="absolute -top-5 -right-5 w-28 h-28 bg-primary/8 rounded-full will-change-transform"
                style={{ transform: 'translate3d(0, 0, 0)' }}
              ></div>
              <div 
                ref={setElementRef(10)}
                className="absolute -bottom-10 right-20 w-24 h-24 bg-accent/8 rounded-full will-change-transform"
                style={{ transform: 'translate3d(0, 0, 0)' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 