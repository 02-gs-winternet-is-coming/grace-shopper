import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProduct } from '../store/allproducts';
import { updateProduct } from '../store/singleProduct';
import { isAdmin } from '../store/auth';

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {...this.props.singleProduct}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(evt) {
    evt.preventDefault();
    this.props.add({...this.state})
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value});
  }

  render () {
    const { handleSubmit, handleChange } = this;

    const { name, price, quantity, imageUrl,
      description } = this.state;

    return (
      <div className="singleProductView">
      {!isAdmin() ? 'You are not authorized :(' :
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name: </label>
              <input
              type="text"
              name="name"
              onChange={handleChange}
              value={name}
              />
          </div>
          <div>
            <label htmlFor="price"> Price (per pound): </label>
              <input
              type="text"
              name="price"
              value={price}
              onChange={handleChange}
              />
          </div>
          <div>
            <label htmlFor="description"> Description: </label>
              <input
              type="text"
              name="description"
              value={description}
              onChange={handleChange}
              />
          </div>
          <div>
            <label htmlFor="quantity"> Quantity: </label>
              <input
              type="text"
              name="quantity"
              value={quantity}
              onChange={handleChange}
              />
          </div>
          <div>
            <label htmlFor="imageUrl"> Image URL: </label>
              <input
              type="text"
              name="imageUrl"
              value={imageUrl}
              onChange={handleChange}
              />
          </div>
          <button type="submit"> Submit</button>
        </form>
      }
      </div>
    )
  }
}

const mapState = (state) => ({
  singleProduct: state.singleProduct,
})

const blankState = () => ({
  singleProduct: {name: '', price: 0, description: '',
  quantity: 0, imageUrl: '', category: []},
})

const mapUpdate = (dispatch, { history }) => ({
  add: (product) => dispatch(
    updateProduct(product,
      history,
      localStorage.token
    ))
})

const mapAdd = (dispatch, { history }) => ({
  add: (product) => dispatch(
    addProduct(product,
    history,
    localStorage.token
  ))
})

const EditProduct = connect(mapState, mapUpdate)(ProductForm)

const AddProduct = connect(blankState, mapAdd)(ProductForm)

export { EditProduct, AddProduct }
