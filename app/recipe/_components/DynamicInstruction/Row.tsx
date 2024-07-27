import { FC, JSX, useCallback, useState } from 'react';

import { CiSquareMinus } from 'react-icons/ci';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { IRowDB } from '@/types/db';
import { IMAGE_PLACEHOLDER } from '@/utils/image';
import { getLocal } from '@/utils/local';

interface IRow extends IRowDB {
  onRemove?: (rowId: string) => void;
}

export const Row: FC<IRow> = ({ id, onRemove }): JSX.Element => {
  const [image, setImage] = useState(IMAGE_PLACEHOLDER);

  const clickHandler = useCallback(() => {
    onRemove?.(id);
  }, [id, onRemove]);

  return (
    <li className="flex gap-x-3">
      <Input.Image
        name="step_image"
        value={image}
        onChange={setImage}
        size="normal"
      />
      <Input.TextArea
        name="step_text"
        placeholder={getLocal('input.placeholder.recipe.step')}
      />
      <Button.Icon
        className="shrink-0 text-brand-secondary"
        icon={CiSquareMinus}
        size="normal"
        onClick={clickHandler}
        aria-label={getLocal('actions.remove')}
        withPadding={false}
      />
    </li>
  );
};
