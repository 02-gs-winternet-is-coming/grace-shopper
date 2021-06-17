const Sequelize = require('sequelize');
const db = require('../db');

const Order_Product = db.define('order product', {
    price: {
        type: Sequelize.INTEGER,
        set (value) {
            this.setDataValue('price', value * 100);
        },
        get () {
            return this.getDataValue('price') / 100;
        }
    },
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        validate: {
            min: 1
        }
    },
});

module.exports = Order_Product;
