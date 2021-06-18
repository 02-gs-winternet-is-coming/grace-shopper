import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './App'
import Routes from './Routes'
import AllProducts from './components/AllProducts'
import SingleProduct from './components/SingleProduct'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
    {/* <AllProducts /> */}
    <Routes />
    </Router>
  </Provider>,
  document.getElementById('app')
)
