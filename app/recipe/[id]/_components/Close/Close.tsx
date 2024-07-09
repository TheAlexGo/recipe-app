'use client';

import { FC, JSX } from 'react';

import { useRouter } from 'next/navigation';
import { IoClose } from 'react-icons/io5';

interface IClose {}

export const Close: FC<IClose> = (): JSX.Element => {
  const router = useRouter();

  const clickHandler = () => {
    router.back();
  };

  return (
    <button
      type="button"
      className="absolute left-6 top-3 rounded-xl bg-white p-2"
      aria-label="Закрыть"
      onClick={clickHandler}
    >
      <IoClose className="size-6" />
    </button>
  );
};
