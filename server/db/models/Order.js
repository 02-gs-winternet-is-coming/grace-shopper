const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  tax: {
    type: Sequelize.INTEGER,
    set (value) {
      this.setDataValue('tax', parseInt(value * 100));
  },
  get () {
      return this.getDataValue('tax') / 100;
  }
  },
  shipping: {
    type: Sequelize.INTEGER,
    set (value) {
      this.setDataValue('shipping', parseInt(value * 100));
    },
    get () {
      return this.getDataValue('shipping') / 100;
    }
  },
  shippingMethod: {
    type: Sequelize.ENUM,
    values: ['UPS Ground', 'UPS Overnight', 'USPS'],
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
});


module.exports = Order;
