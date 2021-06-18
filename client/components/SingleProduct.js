import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";

// SCAFFOLDING
class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this)
  }
  async componentDidMount() {
    await this.props.fetch(this.props.match.params.id);
  }
  addToCart() {
    console.log('hello there!')
  }
  render() {
    const product = this.props.product || [];
    return (
      <div>
        <h3 id="singleMushroomHeader">{product.name} mushrooms</h3>
        <div className="singleProductView" key={product.id}>
          <img src={product.imageUrl} id="singleProductViewImage" />
          <div id="singleMushroomText">
            <p id="singleMushroomName">{product.name}</p>
            <p>{product.description}hi some placefiller, this mushroom is delicious. It is great to eat and will not poison you. I think, but I'm no expert</p>
            <p>{product.price}/lb</p>
            <button id="singleMushroomAddCartButton" onClick={this.addToCart}>add to cart</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    product: state.singleProduct,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetch: (id) => dispatch(fetchSingleProduct(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
