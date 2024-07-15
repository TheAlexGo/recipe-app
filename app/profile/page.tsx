import { getUser } from '@/actions/getUser';
import {
  addToFavorite,
  getFavoriteRecipes,
  removeFromFavorite,
} from '@/actions/impl/favorite';
import { LogoutButton } from '@/app/profile/_components/LogoutButton/LogoutButton';
import { RecipeCard } from '@/components/RecipeCard';
import { Section } from '@/components/Section';
import { UserCard } from '@/components/UserCard/UserCard';
import { UserRole } from '@/types';
import { getLocal } from '@/utils/local';

import { ProfileHeader } from './_components/ProfileHeader/ProfileHeader';

export default async function Profile() {
  const user = await getUser();
  const favoriteRecipes = await getFavoriteRecipes();

  return (
    <div className="flex flex-1 flex-col pb-11">
      <ProfileHeader />
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <UserCard
            className="relative z-10 mt-3"
            avatar={user.avatarUrl}
            firstname={user.firstname}
            lastname={user.lastname}
            userRole={UserRole.DEVELOPER}
          />
          {Boolean(favoriteRecipes.length) && (
            <Section className="mt-6">
              <Section.Header moreLink="/">
                {getLocal('sector.myFavorite.title')}
              </Section.Header>
              <Section.Stack>
                {favoriteRecipes.map((recipe) => (
                  <Section.Stack.Item key={recipe.id}>
                    <RecipeCard
                      {...recipe}
                      onAddFavorite={addToFavorite}
                      onRemoveFavorite={removeFromFavorite}
                      favorite
                      small
                    />
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
