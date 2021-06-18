import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'

const getProducts = (products) => ({
  type: GET_PRODUCTS, products
})

const updateProductAction = (product) => ({
  type: UPDATE_PRODUCT, product
})

const addProductAction = (product) => ({
  type: ADD_PRODUCT, product
})
=======
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
      const {data: product} = await axios.post(`/api/orders/${infoObj.userId}`, infoObj.product)
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

export const updateProduct = (product) => {
  return async (dispatch) => {
    try {
      const {data: updated} =
        await axios.put(`/api/products/${product.id}`, product);
      dispatch(updateProductAction(updated));
    } catch (error) {console.log(error)}
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
      case UPDATE_PRODUCT:
        return state.map((product) => {
          return product.id == action.product.id
            ? action.product : product;
        })
      case ADD_PRODUCT:
        return [...state, action.product]
      default:
        return state
    }
  }
