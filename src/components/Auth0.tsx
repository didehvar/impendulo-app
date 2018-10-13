import * as auth0 from 'auth0-js';
import * as React from 'react';

import history from '../history';

interface ITokenPayload {
  email: string;
  name: string;
  picture: string;
  'https://app.impendulo.org/created_at': string;
  'https://app.impendulo.org/id_verification': string;
}

interface IChildrenAuth {
  authenticated: boolean;
  signIn: () => void;
  signOut: () => void;
}

interface IAuth0Props {
  callback?: boolean;
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
    scope: 'openid profile email',
  });

  static defaultProps: Partial<IAuth0Props> = {
    callback: false,
  };

  static runAuthScripts(payload: ITokenPayload) {
    window.Intercom('boot', {
      app_id: process.env.REACT_APP_INTERCOM_ID,
      avatar: {
        image_url: payload.picture,
        type: 'avatar',
      },
      created_at: new Date(
        payload['https://app.impendulo.org/created_at'],
      ).getTime(),
      email: payload.email,
      name: payload.name,
      user_hash: payload['https://app.impendulo.org/id_verification'],
    });
  }

  static runDeauthScripts() {
    window.Intercom('shutdown');
    window.Intercom('boot', {
      app_id: process.env.REACT_APP_INTERCOM_ID,
    });
  }

  constructor(props: IAuth0Props) {
    super(props);

    this.state = {
      authenticated: this.isAuthenticated(),
    };
  }

  componentDidMount() {
    if (this.props.callback) {
      this.handleCallback();
    }
  }

  storeTokens(accessToken: string, idToken: string, expiresIn: number) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('idToken', idToken);
    localStorage.setItem(
      'expiresAt',
      JSON.stringify(expiresIn * 1000 + new Date().getTime()),
    );
  }

  signIn = () => Auth0.auth.authorize();

  signOut = () => {
    this.setState({ authenticated: false });

    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
    localStorage.removeItem('expiresAt');

    Auth0.runDeauthScripts();

    history.replace('/auth');
  };

  isAuthenticated = () => {
    const expiresAt = localStorage.getItem('expiresAt');
    return !!expiresAt && new Date().getTime() < JSON.parse(expiresAt);
  };

  handleCallback = () => {
    Auth0.auth.parseHash((err, hash) => {
      if (
        err ||
        !hash ||
        !hash.expiresIn ||
        !hash.accessToken ||
        !hash.idToken
      ) {
        // todo: handle this error
        // tslint:disable-next-line
        console.error(err, 'invalid session beep boop');
        return;
      }

      this.setState({ authenticated: true });
      this.storeTokens(hash.accessToken, hash.idToken, hash.expiresIn);
      Auth0.runAuthScripts(hash.idTokenPayload);

      history.replace('/');
    });
  };

  render() {
    const { authenticated } = this.state;

    return this.props.children({
      authenticated,
      signIn: this.signIn,
      signOut: this.signOut,
    });
  }
}

export default Auth0;
