import ApolloClient from 'apollo-boost';
import 'auth0-js/build/auth0';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDOM from 'react-dom';
import { Provider, ThemeProvider } from 'reakit';

import darkTheme from './core/theme/dark';
import lightTheme from './core/theme/light';
import ThemeContainer from './core/theme/ThemeContainer';
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
  <ApolloProvider client={client}>
    <Provider>
      <ThemeContainer>
        {({ mode }) => (
          <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
            <App />
          </ThemeProvider>
        )}
      </ThemeContainer>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement,
);
