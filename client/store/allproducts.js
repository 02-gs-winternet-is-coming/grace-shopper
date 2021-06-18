import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'

const getProducts = (products) => ({
  type: GET_PRODUCTS, products
})

const addProductAction = (product) => ({
  type: ADD_PRODUCT, product
})

export const addAProduct = (infoObj, history) => {
  return async (dispatch) => {
    try {
      const {data: product} = await axios.post(`/api/orders/${infoObj.userId}`, infoObj.product)
      dispatch(addProductAction(product))
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

export const addProduct = (product) => {
  return async (dispatch) => {
    try {
      const {data: newProduct} =
        await axios.post('/api/products', product);
      dispatch(addProductAction(newProduct));
    } catch (error) {console.log(error)}
  }
}

export default function(state = [], action) {
    switch (action.type) {
      case GET_PRODUCTS:
        return action.products
      case ADD_PRODUCT:
        return [...state, action.product]
      default:
        return state
    }
  }
