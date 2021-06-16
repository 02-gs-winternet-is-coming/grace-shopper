const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    description: {
        type: Sequelize.TEXT,
    },
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
            min: 0,
        }
    },
    imageUrl: {
        type: Sequelize.TEXT,
        validate: {
            isUrl: true,
        },
        defaultValue: 'https://media.giphy.com/media/yZRoXvpZflasovKcmN/giphy.gif',
    },
    category: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
    }
});

module.exports = Product;