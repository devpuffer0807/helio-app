import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';

import { Locale, locales } from 'modules/i18n';

export const useInitializeLocale = (): { isInitialized: boolean } => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    setIsInitialized(false);

    void intl
      .init({
        currentLocale: Locale.en,
        locales,
        fallbackLocale: Locale.en,
      })
      .then(() => setIsInitialized(true));
  }, []);

  return { isInitialized };
};
