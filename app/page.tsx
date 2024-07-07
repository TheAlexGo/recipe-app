import { getUser } from '@/app/_actions/getUser';
import { Card } from '@/app/_components/Card';
import { Chip } from '@/app/_components/Chip';
import { Header } from '@/app/_components/Header';
import { Section } from '@/app/_components/Section';

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
            <Card
              id="1"
              cover="https://placehold.co/600x400.png"
              title="Healthy Taco Salad with fresh vegetable"
              kcal={120}
              cookingTime={1200}
            />
          </Section.Scroll.Item>
          <Section.Scroll.Item>
            <Card
              id="2"
              cover="https://placehold.co/168x128.png"
              title="Healthy Taco Salad with fresh vegetable"
              kcal={120}
              cookingTime={1200}
            />
          </Section.Scroll.Item>
        </Section.Scroll>
      </Section>
    </div>
  );
}
