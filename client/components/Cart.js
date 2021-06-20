import React from 'react'
import { connect } from 'react-redux'
import { fetchCart, deleteProductThunk } from '../store/cart'

class Cart extends React.Component {
    constructor() {
        super()
    }
    async componentDidMount() {
        let id = Number(this.props.match.params.userId)
        await this.props.getCart(id)
    }

    render() {
        let cartProducts = this.props.cart.products
        console.log(cartProducts)
        return (
            <div>
                {!cartProducts || cartProducts.length === 0 ? 'Nothing in Cart' :
                cartProducts.map(product => {
                    return (
                        <div key={product.orderProduct['productId']}>
                            <h1>{product.name}</h1>
                            <img src={product.imageUrl} />
                            <p>${product.price}</p>
                            <p>{product.description}</p>
                            <div>
                                <button onClick={(productId, productName, userId) => this.props.deleteProduct(productId, productName, userId)}>Remove</button>
                            </div>
                            <p>quantity: {product.orderProduct['quantity']}</p>
                            <button>Remove</button>
                        </div>
                    )
                })}
            <div> 
                <button> Clear Cart </button> 
            </div>
            <div>
                <button>Check Out</button>
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.storageReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCart: (id) => dispatch(fetchCart(id)),
        deleteProduct: (productId, productName, userId) => dispatch(deleteProductThunk(productId, productName, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)