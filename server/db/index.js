//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');

const Product = require('./models/product');

const Order_Product = require('./models/order_product')

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Product,
    Order_Product,
  },
}
