const Sequelize = require('sequelize');
const db = require ('../db');

const Cart = db.define('cart', {
  totalQuantity: {
    type: Sequelize.INTEGER
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  }
})

module.exports = Cart;
