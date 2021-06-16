//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/user');

const Product = require('./models/product');

const Order_Product = require('./models/order_product');

const Order = require('./models/order');

//associations could go here!
User.hasMany(Order);
Order.belongsTo(User);
Order.belongsToMany(Product, { through: Order_Product });
Product.belongsToMany(Order, { through: Order_Product });

module.exports = {
  db,
  models: {
    User,
    Product,
    Order_Product,
    Order,
  },
};
