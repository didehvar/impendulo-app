import { ApolloClient } from 'apollo-boost';
import { WebAuth } from 'auth0-js';
import * as jwtDecode from 'jwt-decode';

import User from '../shared/User';

import config from './config';
import JwtToken from './JwtToken';

class Auth0 {
  webAuth = new WebAuth({
    clientID: 'z0s516CNpJGqe0qz9Giz5CLbb0pKoVy4',
    domain: 'impendulo-auth.eu.auth0.com',
    redirectUri: `${process.env.REACT_APP_BASE_URL}/auth/callback`,
    responseType: 'token id_token',
    scope: 'openid profile email',
  });

  isAuthenticated = () =>
    new Date().getTime() <
    JSON.parse(localStorage.getItem(config.keys.expiresAt) as string);

  signIn = () => this.webAuth.authorize();

  signOut = (client: ApolloClient<any>) => {
    client.resetStore();
    this.removeValue(config.keys.accessToken);
    this.removeValue(config.keys.idToken);
    this.removeValue(config.keys.expiresAt);
    this.webAuth.logout({ returnTo: process.env.REACT_APP_LANDING_URL });
  };

  parseHash(): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.webAuth.parseHash((err: auth0.Auth0Error, hash) => {
        if (err || !hash) {
          return reject(
            new Error(err ? err.errorDescription : 'No hash found'),
          );
        }

        const { accessToken, idToken, idTokenPayload, expiresIn } = hash;

        this.storeValue(config.keys.accessToken, accessToken!);
        this.storeValue(config.keys.idToken, idToken!);
        this.storeValue(
          config.keys.expiresAt,
          JSON.stringify(expiresIn! * 1000 + new Date().getTime()),
        );

        return resolve(this.userInfo(idTokenPayload));
      });
    });
  }

  userInfo(idPayload?: JwtToken): User | undefined {
    const idToken =
      idPayload ||
      jwtDecode(localStorage.getItem(config.keys.idToken) as string);

    if (!idToken) {
      return;
    }

    const {
      'https://app.impendulo.org/created_at': createdAt,
      'https://app.impendulo.org/id_verification': idHash,
      email,
      name,
      picture,
    } = idToken;

    return {
      createdAt,
      email,
      idHash,
      name,
      picture,
    };
  }

  private storeValue = (key: string, value: string) =>
    localStorage.setItem(key, value);

  private removeValue = (key: string) => localStorage.removeItem(key);
}

export default Auth0;
