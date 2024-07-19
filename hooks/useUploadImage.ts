import { ChangeEventHandler, useCallback, useState } from 'react';

import { useIsMounted } from '@/hooks/useIsMounted';
import { compressFile, mutateInputFiles } from '@/utils/file';

interface IUseUploadImage {
  setImage: (image: string) => void;
}

export const useUploadImage = ({ setImage }: IUseUploadImage) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isMounted = useIsMounted();

  const changeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
    async ({ target }) => {
      if (target.files?.length) {
        let file = target.files[0];

        setLoading(true);
        try {
          file = await compressFile(file);
          if (!isMounted()) {
            return;
          }

          mutateInputFiles(target, file);
        } catch (e) {
          setError((e as Error).message);
        }
        setLoading(false);

        setImage(URL.createObjectURL(file));
      }
    },
    [isMounted, setImage],
  );

  return {
    loading,
    error,
    changeHandler,
  };
};
