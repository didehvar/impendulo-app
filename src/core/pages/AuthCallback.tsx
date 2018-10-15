import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import AuthContainer from 'src/auth/AuthContainer';
import Error from 'src/core/elements/Error';
import Hero from 'src/core/elements/Hero';
import Spinner from 'src/core/elements/Spinner';

const AuthCallback: React.StatelessComponent<RouteComponentProps> = ({
  history,
}) => (
  <Hero
    fullHeight
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
  >
    <AuthContainer initialState={{ history }}>
      {({ error, signIn }) =>
        error ? <Error retry={signIn}>{error}</Error> : <Spinner large />
      }
    </AuthContainer>
  </Hero>
);

export default AuthCallback;
