import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'

const ADD_PRODUCT = "ADD_PRODUCT"

const getProducts = (products) => {
    return {
      type: GET_PRODUCTS,
       products
      }
}

const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    product
  }
}

export const addAProduct = (infoObj, history) => {
  return async(dispatch) => {
    try {
      const {data} = await axios.post(`/api/orders/${infoObj.userId}`, infoObj.product)
      const product = data
      dispatch(addProduct(product))
    } catch(error) {
      console.log(error)
    }
  }
}

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
    const {data} = await axios.get('/api/products')
    dispatch(getProducts(data))
} catch(error) {
  console.log(error)
}
}
}

export default function(state = [], action) {
    switch (action.type) {
      case GET_PRODUCTS:
        return action.products;
      case ADD_PRODUCT: 
        return [...state, action.product]
      default:
        return state
    }
  }