import { FC, JSX } from 'react';

import { submitHandler } from '@/app/_components/action';
import { Button } from '@/components/Button';

interface ICreateRecipe {}

export const CreateRecipe: FC<ICreateRecipe> = (): JSX.Element => {
  return (
    <form action={submitHandler}>
      <input type="file" accept="image/*" name="cover" />
      <Button view="primary">Создать рецепт</Button>
    </form>
  );
};
