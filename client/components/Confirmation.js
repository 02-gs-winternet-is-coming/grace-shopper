import React, { useReducer } from 'react'
import { connect } from 'react-redux'

class Confirmation extends React.Component {
  componentDidMount() {
    try {
      console.log("this is props: ", this.props)
    } catch(err) {
      console.log('error inside Confirmation component did mount', err)
      console.error(err);
    }
  }

  render() {
    return (
      <div>
        <div>
          <h1>Thank you for your order!</h1>
          <h2>We are processing your order now, here are the details:</h2>
        </div>
          <p>Confirmation will be sent to: [email address]</p>
          <p>Order Number: [order id]</p>
          <p>Order Date: [order.createdAt]</p>
          <p>Shipping Method: [order.shippingMethod]</p>
          <div>
            <h3>Summary:</h3>
            Subtotal before delivery: [$1.00]
            Shipping cost: [order.shipping]
            Payment Method: [order.paymentMethod]
          </div>
      </div>
    )
  }
}

// const mapDispatchToProps = () => {
//   return {
//     getConfirm: () => dispatch()
//   }
// }

export default connect(null, mapDispatchToProps)(Confirmation)
