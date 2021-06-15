const Sequelize = require('sequelize');
const db = require('../db');

const Order_Product = db.define('order product', {
    price: {
        type: Sequelize.INTEGER,
    },
    totalQuantity: {
        type: Sequelize.INTEGER,
    },
    totalPrice: {
        type: Sequelize.DECIMAL,
    }
});

module.exports = Order_Product;