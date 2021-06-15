//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/user');

const Product = require('./models/product');

const Order_Product = require('./models/order_product');

const Cart = require('./models/cart');

const Order = require('./models/order');

const Cart_Product = require('./models/cart_product');

//associations could go here!
User.hasMany(Order);
Order.belongsTo(User);
Order.belongsToMany(Product, { through: Order_Product });
Product.belongsToMany(Order, { through: Order_Product });
User.hasOne(Cart);
Cart.belongsTo(User);
Product.belongsToMany(Cart, { through: Cart_Product })
Cart.belongsToMany(Product, { through: Cart_Product })

module.exports = {
  db,
  models: {
    User,
    Product,
    Order_Product,
    Cart,
    Order,
    Cart_Product,
  },
};
