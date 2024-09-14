import { FaArrowLeft } from 'react-icons/fa6';

import { getUser } from '@/actions/user';
import { UserForm } from '@/app/(main)/profile/settings/_components/UserForm/UserForm';
import { Header } from '@/components/Header';
import { getLocal } from '@/utils/local';

export default async function Settings() {
  const user = await getUser();

  return (
    <div className="flex flex-1 flex-col">
      <Header>
        <Header.Icon
          href="/profile"
          icon={FaArrowLeft}
          label={getLocal('action.backProfile.label')}
        />
        <Header.Title>{getLocal('page.settings.title')}</Header.Title>
        <Header.Empty />
      </Header>
      <UserForm user={user} />
    </div>
  );
}
