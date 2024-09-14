import { Suspense } from 'react';

import { getFavoriteRecipesAsObject } from '@/actions/favorite';
import { getRecipeAll } from '@/actions/recipe';
import { getUser } from '@/actions/user';
import { Header } from '@/app/_components/Header';
import { Chip } from '@/components/Chip';
import { RecipeCard } from '@/components/RecipeCard';
import { Section } from '@/components/Section';
import { Spinner } from '@/components/Spinner';
import { getLocal } from '@/utils/local';

const RecipeSectionScrollItems = async () => {
  const recipes = await getRecipeAll();
  const favorites = await getFavoriteRecipesAsObject();

  return recipes.map((recipe) => (
    <Section.Scroll.Item key={recipe.id}>
      <RecipeCard
        {...recipe}
        favorite={favorites[recipe.id] !== undefined}
        fixedWidth
      />
    </Section.Scroll.Item>
  ));
};

export default async function Home() {
  const user = await getUser();
  return (
    <div className="flex flex-col gap-y-6">
      <Header user={user} />
      <Section>
        <Section.Header moreLink="/">
          {getLocal('sector.category.title')}
        </Section.Header>
        <Section.Scroll>
          <Section.Scroll.Item>
            <Chip active>Breakfast</Chip>
          </Section.Scroll.Item>
          <Section.Scroll.Item>
            <Chip>Lunch</Chip>
          </Section.Scroll.Item>
          <Section.Scroll.Item>
            <Chip>Dinner</Chip>
          </Section.Scroll.Item>
          <Section.Scroll.Item>
            <Chip>Snack</Chip>
          </Section.Scroll.Item>
        </Section.Scroll>
      </Section>
      <Section>
        <Section.Header moreLink="/">
          {getLocal('sector.popular.title')}
        </Section.Header>
        <Section.Scroll>
          <Suspense fallback={<Spinner size="normal" position="static" />}>
            <RecipeSectionScrollItems />
          </Suspense>
        </Section.Scroll>
      </Section>
    </div>
  );
}
