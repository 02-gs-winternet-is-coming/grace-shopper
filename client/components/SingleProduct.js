import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'


// SCAFFOLDING
class SingleProduct extends Component {
  constructor(props) {
    super(props);
  }

  // We should be getting 'id' passed down from props
  componentDidMount () {
    this.props.fetch(this.props.id);
  }

  // To do: addSingleProductToCart function
  render () {
    const { name, price, description, imageUrl, category } = this.props.product;
    return (
      <div className="singleProductView">
        <h2>{name}</h2>
        <img src={imageUrl} />
        <div>
          {
            category.map((cat, idx) => {
              return (
                <span key={idx}>{cat}</span>
               )
            })
          }
        </div>
        <div>{price}</div>
        <button onClick={this.props.addSingleProductToCart}>Add to cart</button>
        <p>{description}</p>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    product: state.product
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetch: (id) => dispatch(fetchSingleProduct(id))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
