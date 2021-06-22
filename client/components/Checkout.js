import React from 'react'
import { connect } from 'react-redux'
import { fetchCart } from '../store/cart'

const initialState = {
  shippingMethod: 'select shipping method',
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
    this.orderTotal = this.orderTotal.bind(this);
  }

  async componentDidMount() {
    await this.props.getCart(this.props.match.params.userId);
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.history.push(`/confirm/${this.props.match.params.userId}`)
  }

  handleChange(evt) {
    this.setState({
      shippingMethod: evt.target.name
    })
  }

  orderTotal() {
    let order = this.props.cart.products;
    console.log(typeof order)
    if (order !== undefined) {
      console.log('object keys', Object.keys(order), order)
    }
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
            <p>place holder for subtotal: [$0.00]</p>
            <p>place holder for tax cost: </p>
            <p>place holder for order total cost: {this.orderTotal()}</p>
          </div>
        <div>
           <h4>Shipping Method:</h4>
              <p>{this.state.shippingMethod}</p>
              <button
                name='UPS Ground'
                onClick={handleChange}
                > UPS Ground
              </button>
              <button
                value={this.state.shippingMethod}
                name='UPS Overnight'
                onClick={handleChange}
                > UPS Overnight
              </button>
              <button
                value={this.state.shippingMethod}
                name='USPS Overnight'
                onClick={handleChange}
                > USPS
              </button>
        </div>
            <button onClick={handleSubmit}> Submit Order </button>
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
