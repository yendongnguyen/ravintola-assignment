import { createContext, useContext, useState, type ReactNode } from 'react';
import { translations, type Lang, type Translations } from './translations';

interface LangCtx {
  lang: Lang;
  t: Translations;
  setLang: (l: Lang) => void;
}

const LanguageContext = createContext<LangCtx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
