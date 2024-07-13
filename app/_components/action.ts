'use server';

import { createRecipe, uploadRecipeCover } from '@/actions/impl/recipe';

export const submitHandler = async (formData: FormData) => {
  const cover = formData.get('cover') as File;
  const path = await uploadRecipeCover(cover);
  await createRecipe({
    title: 'Healthy Taco Salad with fresh vegetable',
    less_title: 'Healthy Taco Salad',
    description:
      'This Healthy Taco Salad is the universal delight of taco night. This Healthy Taco Salad is the universal delight of taco night.',
    kcal: 120,
    cooking_time: 1200,
    cover_url: path,
  });
};
