import { ApolloClient } from 'apollo-boost';
import {
  ComposableContainerProps,
  Container,
  EffectMap,
  OnMount,
  OnUnmount,
  SelectorMap,
  SetState,
} from 'constate';
import { History } from 'history';
import * as React from 'react';
import { withApollo, WithApolloClient } from 'react-apollo';
import User from 'src/core/interfaces/User';

import config from './config';
import Auth0 from './Auth0';

const auth = new Auth0();

interface State {
  user?: User;
  history?: History;
  error?: string;
  client: ApolloClient<any>;
  renewInterval?: NodeJS.Timeout;
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

const renewSession = (setState: SetState<State>) =>
  setInterval(async () => {
    try {
      const user = await auth.renewSession();
      setState({ user });
    } catch (ex) {
      return setState({ error: ex.message, user: undefined });
    }
  }, config.renewIntervalMs);

const onMount: OnMount<State> = async ({ state: { history }, setState }) => {
  if (history) {
    try {
      const user = await auth.parseHash();
      setState({ user, renewInterval: renewSession(setState) });
      history.replace('/');
    } catch (ex) {
      return setState({ error: ex.message, user: undefined });
    }
  } else if (auth.isAuthenticated()) {
    setState({ user: auth.userInfo(), renewInterval: renewSession(setState) });
  }
};

const onUnmount: OnUnmount<State> = ({ state: { renewInterval } }) => {
  if (renewInterval) clearInterval(renewInterval);
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
    onUnmount={onUnmount}
    initialState={{
      ...props.initialState,
      ...initialState,
      client: props.client,
    }}
  />
);

export default withApollo(AuthContainer);
