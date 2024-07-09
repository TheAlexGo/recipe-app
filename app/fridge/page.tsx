'use client';

import 'barcode-detector/side-effects';
import { useCallback, useEffect, useRef, useState } from 'react';

import { BarcodeDetector } from 'barcode-detector';
import { IoQrCodeOutline } from 'react-icons/io5';

import { getProductByBarcode, IProduct } from '@/actions/getProductByBarcode';
import { Header } from '@/components/Header';
import { ProductChip } from '@/components/ProductChip/ProductChip';

const TAKE_PHOTO_DELAY = 500;

const wait = (delay: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, delay);
  });

export default function Fridge() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [items, setItems] = useState<IProduct[]>([]);
  const [timeoutId, setTimeoutId] = useState(-1);
  const [barcodeDetector, setBarcodeDetector] =
    useState<BarcodeDetector | null>(null);

  const clearStream = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  }, [stream]);

  const addProductHandler = useCallback(async () => {
    if (stream) {
      clearStream();
      return;
    }
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: 'environment',
        },
        audio: false,
      })
      .then(setStream);
  }, [clearStream, stream]);

  const checkVideoState = useCallback(async () => {
    const video = videoRef.current!;
    if (video.readyState === 4) {
      return true;
    }
    await wait(TAKE_PHOTO_DELAY);
    return checkVideoState();
  }, []);

  const takePhoto = useCallback(() => {
    if (!stream) {
      return;
    }
    const video = videoRef.current!;

    barcodeDetector!
      .detect(video)
      .then((barcodes) => {
        if (!barcodes.length) {
          throw new Error('Barcode не распознан!');
        }
        return getProductByBarcode(barcodes[0].rawValue);
      })
      .then((product) => {
        if (!product) {
          clearStream();
          // eslint-disable-next-line no-alert
          alert('Товар с таким barcode не нашли');
          throw new Error('Товар с таким barcode не нашли');
        }
        setItems((prevItems) => {
          const newItems = [...prevItems];
          const existedProduct = prevItems.find(
            (item) => item.code === product.code,
          );
          if (existedProduct) {
            return newItems.map((item) => {
              if (item.code === product.code) {
                return {
                  ...item,
                  count: item.count + 1,
                };
              }
              return item;
            });
          }
          newItems.push({
            ...product,
            count: 1,
          });
          return newItems;
        });
        clearStream();
      })
      .catch(() => {
        setTimeoutId(window.setTimeout(takePhoto, TAKE_PHOTO_DELAY));
      });
  }, [barcodeDetector, clearStream, stream]);

  useEffect(() => {
    setBarcodeDetector(
      new window.BarcodeDetector({
        formats: ['code_39', 'codabar', 'ean_13'],
      }),
    );
  }, []);

  useEffect(() => {
    const video = videoRef.current!;
    if (stream) {
      video.srcObject = stream;
      checkVideoState().then(takePhoto);
    }
  }, [checkVideoState, stream, takePhoto]);

  useEffect(() => {
    if (!stream) {
      clearTimeout(timeoutId);
    }
  }, [stream, timeoutId]);

  return (
    <div>
      <Header>
        <Header.Empty />
        <Header.Title>Холодильник</Header.Title>
        <Header.Icon
          icon={IoQrCodeOutline}
          label="Добавить продукт через сканирование QR-кода"
          onClick={addProductHandler}
        />
      </Header>
      <ul className="flex flex-col gap-y-3">
        {items.map((product) => (
          <li key={product.code}>
            <ProductChip {...product} />
          </li>
        ))}
      </ul>

      {stream && (
        <>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video width="320" height="240" autoPlay playsInline ref={videoRef} />
        </>
      )}
    </div>
  );
}
