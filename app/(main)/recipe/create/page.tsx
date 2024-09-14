import { RecipeForm } from '@/app/(main)/recipe/_components/RecipeForm/RecipeForm';
import { RecipeFormHeader } from '@/app/(main)/recipe/_components/RecipeFormHeader/RecipeFormHeader';

export default async function RecipeCreate() {
  return (
    <div>
      <RecipeFormHeader />
      <RecipeForm />
    </div>
  );
}
