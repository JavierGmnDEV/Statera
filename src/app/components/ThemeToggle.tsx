'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  // Inicializamos el estado con null para evitar discrepancias entre servidor y cliente
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  useEffect(() => {
    // Una vez que el componente se monta en el cliente, comprobamos el tema actual
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    // Solo hacemos cambios si ya se ha cargado el estado inicial
    if (darkMode !== null) {
      const newDarkMode = !darkMode;
      setDarkMode(newDarkMode);
      
      // Actualizamos el DOM y localStorage
      const root = document.documentElement;
      if (newDarkMode) {
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        root.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  };

  // No renderizamos nada hasta que se determine el tema inicial
  if (darkMode === null) return null;

  return (
    <button 
      aria-label="Toggle theme"
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
    >
      {darkMode ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      )}
    </button>
  );
} 