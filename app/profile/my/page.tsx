import { getMyRecipeAll } from '@/actions/recipe';
import { Button } from '@/components/Button/Button';
import { RecipeCard } from '@/components/RecipeCard';
import { Section } from '@/components/Section';
import { getLocal } from '@/utils/local';

import { MyHeader } from './_components/MyHeader/MyHeader';

export default async function My() {
  const myRecipes = await getMyRecipeAll();
  return (
    <div className="flex flex-1 flex-col pb-11">
      <MyHeader />
      <Button view="primary" href="/recipe/create">
        {getLocal('actions.createRecipe.button')}
      </Button>
      {Boolean(myRecipes.length) && (
        <Section className="mt-6">
          <Section.Stack>
            {myRecipes.map((recipe) => (
              <Section.Stack.Item key={recipe.id}>
                <RecipeCard {...recipe} favorite small showFavorite={false} />
              </Section.Stack.Item>
            ))}
          </Section.Stack>
        </Section>
      )}
    </div>
  );
}
