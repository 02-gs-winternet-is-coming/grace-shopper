import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchUsers, clearAllUsers } from '../store/allusers';

class ViewUsers extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadUsers(localStorage.token);
    const guestCart = localStorage.getItem('guestCart')
    this.setState({guestCart})
  }

  componentWillUnmount() {this.props.clear()}

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Address</th>
          </tr>
        </thead>
        <tbody>
        {this.props.users && this.props.users.length > 0 &&
          this.props.users.map((user) =>
          {return (
            <tr key={user.id}>
              <th>{user.id}</th>
              <td>{user.username}</td>
              <td>{user.address}, {user.city} {user.state} {user.zipCode}</td>
            </tr>
          )}
        )}
        </tbody>
      </table>
    )
  }
}

const mapState = (state) => ({
  users: state.allUsers
})

const mapDispatch = (dispatch) => ({
  loadUsers: (token) => dispatch(fetchUsers(token)),
  clear: () => dispatch(clearAllUsers())
})

export default connect(mapState, mapDispatch)(ViewUsers)
