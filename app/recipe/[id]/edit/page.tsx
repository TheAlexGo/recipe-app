import { redirect } from 'next/navigation';

import { getRecipe } from '@/actions/recipe';
import { getUser } from '@/actions/user';
import { RecipeForm } from '@/app/recipe/_components/RecipeForm/RecipeForm';
import { RecipeFormHeader } from '@/app/recipe/_components/RecipeFormHeader/RecipeFormHeader';

export default async function RecipeEdit({
  params: { id },
}: {
  params: { id: string };
}) {
  const recipe = await getRecipe(Number(id));
  const user = await getUser();

  if (!recipe || recipe.user_id !== user.id) {
    redirect('/recipe/create');
  }

  return (
    <div>
      <RecipeFormHeader recipeEdit />
      <RecipeForm recipe={recipe} />
    </div>
  );
}
