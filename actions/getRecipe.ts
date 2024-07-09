import { IconType } from 'react-icons';
import { MdOutlineGrass } from 'react-icons/md';
import { PiAvocado, PiPizza } from 'react-icons/pi';
import { TbCampfire } from 'react-icons/tb';

export enum Units {
  KCAL = 'Kcal',
  GRAM = 'g',
}

export enum NutritionTypes {
  CARBS = 'carbs',
  PROTEINS = 'proteins',
  KCAL = 'kcal',
  FATS = 'fats',
}

export interface INutrition {
  type: NutritionTypes;
  unit: Units;
  value: number;
  icon: IconType;
}

export interface IRecipe {
  id: string;
  cover: string;
  title: string;
  lessTitle: string;
  description: string;
  kcal: number;
  cookingTime: number;
  nutritions: INutrition[];
}

export const getRecipe = async (id: string): Promise<IRecipe> => ({
  id,
  cover: 'https://placehold.co/168x128.png',
  title: 'Healthy Taco Salad with fresh vegetable',
  lessTitle: 'Healthy Taco Salad',
  description:
    'This Healthy Taco Salad is the universal delight of taco night. This Healthy Taco Salad is the universal delight of taco night.',
  kcal: 120,
  cookingTime: 1200,
  nutritions: [
    {
      type: NutritionTypes.CARBS,
      unit: Units.GRAM,
      value: 65,
      icon: MdOutlineGrass,
    },
    {
      type: NutritionTypes.PROTEINS,
      unit: Units.GRAM,
      value: 27,
      icon: PiAvocado,
    },
    {
      type: NutritionTypes.KCAL,
      unit: Units.KCAL,
      value: 120,
      icon: TbCampfire,
    },
    {
      type: NutritionTypes.FATS,
      unit: Units.GRAM,
      value: 91,
      icon: PiPizza,
    },
  ],
});
