const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  tax: {
    type: Sequelize.DECIMAL,
  },
  shipping: {
    type: Sequelize.DECIMAL,
  },
  shippingMethod: {
    type: Sequelize.STRING,
  },
  paymentMethod: {
    type: Sequelize.ENUM,
    values: ['Stripe', 'Bitcoin', 'Credit Card', 'Venmo', 'Paypal'],
  },
  status: {
    type: Sequelize.ENUM,
    values: ['open', 'closed'],
    defaultValue: 'open'
  }
});

module.exports = Order;
