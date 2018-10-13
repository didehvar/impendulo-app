import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

history.listen(location => {
  window.Intercom('update');
});

export default history;
