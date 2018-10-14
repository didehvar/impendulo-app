import * as React from 'react';

import AuthContainer from './AuthContainer';

interface Props {}

class AuthPage extends React.PureComponent<Props, object> {
  render() {
    return (
      <AuthContainer>
        {({ authenticated, signIn, signOut }) => (
          <a onClick={authenticated ? signOut : signIn}>
            {authenticated ? 'Sign out' : 'Sign in'}
          </a>
        )}
      </AuthContainer>
    );
  }
}

export default AuthPage;
