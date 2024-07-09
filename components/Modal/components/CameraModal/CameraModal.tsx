'use client';

import { FC, JSX, useCallback, useEffect, useState } from 'react';

import { addProduct } from '@/actions/fridge';
import {
  getProductByBarcode,
  getProductByBarcodeDB,
  IProduct,
} from '@/actions/getProductByBarcode';
import { createProduct, uploadProductImage } from '@/actions/product';
import { Chip } from '@/app/fridge/_components/Chip/Chip';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal/Modal';
import { useBarcodeDetector } from '@/hooks/useBarcodeDetector';
import { useCameraModal } from '@/hooks/useCameraModal';
import { useFridge } from '@/hooks/useFridge';

const TAKE_PHOTO_DELAY = 500;

interface ICameraModal {}

export const CameraModal: FC<ICameraModal> = (): JSX.Element => {
  const { isOpen, onClose } = useCameraModal();
  const { addItem } = useFridge();
  const [foundedItem, setFoundedItem] = useState<IProduct | null>(null);

  const collectHandler = useCallback(async (barcode: string) => {
    let product = await getProductByBarcodeDB(barcode);
    if (!product) {
      product = await getProductByBarcode(barcode);

      if (!product) {
        // eslint-disable-next-line no-alert
        alert('Товар с таким barcode не нашли');
        throw new Error('Товар с таким barcode не нашли');
      }

      const imageData = await uploadProductImage(
        `image-${product.code}`,
        product.imageUrl,
      );
      if (!imageData) {
        throw new Error('При загрузке изображения произошла ошибка');
      }

      product = (await createProduct({
        title: product.title,
        code: product.code,
        brand: product.brand,
        imageUrl: imageData.path,
        barcode,
      })) as IProduct;
    }

    setFoundedItem(product);
  }, []);

  const { videoRef, start, stop } = useBarcodeDetector({
    delay: TAKE_PHOTO_DELAY,
    onCollect: collectHandler,
  });

  const addHandler = () => {
    addItem(foundedItem!);
    addProduct(foundedItem!.id);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      start();
    }
  }, [isOpen, start]);

  useEffect(() => {
    if (!isOpen) {
      stop();
    }
    return () => {
      stop();
      setFoundedItem(null);
    };
  }, [isOpen, stop]);

  return (
    <Modal isOpen={isOpen}>
      <Button.Close className="z-10" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video width="100%" height="100%" autoPlay playsInline ref={videoRef} />
      </div>
      {foundedItem && (
        <div className="fixed inset-x-6 bottom-3 z-10">
          <Chip {...foundedItem} lines={0} />
          <button
            type="button"
            className="mt-3 w-full rounded-lg bg-white p-4"
            onClick={addHandler}
          >
            Добавить
          </button>
        </div>
      )}
    </Modal>
  );
};
