import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";
import { deleteProduct } from "../store/allproducts"
import { EditProduct } from "./ProductForm"
import { addToCartThunk } from "../store/cart";

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {showEdit: false};
    this.addToCart = this.addToCart.bind(this)
  }

  async componentDidMount() {
    await this.props.fetch(this.props.match.params.id);
  }

  async addToCart(event) {
    await this.props.addToCarts([this.props.userId,this.props.product])
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
  console.log(state)
  return {
    product: state.singleProduct,
    isAdmin: !!state.auth.id && state.auth.isAdmin,
    userId: state.auth.id
  };
};

const mapDispatch = (dispatch, { history }) => ({
    fetch: (id) => dispatch(fetchSingleProduct(id)),
    clear: () => dispatch(clearSingleProduct()),
    delete: (id) => {dispatch(deleteProduct(id, history, localStorage.token || null))},
    addToCarts: (infoObject) => dispatch(addToCartThunk(infoObject,history))

})

export default connect(mapState, mapDispatch)(SingleProduct);
