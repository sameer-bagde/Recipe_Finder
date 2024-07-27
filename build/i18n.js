import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enJSON from "./locale/en.json";
import esJSON from "./locale/es.json";
import frJSON from "./locale/fr.json";
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: Object.assign({}, enJSON),
      es: Object.assign({}, esJSON),
      fr: Object.assign({}, frJSON),
    },
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });
