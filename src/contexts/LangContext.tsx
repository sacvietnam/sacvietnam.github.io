import React, { Dispatch, createContext, useEffect, useState } from "react";

type Language = "vi" | "en";
const STORAGE_KEY = "SAC_LANGUAGE";

export type MultilangContent = {
  [key in Language]: string;
};

export const LangContext = createContext<{
  language: Language;
  setLanguage: Dispatch<React.SetStateAction<Language>>;
  trans: (content: MultilangContent) => string;
}>({
  language: "en",
  setLanguage: () => {
    console.log("Undefined language");
  },
  trans: () => "",
});

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const localRaw = window.localStorage.getItem(STORAGE_KEY);

    if (localRaw) {
      const lang: Language = (JSON.parse(localRaw) as Language) || "en";

      return lang;
    }

    return "en";
  });
  ``;

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(language));
  }, [language]);

  const getContentCurrentLanguage = (content: MultilangContent) => {
    return content[language] || "NULL";
  };

  return (
    <LangContext.Provider
      value={{ language, setLanguage, trans: getContentCurrentLanguage }}
    >
      {children}
    </LangContext.Provider>
  );
};

export default LanguageProvider;
