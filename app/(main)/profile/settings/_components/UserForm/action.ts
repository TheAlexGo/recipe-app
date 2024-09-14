'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';

import { changeMetadata, uploadAvatar } from '@/actions/user';
import { createDataFromZodScheme } from '@/utils/form';

const SubmitHandlerSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  avatar: z.instanceof(File),
});

export const submitHandler = async (formData: FormData) => {
  const { firstname, lastname, avatar } = createDataFromZodScheme(
    formData,
    SubmitHandlerSchema,
  );

  const data: Record<string, string> = {
    firstname,
    lastname,
  };

  if (avatar.size) {
    data.avatarUrl = await uploadAvatar(avatar);
  }
  await changeMetadata(data);

  redirect('/profile');
};
