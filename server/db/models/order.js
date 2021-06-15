const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  tax: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  shipping: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  shippingMethod: {
    type: Sequelize.STRING,
    defaultValue: 'USPS'
  },
  paymentMethod: {
    type: Sequelize.ENUM,
    values: ['Stripe', 'Bitcoin', 'Credit Card', 'Venmo', 'Paypal'],
    defaultValue: 'Stripe'
  }
});

module.exports = Order;
