import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'ml' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isMalayalam: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'ml',
  setLanguage: () => {},
  toggleLanguage: () => {},
  isMalayalam: true,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('ml');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ml' ? 'en' : 'ml'));
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isMalayalam: language === 'ml',
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
