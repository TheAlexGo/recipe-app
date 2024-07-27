'use client';

import { FC, JSX, memo, useMemo } from 'react';

import cn from 'classnames';
import Image from 'next/image';

import { IInput, Input } from '@/components/Input/Input';
import { Spinner } from '@/components/Spinner';
import { useUploadImage } from '@/hooks/useUploadImage';
import { IMAGE_PLACEHOLDER } from '@/utils/image';

interface IImageFile
  extends Omit<IInput, 'value' | 'onChange' | 'alt' | 'size'> {
  value: string;
  onChange: (image: string) => void;
  size?: 'big' | 'normal';
  alt?: string;
  prevValue?: string;
  onLoading?: () => void;
  onLoaded?: () => void;
}

export const ImageFile: FC<IImageFile> = memo(
  ({
    id,
    name,
    value,
    prevValue,
    onChange,
    size,
    alt = '',
    onLoading,
    onLoaded,
  }): JSX.Element => {
    const { changeHandler, loading, error } = useUploadImage({
      setImage: onChange,
      onLoading,
      onLoaded,
    });

    const isBig = size === 'big';
    const isNormal = size === 'normal';

    const imageSize = useMemo(() => {
      switch (size) {
        case 'normal':
          return 64;
        case 'big':
          return 128;
        default:
          return 128;
      }
    }, [size]);

    return (
      <div
        className={cn('relative shrink-0', {
          'size-16': isNormal,
          'size-32': isBig,
        })}
      >
        <div className="relative">
          <Image
            className={cn('rounded-2xl object-cover', {
              'size-16': isNormal,
              'size-32': isBig,
              'opacity-50': loading,
            })}
            src={value}
            width={imageSize}
            height={imageSize}
            priority
            alt={alt}
            aria-hidden={!alt}
          />
          {loading && <Spinner size="normal" position="absolute" />}
        </div>
        <Input
          id={id}
          className="absolute inset-0 opacity-0"
          type="file"
          name={name}
          accept="image/*"
          onChange={changeHandler}
          required={prevValue === IMAGE_PLACEHOLDER}
          disabled={loading}
        />
        {error && <span className="text-brand-danger">{error}</span>}
      </div>
    );
  },
);

ImageFile.displayName = 'Input.Image';
