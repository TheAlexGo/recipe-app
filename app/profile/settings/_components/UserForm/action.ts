'use server';

import { captureMessage } from '@sentry/core';
import { revalidatePath } from 'next/cache';

import { changeMetadata, uploadAvatar } from '@/actions/user';

export const submitHandler = async (formData: FormData) => {
  const firstname = formData.get('firstname') as string;
  const lastname = formData.get('lastname') as string;
  const avatar = formData.get('avatar') as File;

  const data: Record<string, string> = {
    firstname,
    lastname,
  };

  captureMessage(
    `Пользователь загружает аватарку... Данные: ${JSON.stringify(avatar)}`,
    'debug',
  );
  if (avatar.size) {
    const imageData = await uploadAvatar(avatar);
    data.avatarUrl = `${imageData?.path}?${Date.now()}`;
  }
  await changeMetadata(data);

  revalidatePath('/profile/settings');
};
