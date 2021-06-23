import React from 'react'
import { connect } from 'react-redux'
import { fetchCart, confirmedCart } from '../store/cart'
import {Link} from 'react-router-dom'

const initialState = {
  shippingMethod: 'UPS Ground',
  shipping: 6,
  paymentMethod: 'Stripe',
  username: '',
  orderStatus: 'open',
  subtotalString: '',
  taxString: '',
  grandTotal: 0
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
    if (this.props.cart
      && this.props.cart.products
      && this.props.cart.products.length > 0) {
      let cartProducts = this.props.cart.products;
      let newSubtotal = cartProducts.reduce((accum, product) => {
        return accum + product.orderProduct['quantity'] * product.price
      }, 0);

      this.setState({
        subtotalString: newSubtotal.toFixed(2),
        taxString: (newSubtotal * .065).toFixed(2)
      })
    }

    await this.props.getCart(this.props.match.params.userId);
  }

  componentDidUpdate(prevProps, prevState) {

    const shippingLookup = {
      "UPS Ground": 6,
      "UPS Overnight": 25,
      "USPS": 3.25
    }

    if (prevProps.cart.length !== this.props.cart.length) {
      let cartProducts = this.props.cart.products || [];

      let newSubtotal = cartProducts.reduce((accum, product) => {
        return accum + product.orderProduct['quantity'] * product.price
      }, 0);

      this.setState({
        subtotalString: newSubtotal.toFixed(2),
        taxString: (newSubtotal * .065).toFixed(2)
      });
    }

    if (prevState.shippingMethod !== this.state.shippingMethod) {
      this.setState({
        shipping: shippingLookup[this.state.shippingMethod]
      })
    }
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.placeOrder(this.props.match.params.userId);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render() {
    console.log('this is checkout state: ', this.state)

    const { handleSubmit, handleChange } = this;
    console.log('this is props', this.state)
    console.log('STATE ', this.state)
    return(
      <>
        <div id="customerType">
          <button type="change">Guest Checkout</button>
          <button type="change">Member Checkout</button>
        </div>
        <h2>Order Summary</h2>
        <div>
          <h4>Shipping Method:</h4>
          <form className="checkoutform">
            <label>

              <span>Shipping Method:</span>

              <select name="shippingMethod" value={this.state.shippingValue} onChange={handleChange}>
                <option value="UPS Ground">UPS Ground</option>
                <option value="UPS Overnight">UPS Overnight</option>
                <option value="USPS">US Postal Service</option>
              </select>
            </label>
          </form>

          <form className="checkoutform">
            <label>
              <span>Payment:</span>
              <select name="paymentMethod" value={this.state.paymentValue} onChange={handleChange}>
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
          <p>Subtotal: ${this.state.subtotalString}</p>
          <p>Tax: ${this.state.taxString}</p>
          <p>Shipping: ${(this.state.shipping).toFixed(2)}</p>
          <p>-––––––</p>
          <p>
            Order Total:
              <span className="bold">
                &nbsp;${(Number(this.state.subtotalString) +
                Number(this.state.taxString) +
                this.state.shipping).toFixed(2)}
              </span>
          </p>
        </div>
        <Link to={`/confirm/${this.props.match.params.userId}`}>
          <button>
            Submit Order
          </button>
        </Link>

      </>
    )
  }
}

const mapStateToProps = (state) => ({
  cart: state.storageReducer,
})

const mapDispatchToProps = (dispatch, { history }) => ({
  getCart: (id) => {dispatch(fetchCart(id))},
  placeOrder: (id) => dispatch(confirmedCart(id, {
    shippingMethod: this.state.shippingMethod,
    paymentMethod: this.state.paymentMethod,
    tax: Number(this.state.taxString),
    shipping: this.state.shipping,
    status: 'closed'
  }, history))
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
