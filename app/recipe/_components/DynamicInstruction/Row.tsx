import { FC, JSX, useCallback, useState } from 'react';

import { CiSquareMinus } from 'react-icons/ci';

import { Button } from '@/components/Button';
import { Draggable } from '@/components/Draggable';
import { Input } from '@/components/Input';
import { useLoadImage } from '@/hooks/useLoadImage';
import { IStepDB } from '@/types/db';
import { getLocal } from '@/utils/local';

export interface IRow extends IStepDB {
  onRemove?: (rowId: IRow['id']) => void;
}

export const Row: FC<IRow> = ({
  onRemove,
  id,
  text,
  image_url,
}): JSX.Element => {
  const imageSrc = useLoadImage('steps_images', image_url);
  const [image, setImage] = useState(imageSrc);

  const clickHandler = useCallback(() => {
    onRemove?.(id);
  }, [id, onRemove]);

  return (
    <Draggable.Item id={id} className="flex items-center gap-x-3">
      <Input
        name="step_old_images"
        className="hidden"
        defaultValue={image_url}
        readOnly
      />
      <Input.Image
        name="step_images"
        value={image}
        onChange={setImage}
        size="normal"
        required
      />
      <Input.TextArea
        className="bg-white"
        name="step_texts"
        placeholder={getLocal('input.placeholder.recipe.step')}
        defaultValue={text}
      />
      <Button.Icon
        className="shrink-0 text-brand-secondary"
        icon={CiSquareMinus}
        size="normal"
        onClick={clickHandler}
        aria-label={getLocal('actions.remove')}
        withPadding={false}
      />
    </Draggable.Item>
  );
};
