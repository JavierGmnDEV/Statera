import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar plugins una sola vez
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Verifica si un elemento está conectado al DOM
 */
export const isElementConnected = (el: Element | null): boolean => {
  if (!el) return false;
  return document.body.contains(el);
};

/**
 * Crea una animación GSAP solo si el elemento está conectado al DOM
 */
export const safeAnimate = (
  element: Element | null, 
  animProps: gsap.TweenVars,
  immediateRender = false
): gsap.core.Tween | null => {
  if (!element || !isElementConnected(element)) return null;
  
  try {
    const anim = gsap.to(element, {
      ...animProps,
      immediateRender
    });
    return anim;
  } catch (error) {
    console.error("Error animando elemento:", error);
    return null;
  }
};

/**
 * Crea una animación GSAP "from" solo si el elemento está conectado al DOM
 */
export const safeFrom = (
  element: Element | null, 
  animProps: gsap.TweenVars
): gsap.core.Tween | null => {
  if (!element || !isElementConnected(element)) return null;
  
  try {
    return gsap.from(element, animProps);
  } catch (error) {
    console.error("Error animando elemento (from):", error);
    return null;
  }
};

// Definimos un tipo de callback sin argumentos
type CallbackNoArgs = () => void;

/**
 * Gestiona de forma segura las animaciones en un ScrollTrigger
 */
export const createSafeScrollTrigger = (
  trigger: Element | null,
  animations: () => gsap.core.Animation | gsap.core.Animation[] | null,
  scrollTriggerOptions: ScrollTrigger.Vars
): ScrollTrigger | null => {
  if (!trigger || !isElementConnected(trigger)) return null;
  
  try {
    // Hacer una copia de las opciones originales
    const options = { ...scrollTriggerOptions };
    
    // Reemplazar el onEnter con nuestra propia implementación
    const originalOnEnter = options.onEnter;
    options.onEnter = () => {
      try {
        // Solo ejecutar animaciones si el trigger sigue conectado
        if (isElementConnected(trigger)) {
          animations(); // Ejecutar las animaciones sin asignar el resultado a una variable
          
          // Llamar al onEnter original si existe y es una función
          if (originalOnEnter && typeof originalOnEnter === 'function') {
            // ScrollTrigger podría pasar argumentos al callback, pero los ignoramos
            (originalOnEnter as CallbackNoArgs)();
          }
        }
      } catch (error) {
        console.error("Error en onEnter de ScrollTrigger:", error);
      }
    };
    
    // Crear el ScrollTrigger con las opciones modificadas
    const st = ScrollTrigger.create({
      ...options,
      trigger
    });
    
    return st;
  } catch (error) {
    console.error("Error creando ScrollTrigger:", error);
    return null;
  }
};

/**
 * Crea una timeline de GSAP
 */
export const createSafeTimeline = (
  options?: gsap.TimelineVars
): gsap.core.Timeline => {
  return gsap.timeline(options);
};

/**
 * Limpia todas las animaciones GSAP y ScrollTriggers
 */
export const cleanupGSAP = (): void => {
  try {
    // Matar todos los tweens
    gsap.killTweensOf("*");
    
    // Matar todos los ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger) trigger.kill();
    });
  } catch (error) {
    console.error("Error limpiando GSAP:", error);
  }
};

/**
 * Helper para crear un timeout protegido contra errores
 */
export const createSafeTimeout = (
  callback: () => void,
  delay: number
): { timeoutId: number; cancel: () => void } => {
  const timeoutId = window.setTimeout(() => {
    try {
      callback();
    } catch (error) {
      console.error("Error en timeout:", error);
    }
  }, delay);
  
  return {
    timeoutId,
    cancel: () => window.clearTimeout(timeoutId)
  };
};

/**
 * Comprueba si estamos en un dispositivo móvil
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}; 