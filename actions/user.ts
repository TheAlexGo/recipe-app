'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { createDataFromZodScheme } from '@/utils/form';
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

  const oldAvatar = user.avatarUrl;
  if (oldAvatar) {
    await supabase.storage.from('user_avatars').remove([`${user.id}-avatar`]);
  }

  const { data, error } = await supabase.storage
    .from('user_avatars')
    .upload(`${user.id}-avatar`, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw new Error(`uploadAvatar: ${error.message}`);
  }

  return data?.path;
};

const SignInSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const signIn = async (formData: FormData) => {
  const { email, password } = createDataFromZodScheme(formData, SignInSchema);
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    const code = error.message
      .split(' ')
      .map((word) => word.toLowerCase())
      .join('_');
    return redirect(`/login?message=${code}`);
  }

  return redirect('/');
};

const SignUpSchema = z
  .object({
    firstname: z.string(),
    lastname: z.string(),
  })
  .merge(SignInSchema);

export const signUp = async (formData: FormData) => {
  const origin = headers().get('origin');

  const { email, password, firstname, lastname } = createDataFromZodScheme(
    formData,
    SignUpSchema,
  );

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
    return redirect(`/registration?message=${error.code}`);
  }

  return redirect('/');
};

export const logOut = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect('/login');
};
