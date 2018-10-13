import * as React from 'react';
import AuthLink from 'src/components/AuthLink';

interface IAuthProps {}

class Auth extends React.PureComponent<IAuthProps, object> {
  render() {
    return <AuthLink />;
  }
}

export default Auth;
