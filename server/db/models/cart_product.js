const Sequelize = require('sequelize');
const db = require('../db');

const Cart_Product = db.define('cart product', {
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

module.exports = Cart_Product;