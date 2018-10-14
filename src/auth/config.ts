const claimsName = 'https://app.impendulo.org';

export default {
  clientId: 'z0s516CNpJGqe0qz9Giz5CLbb0pKoVy4',
  defaultError: 'No hash found',
  domain: 'impendulo-auth.eu.auth0.com',
  keys: {
    accessToken: 'auth-accessToken',
    expiresAt: 'auth-expiresAt',
    idToken: 'auth-idToken',
  },
  logoutReturnTo: process.env.REACT_APP_LANDING_URL,
  responseType: 'token id_token',
  returnTo: `${process.env.REACT_APP_BASE_URL}/auth/callback`,
  scope: 'openid profile email',
  tokenKeys: {
    createdAt: `${claimsName}/created_at`,
    intercomHash: `${claimsName}/id_verification`,
  },
};
