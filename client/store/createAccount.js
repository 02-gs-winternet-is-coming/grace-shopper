import axios from 'axios';
import { authenticate } from './auth'

const CREATE_NEW_ACCOUNT = 'CREATE_NEW_ACCOUNT'

const createAccount = (username) => ({
  type: CREATE_NEW_ACCOUNT,
  username
})

export const createNewAccount = (account, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/users', account);
      dispatch(createAccount(data))
      dispatch(authenticate(account.username, account.password, 'Login', history))
    } catch(err) {
      console.error('SOS -- Error in your createNewAccount Thunk!', err)
    }
  }
}

const initialState = '';

export default function(state = initialState, action) {
  switch(action.type) {
    case CREATE_NEW_ACCOUNT:
      return action.username
    default:
      return state;
  }
}
