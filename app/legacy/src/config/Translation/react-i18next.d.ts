import {resources} from './Translation';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: typeof resources['es'];
  }
}
