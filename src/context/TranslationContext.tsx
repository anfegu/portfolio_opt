import { createContext, useContext, useState, useCallback, ReactNode, useMemo } from 'react';
import axios from 'axios';

const API_URL = 'https://translate.googleapis.com/translate_a/single';

interface TranslationContextType {
  currentLang: string;
  supportedLanguages: { code: string; name: string; }[];
  translate: (text: string) => Promise<string>;
  setLanguage: (lang: string) => void;
}

const TranslationContext = createContext<TranslationContextType | null>(null);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [currentLang, setCurrentLang] = useState(() => {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) return savedLang;
    const browserLang = navigator.language.split('-')[0];
    return browserLang || 'en';
  });

  const supportedLanguages = useMemo(() => [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'it', name: 'Italiano' },
    { code: 'pt', name: 'Português' },
    { code: 'ru', name: 'Русский' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' }
  ], []);

  const translate = useCallback(async (text: string) => {
    if (currentLang === 'en') return text;

    try {
      // Asegurarnos de que el texto se envíe como una sola unidad
      const response = await axios.get(API_URL, {
        params: {
          client: 'gtx',
          sl: 'en',
          tl: currentLang,
          dt: 't',
          q: text.replace(/\./g, '。').trim(), // Usar un punto especial que la API no trata como separador
        }
      });

      // Restaurar los puntos originales
      return response.data[0][0][0].replace(/。/g, '.');
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  }, [currentLang]);

  const setLanguage = useCallback((lang: string) => {
    setCurrentLang(lang);
    localStorage.setItem('preferredLanguage', lang);
    document.documentElement.lang = lang;
  }, []);

  const contextValue = useMemo(() => ({
    currentLang,
    supportedLanguages,
    translate,
    setLanguage,
  }), [currentLang, supportedLanguages, translate, setLanguage]);

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

export default TranslationProvider;
