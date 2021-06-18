import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProduct, addProduct } from '../store/allproducts';

class EditProduct extends Component {
  constructor() {
    super();
    this.state = {name: '', price: 0, description: '', quantity: 0, imageUrl: '', category: []};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value});
  }

  handleSubmit(evt) {
    evt.preventDefault();

  }

  render () {

    const { handleSubmit, handleChange } = this;
    const { name, price, quantity, imageUrl,
      description, singleProduct} = this.props;

    return (
      <div>
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
            <label htmlFor="price"> Price: </label>
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
          { !!singleProduct
            ? <button type="edit"> Edit Product</button>
            : <button type="submit"> Submit</button>
          }
        </form>
      </div>
    )
  }
}

const mapState = (state) => ({
  singleProduct: state.singleProduct
})

const mapDispatch = (dispatch) => ({
  addProduct: (product) => dispatch(addProduct(product)),
  updateProduct: (product) => dispatch(updateProduct(product))
})

connect(mapState, mapDispatch)(EditProduct)
