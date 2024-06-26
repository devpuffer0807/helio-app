import React from 'react';
import { hydrate, render } from 'react-dom';

import { App } from './App';
import { initSentry } from './modules/common/utils/sentry';

initSentry();

const rootElement = document.getElementById('root');
if (rootElement?.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}
