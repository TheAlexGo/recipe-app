const FOCUSABLE_SELECTORS =
  'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';

/**
 * Упрощённая версия isFocusableElement. Мы уже знаем, что тег элемента соответствует тем,
 * на которые можно сфокусироваться
 * @param el
 */
export const isFocusableElementSimple = (el: HTMLElement): boolean =>
  !(el.getAttribute('disabled') === 'true') &&
  !(el.getAttribute('aria-hidden') === 'true') &&
  !(el.dataset.withoutFocus === 'true');

/**
 * Проверяет, что на элемент можно сфокусироваться
 * @param el
 */
export const isFocusableElement = (el: HTMLElement): boolean =>
  el.matches(FOCUSABLE_SELECTORS) && isFocusableElementSimple(el);

/**
 * Получает все фокусируемые элементы, внутри передаваемого элемента
 * @param {HTMLElement} element - передаваемый элемент
 * @returns {HTMLElement[]} - массив фокусируемых элементов
 */
export const getKeyboardFocusableElements = (
  element: HTMLElement,
): HTMLElement[] =>
  Array.from(element.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)).filter(
    isFocusableElement,
  );
