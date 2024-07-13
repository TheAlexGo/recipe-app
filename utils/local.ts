const pkg = {
  'ingredients.title': 'Ингредиенты',
  'ingredients.addAllToCart': 'Добавить всё в корзину',
  'ingredients.item': 'Предметов',
};

export const getLocal = (key: keyof typeof pkg) => pkg[key];
