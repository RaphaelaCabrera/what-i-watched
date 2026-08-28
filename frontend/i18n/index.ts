import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import pt from "./pt.json";
import en from "./en.json";
import es from "./es.json";

const savedLanguage = localStorage.getItem("language") ?? "pt";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pt: {
        translation: pt,
      },
      en: {
        translation: en,
      },
      es: {
        translation: es,
      },
    },

    lng: savedLanguage,
    fallbackLng: "pt",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;