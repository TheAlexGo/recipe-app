import { getUser } from '@/actions/getUser';
import { LogoutButton } from '@/app/profile/_components/LogoutButton/LogoutButton';
import { UserCard } from '@/components/UserCard/UserCard';
import { UserRole } from '@/types';

import { ProfileHeader } from './_components/ProfileHeader/ProfileHeader';

export default async function Profile() {
  const user = await getUser();

  return (
    <div className="flex flex-1 flex-col pb-11">
      <ProfileHeader />
      <div className="flex flex-1 flex-col justify-between">
        <UserCard
          className="relative z-10 mt-3"
          avatar={user.avatarUrl}
          firstname={user.firstname}
          lastname={user.lastname}
          userRole={UserRole.DEVELOPER}
        />
        <LogoutButton />
      </div>
    </div>
  );
}
