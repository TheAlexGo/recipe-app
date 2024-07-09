'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

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
