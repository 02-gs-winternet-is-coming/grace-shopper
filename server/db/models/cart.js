const Sequelize = require('sequelize');
const db = require ('../db');

const Cart = db.define('cart', {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1
    }
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  }
})

module.exports = Cart;

