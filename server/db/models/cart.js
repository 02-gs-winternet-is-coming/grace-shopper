const Sequelize = require('sequelize');
const db = require ('../db');

const Cart = db.define('cart', {
  totalQuantity: {
    type: Sequelize.INTEGER
  },
  totalPrice: {
    type: Sequelize.DECIMAL,
    validate: {
      min: 0
    }
  }
})

module.exports = Cart;
