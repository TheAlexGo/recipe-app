import Link from 'next/link';
import { IoSettingsOutline } from 'react-icons/io5';

import { getFavoriteRecipes } from '@/actions/favorite';
import { getUser } from '@/actions/user';
import { LogoutButton } from '@/app/profile/_components/LogoutButton/LogoutButton';
import { Header } from '@/components/Header';
import { RecipeCard } from '@/components/RecipeCard';
import { Section } from '@/components/Section';
import { UserCard } from '@/components/UserCard/UserCard';
import { UserRole } from '@/types';
import { getLocal } from '@/utils/local';

export default async function Profile() {
  const user = await getUser();
  const favoriteRecipes = await getFavoriteRecipes();

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
          {Boolean(favoriteRecipes.length) && (
            <Section className="mt-6">
              <Section.Header moreLink="/">
                {getLocal('sector.myFavorite.title')}
              </Section.Header>
              <Section.Stack>
                {favoriteRecipes.map((recipe) => (
                  <Section.Stack.Item key={recipe.id}>
                    <RecipeCard {...recipe} favorite small />
                  </Section.Stack.Item>
                ))}
              </Section.Stack>
            </Section>
          )}
        </div>
        <LogoutButton />
      </div>
    </div>
  );
}
