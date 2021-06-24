import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';
import { Badge } from '@material-ui/core';
import { fetchCart } from '../store/cart'

export class CartIcon extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tempCart: [] }
    }
    async componentDidMount () {
        const guestCart = JSON.parse(localStorage.getItem('guestCart'))
        this.setState({tempCart: guestCart})
        // await this.props.getCart(this.props.cart.userId)
    }
    async componentDidUpdate(prevProps) {
        if (this.props.user.id !== prevProps.user.id) {
            await this.props.getCart(this.props.user.id)
        }
    }
    render() {
        // console.log('products in cart', this.props.cart.products)
        const cartAmount = this.props.cart.products || []
        const userQuantity = cartAmount.reduce((accum, item) => {
            return item.orderProduct.quantity + accum 
        }, 0)
        const guests = this.state.tempCart || []
        let guestQuantity;
        if (guests.length > 0) {
            guestQuantity = guests.reduce((accum, item) => {
                console.log('item', item)
                return item.quantity + accum
            }, 0)
        }
        console.log('guests', guests)
        console.log('guestQuantity', guestQuantity)
        console.log(this.props.user.id)
        return(
            this.props.isLoggedIn ?
            <div>
                <Link to={`/cart/${this.props.user.id}`}>
                    <Badge badgeContent={userQuantity} color="secondary"></Badge> 
                       <ShoppingCartTwoToneIcon />           
                </Link>
            </div>
            :
            <div> 
                <Link to={'/cart'}>
                    <Badge badgeContent={guestQuantity} color="secondary"></Badge> 
                        <ShoppingCartTwoToneIcon />           
                </Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.storageReducer,
        user: state.auth,
        guestCart: state.guestCart,
        isLoggedIn: !!state.auth.id
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getCart: (id) => dispatch(fetchCart(id))
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(CartIcon)
