import { Suspense } from 'react';

import Link from 'next/link';
import { IoSettingsOutline } from 'react-icons/io5';

import { getFavoriteRecipes } from '@/actions/favorite';
import { IRecipeDB } from '@/actions/models/Recipe';
import { getUser } from '@/actions/user';
import { LogoutButton } from '@/app/(main)/profile/_components/LogoutButton/LogoutButton';
import { Header } from '@/components/Header';
import { RecipeCard } from '@/components/RecipeCard';
import { Section } from '@/components/Section';
import { Spinner } from '@/components/Spinner';
import { UserCard } from '@/components/UserCard/UserCard';
import { UserRole } from '@/types';
import { getLocal } from '@/utils/local';

const FavoriteRecipeStack = async () => {
  const favoriteRecipes: IRecipeDB[] = await getFavoriteRecipes();
  return (
    <Section.Stack>
      {favoriteRecipes.map((recipe) => (
        <Section.Stack.Item key={recipe.id}>
          <RecipeCard {...recipe} favorite small />
        </Section.Stack.Item>
      ))}
    </Section.Stack>
  );
};

export default async function Profile() {
  const user = await getUser();

  return (
    <div className="flex flex-1 flex-col">
      <Header>
        <Header.Empty />
        <Header.Title>{getLocal('page.profile.title')}</Header.Title>
        <Header.Icon
          icon={IoSettingsOutline}
          label={getLocal('page.profile.action.settings.label')}
          href="settings"
        />
      </Header>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <Link href="my">
            <UserCard
              className="mt-3"
              avatar={user.avatarUrl}
              firstname={user.firstname}
              lastname={user.lastname}
              userRole={UserRole.DEVELOPER}
            />
          </Link>
          <LogoutButton className="mt-3" />
          <Section className="mt-6">
            <Section.Header moreLink="/">
              {getLocal('sector.myFavorite.title')}
            </Section.Header>
            <Suspense fallback={<Spinner size="normal" position="static" />}>
              <FavoriteRecipeStack />
            </Suspense>
          </Section>
        </div>
      </div>
    </div>
  );
}
