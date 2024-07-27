import pkg from '@/locales/ru.json';

export type PkgKeys = keyof typeof pkg;

export const getLocal = (key: PkgKeys) => pkg[key];
