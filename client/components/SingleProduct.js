import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";
import { deleteProduct } from "../store/allproducts"
import { EditProduct } from "./ProductForm"
import { addToCartThunk } from "../store/cart";
import {addToGuestCart } from "../store/guestcart"


class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
    showEdit: false,
    }
    this.addToCart = this.addToCart.bind(this)

  }
async componentDidMount() {
// localStorage.clear()
    await this.props.fetch(this.props.match.params.id);
  }

async addToCart() {
    if(this.props.isLoggedIn) {
    await this.props.addToCarts([this.props.userId,this.props.product])
    } else {
    // await this.props.addToGuestCart(this.props.product) 
    let existingCart = await JSON.parse(localStorage.getItem('guestCart'))
    const currentProduct = this.props.product
    let truthyValue;
    if (!existingCart) {
      existingCart = []
      localStorage.setItem('guestCart', JSON.stringify(existingCart))
    } else { 
      //here it maps through the elements in the ucrrent cart, if it finds one it iterates the quantity
   existingCart.map(mapproduct => {
      if(mapproduct.id === currentProduct.id) {
        mapproduct.quantity++
        truthyValue = true
        return truthyValue
      } 
  })
  }
  if(!truthyValue) {
    //if theres no truthy value (truthy is false,), the current item needs to be added onto the existing cart
    existingCart.push(currentProduct)
  }
   localStorage.setItem('latestItem', JSON.stringify(currentProduct))
   localStorage.setItem('guestCart', JSON.stringify(existingCart))
  }
}
    render() {
    const product = this.props.product || [];
    const { isAdmin } = this.props;
    return (
      <div className="singleProductContainer">
        <h3 id="singleMushroomHeader">{product.name} mushrooms</h3>
        <div className="singleProductView" key={product.id}>
          <img src={product.imageUrl} id="singleProductViewImage" />
          <div id="singleMushroomText">
            <p id="singleMushroomName">{product.name}</p>
            <p>{product.description}hi some placefiller, this mushroom is delicious. It is great to eat and will not poison you. I think, but I'm no expert</p>
            <p>{product.price}/lb</p>
          <div className="singleMushroomButton">
            <button className="singleMushroomButton" onClick={this.addToCart}>add to cart</button>
            {isAdmin &&
              <button
              className="singleMushroomButton"
              onClick={() => {this.setState({showEdit: !this.state.showEdit})}}
              >edit</button>}
            {isAdmin &&
              <button
              className="singleMushroomButton"
              onClick={
                () => {
                  if (window.confirm('Are you sure you wish to delete this item?')) {
                  this.props.delete(product.id);
                  }
                }
              }
              >remove</button>}
          </div>
          </div>
        </div>
        {this.state.showEdit &&
          <div className="singleProductEdit">
            <a
            onClick={() => {this.setState({showEdit: false})}}
            className="remove-form"
            >
              &#10006;
            </a>
            <EditProduct />
          </div> }
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    product: state.singleProduct,
    isAdmin: !!state.auth.id && state.auth.isAdmin,
    userId: state.auth.id,
    guestCart: state.guestCart
  };
};

const mapDispatch = (dispatch, { history }) => ({
    fetch: (id) => dispatch(fetchSingleProduct(id)),
    delete: (id) => {dispatch(deleteProduct(id, history, localStorage.token || null))},
    addToCarts: (infoObject) => dispatch(addToCartThunk(infoObject,history)),
    addToGuestCart: (product) => dispatch(addToGuestCart(product))

})

export default connect(mapState, mapDispatch)(SingleProduct);
