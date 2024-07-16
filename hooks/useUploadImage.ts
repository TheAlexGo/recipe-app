import { ChangeEventHandler, useCallback } from 'react';

import { compressFile, mutateInputFiles } from '@/utils/file';

interface IUseUploadImage {
  setImage: (image: string) => void;
}

export const useUploadImage = ({ setImage }: IUseUploadImage) => {
  const changeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
    async ({ target }) => {
      if (target.files?.length) {
        let file = target.files[0];
        if (file.size > 1_000_000) {
          file = await compressFile(target.files[0], {
            maxSizeMB: 1,
          });
        }
        setImage(URL.createObjectURL(file));
        mutateInputFiles(target, file);
      }
    },
    [setImage],
  );

  return {
    changeHandler,
  };
};
