import { getUser } from '@/actions/getUser';
import { getFavoriteRecipesAsObject } from '@/actions/impl/favorite';
import { getRecipeAll } from '@/actions/impl/recipe';
import { Chip } from '@/components/Chip';
import { RecipeCard } from '@/components/RecipeCard';
import { Section } from '@/components/Section';
import { getLocal } from '@/utils/local';

import { Header } from './_components/Header';

export default async function Home() {
  const user = await getUser();
  const recipes = await getRecipeAll();
  const favorites = await getFavoriteRecipesAsObject();
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
          {recipes.map((recipe) => (
            <Section.Scroll.Item key={recipe.id}>
              <RecipeCard
                {...recipe}
                favorite={favorites[recipe.id] !== undefined}
              />
            </Section.Scroll.Item>
          ))}
        </Section.Scroll>
      </Section>
    </div>
  );
}
