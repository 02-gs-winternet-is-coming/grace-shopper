const Sequelize = require('sequelize');
const db = require('../db');

const Order_Product = db.define('order product', {
    price: {
        type: Sequelize.INTEGER,
    },
    quantity: {
        type: Sequelize.INTEGER,
    },
});

module.exports = Order_Product;