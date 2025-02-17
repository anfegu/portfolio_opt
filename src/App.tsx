import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import TranslationProvider from './context/TranslationContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Experience from './components/Experience';
import Skills from './components/Skills';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <TranslationProvider>
      <div key="app-root" className="relative min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        
        <main>
          <AnimatePresence mode="wait">
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Portfolio />
          </AnimatePresence>
        </main>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-lg hover:scale-110 transition-transform"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isDarkMode ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            )}
          </svg>
        </button>

        {/* Footer */}
        <footer className="py-8 text-center text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Andrés Gutiérrez. All rights reserved.</p>
        </footer>
      </div>
    </TranslationProvider>
  );
};

export default App;
