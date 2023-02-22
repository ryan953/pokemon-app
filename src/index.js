import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import {store} from './redux';
import App from './App';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

const DSNs = {
  'pokedex@wildcard-inc': "https://32e900439c044907a850b9bae30864f9@o1170741.ingest.sentry.io/6731936",
};

Sentry.init({
  dsn: DSNs["pokedex@wildcard-inc"],

  release: process.env.REACT_APP_SENTRY_RELEASE,

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 1.0,

  // If the entire session is not sampled, use the below sample rate to sample
  // sessions when an error occurs.
  replaysOnErrorSampleRate: 1.0,

  integrations: [new BrowserTracing(), new Sentry.Replay()],
});

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,  document.getElementById('root'));
