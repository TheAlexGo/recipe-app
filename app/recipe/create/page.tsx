import { RecipeForm } from '@/app/recipe/_components/RecipeForm/RecipeForm';
import { RecipeFormHeader } from '@/app/recipe/_components/RecipeFormHeader/RecipeFormHeader';

export default async function RecipeCreate() {
  return (
    <div>
      <RecipeFormHeader />
      <RecipeForm />
    </div>
  );
}
