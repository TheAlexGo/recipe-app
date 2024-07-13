import { getUser } from '@/actions/getUser';
import { getRecipeAll } from '@/actions/impl/recipe';
import { Chip } from '@/components/Chip';
import { RecipeCard } from '@/components/RecipeCard';
import { Section } from '@/components/Section';

import { Header } from './_components/Header';

export default async function Home() {
  const user = await getUser();
  const recipes = await getRecipeAll();
  return (
    <div className="flex flex-col gap-y-6">
      <Header user={user} />
      <Section>
        <Section.Header moreLink="/">Category</Section.Header>
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
        <Section.Header moreLink="/">Popular Recipes</Section.Header>
        <Section.Scroll>
          {recipes.map((recipe) => (
            <Section.Scroll.Item key={recipe.id}>
              <RecipeCard {...recipe} />
            </Section.Scroll.Item>
          ))}
        </Section.Scroll>
      </Section>
    </div>
  );
}
