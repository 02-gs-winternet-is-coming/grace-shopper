const router = require('express').Router();
const Order = require('../db/models/order');
const Product = require('../db/models/product')

// GET route for users current order/cart
router.get('/:orderId', async (req, res, next) => {
  try {
    const usersCart = await Order.findOne({
      where: {
        id: req.params.orderId,
        status: 'open'
      },
      include: {
        model: Product
      }
    })
    res.status(200).send(usersCart);
  } catch(err) {
    console.log('Error inside your get all orders for this user Route', err);
    next(err);
  }
})


module.exports = router;
