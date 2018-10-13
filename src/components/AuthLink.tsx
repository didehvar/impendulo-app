import * as React from 'react';

import Auth0 from './Auth0';

interface IAuthLinkProps {}

class AuthLink extends React.PureComponent<IAuthLinkProps, object> {
  render() {
    return (
      <Auth0>
        {({ authenticated, signIn, signOut }) => (
          <a onClick={authenticated ? signOut : signIn}>
            {authenticated ? 'Sign out' : 'Sign in'}
          </a>
        )}
      </Auth0>
    );
  }
}

export default AuthLink;
