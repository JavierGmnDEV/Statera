'use client';

import { useState, useEffect } from 'react';

interface PricingTier {
  name: string;
  price: {
    international: string;
    cuba: string;
  };
  description: string;
  features: string[];
  highlighted?: boolean;
  showFreeAccess?: boolean;
}

export default function MobilePricing() {
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'annual'>('monthly');
  const [isLocalCuba, setIsLocalCuba] = useState(false);
  const [loading, setLoading] = useState(true);

  // Detectar la ubicación del usuario
  useEffect(() => {
    async function detectLocation() {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setIsLocalCuba(data.country === 'CU');
      } catch (error) {
        console.error('Error al detectar ubicación:', error);
      } finally {
        setLoading(false);
      }
    }

    detectLocation();
  }, []);

  const pricingTiers: PricingTier[] = [
    {
      name: 'Landing Page',
      price: {
        international: billingInterval === 'monthly' ? '$99' : '$990',
        cuba: billingInterval === 'monthly' ? '$49' : '$490'
      },
      description: 'Perfecta para presentar tu negocio online con un diseño profesional.',
      features: [
        'Diseño responsive',
        'Hasta 5 secciones',
        'SEO básico',
        'Formulario de contacto',
        'Integración con redes sociales'
      ],
      showFreeAccess: false
    },
    {
      name: 'Web de Gestión',
      price: {
        international: billingInterval === 'monthly' ? '$199' : '$1990',
        cuba: billingInterval === 'monthly' ? '$99' : '$990'
      },
      description: 'Sistema web para administrar todos los aspectos de tu negocio.',
      features: [
        'Panel de administración',
        'Gestión de usuarios',
        'Gestión de inventario',
        'Informes básicos',
        'Soporte técnico',
        'Versión móvil adaptada'
      ],
      showFreeAccess: true,
      highlighted: true
    },
    {
      name: 'Web de Ventas Online',
      price: {
        international: billingInterval === 'monthly' ? '$249' : '$2490',
        cuba: billingInterval === 'monthly' ? '$129' : '$1290'
      },
      description: 'Tienda online completa para vender tus productos o servicios.',
      features: [
        'Catálogo de productos',
        'Carrito de compras',
        'Pasarela de pagos',
        'Gestión de pedidos',
        'Cupones de descuento',
        'Estadísticas de ventas',
        'Soporte multiidioma'
      ],
      showFreeAccess: true
    },
    {
      name: 'App de Gestión',
      price: {
        international: billingInterval === 'monthly' ? '$299' : '$2990',
        cuba: billingInterval === 'monthly' ? '$149' : '$1490'
      },
      description: 'Aplicación móvil para gestionar tu negocio desde cualquier lugar.',
      features: [
        'Disponible en iOS y Android',
        'Sincronización en tiempo real',
        'Notificaciones push',
        'Modo offline',
        'Escaneo de códigos QR/barras',
        'Actualizaciones continuas'
      ],
      showFreeAccess: true
    },
    {
      name: 'Web + App de Ventas',
      price: {
        international: billingInterval === 'monthly' ? '$399' : '$3990',
        cuba: billingInterval === 'monthly' ? '$199' : '$1990'
      },
      description: 'Solución completa de comercio electrónico con web y aplicación móvil.',
      features: [
        'Tienda online completa',
        'App nativa para iOS/Android',
        'Panel unificado de administración',
        'Sincronización multicanal',
        'Gestión de inventario avanzada',
        'Análisis de datos en tiempo real',
        'Integraciones con marketplaces'
      ],
      showFreeAccess: true
    },
    {
      name: 'Solución Empresarial',
      price: {
        international: billingInterval === 'monthly' ? '$599' : '$5990',
        cuba: billingInterval === 'monthly' ? '$299' : '$2990'
      },
      description: 'Sistema completo personalizado para empresas con necesidades específicas.',
      features: [
        'Web y App personalizadas',
        'Integración con ERP/CRM',
        'Automatización de procesos',
        'Personalización a medida',
        'Soporte 24/7',
        'Consultoría estratégica',
        'Actualizaciones prioritarias',
        'Seguridad avanzada'
      ],
      showFreeAccess: false
    }
  ];

  // Renderizar esqueleto mientras se carga
  if (loading) {
    return (
      <section id="pricing" className="py-24 px-4 bg-background text-foreground">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-pulse">
            <div className="h-10 bg-muted rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-6 bg-muted rounded w-2/3 mx-auto"></div>
          </div>
          <div className="h-[500px] bg-muted/20 rounded-xl animate-pulse"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-24 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Planes que se adaptan a tus necesidades</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Elige el plan perfecto para tu negocio y comienza a optimizar tus procesos hoy mismo.
          </p>
          
          <div className="flex items-center justify-center mb-8">
            <div className="relative flex bg-muted p-1 rounded-full">
              <button
                type="button"
                className={`relative w-28 rounded-full py-2 text-sm font-medium transition-colors ${
                  billingInterval === 'monthly'
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setBillingInterval('monthly')}
              >
                Mensual
              </button>
              <button
                type="button"
                className={`relative w-28 rounded-full py-2 text-sm font-medium transition-colors ${
                  billingInterval === 'annual'
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setBillingInterval('annual')}
              >
                Anual
                {billingInterval === 'annual' && (
                  <span className="absolute -top-5 right-3 bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded-full">
                    Ahorra 20%
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Grid normal de planes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-xl overflow-hidden border ${
                tier.highlighted 
                  ? 'border-primary shadow-lg'
                  : 'border-border'
              }`}
            >
              <div className={`p-6 h-full flex flex-col ${tier.highlighted ? 'bg-primary/5' : ''}`}>
                {tier.highlighted && (
                  <div className="mb-4 -mt-1">
                    <span className="bg-primary/90 text-primary-foreground text-xs px-3 py-1 rounded-full">
                      Más popular
                    </span>
                  </div>
                )}
                
                <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
                
                <div className="mb-4">
                  <div className="text-3xl font-bold">
                    {isLocalCuba ? tier.price.cuba : tier.price.international}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {billingInterval === 'monthly' ? 'al mes' : 'al año'}
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-6">{tier.description}</p>
                
                <div className="mb-6 flex-grow">
                  <p className="text-sm font-medium mb-3">Incluye:</p>
                  <ul className="space-y-2">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="text-sm flex items-start">
                        <svg 
                          className="h-5 w-5 text-primary flex-shrink-0 mr-2" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path 
                            fillRule="evenodd" 
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-auto space-y-3">
                  <button 
                    className={`w-full py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                      tier.highlighted
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-card border border-border hover:bg-muted'
                    }`}
                  >
                    Seleccionar plan
                  </button>
                  
                  {tier.showFreeAccess && (
                    <a href="#demo" className="block text-center text-sm text-muted-foreground hover:text-foreground">
                      Probar demo gratuita
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 