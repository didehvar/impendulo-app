export default {
  claimsNamespace: 'https://app.impendulo.org/jwt/claims',
  clientId: 'z0s516CNpJGqe0qz9Giz5CLbb0pKoVy4',
  defaultError: 'No hash found',
  domain: 'impendulo-auth.eu.auth0.com',
  keys: {
    accessToken: 'auth.accessToken',
    expiresAt: 'auth.expiresAt',
    idToken: 'auth.idToken',
  },
  logoutReturnTo: process.env.REACT_APP_LANDING_URL,
  renewIntervalMs: 900000,
  responseType: 'token id_token',
  returnTo: `${process.env.REACT_APP_BASE_URL}/auth/callback`,
  scope: 'openid profile email',
};
