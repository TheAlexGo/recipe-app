import 'barcode-detector/side-effects';
import { useCallback, useEffect, useRef, useState } from 'react';

import { BarcodeDetector } from 'barcode-detector';

import logger from '@/utils/logger';
import { wait } from '@/utils/wait';

interface IUseBarcodeDetectorOptions {
  onCollect: (barcode: string) => void;
  delay: number;
}

export const useBarcodeDetector = ({
  delay,
  onCollect,
}: IUseBarcodeDetectorOptions) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [barcodeDetector, setBarcodeDetector] =
    useState<BarcodeDetector | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutIdRef = useRef(-1);

  const checkVideoState = useCallback(async () => {
    const video = videoRef.current!;
    if (video.readyState === 4) {
      return true;
    }
    await wait(delay);
    return checkVideoState();
  }, [delay]);

  const start = useCallback(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: 'environment',
        },
        audio: false,
      })
      .then(setStream);
  }, []);

  const stop = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  }, [stream]);

  const collectBarcode = useCallback(() => {
    const video = videoRef.current!;

    barcodeDetector!
      .detect(video)
      .then((barcodes) => {
        if (!barcodes.length) {
          throw new Error('Barcode не распознан!');
        }
        return barcodes[0].rawValue;
      })
      .then(onCollect)
      .catch((err) => {
        logger.log(err);
        timeoutIdRef.current = window.setTimeout(collectBarcode, delay);
      });
  }, [barcodeDetector, delay, onCollect]);

  const continueCollect = useCallback(() => {
    window.setTimeout(collectBarcode, delay);
  }, [collectBarcode, delay]);

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
      checkVideoState().then(collectBarcode);
    } else {
      clearTimeout(timeoutIdRef.current);
    }
  }, [checkVideoState, collectBarcode, stream]);

  useEffect(
    () => () => {
      clearTimeout(timeoutIdRef.current);
    },
    [],
  );

  return {
    start,
    continue: continueCollect,
    stop,
    videoRef,
  };
};
