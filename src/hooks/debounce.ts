import { useState, useCallback } from "react";

const useDebounce = <T extends any[]>(
  callback: (...args: T) => void,
  delay: number,
): ((...args: T) => void) => {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: T) => {
      if (timer) {
        clearTimeout(timer);
      }
      setTimer(
        setTimeout(() => {
          callback(...args);
        }, delay),
      );
    },
    [callback, delay, timer],
  );

  return debouncedCallback;
};

export default useDebounce;
