import { ActionMap, ComposableContainer } from 'constate';
import * as React from 'react';
import { Container } from 'reakit';

import config from './config';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

interface State {
  mode: Theme;
}

interface Actions {
  toggleMode: () => void;
}

const initialState: State = {
  mode: (localStorage.getItem(config.keys.theme) ||
    Theme.Light) as State['mode'],
};

const actions: ActionMap<State, Actions> = {
  toggleMode: () => state => {
    const mode = state.mode === Theme.Dark ? Theme.Light : Theme.Dark;
    localStorage.setItem(config.keys.theme, mode);
    return { mode };
  },
};

const ThemeContainer: ComposableContainer<State, Actions> = props => (
  <Container
    {...props}
    context="theme"
    initialState={{ ...initialState, ...props.initialState }}
    actions={actions}
  />
);

export default ThemeContainer;
