import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

class Navbar extends React.Component {
  constructor() {
  super()

  }

render() {
const isLoggedIn = this.props.isLoggedIn
const isAdmin = this.props.isAdmin
const handleClick = this.props.handleClick
return(
  <div>
    <h1>Good Morels</h1>
    <nav id="navBar">
      {isLoggedIn ? (
        <div id="navigate">
         <Link to="/home">home</Link>
         <Link to="/products">all products</Link>
         <Link to={`/cart/${this.props.userId}`} id="yourCart">your cart</Link> 
         <Link to='/login' onClick={handleClick} id="logout">logout</Link>
         </div>
        ) : (
        <div id="navigate">
        <Link to="/home">home</Link>
        <Link to="/products">all products</Link>
        <Link to="/createaccount">create account</Link>
        <Link to="/login">login</Link>
        <Link to="/cart">cart</Link>
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
    </nav>
    <hr />
  </div>
)
    }
  }
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
