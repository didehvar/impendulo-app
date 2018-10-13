import ApolloClient from 'apollo-boost';
import 'auth0-js/build/auth0';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDOM from 'react-dom';
import { Provider } from 'reakit';
import theme from 'reakit-theme-default';

import './index.scss';
import App from './App';

const client = new ApolloClient({
  request: async operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token,
      },
    });
  },
  uri: process.env.REACT_APP_HASURA_URL,
});

ReactDOM.render(
  <Provider theme={theme}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
