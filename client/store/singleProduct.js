import axios from 'axios';

//Action type
export const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

//Action creator
export const getSingleProduct = (product) => ({
  type: GET_SINGLE_PRODUCT,
  product
})

//Thunk
export const fetchSingleProduct = (productId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      dispatch(getSingleProduct(data));
    } catch (err) {console.error(err)}
  }
}

//Reducer
export default function singleProductReducer(state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
