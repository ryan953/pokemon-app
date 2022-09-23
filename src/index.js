import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import {store} from './redux';

import App from './App';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { SentryReplay } from '@sentry/replay';

Sentry.init({
  // pokedex @ wildcard-inc
  dsn: "https://32e900439c044907a850b9bae30864f9@o1170741.ingest.sentry.io/6731936",
  // pokedex @ local devserver
  // dsn: 'http://7fb78fda3b124ed48f7f88b0ad215de8@127.0.0.1:8000/2',

  release: process.env.REACT_APP_SENTRY_RELEASE,
  integrations: [
    new BrowserTracing(),
    new SentryReplay({
      stickySession: true, // Default is true
      recordingConfig: {
        maskAllInputs: true, // Default is true
        blockClass: 'sr-block',
        maskTextClass: 'sr-mask',
        // maskTextSelector: '*', // Hides all text on the page
        // blockSelector: 'img', // Hide all <img> tags
      },
    }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});


ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,  document.getElementById('root'));
