import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './App'
import AllProducts from './AllProducts'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <AllProducts />
    </Router>
  </Provider>,
  document.getElementById('app')
)
