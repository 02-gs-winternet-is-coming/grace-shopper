import React from 'react'
import { connect } from 'react-redux'
import { fetchCart } from '../store/cart'


class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.getCart = this.props.getCart.bind(this);
  }

  async componentDidMount() {
    await this.props.getCart(this.props.match.params.userId);
  }

  render() {
    console.log('this is this.props', this.props)
    const cart = this.props.cart || [];

    return(
      <div id="confirmParent" >
      <div id="thankyou">
        <h1>Thank you for shopping with Good Morels!</h1>
        <img src="https://media.giphy.com/media/LkwOhjcFItMrOgFuww/giphy.gif" width="175" height="175" />
        <h4>Order Number: {cart[0]}</h4>
      </div>
      <div>
          <h4>We are processing your order now, here are the details:</h4>
          <p >Confirmation will be sent to: [email address -- order.userId.username]</p>

          <h4>Order Summary:</h4>
            <p>Order Total: [$0.00]</p>
            <p>Shipping Method: {cart[3]}</p>
            <p>Payment: {cart[4]}</p>
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
      getCart: (id) => dispatch(fetchCart(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation)



// export const Confirmation = props => {

  // props.getCart(props.match.params.userId)
  // console.log("this is props", props.match.params.userId)

//   return (
//     <div id="confirmParent" >
//       <div id="thankyou">
//         <h1>Thank you for shopping with Good Morels!</h1>
//         <img src="https://media.giphy.com/media/LkwOhjcFItMrOgFuww/giphy.gif" width="175" height="175" />
//         {/* <h4>`Order Number: ${props.cart}`</h4> */}
//       </div>
//       <div>
//           <h4>We are processing your order now, here are the details:</h4>
//           <p >Confirmation will be sent to: [email address -- order.userId.username]</p>
//           <p>Order Date: [order.createdAt]</p>

//           <h4>Order Summary:</h4>
//             <p>Order Total: [$0.00]</p>
//             <p>Shipping Method:[order.shippingMethod]</p>
//             <p>Payment: [order.paymentMethod]</p>
//         </div>
//     </div>
//   )
// }
