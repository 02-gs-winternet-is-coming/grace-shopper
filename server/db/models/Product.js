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
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        set (value) {
            this.setDataValue('price', value * 100);
        },
        get () {
            return this.getDataValue('price') / 100;
        }
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
        defaultValue: 'https://media.giphy.com/media/yZRoXvpZflasovKcmN/giphy.gif',
        set(value) {
            if (value == '' || value == ' ') {
                this.setDataValue('imageUrl', 'https://media.giphy.com/media/yZRoXvpZflasovKcmN/giphy.gif')
            }
        }
    },
    category: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
    }
});


module.exports = Product;
