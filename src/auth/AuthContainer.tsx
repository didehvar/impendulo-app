import { ApolloClient } from 'apollo-boost';
import {
  ComposableContainerProps,
  Container,
  EffectMap,
  OnMount,
  SelectorMap,
} from 'constate';
import { History } from 'history';
import * as React from 'react';
import { withApollo, WithApolloClient } from 'react-apollo';
import User from 'src/core/interfaces/User';

import Auth0 from './Auth0';

const auth = new Auth0();

interface State {
  user?: User;
  history?: History;
  error?: string;
  client: ApolloClient<any>;
}

interface Selectors {
  isAuthenticated: () => boolean;
}

interface Effects {
  signIn: () => void;
  signOut: () => void;
}

const initialState: Partial<State> = {};

const selectors: SelectorMap<State, Selectors> = {
  isAuthenticated: () => () => auth.isAuthenticated(),
};

const effects: EffectMap<State, Effects> = {
  signIn: () => auth.signIn,
  signOut: () => ({ state }) => auth.signOut(state.client),
};

const onMount: OnMount<State> = async ({ state: { history }, setState }) => {
  if (auth.isAuthenticated()) {
    setState({ user: auth.userInfo() });
  }

  if (history) {
    try {
      const user = await auth.parseHash();
      setState({ user });
      history.replace('/');
    } catch (ex) {
      return setState({ error: ex.message, user: undefined });
    }
  }
};

type ContainerProps = (
  props: ComposableContainerProps<State, Selectors, {}, Effects> &
    WithApolloClient<{}>,
) => JSX.Element;

const AuthContainer: ContainerProps = props => (
  <Container
    {...props}
    pure
    context="auth"
    selectors={selectors}
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
