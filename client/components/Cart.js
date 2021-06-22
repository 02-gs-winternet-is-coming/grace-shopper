import axios from 'axios'
import React from 'react'
import { connect } from 'react-redux'
import { fetchCart, deleteProductThunk, addToCartThunk, deleteQuantityThunk } from '../store/cart'

class Cart extends React.Component {
    constructor() {
        super()
        this.incrementQuantity = this.incrementQuantity.bind(this)
        this.decrementQuantity = this.decrementQuantity.bind(this)
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
        const quantityType = event.target.value
        const { data } = await axios.get(`/api/products/${event.target.id}`)
        await this.props.increment([this.props.cart.userId, data, quantityType])
    }
    async decrementQuantity(event) {
        const quantityType = event.target.value
        const { data } = await axios.get(`/api/products/${event.target.id}`)
        await this.props.decrement([this.props.cart.userId, data, quantityType])
    }

    render() {
        let cartProducts = this.props.cart.products || []

        let userId = Number(this.props.match.params.userId)
        const stringTotal = cartProducts.reduce((accum, product) => {
            let subTotal = product.orderProduct['quantity'] * product.price
            return accum + subTotal
        }, 0).toFixed(2)
        
        return (
            <div>
                {!cartProducts || cartProducts.length === 0 ? 'Nothing in Cart' :
                cartProducts.map(product => {
                    return (
                        <div key={product.orderProduct['productId']}>
                            <img src={product.imageUrl} /> 
                            <h1>{product.name} <button onClick={() => this.props.deleteProduct(product.orderProduct['productId'], product.name, userId)}>Remove</button> </h1>
                            <p>${product.price}</p>
                            <p>{product.description}</p>
                            <p>quantity: {product.orderProduct['quantity']} <button id={product.orderProduct['productId']} value={"decrement"} onClick={this.decrementQuantity}>-</button> <button id={product.orderProduct['productId']} value={"increment"} onClick={this.incrementQuantity}>+</button> </p> 
                        </div>
                    )
                })}
                <p>total: ${Number(stringTotal)}</p>
            <div><button onClick={}> Clear Cart </button> <button>Check Out</button></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.storageReducer
    }
}

const mapDispatchToProps = (dispatch, { history }) => {
    return {
        getCart: (id) => dispatch(fetchCart(id)),
        deleteProduct: (productId, productName, userId) => dispatch(deleteProductThunk(productId, productName, userId, history)),
        increment: (infoObj) => dispatch(addToCartThunk(infoObj, history)),
        decrement: (infoObj) => dispatch(deleteQuantityThunk(infoObj, history)),
        // clear: (id) => dispatch(clearCartThunk(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)