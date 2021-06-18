import React from 'react'
import { connect } from 'react-redux'
import { fetchCart } from '../store/cart'

class Cart extends React.Component {
    constructor() {
        super()
    }
    componentDidMount() {
        this.props.getCart()
    }

    render() {
        let cart = this.props.cart || []
        return (
            <div>
                {cart.map(product => {
                    return (
                        <div key={product.id}>
                            {product.name}
                        </div>
                    )
                })}
            <button>Check Out</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCart: (id) => dispatch(fetchCart(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)