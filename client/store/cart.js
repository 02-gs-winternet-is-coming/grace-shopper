import axios from 'axios'

//action types
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'
const GET_CART = 'GET_CART'
const UPDATE_CART = 'UPDATE_CART'

//action creators
const addToCart = (product) => ({
    type: ADD_TO_CART,
    product
})
const deleteFromCart = (product) => ({
    type: DELETE_FROM_CART,
    product
})
const getCart = (cart) => ({
    type: GET_CART,
    cart
})
const updateCart = (cart) => ({
    type: UPDATE_CART,
    cart,
})

// export const updateCartThunk = (userId, productId) => {
//     return async(dispatch) => {
//         try {
//             const { data } = await axios.put(`/api/orders/${userId}/${productId}`)
//             dispatch(updateCart(data))
//         } catch(error) {
//             console.log(error)
//         }
//     }
// }

export const addToCartThunk = (infoObj, history) => {
    return async(dispatch) => {
      try {
        const userId = {
          id: infoObj[0]
        }
        const { data } = await axios.post(`/api/orders/`, [userId, infoObj[1]])
        const product = data
        dispatch(addToCart(product))
        history.push(`/cart/${userId.id}`)
      } catch(error) {
        console.log(error)
      }
    }
  }

export const fetchCart = (userId) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`/api/orders/${userId}`)
            dispatch(getCart(data))
        } catch (err) {
            console.error(err)
        }
    }
}

export const deleteProductThunk = (productId, productName, userId) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.delete(`/api/orders/${userId}/${productId}`)
            dispatch(deleteFromCart(data))
        } catch (err) {
            console.error(err)
        }
    }
}

//reducer
export default function (state = [], action) {
    switch (action.type) {
      case ADD_TO_CART:
        return action.product;
      case DELETE_FROM_CART:
        return state.products.filter((product) => product.id !== action.product.id);
      case GET_CART:
        return action.cart
      case UPDATE_CART:
          return action.cart
      default:
        return state;
    }
  }
