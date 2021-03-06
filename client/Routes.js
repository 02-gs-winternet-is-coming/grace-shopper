import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Switch, Redirect} from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import {me} from './store';
import Cart from './components/Cart';
import AllProducts from './components/AllProducts';
import SingleProduct from './components/SingleProduct';
import Navbar from './components/Navbar';
import CreateAccount from './components/CreateAccount';
import Confirmation from './components/Confirmation';
import { AddProduct } from './components/ProductForm';
import ViewUsers from './components/ViewUsers';
import Checkout from './components/Checkout';

/**
 * COMPONENT
 */
class Routes extends Component {

  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {

    return (
      <div>
        <Navbar />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/home" component={Home} />
            <Route exact path="/cart/:userId" component={Cart} />
            <Route exact path="/products/:id" component={SingleProduct} />
            <Route exact path="/products" component={AllProducts} />
            <Route exact path="/cart/checkout/:userId" component={Checkout} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/createaccount" component={CreateAccount} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/confirm/:userId" component={Confirmation} />
            <Route exact path="/viewusers" render={(props) => (
                this.props.isAdmin ?
                <ViewUsers {...props} />
                : <Redirect to="/"/>
                )}
            />
            <Route exact path="/addproduct"
              render={(props) => (
                this.props.isAdmin ?
                <AddProduct {...props} />
                : <Redirect to="/products"/>
                )}
            />

            {/* <Redirect to="/home" /> */}

        {/* {isLoggedIn ? (

          <Switch>
            <Route path="/home" component={Home} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={ Login } />
            <Route path="/login" component={Login} />
            <Route exact path="/cart" component={Cart} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )} */}
      </div> )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    isAdmin: !!state.auth.id && state.auth.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
