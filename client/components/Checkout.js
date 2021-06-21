import React from 'react'
import { connect } from 'react-redux'
import { fetchCart } from '../store/cart'


class Checkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shippingMethod: '',
    };

    this.chooseShipping = this.chooseShipping.bind(this);
  }

  // async componentDidUpdate() {
  //   await this.props.
  // }

  chooseShipping(event) {
    event.preventDefault();
    console.log('you have clicked on a shipping option')
  }

  render() {

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
