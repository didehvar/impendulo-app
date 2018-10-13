import * as React from 'react';
import AuthLink from 'src/components/AuthLink';

interface Props {}

class Auth extends React.PureComponent<Props, object> {
  render() {
    return <AuthLink />;
  }
}

export default Auth;
