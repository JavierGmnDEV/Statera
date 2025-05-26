'use client';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import ThemeToggle from './components/ThemeToggle';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <About />
      <Pricing />
      <Contact />
      <ThemeToggle />
      <footer className="py-8 bg-muted text-center text-sm text-muted-foreground">
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} Statera. Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
