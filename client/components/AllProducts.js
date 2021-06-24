import React from 'react'
import axios from 'axios'
import { connect }from 'react-redux'
import {fetchProducts} from '../store/allproducts'
import { Link, Route } from "react-router-dom"
import { addToCartThunk } from "../store/cart";
import {addToGuestCart } from "../store/guestcart"

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
  event.persist()
  const {data} = await axios.get(`/api/products/${event.target.id}`)
  if(this.props.isLoggedIn) {
  await this.props.addToCarts([this.props.userId, data, 'increment'])
} else {
    let existingCart = await JSON.parse(localStorage.getItem('guestCart'))
    let truthyValue;
    if (!existingCart) {
      existingCart = []
      localStorage.setItem('guestCart', JSON.stringify(existingCart))
    } else {
      //here it maps through the elements in the ucrrent cart, if it finds one it iterates the quantity
   existingCart.map(mapproduct => {
      if(mapproduct.id === Number(event.target.id)) {
        mapproduct.quantity++
        truthyValue = true
        return truthyValue
      }
  })}
  if(!truthyValue) {
    //if theres no truthy value (truthy is false,), the current item needs to be added onto the existing cart
    const newItem = data
    newItem.quantity = 1
    existingCart.push(newItem)
  }
   localStorage.setItem('guestCart', JSON.stringify(existingCart))
  }
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
                    <button className = "allProductsAdd" onClick={this.addToCart} id={product.id}>add to cart</button>
                    </div>)
            })}
            </div>
        </div>
    )
}
}

const mapStateToProps = (state) => {
  return {
  products: state.allProducts,
  userId: state.auth.id,
  isLoggedIn: !!state.auth.id,
}}

const mapDispatchToProps = (dispatch, {history}) => ({
  getProds: () => dispatch(fetchProducts()),
  addToCarts: (infoObject) => dispatch(addToCartThunk(infoObject,history)),
  guestCart: (product) => dispatch(addToGuestCart(product))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
