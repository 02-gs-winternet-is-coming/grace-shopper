import axios from 'axios'

//action types
export const ADD_TO_CART = 'ADD_TO_CART'
export const DELETE_FROM_CART = 'DELETE_FROM_CART'
export const GET_CART = 'GET_CART'

//action creators
export const addToCart = (product) => ({
    type: ADD_TO_CART,
    product
})
export const deleteFromCart = (product) => ({
    type: DELETE_FROM_CART,
    product
})
export const getCart = (cart) => ({
    type: GET_CART,
    cart
})

//thunks
export const fetchCart = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`api/orders/${id}`)
            dispatch(getCart(data))
        } catch (err) {
            console.error(err)
        }
    }
}

export const addProductThunk = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post(`api/orders/${id}`)
            dispatch(addToCart(data))
        } catch (err) {
            console.error(err)
        }
    }
}

export const deleteProductThunk = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.delete(``)
            dispatch(deleteFromCart(data))
        } catch (err) {
            console.error(err)
        }
    }
}

//reducer
export default function storageReducer(state = [], action) {
    switch (action.type) {
      case ADD_TO_CART:
        return [...state, action.product];
      case DELETE_FROM_CART:
        return state.filter((product) => product.id !== action.product.id);
      case GET_CART:
        return action.cart;
      default:
        return state;
    }
  }
