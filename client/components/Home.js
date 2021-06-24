import React from 'react'
import {connect} from 'react-redux'
import AllProducts from './AllProducts'

/**
 * COMPONENT
 */
export const Home = props => {
  const {username} = props

  return (
    <div className="welcomeHome">
      <h3>Welcome, {username}</h3>
      <h4>Do you have Good Morels?</h4>
      <AllProducts />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)
