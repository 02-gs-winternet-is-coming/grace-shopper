import axios from 'axios';

const GET_ALL_USERS = 'GET_ALL_USERS'
const CLEAR_ALL_USERS = 'CLEAR_ALL_USERS'

const setUsers = (users) => ({
  type: GET_ALL_USERS, users
})

export const clearAllUsers = () => ({
  type: CLEAR_ALL_USERS
})

export const fetchUsers = (token) => {
  return async (dispatch) => {
    try {
      const { data: users } = await axios.get('/api/users',
        {headers: { authorization: token }});
      dispatch(setUsers(users));
    } catch (err) {console.error(err)}
  }
}

export default function (state = [], action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users;
    case CLEAR_ALL_USERS:
      return [];
    default:
      return state;
  }
}
