import axios from 'axios';

const CREATE_NEW_ACCOUNT = 'CREATE_NEW_ACCOUNT'

const createAccount = (username) => ({
  type: CREATE_NEW_ACCOUNT,
  username
})

export const createNewAccount = (account) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/users', account);
      dispatch(createAccount(data))
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
