import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { createNewAccount } from '../store/createAccount'

const initialState = {
  username: '',
  password: '',
  address: '',
  city: '',
  state: '',
  zipCode: ''
}

class NewAccount extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.createdAccount(this.state);
    this.setState(initialState);
  }

  render() {
    const { handleSubmit, handleChange } = this;

    return(
      <div>
        <span>Create New Account</span>
        <form onSubmit={handleSubmit}>

          <div className="newAccount-form-field">
            <label htmlFor="username">Email Address:</label>
              <input
                value={this.state.username}
                type="text"
                name="username"
                onChange={handleChange}
              />
          </div>

          <div className="newAccount-form-field">
            <label htmlFor="password">Password:</label>
              <input
                value={this.state.password}
                type="text"
                name="password"
                onChange={handleChange}
              />
          </div>

          <div className="newAccount-form-field">
            <label htmlFor="address">Address:</label>
              <input
                value={this.state.address}
                type="text"
                name="address"
                onChange={handleChange}
              />
          </div>

          <div className="newAccount-form-field">
            <label htmlFor="city">City:</label>
              <input
                value={this.state.city}
                type="text"
                name="city"
                onChange={handleChange}
              />
          </div>

          <div className="newAccount-form-field">
            <label htmlFor="state">State:</label>
              <input
                value={this.state.state}
                type="text"
                name="state"
                onChange={handleChange}
              />
          </div>

          <div className="newAccount-form-field">
            <label htmlFor="zipCode">Zip Code:</label>
              <input
                value={this.state.zipCode}
                type="text"
                name="zipCode"
                onChange={handleChange}
              />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }

}

const mapDispatch = (dispatch) => ({
  createdAccount: (account) => dispatch(createNewAccount(account))
});

export default connect(null, mapDispatch)(NewAccount)

// this.props.history.push('/home')
// <input type="password" style="-webkit-text-security: square;" />
