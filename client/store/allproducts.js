import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'

const getProducts = (products) => {
    return GET_PRODUCTS, products
}

export const fetchProducts = async (dispatch) => {
    const data = await axios.get('/api/products')
}

export default function(state = {}, action) {
    switch (action.type) {
      case GET_PRODUCTS:
        return action.products
      default:
        return state
    }
  }