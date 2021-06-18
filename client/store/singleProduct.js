import axios from 'axios';

//Action type
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const CLEAR_PRODUCT = 'CLEAR_PRODUCT'

//Action creator
const getSingleProduct = (product) => ({
    type: GET_SINGLE_PRODUCT,
    product
})

const updateProductAction = (product) => ({
  type: UPDATE_PRODUCT, product
})

export const clearSingleProduct = () => ({
  type: CLEAR_PRODUCT
})

//Thunks
export const fetchSingleProduct = (productId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      console.log(data)
      dispatch(getSingleProduct(data));
    } catch (err) {console.error(err)}
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

//Reducer
export default function (state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product;
    case UPDATE_PRODUCT:
      return action.product;
    case CLEAR_PRODUCT:
      return {};
    default:
      return state;
  }
}
