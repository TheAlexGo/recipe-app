import {
  FC,
  FormEventHandler,
  JSX,
  MouseEventHandler,
  useCallback,
} from 'react';

import Image from 'next/image';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import { useAddIngredientModal } from '@/hooks/useAddIngredientModal';
import { useLoadImage } from '@/hooks/useLoadImage';
import { getLocal } from '@/utils/local';

interface IAddIngredient {}

export const AddIngredientModal: FC<
  IAddIngredient
> = (): JSX.Element | null => {
  const { isOpen, product, onClose, onSelect } = useAddIngredientModal();

  const image_url = useLoadImage('product_images', product?.image_url);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.stopPropagation();
      onClose();
    },
    [onClose],
  );

  const submitHandler: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const count = Number(formData.get('count'));
      onSelect({ product: product!, count });
    },
    [onSelect, product],
  );

  if (!product) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Button.Close
        size="normal"
        className="absolute left-6 top-3 z-10"
        onClickCapture={clickHandler}
      />
      <Modal.Content className="m-6 rounded-xl bg-white p-6">
        <Image
          className="size-64 object-contain"
          src={image_url}
          width={256}
          height={256}
          alt={getLocal('image.cover')}
        />
        <h1 className="mt-3 text-xl font-bold">{product.title}</h1>
        <form className="mt-3 flex flex-col gap-y-3" onSubmit={submitHandler}>
          <label htmlFor="count">
            <span>{getLocal('input.label.inputCount')}</span>
            <Input type="number" name="count" />
          </label>
          <Button.Submit>{getLocal('form.create')}</Button.Submit>
        </form>
      </Modal.Content>
    </Modal>
  );
};
