import { useState, useEffect } from 'react';
import { FiGlobe } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../context/TranslationContext';

export const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLang, supportedLanguages, setLanguage } = useTranslation();

  // Cerrar el menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && !(e.target as Element).closest('.language-selector')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  // Ordenar idiomas: inglés primero, luego alfabéticamente
  const sortedLanguages = [...supportedLanguages].sort((a, b) => {
    if (a.code === 'en') return -1;
    if (b.code === 'en') return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="relative language-selector">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 active:text-blue-600 dark:active:text-blue-500 transition-colors cursor-pointer rounded-lg"
      >
        <FiGlobe className="w-5 h-5" />
        <span className="uppercase">{currentLang}</span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 py-2 w-48 max-h-[calc(100vh-100px)] overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 z-50"
          >
            {sortedLanguages.map((lang) => (
              <motion.button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full px-4 py-3 text-left hover:bg-blue-50 dark:hover:bg-blue-900/30 active:bg-blue-100 dark:active:bg-blue-900/50 transition-colors ${
                  currentLang === lang.code
                    ? 'text-blue-600 dark:text-blue-400 font-medium bg-blue-50/50 dark:bg-blue-900/20'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                {lang.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
