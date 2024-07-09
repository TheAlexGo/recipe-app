import { getUser } from '@/actions/getUser';

import { LogoutButton } from './_components/LogoutButton/LogoutButton';

export default async function Profile() {
  const user = await getUser();

  return (
    <div>
      <h1>{user.fullname}</h1>
      <LogoutButton />
    </div>
  );
}
