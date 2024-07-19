import { Tables } from '@/types/supabase';

export interface IProductDB extends Tables<'product'> {}
export interface IFridgeDB extends Tables<'fridge'> {}
export interface IFavoritesDB extends Tables<'favorites'> {}
export interface IRecipeDB extends Tables<'recipes'> {}
export interface IIngredientDB extends Tables<'ingredients'> {}
export interface INutritionDB extends Tables<'nutritions'> {}

export interface IProductDBInFridge extends IProductDB {
  inFridge: {
    id: IFridgeDB['id'];
  }[];
}
