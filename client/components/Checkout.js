import React from 'react'
import { connect } from 'react-redux'
import { fetchCart } from '../store/cart'

const initialState = {
  shippingMethod: '',
  username: '',
  orderStatus: 'open'
}

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.chooseShipping = this.chooseShipping.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    console.log('you have clicked Submit Order')
    // update state to set order status to closed -- here or confirmation comp..?
    this.props.history.push(`/confirm/${this.props.match.params.userId}`)
  }

  chooseShipping(event) {
    event.preventDefault();
    console.log('you have clicked on a shipping option')
    // update state here
  }

  render() {
    console.log('this is props', this.props)

    return(
      <>
        <div id="customerType">
            <button type="change">Guest Checkout</button>
            <button type="change">Member Checkout</button>
          </div>
        <h2>Order Summary</h2>
          <div>
            <p>place holder for subtotal: [$0.00]</p>
            <p>place holder for shipping cost: [$0.00]</p>
            <p>place holder for tax cost: [$0.00]</p>
            <p>place holder for order total cost: [$0.00]</p>
          </div>
        <div>
           <h4> Shipping Method:</h4>
              <button onClick={this.chooseShipping} > UPS Ground </button>
              <button onClick={this.chooseShipping} > UPS Overnight </button>
              <button onClick={this.chooseShipping} > USPS </button>
        </div>
            <button onClick={this.handleSubmit}> Submit Order </button>
      </>
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
      getCart: (id) => dispatch(fetchCart(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
