const Sequelize = require('sequelize');
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

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
  },
  guestId: {
    type: Sequelize.STRING
  }
});

Order.addHook('beforeCreate', (order, options) => {
  if (!order.userId) order.guestId = uuidv4();
})

module.exports = Order;
