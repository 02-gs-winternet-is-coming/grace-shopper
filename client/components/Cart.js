import axios from 'axios'
import React from 'react'
import { connect } from 'react-redux'

import { fetchCart, deleteProductThunk, addToCartThunk, deleteQuantityThunk } from '../store/cart'
import history from '../history'


class Cart extends React.Component {
    constructor() {
        super()
        this.incrementQuantity = this.incrementQuantity.bind(this)
        this.decrementQuantity = this.decrementQuantity.bind(this)
        this.state = {
            cart: []
        }
    }
    async componentDidMount() {
        // const TOKEN = 'token';
        // const token = window.localStorage.getItem(TOKEN)
        // localStorage.clear()
        const guestCart = JSON.parse(localStorage.getItem('guestCart'))
        this.setState({cart: guestCart})
        let id = Number(this.props.match.params.userId)
        await this.props.getCart(id)
    }
    async componentDidUpdate(prevProps){
        if (prevProps.userId !== this.props.userId) {
            await this.props.getCart(this.props.userId);
        }   
    }
    async incrementQuantity(event) {
        event.persist()
        if(this.props.isLoggedIn){
        const quantityType = event.target.value
        const { data } = await axios.get(`/api/products/${event.target.id}`)
        await this.props.increment([this.props.cart.userId, data, quantityType])
    } else {   // await this.props.addToGuestCart(this.props.product)
        let existingCart = await JSON.parse(localStorage.getItem('guestCart'))
        let truthyValue;
        let id = Number(event.target.id)
        if (!existingCart) {
          existingCart = []
        localStorage.setItem('guestCart', JSON.stringify(existingCart))
        } else { 
          //here it maps through the elements in the ucrrent cart, if it finds one it iterates the quantity
       existingCart.map(mapproduct => {
          if(mapproduct.id === id) {
            mapproduct.quantity++
            truthyValue = true
            return truthyValue
          } 
      })
      }
    //    localStorage.setItem('latestItem', JSON.stringify(currentProduct))
       localStorage.setItem('guestCart', JSON.stringify(existingCart))}
       window.location.reload(true)
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
        const guests = this.state.cart || []
        return (
            <div>
                { this.props.isLoggedIn ?
                <div>
                  {cartProducts.map(product => {
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
                <p>total: $ {Number(stringTotal)}</p>
                <div><button> Clear Cart </button> <button>Check Out</button></div>
                </div>
         :  
               <div> { guests.map(product => {
                       return(
                        <div key={product.id}>
                       <img src={product.imageUrl} /> 
                       <h1>{product.name}</h1>
                       <p>quantity: {product.quantity} <button>-</button> <button id={product.id} onClick={this.incrementQuantity}>+</button></p>
                       <p>{product.price}</p>
                       </div>)  
                }) }
                <p>total: ${guests.reduce((accum, product) => {let subTotal = product.quantity * product.price; return accum + subTotal},0).toFixed(2)}</p>
                <div><button> Clear Cart </button> <button>Check Out</button></div>
            </div> }
           </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.storageReducer,
        guestCart: state.guestCart,
        isLoggedIn: !!state.auth.id,
    }
}

const mapDispatchToProps = (dispatch, { history }) => {
    return {
        getCart: (id) => dispatch(fetchCart(id)),
        deleteProduct: (productId, productName, userId) => dispatch(deleteProductThunk(productId, productName, userId, history)),
        increment: (infoObj) => dispatch(addToCartThunk(infoObj, history)),
        decrement: (infoObj) => dispatch(deleteQuantityThunk(infoObj, history)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
