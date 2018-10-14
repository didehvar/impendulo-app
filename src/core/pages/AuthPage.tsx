import * as React from 'react';
import AuthContainer from 'src/auth/AuthContainer';

const AuthPage: React.StatelessComponent = () => (
  <AuthContainer>
    {({ authenticated, signIn, signOut }) => (
      <a onClick={authenticated ? signOut : signIn}>
        {authenticated ? 'Sign out' : 'Sign in'}
      </a>
    )}
  </AuthContainer>
);

export default AuthPage;
