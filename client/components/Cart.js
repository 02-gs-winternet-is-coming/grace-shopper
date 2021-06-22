import axios from 'axios'
import React from 'react'
import { connect } from 'react-redux'
import { fetchCart, deleteProductThunk, addToCartThunk } from '../store/cart'

class Cart extends React.Component {
    constructor() {
        super()
        this.incrementQuantity = this.incrementQuantity.bind(this)

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
    async incrementQuantity(event) {
        const {data} = await axios.get(`/api/products/${event.target.id}`)
        await this.props.updateCart([this.props.cart.userId ,data])
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
                {cartProducts.length > 0 &&
                cartProducts.map(product => {
                    return (
                        <div key={product.orderProduct['productId']}>
                            <img src={product.imageUrl} /> 
                            <h1>{product.name} <button onClick={() => this.props.deleteProduct(product.orderProduct['productId'], product.name, userId)}>Remove</button> </h1>
                            <p>${product.price}</p>
                            <p>{product.description}</p>
                            <p>quantity: {product.orderProduct['quantity']} <button>-</button> <button id={product.orderProduct['productId']}onClick={this.incrementQuantity}>+</button> </p> 
                        </div>

                    )
                })}
                {this.props.guestCart.length > 1 && this.props.guestCart.map(product => {
                       return(
                        <div key={product.id}>
                       <img src={product.imageUrl} /> 
                       <h1>{product.name}</h1>
                       <p>quantity: {product.quantity} <button>-</button> <button>+</button></p>
                       <p>{product.price}</p>
                       </div>)  
                })}
                <p>total: ${total}</p>
            <div><button> Clear Cart </button> <button>Check Out</button></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.storageReducer,
        guestCart: state.guestCart
    }
}

const mapDispatchToProps = (dispatch, { history }) => {
    return {
        getCart: (id) => dispatch(fetchCart(id)),
        deleteProduct: (productId, productName, userId) => dispatch(deleteProductThunk(productId, productName, userId, history)),
        updateCart: (infoObj) => dispatch(addToCartThunk(infoObj, history)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)