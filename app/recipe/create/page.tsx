import { MyCreateHeader } from '@/app/recipe/_components/MyCreateHeader/MyCreateHeader';
import { RecipeForm } from '@/app/recipe/_components/RecipeForm/RecipeForm';

export default async function RecipeCreate() {
  return (
    <div className="pb-11">
      <MyCreateHeader />
      <RecipeForm />
    </div>
  );
}
