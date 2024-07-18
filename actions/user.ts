'use server';

import { captureMessage } from '@sentry/core';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

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

export const signIn = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect(`/login?message=${error.message}`);
  }

  return redirect('/');
};

export const signUp = async (formData: FormData) => {
  const origin = headers().get('origin');

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const firstname = formData.get('firstname') as string;
  const lastname = formData.get('lastname') as string;

  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        firstname,
        lastname,
      },
    },
  });

  if (error) {
    return redirect(`/registration?message=${error.message}`);
  }

  return redirect('/');
};

export const logOut = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect('/login');
};
