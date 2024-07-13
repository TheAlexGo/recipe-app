import { FC, JSX } from 'react';

interface IProductChipStub {}

export const ProductChipStub: FC<IProductChipStub> = (): JSX.Element => {
  return (
    <div className="rounded-xl bg-white p-4">
      <div className="h-12 animate-pulse rounded-lg bg-neutral-gray-4" />
    </div>
  );
};
