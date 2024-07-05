// src/hooks/useZxing.js
import { useEffect, useMemo, useRef } from 'react';
import { BrowserMultiFormatReader, DecodeHintType, BarcodeFormat } from '@zxing/library';

const useZxing = ({
  constraints = {
    audio: false,
    video: {
      facingMode: 'environment',
    },
  },
  timeBetweenDecodingAttempts = 10000,
  onResult = () => {},
  onError = () => {},
} = {}) => {
  const ref = useRef(null);

  const hints = useMemo(() => {
    const hints = new Map();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [
      BarcodeFormat.EAN_13,
      BarcodeFormat.CODE_128,
      BarcodeFormat.DATA_MATRIX,
      BarcodeFormat.QR_CODE,
      BarcodeFormat.CODE_39,
    ]);
    return hints;
  }, []);

  const reader = useMemo(() => {
    const instance = new BrowserMultiFormatReader(hints);
    instance.timeBetweenDecodingAttempts = timeBetweenDecodingAttempts;
    return instance;
  }, [hints, timeBetweenDecodingAttempts]);

  useEffect(() => {
    if (!ref.current) {
      console.error("Video reference is null.");
      return;
    }

    console.log("Starting barcode decoding with constraints:", constraints);
    
    reader.decodeFromConstraints(constraints, ref.current, (result, error) => {
      if (result) {
        console.log("Barcode detected:", result);
        onResult(result);
      } else if (error) {
        console.error("Error during decoding:", error);
        onError(error);
      }
    });

    return () => {
      reader.reset();
      console.log("Barcode reader reset.");
    };
  }, [ref, reader, constraints, onResult, onError]);

  return { ref };
};

export default useZxing;
