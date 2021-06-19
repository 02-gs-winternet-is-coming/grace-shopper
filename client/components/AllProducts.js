import React from 'react'
import { connect }from 'react-redux'
import {fetchProducts} from '../store/allproducts'
import { Link, Route } from "react-router-dom"
import SingleProduct from './SingleProduct'

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

addToCart() {
console.log('hello!')
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
                    <button onClick={this.addToCart}>add to cart</button>
                    </div>)
            })}
            </div>
        </div>
    )
}
}

const mapStateToProps = (state) => {
    return {
        products: state.allProducts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProds: () => dispatch(fetchProducts())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
