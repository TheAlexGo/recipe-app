import pkg from '@/locales/ru.json';

export const getLocal = (key: keyof typeof pkg) => pkg[key];
