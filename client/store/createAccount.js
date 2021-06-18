import axios from 'axios';

const CREATE_NEW_ACCOUNT = 'CREATE_NEW_ACCOUNT'

const createAccount = (account) => ({
  type: CREATE_NEW_ACCOUNT,
  account
})

export const createNewAccount = (account) => {
  return async (dispatch) => {
    try {
      // double check axios post route matches as just a slash in backend route
      const { data } = await axios.post('/api/users', account);
      dispatch(createAccount(data))
    } catch(err) {
      console.error('SOS -- Error in your createNewAccount Thunk!', err)
    }
  }
}

const initialState = {};

export default function(state = initialState, action) {
  switch(action.type) {
    case CREATE_NEW_ACCOUNT:
      return [...state, action.account];
    default:
      return state;
  }
}
