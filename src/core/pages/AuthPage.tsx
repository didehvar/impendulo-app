import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Link } from 'reakit';
import AuthContainer from 'src/auth/AuthContainer';

const AuthPage: React.StatelessComponent = () => (
  <AuthContainer>
    {({ authenticated, signIn, signOut }) => (
      <>
        <Button onClick={authenticated ? signOut : signIn}>
          {authenticated ? 'Sign out' : 'Sign in'}
        </Button>
        <Link as={RouterLink} to="/">
          Home
        </Link>
      </>
    )}
  </AuthContainer>
);

export default AuthPage;
