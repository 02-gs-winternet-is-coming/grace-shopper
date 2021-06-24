import React from 'react'
import { connect } from 'react-redux'
import { fetchCart, confirmedCart } from '../store/cart'

class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirm: JSON.parse(localStorage.getItem('confirmation'))
    }
    this.getCart = this.props.getCart.bind(this);
  }

  async componentDidMount() {
    // Pull data from local storage
    // Make thunk request to complete order,
    // get back data, display data as
    // confirmation
    const {
      shippingMethod, paymentMethod, tax,
      shipping, id
    } = this.state.confirm;

    localStorage.removeItem('guestCart');

    await this.props.confirm(
      this.state.confirm.userId,
      {shippingMethod, shipping, tax, paymentMethod, id, status: 'closed'}
    );
    // await this.props.getCart(this.props.match.params.userId);
  }

  render() {
    console.log('confirmation props', this.props.cart)
    console.log('confirmation state:', this.state)

    return (
      <div id="confirmParent" >
      <div id="thankyou">
        <h1>Thank you for shopping with Good Morels!</h1>
        <img src="https://media.giphy.com/media/LkwOhjcFItMrOgFuww/giphy.gif" width="175" height="175" />
        <h4>Order Number: {this.state.confirm.id}</h4>
      </div>
      <div>
          <h4>We are processing your order now, here are the details:</h4>
          <p >Confirmation will be sent to: {this.state.confirm.username}</p>

          <h4>Order Summary:</h4>
            <p>Order Total: ${this.state.confirm.total}</p>
            <p>Shipping Method: {this.state.confirm.shippingMethod}</p>
            <p>Payment: {this.state.confirm.paymentMethod}</p>
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
      confirm: (userId, options) => dispatch(confirmedCart(userId, options))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation)
