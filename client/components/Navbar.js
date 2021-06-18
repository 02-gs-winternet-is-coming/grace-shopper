import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1>Good Morels</h1>
    <nav id="navBar">
      <Link to="/home">home</Link>
      <Link to="/products">all products</Link>
      {isLoggedIn ? (
          <div id="logged-in">
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div id="logged-in">
            <Link to="/login">login</Link>
            <Link to="/createaccount">create account</Link>
          </div>
        )}
      <Link to='/cart'>cart</Link>
    </nav>
    <hr />
  </div>
)
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
