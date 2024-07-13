const pkg = {
  'ingredients.title': 'Ингредиенты',
  'ingredients.addAllToCart': 'Добавить всё в корзину',
  'ingredients.item': 'Предметов',
  'button.more': 'Показать больше',
  'button.less': 'Показать меньше',
  'tab.ingredients': 'Ингредиенты',
  'tab.instruction': ' Инструкция',
  'sector.popular.title': 'Популярные рецепты',
  'sector.category.title': 'Категории',
  'good.morning': 'Доброе утро',
  'good.day': 'Добрый день',
  'good.evening': 'Добрый вечер',
  'good.night': 'Доброй ночи',
};

export const getLocal = (key: keyof typeof pkg) => pkg[key];
