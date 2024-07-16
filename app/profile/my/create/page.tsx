import { redirect } from 'next/navigation';

import { getRecipe } from '@/actions/impl/recipe';

import { MyCreateHeader } from './_components/MyCreateHeader/MyCreateHeader';
import { RecipeForm } from './_components/RecipeForm/RecipeForm';

export default async function MyRecipeCreate({
  searchParams: { recipeId },
}: {
  searchParams: { recipeId: string };
}) {
  let recipe;
  if (recipeId) {
    recipe = await getRecipe(Number(recipeId));

    if (!recipe) {
      redirect('/profile/my/create');
    }
  }

  return (
    <div className="pb-11">
      <MyCreateHeader recipeEdit={Boolean(recipe)} />
      <RecipeForm recipe={recipe} />
    </div>
  );
}
