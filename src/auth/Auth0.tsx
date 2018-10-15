import { ApolloClient } from 'apollo-boost';
import { Auth0DecodedHash, WebAuth } from 'auth0-js';
import * as jwtDecode from 'jwt-decode';
import User from 'src/core/interfaces/User';

import config from './config';

interface JwtToken {
  email: string;
  name: string;
  picture: string;
  'https://app.impendulo.org/created_at': string;
  'https://app.impendulo.org/id_verification': string;
}

class Auth0 {
  webAuth = new WebAuth({
    clientID: config.clientId,
    domain: config.domain,
    redirectUri: config.returnTo,
    responseType: config.responseType,
    scope: config.scope,
  });

  isAuthenticated = () => new Date().getTime() < this.getExpiry();

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
      this.webAuth.parseHash((err: auth0.Auth0Error, authResult) => {
        if (err || !authResult) {
          return reject(
            new Error(err ? err.errorDescription : config.defaultError),
          );
        }

        return resolve(this.storeResult(authResult));
      });
    });
  }

  renewSession(): Promise<User> {
    console.log('secretly renew');
    return new Promise((resolve, reject) => {
      this.webAuth.checkSession({}, (err, authResult) => {
        if (err || !authResult) {
          console.log('renew failed', err, authResult);
          return reject(
            new Error(err ? err.errorDescription : config.defaultError),
          );
        }

        console.log('renew success', this.userInfo(authResult.idTokenPayload!));
        return resolve(this.storeResult(authResult));
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
      [config.claimsNamespace]: { createdAt, intercomHash },
      email,
      name,
      picture,
    } = idToken;

    return {
      createdAt,
      email,
      intercomHash,
      name,
      picture,
    };
  }

  private storeValue = (key: string, value: string) =>
    localStorage.setItem(key, value);

  private removeValue = (key: string) => localStorage.removeItem(key);

  private getExpiry = () =>
    JSON.parse(localStorage.getItem(config.keys.expiresAt) as string);

  private storeResult = (authResult: Auth0DecodedHash) => {
    const { accessToken, idToken, idTokenPayload, expiresIn } = authResult;

    this.storeValue(config.keys.accessToken, accessToken!);
    this.storeValue(config.keys.idToken, idToken!);
    this.storeValue(
      config.keys.expiresAt,
      JSON.stringify(expiresIn! * 1000 + new Date().getTime()),
    );

    return this.userInfo(idTokenPayload);
  };
}

export default Auth0;
