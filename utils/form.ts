import { z } from 'zod';

// Определяем тип для объекта, соответствующего схеме Zod
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SchemaObject<T extends z.ZodType<any, any>> = z.infer<T>;

type FormDataValue = string | boolean | number;

/**
 * Создает объект данных из формы на основе схемы Zod.
 * @template T - Тип схемы Zod.
 * @param {FormData} formData - Данные формы.
 * @param {T} errorScheme - Схема Zod для проверки ошибок.
 * @returns {SchemaObject<T>} - Объект данных, соответствующий схеме Zod.  */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createDataFromZodScheme = <T extends z.ZodType<any, any>>(
  formData: FormData,
  errorScheme: T,
): SchemaObject<T> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const schemaKeys = Object.keys((errorScheme as any).shape);
  const formDataObject: Record<string, FormDataValue> = {};
  schemaKeys.forEach((key) => {
    const value = formData.get(key);
    if (value !== null) {
      formDataObject[key] = value as FormDataValue;
    }
  });
  return formDataObject as SchemaObject<T>;
};
