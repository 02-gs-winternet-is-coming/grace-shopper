import { $CombinedState } from "redux"

const GUEST_CART = 'GUEST_CART'

const guestCart = (product) => ({
    type: GUEST_CART,
    product
    })

    export const addToGuestCart = (product) => {
        return async(dispatch) => {
          try {
            dispatch(guestCart(product))
          } catch(error){
            console.log(error)
          }
        }
      }

      export default function (state = [], action) {
        switch (action.type) {
      case GUEST_CART: 
      if(state.length === 0) {
          //then this is the first item added to cart...
          const newItem = action.product
          newItem.quantity = 1
          return [newItem]
      } else {
          let itemFound = false
          //theres stuff in state, we should map through and change the quantity if the item exists 
          const newState = state.map(product => {
              if(product.id === action.product.id) {
                  product.quantity++
                  itemFound = true
              } return product
          })
          if(!itemFound) {
              action.product.quantity = 1
              return [...newState, action.product]
          } return [...newState]
      }
      default: 
      return state
        }
    }