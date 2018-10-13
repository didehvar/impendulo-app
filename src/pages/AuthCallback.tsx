import * as React from 'react';
import Auth0 from 'src/components/Auth0';

interface IAuthCallbackProps {}

class AuthCallback extends React.PureComponent<IAuthCallbackProps, object> {
  render() {
    return (
      <Auth0 callback>
        {() => {
          return <div>Loading</div>;
        }}
      </Auth0>
    );
  }
}

export default AuthCallback;
