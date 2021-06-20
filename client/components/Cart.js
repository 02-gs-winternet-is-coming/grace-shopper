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
    async componentDidUpdate(prevProps){
        if (prevProps.userId !== this.props.userId) {
            await this.props.getCart(this.props.userId);
        }  
    }

    render() {
        let cartProducts = this.props.cart.products || []
        let userId = Number(this.props.match.params.userId)
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
                            <p>quantity: {product.orderProduct['quantity']}</p>
                            <div>
                                <button onClick={() => this.props.deleteProduct(product.orderProduct['productId'], product.name, userId)}>Remove</button>
                            </div>
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