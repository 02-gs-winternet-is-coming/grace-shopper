import axios from 'axios'

const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_FROM_CART = 'DELETE_FROM_CART'
const GET_CART = 'GET_CART'
const DELETE_QUANTITY = 'DELETE_QUANTITY'
const CLEAR_CART = 'CLEAR_CART'
const CONFIRM_CART = 'CONFIRM_CART'

const addToCart = (product) => ({
    type: ADD_TO_CART,
    product
})
const deleteFromCart = (product) => ({
    type: DELETE_FROM_CART,
    product
})
const deleteQuantity = (product) => ({
    type: DELETE_QUANTITY,
    product
})
const getCart = (cart) => ({
    type: GET_CART,
    cart
})

const confirmCart = (cart) => ({
    type: CONFIRM_CART,
    cart
})

export const addToCartThunk = (infoObj, history) => {
    return async(dispatch) => {
      try {
        const userId = {
          id: infoObj[0]
        }
        const quantityType = {
          type: infoObj[2]
        }
        const { data } = await axios.post(`/api/orders/`, [userId, infoObj[1], quantityType])
        const product = data
        dispatch(addToCart(product))
        history.push(`/cart/${userId.id}`)
      } catch(error) {
        console.log(error)
      }
    }
}

export const deleteQuantityThunk = (infoObj, history) => {
    return async(dispatch) => {
      try {
        const userId = {
          id: infoObj[0]
        }
        const quantityType = {
          type: infoObj[2]
        }
        const { data } = await axios.post(`/api/orders/`, [userId, infoObj[1], quantityType])
        const product = data
        dispatch(deleteQuantity(product))
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

export const confirmedCart = (userId, options, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/orders/${userId}`, options)
      dispatch(confirmCart(data))
      history.push(`/confirm/${userId}`)
    } catch (err) {
      console.error(err)
    }
  }
}

export const deleteProductThunk = (productId, productName, userId, history) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.delete(`/api/orders/${userId}/${productId}`)
            dispatch(deleteFromCart(data))
            history.push(`/cart/${userId}`)
        } catch (err) {
            console.error(err)
        }
    }
}

export default function (state = [], action) {
    switch (action.type) {
      case ADD_TO_CART:
        if(state.length !== 0) {
        const mapped = state.products.map(product => {
          if (product.orderProduct.productId === action.product.id) {
            product.orderProduct.quantity = product.orderProduct.quantity + 1
            return product
          } return product
        })
        const newNState = {...state}
        newNState.products = mapped
        return newNState
      } else {
        return action.product

      }
      case DELETE_QUANTITY:
        if(state.length !== 0) {
          const mapped = state.products.map(product => {
            if (product.orderProduct.productId === action.product.id && product.orderProduct.quantity > 1) {
              product.orderProduct.quantity = product.orderProduct.quantity - 1
              return product
            } return product
          })
          const newNState = {...state}
          newNState.products = mapped
          return newNState
        } else {
          return action.product
        };
      case CONFIRM_CART:
        return action.cart
      case DELETE_FROM_CART:
        const updatedCart = state.products.filter((product) => {
            return product.orderProduct.productId !== action.product.id
        });
        const newState = { ...state }
        newState.products = updatedCart
        return newState
      case GET_CART:
        return action.cart
      default:
        return state;
    }
  }
