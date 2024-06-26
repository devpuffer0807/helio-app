import { useEffect, useState } from 'react';

export const useTimeout = (
  seconds: number,
  callback: () => void | Promise<void>,
): [number] => {
  const [counter, updateCounter] = useState(seconds);

  useEffect(() => {
    let timeout = seconds;
    const interval = setInterval(() => {
      if (timeout === 0) {
        clearInterval(interval);
        void callback();
      } else {
        updateCounter(--timeout);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      updateCounter(seconds);
    };
  }, [callback, seconds]);

  return [counter];
};
