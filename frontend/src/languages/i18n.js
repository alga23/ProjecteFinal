import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './es.json';
import en from './en.json';
import ca from './ca.json';
import { getLocales } from 'expo-localization';

const locales = getLocales();
let phoneLocale = 'en'; // Idioma predeterminado en caso de que no se detecte ninguna configuración regional.

if (locales && locales.length > 0) {
    phoneLocale = locales[0].languageCode; // Obtén el primer idioma de la lista
}
i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        resources: {
            en: {
                translation: en,
            },
            es: {
                translation: es,
            },
            ca: {
                translation: ca,
            }
        },
        lng: phoneLocale, // Set detected locale as initial language
        fallbackLng: 'en',
    });

export default i18n;