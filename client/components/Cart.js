import axios from 'axios'
import React from 'react'
import { connect } from 'react-redux'
import cart, { fetchCart, deleteProductThunk, addToCartThunk, deleteQuantityThunk } from '../store/cart'
import { Link } from 'react-router-dom'

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.incrementQuantity = this.incrementQuantity.bind(this);
        this.decrementQuantity = this.decrementQuantity.bind(this);
        this.decrementLocal = this.decrementLocal.bind(this);
        this.deleteLocal = this.deleteLocal.bind(this);
        this.state = { cart: [] }
    }

    async componentDidMount() {
        // const TOKEN = 'token';
        // const token = window.localStorage.getItem(TOKEN)
        // localStorage.clear()
        const guestCart = JSON.parse(localStorage.getItem('guestCart'))
        this.setState({cart: guestCart})
        if (Number(this.props.match.params.userId) > 0) {
            await this.props.getCart(this.props.match.params.userId)
        }
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
        let existingCart = JSON.parse(localStorage.getItem('guestCart'))
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
            //here this is the item in the current state cart whose quantity we want to update to trigger a state change, what is state here??
            const stateCart = this.state

            return truthyValue
          }
      })
      }
        this.setState({cart: existingCart})
       localStorage.setItem('guestCart', JSON.stringify(existingCart))}
    }

    async decrementQuantity(event) {
        const { data } = await axios.get(`/api/products/${event.target.id}`)
        await this.props.decrement([this.props.cart.userId, data, 'decrement'])
    }

    decrementLocal(event) {
        let existingCart = JSON.parse(localStorage.getItem('guestCart'))
        let id = Number(event.target.id)
        existingCart.map(mapproduct => {
            mapproduct.id === id &&
            mapproduct.quantity > 1 &&
            mapproduct.quantity--
        })
        this.setState({ cart: existingCart })
        localStorage.setItem('guestCart', JSON.stringify(existingCart))//existingCart?
    }

    deleteLocal(id) {
        let existingCart = JSON.parse(localStorage.getItem('guestCart'));
        let updated = existingCart.filter(p => p.id !== id);
        this.setState({ cart: updated });
        localStorage.setItem('guestCart', JSON.stringify(updated));
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
            <div id="cartParent">
                <p id="cartItemsText">items in cart: {this.state.itemsinCart}</p>
                { this.props.isLoggedIn ?
                <div>
                  {cartProducts.map(product => {
                    return (
                        <div key={product.orderProduct['productId']}>
                            <Link to={`/products/${product.orderProduct['productId']}`}>
                            <img className ="cartImages" src={product.imageUrl} />
                            </Link>   
                            <h1>
                                {product.name}    </h1>
                                        
                                <button
                                onClick={() =>
                                    this.props.deleteProduct(
                                        product.orderProduct['productId'],
                                        product.name,
                                        userId)
                                }>
                                    Remove
                                </button>
             
                            <p>${product.price}</p>
                            <p>{product.description}</p>
                            <p>quantity: {product.orderProduct['quantity']}
                            {product.orderProduct['quantity'] > 1 &&
                                <button id={product.orderProduct['productId']} value={"decrement"} onClick={this.decrementQuantity}>-</button>
                            }
                            <button id={product.orderProduct['productId']} value={"increment"} onClick={this.incrementQuantity}>+</button> </p>
                        </div>
                    )
                })}

                <p>total: ${Number(stringTotal)}</p>
                <div>
                    <Link to={`/cart/checkout/${userId}`}>
                        <button>
                            Check Out
                        </button>
                    </Link>
                </div>

                </div>
         :
               <div>
                {guests.map(product => {
                    return (
                        <div key={product.id}>
                        <Link to={`products/${product.id}`}>
                        <img className ="cartImages" src={product.imageUrl} />
                        </Link>
                        <h1>
                            {product.name}
                            <button
                            onClick={() =>
                            this.deleteLocal(product.id)}
                            >
                                Remove
                            </button>
                        </h1>
                        <p>quantity: {product.quantity}
                            <button
                            id={product.id} type="decrement"
                            onClick={this.decrementLocal}>-
                            </button>
                            <button
                            id={product.id}
                            onClick={this.incrementQuantity}>+
                            </button>
                       </p>
                       <p>${product.price}</p>

                       </div>
                    )}
                )}
                <p>total: ${
                    guests.reduce(
                        (accum, product) =>
                            {let subTotal = product.quantity * product.price;
                            return accum + subTotal},
                        0).toFixed(2)
                    }
                </p>
                <div>
                    <button
                    onClick={() => {
                        if (localStorage.getItem('guestId') === null) {
                            localStorage.setItem(
                                'guestId',
                                Math.floor(Math.random() * 100000) + 1
                            )
                        }
                        this.props.history.push(
                        `/cart/checkout/${localStorage.getItem('guestId')}`
                        )
                    }}>
                        Check Out
                    </button>
                </div>
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
