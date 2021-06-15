const Sequelize = require('sequelize');
const db = require('../db');

const Cart_Product = db.define('cart product', {
    name: {
        type: Sequelize.DECIMAL,
    },
    price: {
        type: Sequelize.INTEGER,
    },
    totalQuantity: {
        type: Sequelize.INTEGER,
    },
    totalPrice: {
        type: Sequelize.VIRTUAL,
        get () {
            return this.getDataValue('price') * this.getDataValue('totalQuantity');
        }
    }
});

module.exports = Cart_Product;