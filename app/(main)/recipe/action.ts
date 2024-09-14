'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';

import { updateIngredients } from '@/actions/ingredients';
import { updateSteps, uploadImageStep } from '@/actions/instructions';
import { IRecipeDB } from '@/actions/models/Recipe';
import {
  createRecipe,
  updateCover,
  updateRecipe,
  uploadRecipeCover,
} from '@/actions/recipe';
import { IIngredientDB, IStepDB } from '@/types/db';
import { createDataFromZodScheme } from '@/utils/form';

const BaseFormData = z.object({
  title: z.string(),
  less_title: z.string(),
  description: z.string(),
  kcal: z.number(),
  cooking_time: z.number(),
  cover: z.instanceof(File),
  ingredient_ids: z.array(z.number()),
  ingredient_counts: z.array(z.number()),
  step_texts: z.array(z.string()),
  step_old_images: z.array(z.string()),
  step_images: z.array(z.instanceof(File)),
});

const prepareData = async (formData: FormData) => {
  const {
    title,
    less_title,
    description,
    kcal,
    cooking_time,
    cover,
    ingredient_ids,
    ingredient_counts,
    step_texts,
    step_old_images,
    step_images,
  } = createDataFromZodScheme(formData, BaseFormData);

  const result = {
    title,
    less_title,
    description,
    kcal,
    cooking_time,
    ingredients: ingredient_ids.map((id, index) => ({
      product_id: id,
      count: ingredient_counts[index],
    })),
    steps: step_texts.map((text, index) => ({
      text,
      order: index,
      image: step_images[index].size ? step_images[index] : null,
      oldImage: step_old_images[index],
    })),
    cover: null,
  } as Omit<IRecipeDB, 'id' | 'user_id'> & {
    ingredients: IIngredientDB[];
    steps: (Omit<IStepDB, 'id' | 'created_at' | 'recipe_id' | 'image_url'> & {
      image: File | null;
      oldImage: string;
    })[];
    cover: File | null;
  };

  if (cover.size) {
    Object.assign(result, {
      cover,
    });
  }

  return result;
};

export const create = async (formData: FormData) => {
  const { ingredients, cover, ...data } = await prepareData(formData);

  if (cover) {
    Object.assign(data, {
      cover_url: await uploadRecipeCover(cover),
    });
  }

  const { id } = await createRecipe(data);
  await updateIngredients(id, ingredients);

  redirect(`/recipe/${id}`);
};

export const update = async (formData: FormData) => {
  const idRaw = formData.get('recipeId');
  if (idRaw) {
    const id = Number(idRaw);

    const { ingredients, cover, steps, ...data } = await prepareData(formData);

    if (cover) {
      Object.assign(data, {
        cover_url: await updateCover(id, cover),
      });
    }

    const stepsData = await Promise.all(
      steps.map(async ({ image, oldImage, ...data }) => ({
        ...data,
        image_url: image?.size ? await uploadImageStep(image!) : oldImage,
      })),
    );
    await Promise.all([
      updateRecipe(id, data),
      updateIngredients(id, ingredients),
      updateSteps(id, stepsData),
    ]);

    redirect(`/recipe/${idRaw}`);
  }
};
