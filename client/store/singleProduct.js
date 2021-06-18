import axios from 'axios';

//Action type
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

//Action creator
const getSingleProduct = (product) => {
  return {
    type: GET_SINGLE_PRODUCT,
    product
  }
}

//Thunk
export const fetchSingleProduct = (productId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      console.log(data)
      dispatch(getSingleProduct(data));
    } catch (err) {console.error(err)}
  }
}

//Reducer
export default function (state = [], action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
