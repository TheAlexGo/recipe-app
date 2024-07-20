/**
 * Получаем все ключи из объединения
 */
export type KeysOfUnion<T> = T extends T ? keyof T : never;

/**
 * Omit от объединения
 */
export type OmitOfUnion<T, K extends KeysOfUnion<T>> = T extends T
  ? Omit<T, K>
  : never;
