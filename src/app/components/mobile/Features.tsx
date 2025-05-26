'use client';

export default function MobileFeatures() {
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14"></path>
          <path d="M5 12h14"></path>
        </svg>
      ),
      title: 'Landing Pages',
      description: 'Páginas de presentación profesionales y atractivas para presentar tu negocio en internet.',
      ideal: 'Ideal para: Pequeñas empresas y profesionales independientes'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        </svg>
      ),
      title: 'Web de Gestión',
      description: 'Sistemas web para administrar inventario, clientes, facturación y otros aspectos de tu negocio.',
      ideal: 'Ideal para: Pequeñas y medianas empresas en crecimiento'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      ),
      title: 'Web de Ventas Online',
      description: 'Tiendas virtuales completas para vender tus productos o servicios a través de internet.',
      ideal: 'Ideal para: Comercios y negocios con catálogos de productos'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      ),
      title: 'App de Gestión',
      description: 'Aplicaciones móviles para gestionar tu negocio desde cualquier lugar con funcionalidades offline.',
      ideal: 'Ideal para: Empresas con personal en movimiento o múltiples ubicaciones'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
      ),
      title: 'Web + App de Ventas',
      description: 'Solución completa que combina tienda online y aplicación móvil para gestionar pedidos y ventas.',
      ideal: 'Ideal para: Comercios con necesidades de venta omnicanal'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      title: 'Solución Empresarial',
      description: 'Sistemas completos personalizados para gestionar todos los aspectos de una empresa grande.',
      ideal: 'Ideal para: Medianas y grandes empresas con necesidades específicas'
    }
  ];

  return (
    <section id="features" className="py-24 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Soluciones de software para cada necesidad
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ofrecemos una amplia gama de servicios digitales adaptados a las necesidades de pequeñas, medianas y grandes empresas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl border border-border bg-card/50 hover:bg-card transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              <p className="text-sm font-medium text-primary">{feature.ideal}</p>
              <div className="mt-4 pt-4 border-t border-border">
                <a href="#pricing" className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1">
                  Ver precios
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-6 rounded-xl border border-primary/20 bg-primary/5">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="md:flex-1">
              <h3 className="text-xl font-semibold mb-2">¿No encuentras lo que buscas?</h3>
              <p className="text-muted-foreground">Podemos crear una solución personalizada que se adapte exactamente a tus necesidades específicas.</p>
            </div>
            <a 
              href="#contact" 
              className="px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm"
            >
              Contactar para solución a medida
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 