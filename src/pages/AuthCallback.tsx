import { History } from 'history';
import * as React from 'react';

import Auth0 from 'src/components/Auth0';
import Spinner from 'src/components/Spinner';

interface Props {
  history: History;
}

class AuthCallback extends React.PureComponent<Props, object> {
  render() {
    const { history } = this.props;

    return (
      <Auth0 history={history}>
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
