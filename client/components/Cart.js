import React from 'react'
import { connect } from 'react-redux'
import { fetchCart } from '../store/cart'

class Cart extends React.Component {
    constructor() {
        super()
    }
    async componentDidMount() {
        let id = Number(this.props.match.params.userId)
        await this.props.getCart(id)
        console.log(id)
        console.log('props', this.props)
        console.log('props.match', this.props.match)
    }

    render() {
        let cart = this.props.cart || []
        let productList = cart[1]
        console.log('cart', cart)
        return (
            <div>
                {!productList || productList.length === 0 ? 'Nothing in Cart' :
                productList.map(product => {
                    return (
                        <div key={product.id}>
                            <h1>{product.name}</h1>
                            <img src={product.imageUrl} />
                            <p>{product.price}</p>
                            <p>{product.description}</p>
                        </div>
                    )
                })}
            <button>Check Out</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('state', state)
    return {
        cart: state.storageReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCart: (id) => dispatch(fetchCart(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)