import React from 'react'
import { connect } from 'react-redux'
import { fetchCart, deleteProductThunk, updateCartThunk } from '../store/cart'

class Cart extends React.Component {
    constructor() {
        super()
    }
    async componentDidMount() {
        let id = Number(this.props.match.params.userId)
        await this.props.getCart(id)
    }
    async componentDidUpdate(prevProps){
        if (prevProps.userId !== this.props.userId) {
            await this.props.getCart(this.props.userId);
        }  
    }
    render() {
        let cartProducts = this.props.cart.products || []
        let userId = Number(this.props.match.params.userId)
        const total = cartProducts.reduce((accum, product) => {
            let subTotal = product.orderProduct['quantity'] * product.price
            return accum + subTotal
        }, 0)
        return (
            <div>
                {!cartProducts || cartProducts.length === 0 ? 'Nothing in Cart' :
                cartProducts.map(product => {
                    return (
                        <div key={product.orderProduct['productId']}>
                            <img src={product.imageUrl} /> 
                            {/* <h1>{product.name} <button onClick={() => this.props.deleteProduct(product.orderProduct['productId'], product.name, userId)}>Remove</button> </h1> */}
                            <p>${product.price}</p>
                            <p>{product.description}</p>
                            <p>quantity: {product.orderProduct['quantity']} <button>-</button> <button onClick={() => this.props.updateCart(userId, product.orderProduct['productId'])}>+</button> </p> 
                        </div>
                    )
                })}
                <p>total: ${total}</p>
            <div><button> Clear Cart </button> <button>Check Out</button></div>
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
        // updateCart: (userId, productId) => dispatch(updateCartThunk(userId, productId)),
        deleteProduct: (productId, productName, userId) => dispatch(deleteProductThunk(productId, productName, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)