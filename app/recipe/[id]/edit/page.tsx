import { redirect } from 'next/navigation';

import { getRecipe } from '@/actions/recipe';
import { getUser } from '@/actions/user';
import { MyCreateHeader } from '@/app/recipe/_components/MyCreateHeader/MyCreateHeader';
import { RecipeForm } from '@/app/recipe/_components/RecipeForm/RecipeForm';

export default async function RecipeEdit({
  params: { id },
}: {
  params: { id: string };
}) {
  const recipe = await getRecipe(Number(id));
  const user = await getUser();

  if (!recipe || !user || recipe.user_id !== user.id) {
    redirect('/recipe/create');
  }

  return (
    <div>
      <MyCreateHeader recipeEdit />
      <RecipeForm recipe={recipe} />
    </div>
  );
}
