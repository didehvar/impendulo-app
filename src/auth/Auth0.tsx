import { ApolloClient } from 'apollo-boost';
import { WebAuth } from 'auth0-js';
import * as jwtDecode from 'jwt-decode';

import User from '../shared/User';

import config from './config';
import JwtToken from './JwtToken';

class Auth0 {
  webAuth = new WebAuth({
    clientID: config.clientId,
    domain: config.domain,
    redirectUri: config.returnTo,
    responseType: config.responseType,
    scope: config.scope,
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
    this.webAuth.logout({ returnTo: config.logoutReturnTo });
  };

  parseHash(): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.webAuth.parseHash((err: auth0.Auth0Error, hash) => {
        if (err || !hash) {
          return reject(
            new Error(err ? err.errorDescription : config.defaultError),
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
      [config.tokenKeys.createdAt]: createdAt,
      [config.tokenKeys.intercomHash]: idHash,
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
