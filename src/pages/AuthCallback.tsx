import * as React from 'react';

import Auth0 from 'src/components/Auth0';
import Spinner from 'src/components/Spinner';

interface Props {}

class AuthCallback extends React.PureComponent<Props, object> {
  render() {
    return (
      <Auth0 callback>
        {({ error }) => {
          return (
            <>
              <Spinner />
              <div className="notification is-danger">{error}</div>
            </>
          );
        }}
      </Auth0>
    );
  }
}

export default AuthCallback;
