'use server';

import { createClient } from '@/utils/supabase/server';

export interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  avatarUrl: string;
  get fullname(): string;
}

/**
 * Получаем текущего пользователя
 */
export const getUser = async (): Promise<IUser> => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userData = user!;
  const userMetaData = userData.user_metadata;

  return {
    id: userData.id,
    firstname: userMetaData.firstname,
    lastname: userMetaData.lastname,
    avatarUrl: userMetaData.avatarUrl,
    get fullname() {
      return `${this.firstname} ${this.lastname}`;
    },
  } as IUser;
};
