import { getUser } from '@/actions/getUser';
import { UserForm } from '@/app/profile/settings/_components/UserForm/UserForm';

import { SettingsHeader } from './_components/SettingsHeader/SettingsHeader';

export default async function Settings() {
  const user = await getUser();

  return (
    <div className="flex flex-1 flex-col pb-11">
      <SettingsHeader />
      <UserForm user={user} />
    </div>
  );
}
