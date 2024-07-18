import { ChangeEventHandler, useCallback, useState } from 'react';

import { useIsMounted } from '@/hooks/useIsMounted';
import { compressFile, mutateInputFiles } from '@/utils/file';

interface IUseUploadImage {
  setImage: (image: string) => void;
}

export const useUploadImage = ({ setImage }: IUseUploadImage) => {
  const [loading, setLoading] = useState(false);

  const isMounted = useIsMounted();

  const changeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target }) => {
      if (target.files?.length) {
        const file = target.files[0];
        if (file.size > 1_000_000) {
          setLoading(true);
          compressFile(target.files[0], {
            maxSizeMB: 1,
          })
            .then((file) => {
              if (!isMounted()) {
                return;
              }
              setImage(URL.createObjectURL(file));
              mutateInputFiles(target, file);
            })
            .finally(() => {
              if (!isMounted()) {
                return;
              }
              setLoading(false);
            });
        }
      }
    },
    [isMounted, setImage],
  );

  return {
    loading,
    changeHandler,
  };
};
