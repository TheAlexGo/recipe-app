'use server';

import { captureMessage } from '@sentry/core';

import { getUser, IUser } from '@/actions/getUser';
import { createClient } from '@/utils/supabase/server';

export const changeMetadata = async (newData: Partial<Omit<IUser, 'id'>>) => {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.updateUser({ data: newData });
  if (error) {
    throw new Error(`changeMetadata: ${error.message}`);
  }

  return user;
};

export const uploadAvatar = async (file: File) => {
  const supabase = createClient();
  const user = await getUser();
  captureMessage(
    `Пользователь (userId: ${user.id}) загружает аватарку... Данные: name: ${file.name}, size: ${file.size}`,
    'debug',
  );
  const { data, error } = await supabase.storage
    .from('user_avatars')
    .upload(`${user.id}-avatar`, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) {
    throw new Error(`uploadAvatar: ${error.message}`);
  }

  return data;
};
