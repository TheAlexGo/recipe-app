'use client';

import { FC, JSX, useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { addProductInFridge } from '@/actions/fridge';
import { getProductByBarcode } from '@/actions/product';
import { Chip } from '@/app/fridge/_components/Chip/Chip';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal/Modal';
import { ProductChipStub } from '@/components/ProductChip/ProductChipStub';
import { CollectHandler, useBarcodeDetector } from '@/hooks/useBarcodeDetector';
import { useCameraModal } from '@/hooks/useCameraModal';
import { IProductDB } from '@/types/db';

const TAKE_PHOTO_DELAY = 500;

interface ICameraModal {}

export const CameraModal: FC<ICameraModal> = (): JSX.Element => {
  const [foundedItem, setFoundedItem] = useState<IProductDB | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const { isOpen, onClose } = useCameraModal();
  const router = useRouter();

  const collectHandler = useCallback(
    async ({ barcode, continueCollect }: CollectHandler) => {
      setLoading(true);

      const product = await getProductByBarcode(barcode);
      if (product) {
        setFoundedItem(product);
      } else {
        // eslint-disable-next-line no-alert
        alert(`Товар с таким barcode (${barcode}) не нашли!`);
        continueCollect();
      }

      setLoading(false);
    },
    [],
  );

  const { videoRef, start, stop } = useBarcodeDetector({
    delay: TAKE_PHOTO_DELAY,
    onCollect: collectHandler,
  });

  const addHandler = () => {
    setDisabled(true);
    addProductInFridge(foundedItem!.id).then(() => {
      setDisabled(false);
      onClose();
      router.refresh();
    });
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
      <Button.Close
        size="normal"
        className="absolute left-6 top-3 z-10"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video width="100%" height="100%" autoPlay playsInline ref={videoRef} />
      </div>
      {(foundedItem || loading) && (
        <div className="fixed inset-x-6 bottom-3 z-10">
          {loading && <ProductChipStub />}
          {foundedItem && <Chip {...foundedItem} inFridge={[]} withoutClamp />}
          {foundedItem && (
            <Button className="mt-3" onClick={addHandler} disabled={disabled}>
              Добавить
            </Button>
          )}
        </div>
      )}
    </Modal>
  );
};
