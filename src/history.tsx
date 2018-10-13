import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

// TODO: move this to intercom component

history.listen(location => {
  if (window.Intercom) {
    window.Intercom('update');
  }
});

export default history;
