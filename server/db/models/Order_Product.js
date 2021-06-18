const Sequelize = require('sequelize');
const db = require('../db');

const Order_Product = db.define('order product', {

    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        validate: {
            min: 1
        }
    },
});


module.exports = Order_Product;
