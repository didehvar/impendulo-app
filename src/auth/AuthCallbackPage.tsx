import { History } from 'history';
import * as React from 'react';
import AuthContainer from 'src/auth/AuthContainer';

interface Props {
  history: History;
}

class AuthCallbackPage extends React.PureComponent<Props, object> {
  render() {
    const { history } = this.props;

    return (
      <AuthContainer initialState={{ history }}>
        {({ error }) => (
          <div>
            Hello
            <div>{error}</div>
          </div>
        )}
      </AuthContainer>
    );
  }
}

export default AuthCallbackPage;
