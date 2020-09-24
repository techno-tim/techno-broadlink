import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';
import theme from './config/theme';
import App from './components/App';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Route path="/" exact component={App} />
        </Router>
      </MuiThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
