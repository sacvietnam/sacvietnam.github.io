import React, { Dispatch, createContext, useEffect, useState } from "react";
import LocalStorageHandler from "../util/localStorage/LocalStorageHandler";

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
    return LocalStorageHandler.getItem<Language>("LANGUAGE") || "en";
  });

  useEffect(() => {
    LocalStorageHandler.setItem("LANGUAGE", language);
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
