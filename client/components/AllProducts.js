import React from 'react'
import axios from 'axios'
import { connect }from 'react-redux'
import {fetchProducts} from '../store/allproducts'
import { Link, Route } from "react-router-dom"
import { addToCartThunk } from "../store/cart";

class AllProducts extends React.Component {
  constructor() {
    super()
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    try {
      this.props.getProds();
    } catch(err) {
      console.log(err);
    }
  }

async addToCart(event) {
  const {data} = await axios.get(`/api/products/${event.target.id}`)
  await this.props.addToCarts([this.props.userId, data])
}

render() {
    const products = this.props.products || []
    return (
        <div>
        <p id="currentAvail">currently available at Good Morels:</p>
        <div id="productParent">
            {products.map((product)=> {
                return (<div key={product.id} className="allProducts">
                    <Link to={`/products/${product.id}`}>
                    <img className="placeholderImage"src={product.imageUrl}/>
                    <p id="shroomNames">{product.name}</p>
                    <p>{product.description}</p>
                    <p>{product.price}</p>
                    </Link>
                    <button onClick={this.addToCart} id={product.id}>add to cart</button>
                    </div>)
            })}
            </div>
        </div>
    )
}
}

const mapStateToProps = (state) => ({
  products: state.allProducts,
  userId: state.auth.id
})

const mapDispatchToProps = (dispatch, {history}) => ({
  getProds: () => dispatch(fetchProducts()),
  addToCarts: (infoObject) => dispatch(addToCartThunk(infoObject,history))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
