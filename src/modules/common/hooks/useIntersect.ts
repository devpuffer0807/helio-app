import { useCallback, useEffect, useMemo, useRef } from 'react';

// callback must be memorized
type Callback = (entry: IntersectionObserverEntry) => unknown;

export function useIntersect<R extends Element>(
  callback: Callback,
  options?: IntersectionObserverInit,
): [(node: R) => void] {
  const ref = useRef<R | null>(null);

  const observer = useMemo(() => {
    return new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            callback(entry);
          }
        });
      },
      {
        threshold: 0,
        ...options,
      },
    );
  }, [callback, options]);

  useEffect(() => {
    return () => {
      observer.disconnect();
    };
  }, [observer]);

  const setRef = useCallback(
    (node: R) => {
      if (node !== ref.current) {
        observer.disconnect();
      }

      ref.current = node;

      if (ref.current) {
        observer.observe(ref.current);
      }
    },
    [observer],
  );

  return [setRef];
}
