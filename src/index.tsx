import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './redux/store'


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
