import { ApolloClient } from 'apollo-boost';
import {
  ComposableContainerProps,
  Container,
  EffectMap,
  OnMount,
} from 'constate';
import { History } from 'history';
import * as React from 'react';
import { withApollo, WithApolloClient } from 'react-apollo';
import User from 'src/core/interfaces/User';

import Auth0 from './Auth0';

const auth = new Auth0();

interface State {
  authenticated: boolean;
  user?: User;
  history?: History;
  error?: string;
  client: ApolloClient<any>;
}

interface Effects {
  signIn: () => void;
  signOut: () => void;
}

const initialState: Partial<State> = {
  authenticated: false,
};

const effects: EffectMap<State, Effects> = {
  signIn: () => auth.signIn,
  signOut: () => ({ state }) => auth.signOut(state.client),
};

const onMount: OnMount<State> = async ({ state: { history }, setState }) => {
  if (auth.isAuthenticated()) {
    setState({ authenticated: true, user: auth.userInfo() });
  }

  if (history) {
    try {
      const user = await auth.parseHash();
      setState({ authenticated: true, user });
      history.replace('/');
    } catch (ex) {
      return setState({ authenticated: false, error: ex.message });
    }
  }
};

type ContainerProps = (
  props: ComposableContainerProps<State, {}, {}, Effects> &
    WithApolloClient<{}>,
) => JSX.Element;

const AuthContainer: ContainerProps = props => (
  <Container
    {...props}
    pure
    context="auth"
    effects={effects}
    onMount={onMount}
    initialState={{
      ...props.initialState,
      ...initialState,
      client: props.client,
    }}
  />
);

export default withApollo(AuthContainer);
