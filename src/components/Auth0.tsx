import * as auth0 from 'auth0-js';
import * as React from 'react';

import history from '../history';

interface IChildrenAuth {
  authenticated: boolean;
  handleAuth: () => void;
  signIn: () => void;
  signOut: () => void;
}

interface IAuth0Props {
  children: (auth: IChildrenAuth) => React.ReactNode;
}

interface IAuth0State {
  authenticated: boolean;
}

class Auth0 extends React.PureComponent<IAuth0Props, IAuth0State> {
  static auth = new auth0.WebAuth({
    clientID: 'z0s516CNpJGqe0qz9Giz5CLbb0pKoVy4',
    domain: 'impendulo-auth.eu.auth0.com',
    redirectUri: `${process.env.REACT_APP_BASE_URL}/auth/callback`,
    responseType: 'token id_token',
    scope: 'openid',
  });

  constructor(props: IAuth0Props) {
    super(props);

    this.state = {
      authenticated: this.isAuthenticated(),
    };
  }

  signIn = () => Auth0.auth.authorize();

  signOut = () => {
    this.setState({ authenticated: false });

    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    history.replace('/auth');
  };

  isAuthenticated = () => {
    const expiresAt = localStorage.getItem('expires_at');
    return !!expiresAt && new Date().getTime() < JSON.parse(expiresAt);
  };

  handleAuth = () => {
    Auth0.auth.parseHash((err, hash) => {
      if (
        err ||
        !hash ||
        !hash.expiresIn ||
        !hash.accessToken ||
        !hash.idToken
      ) {
        // tslint:disable-next-line
        console.error(err, 'invalid session beep boop');
        return;
      }

      this.setState({ authenticated: false });

      localStorage.setItem('access_token', hash.accessToken);
      localStorage.setItem('id_token', hash.idToken);
      localStorage.setItem(
        'expires_at',
        JSON.stringify(hash.expiresIn * 1000 + new Date().getTime()),
      );

      history.replace('/');
    });
  };

  render() {
    const { authenticated } = this.state;

    return this.props.children({
      authenticated,
      handleAuth: this.handleAuth,
      signIn: this.signIn,
      signOut: this.signOut,
    });
  }
}

export default Auth0;
