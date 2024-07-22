import { RefObject, useCallback, useEffect, useMemo, useState } from 'react';

import { getKeyboardFocusableElements } from '@/utils/dom';
import { Keys } from '@/utils/keyboard';

export const useFocusTrap = (element: HTMLElement | RefObject<HTMLElement>) => {
  const [activeElements, setActiveElements] = useState<HTMLElement[]>([]);

  const firstElement = useMemo<HTMLElement | undefined>(
    () => activeElements[0],
    [activeElements],
  );
  const lastElement = useMemo<HTMLElement | undefined>(
    () => activeElements[activeElements.length - 1],
    [activeElements],
  );

  /**
   * Навигация с помощью таба
   */
  const tabPressHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key !== Keys.TAB) {
        return;
      }

      const { activeElement } = document;

      /**
       * Используем нативную навигацию табом. Меняем поведение только на первом и последнем элементах
       */
      if (e.shiftKey) {
        if (activeElement === firstElement && lastElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else if (activeElement === lastElement && firstElement) {
        e.preventDefault();
        firstElement.focus();
      }
    },
    [firstElement, lastElement],
  );

  const keyDownHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === Keys.TAB) {
        tabPressHandler(e);
      }
    },
    [tabPressHandler],
  );

  /**
   * После выхода из модального окна - возвращаемся туда, откуда открыли окно
   */
  useEffect(() => {
    const prevElement = document.activeElement as HTMLElement;
    return () => prevElement.focus();
  }, []);

  /**
   * Устанавливаем активные элементы и слушатели
   */
  useEffect(() => {
    const el = 'current' in element ? element.current! : element;

    setActiveElements(getKeyboardFocusableElements(el));

    el.addEventListener('keydown', keyDownHandler);
    return () => {
      el.removeEventListener('keydown', keyDownHandler);
    };
  }, [element, keyDownHandler]);

  // Устанавливаем фокус на первый элемент
  useEffect(() => {
    firstElement?.focus();
  }, [firstElement]);
};
