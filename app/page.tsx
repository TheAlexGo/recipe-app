import { getUser } from '@/actions/getUser';
import { Chip } from '@/components/Chip';
import { RecipeCard } from '@/components/RecipeCard';
import { Section } from '@/components/Section';

import { Header } from './_components/Header';

export default async function Home() {
  const user = await getUser();
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
          <Section.Scroll.Item>
            <RecipeCard
              id="1"
              cover="https://placehold.co/600x400.png"
              title="Healthy Taco Salad with fresh vegetable"
              kcal={120}
              cookingTime={1200}
            />
          </Section.Scroll.Item>
          <Section.Scroll.Item>
            <RecipeCard
              id="2"
              cover="https://placehold.co/168x128.png"
              title="Healthy Taco Salad with fresh vegetable 123"
              kcal={120}
              cookingTime={1200}
            />
          </Section.Scroll.Item>
        </Section.Scroll>
      </Section>
    </div>
  );
}
