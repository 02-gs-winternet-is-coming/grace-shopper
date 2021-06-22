import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import allProducts from './allproducts'
import singleProduct from './singleProduct'
import storageReducer from './cart'
import createAccount from './createAccount'
import allUsers from './allusers'
import guestCart from './guestcart'

const reducer = combineReducers({
  auth, allProducts, singleProduct, storageReducer, createAccount, allUsers, guestCart
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
