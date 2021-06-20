import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

const getProducts = (products) => ({
  type: GET_PRODUCTS, products
})

const addProductAction = (product) => ({
  type: ADD_PRODUCT, product
})

const deleteProductAction = (id) => ({
  type: DELETE_PRODUCT, id
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

export const deleteProduct = (id, history, token) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.delete(
        `/api/products/${id}`,
        {headers: { authorization: token }}
      );
      if (data) dispatch(deleteProductAction(id));
      history.push('/products');
    } catch (err) {console.error(err)}
  }
}

export const addProduct = (product, history, token) => {
  return async (dispatch) => {
    try {
      const {data: newProduct} =
        await axios.post(
          '/api/products',
          product,
          {headers:
            { authorization: token }
          }
        );
      dispatch(addProductAction(newProduct));
      history.push('/products');
    } catch (error) {console.log(error)}
  }
}

export default function(state = [], action) {
    switch (action.type) {
      case GET_PRODUCTS:
        return action.products
      case ADD_PRODUCT:
        return [...state, action.product]
      case DELETE_PRODUCT:
        return state.filter((p) => p.id !== action.id)
      default:
        return state
    }
  }
