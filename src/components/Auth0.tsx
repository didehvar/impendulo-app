import * as auth0 from 'auth0-js';
import * as jwtDecode from 'jwt-decode';
// import flowRight from 'lodash/flowRight';
import * as React from 'react';
import { withApollo, WithApolloClient } from 'react-apollo';

import history from '../history';

export interface User {
  email: string;
  name: string;
  picture: string;
  createdAt: string;
  idHash: string;
}

interface Token {
  email: string;
  name: string;
  picture: string;
  'https://app.impendulo.org/created_at': string;
  'https://app.impendulo.org/id_verification': string;
}

interface Children {
  authenticated: boolean;
  signIn: () => void;
  signOut: () => void;
  user?: User;
  error?: string;
}

interface AuthProps {
  callback?: boolean;
  children: (auth: Children) => React.ReactNode;
}

type Props = WithApolloClient<AuthProps>;

interface State {
  error?: string;
}

class Auth0 extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    callback: false,
  };

  static auth = new auth0.WebAuth({
    clientID: 'z0s516CNpJGqe0qz9Giz5CLbb0pKoVy4',
    domain: 'impendulo-auth.eu.auth0.com',
    redirectUri: `${process.env.REACT_APP_BASE_URL}/auth/callback`,
    responseType: 'token id_token',
    scope: 'openid profile email',
  });

  state: State = {};

  componentDidMount() {
    if (this.props.callback) {
      this.handleCallback();
    }
  }

  tokenToUser({ email, name, picture, ...data }: Token): User {
    return {
      createdAt: data['https://app.impendulo.org/created_at'],
      email,
      idHash: data['https://app.impendulo.org/id_verification'],
      name,
      picture,
    };
  }

  getUser(): User | undefined {
    const idToken = localStorage.getItem('idToken');
    if (!idToken) {
      return;
    }

    return this.tokenToUser(jwtDecode(idToken) as Token);
  }

  signIn = () => Auth0.auth.authorize();

  signOut = () => {
    this.props.client.resetStore();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
    localStorage.removeItem('expiresAt');
    Auth0.auth.logout({ returnTo: process.env.REACT_APP_LANDING_URL });
  };

  isAuthenticated = () => {
    // tslint:disable-next-line
    console.log(
      'hmm',
      new Date().getTime(),
      JSON.parse(localStorage.getItem('expiresAt') as string),
    );
    return (
      new Date().getTime() <
      JSON.parse(localStorage.getItem('expiresAt') as string)
    );
  };

  handleCallback = () => {
    this.setState({ error: undefined });

    Auth0.auth.parseHash((err: auth0.Auth0Error, hash) => {
      if (err || !hash) {
        this.setState({ error: err.errorDescription || 'No hash found' });
        return;
      }

      const { accessToken, idToken, expiresIn } = hash;

      localStorage.setItem('accessToken', accessToken!);
      localStorage.setItem('idToken', idToken!);
      localStorage.setItem(
        'expiresAt',
        JSON.stringify(expiresIn! * 1000 + new Date().getTime()),
      );

      // tslint:disable-next-line
      console.log(
        'expiresIn',
        expiresIn,
        'at',
        new Date().getTime(),
        'calc',
        expiresIn! * 1000 + new Date().getTime(),
      );
      history.replace('/');
    });
  };

  render() {
    const { error } = this.state;

    return this.props.children({
      authenticated: this.isAuthenticated(),
      error,
      signIn: this.signIn,
      signOut: this.signOut,
      user: this.getUser(),
    });
  }
}

// export default flowRight<Auth0, React.Component, Promise<ExecutionResult>>(
//   withApollo,
//   graphql<{}>(AUTH_QUERY),
// )(Auth0);

export default withApollo(Auth0);
