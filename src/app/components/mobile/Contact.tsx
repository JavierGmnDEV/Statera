'use client';

import { useState } from 'react';

export default function MobileContact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    service: '',
    submitted: false,
    loading: false,
    error: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setFormState(prev => ({
      ...prev,
      loading: true,
      error: ''
    }));
    
    // Simulación de envío de formulario
    try {
      // Aquí iría la lógica real de envío del formulario a un backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormState(prev => ({
        ...prev,
        submitted: true,
        loading: false
      }));
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        loading: false,
        error: 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.'
      }));
    }
  };

  return (
    <section id="contact" className="py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Contacta con nosotros</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Estamos aquí para responder tus preguntas y discutir cómo podemos ayudarte a alcanzar tus objetivos.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulario de contacto */}
          <div className="bg-card rounded-xl shadow-md p-6 md:p-8 border border-border">
            {formState.submitted ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">¡Mensaje enviado!</h3>
                <p className="text-muted-foreground mb-6">
                  Gracias por contactarnos. Nos pondremos en contacto contigo lo antes posible.
                </p>
                <button
                  className="px-5 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
                  onClick={() => setFormState(prev => ({ ...prev, submitted: false }))}
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-semibold mb-6">Envíanos un mensaje</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Nombre completo <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full p-3 rounded-md border border-border bg-card focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                      placeholder="Tu nombre"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Correo electrónico <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full p-3 rounded-md border border-border bg-card focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-1">
                      Empresa
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formState.company}
                      onChange={handleChange}
                      className="w-full p-3 rounded-md border border-border bg-card focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                      placeholder="Nombre de tu empresa"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium mb-1">
                      Servicio de interés <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formState.service}
                      onChange={handleChange}
                      required
                      className="w-full p-3 rounded-md border border-border bg-card focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                    >
                      <option value="" disabled>Selecciona un servicio</option>
                      <option value="landing-page">Landing Page</option>
                      <option value="web-gestion">Web de Gestión</option>
                      <option value="web-ventas">Web de Ventas Online</option>
                      <option value="app-gestion">App de Gestión</option>
                      <option value="web-app-ventas">Web + App de Ventas</option>
                      <option value="solucion-empresarial">Solución Empresarial</option>
                      <option value="otro">Otro / No estoy seguro</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Mensaje <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full p-3 rounded-md border border-border bg-card focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                    placeholder="¿Cómo podemos ayudarte?"
                  ></textarea>
                </div>
                
                {formState.error && (
                  <div className="p-3 bg-red-100 border border-red-200 text-red-800 rounded-md">
                    {formState.error}
                  </div>
                )}
                
                <div>
                  <button
                    type="submit"
                    className="w-full py-3 px-6 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition flex items-center justify-center"
                    disabled={formState.loading}
                  >
                    {formState.loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      'Enviar mensaje'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
          
          {/* Información de contacto */}
          <div className="flex flex-col gap-8">
            <div className="bg-card rounded-xl p-6 border border-border h-auto">
              <h3 className="text-xl font-semibold mb-6">Información de contacto</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Teléfono</h4>
                    <p className="text-muted-foreground">+34 900 123 456</p>
                    <p className="text-xs text-muted-foreground mt-1">Lunes a Viernes, 9:00 - 18:00</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Email</h4>
                    <p className="text-muted-foreground">info@statera.com</p>
                    <p className="text-xs text-muted-foreground mt-1">Respuesta en 24-48 horas</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Oficina</h4>
                    <p className="text-muted-foreground">Calle Principal 123, 28001</p>
                    <p className="text-muted-foreground">Madrid, España</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-border">
                <h4 className="text-sm font-medium mb-4">Síguenos en redes sociales</h4>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border hidden md:block">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Preguntas frecuentes</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">¿Cuánto tiempo tarda en desarrollarse un proyecto?</h4>
                  <p className="text-sm text-muted-foreground">El tiempo de desarrollo depende de la complejidad del proyecto. Una landing page puede estar lista en 1-2 semanas, mientras que un sistema completo puede llevar 2-3 meses.</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">¿Ofrecen mantenimiento después del lanzamiento?</h4>
                  <p className="text-sm text-muted-foreground">Sí, ofrecemos planes de mantenimiento adaptados a tus necesidades, desde actualizaciones básicas hasta soporte técnico 24/7.</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">¿Puedo actualizar mi plan más adelante?</h4>
                  <p className="text-sm text-muted-foreground">Por supuesto, puedes escalar tu solución a medida que crece tu negocio sin perder tus datos o configuraciones.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 