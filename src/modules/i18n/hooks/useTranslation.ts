import { useLayoutEffect, useMemo, useState } from 'react';
import intl from 'react-intl-universal';
import { uid } from 'react-uid';

import { Locale } from '../locales';
import { t, TFunction } from '../utils';

type Translation<T = Record<string, string>> = Record<Locale, T>;

type UseTranslationResult<T> = {
  t: TFunction;
  keys: T;
};

export function useTranslation<T extends Record<string, string>>(
  data: Translation<T>,
): UseTranslationResult<T> {
  const [id] = useState(uid(data));
  const [isLoaded, setIsLoaded] = useState(false);

  const keys = useMemo(() => {
    return (Object.keys(data[Locale.en]) as Array<keyof T>).reduce<T>(
      (acc, key) => {
        acc[key] = `${id}.${key as string}` as T[keyof T];
        return acc;
      },
      {} as T,
    );
  }, [data, id]);

  useLayoutEffect(() => {
    if (isLoaded && intl.get(id)) {
      return;
    }

    Object.entries(data).forEach(([locale, text]) => {
      intl.load({
        [locale]: {
          [id]: text,
        },
      });
    });
    setIsLoaded(true);
  }, [data, id, isLoaded]);

  return {
    t,
    keys,
  };
}
