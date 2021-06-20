import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div>
    <h1>Good Morels</h1>
    <nav className="navBar">
      <Link to="/home">home</Link>
      <Link to="/products">all products</Link>
      {isLoggedIn ? (
          <div>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
        <div>
        <Link to="/login">login</Link>
        <Link to="/createaccount">create account</Link>
        </div>
        )}
      {
        isAdmin &&
          <div className="dropdown">
            <button className="dropbtn">Admin
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <Link to='/addproduct'>Add product</Link>
              <Link to='/viewusers'>View users</Link>
            </div>
          </div>
      }
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
    isLoggedIn: !!state.auth.id,
    isAdmin: !!state.auth.id && state.auth.isAdmin,
    userId: state.auth.id
  }
}

const mapDispatch = dispatch => ({
  handleClick() {
    dispatch(logout())
  }
})

export default connect(mapState, mapDispatch)(Navbar)
