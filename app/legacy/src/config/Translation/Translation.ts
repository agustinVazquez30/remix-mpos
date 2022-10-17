import es from './lang/es';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

export const resources = {
  es,
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'es',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
