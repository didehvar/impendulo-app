import { Button } from '@blueprintjs/core';
import * as auth0 from 'auth0-js';
import * as React from 'react';

class Auth extends React.PureComponent<object, object> {
  auth0 = new auth0.WebAuth({
    clientID: 'z0s516CNpJGqe0qz9Giz5CLbb0pKoVy4',
    domain: 'impendulo-auth.eu.auth0.com',
    redirectUri: `${process.env.REACT_APP_BASE_URL}/auth/callback`,
    responseType: 'token id_token',
    scope: 'openid',
  });

  handleLogin = () => {
    this.auth0.authorize();
  };

  render() {
    return <Button onClick={this.handleLogin}>Log in</Button>;
  }
}

export default Auth;
