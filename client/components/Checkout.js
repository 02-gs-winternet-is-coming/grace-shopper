import React from 'react'
import { connect } from 'react-redux'
import { fetchCart, confirmedCart } from '../store/cart'

const initialState = {
  shippingMethod: 'UPS Ground',
  paymentMethod: 'Stripe',
  username: '',
  orderStatus: 'open'
}

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.getCart = this.props.getCart.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    await this.props.getCart(this.props.match.params.userId);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.placeOrder();
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render() {
    console.log('checkout props', this.props)
    console.log('storagereducer', this.state)
    const { handleSubmit, handleChange } = this;

    return(
      <>
        <div id="customerType">
          <button type="change">Guest Checkout</button>
          <button type="change">Member Checkout</button>
        </div>
        <h2>Order Summary</h2>
        <div>
          <h4>Shipping Method:</h4>
          <form>
            <label>
              Shipping Method:
              <select value={this.state.shippingValue} onChange={handleChange}>
                <option value="UPS Ground">UPS Ground</option>
                <option value="UPS Overnight">UPS Overnight</option>
                <option value="USPS">US Postal Service</option>
              </select>
            </label>
          </form>
          <form>
            <label>
              Payment:
              <select value={this.state.paymentValue} onChange={handleChange}>
                <option value="Stripe">Stripe</option>
                <option value="Bitcoin">Bitcoin</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Venmo">Venmo</option>
                <option value="Paypal">Paypal</option>
              </select>
            </label>
          </form>
        </div>
        <div>
          <p>place holder for subtotal: [$0.00]</p>
          <p>place holder for tax cost: </p>
          <p>place holder for order total cost: </p>
        </div>
        <button onClick={handleSubmit} >
          Submit Order
        </button>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  cart: state.storageReducer
})

const mapDispatchToProps = (dispatch, { history }) => ({
  getCart: (id) => dispatch(fetchCart(id)),
  placeOrder: (id) => dispatch(confirmedCart(id, history))
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
