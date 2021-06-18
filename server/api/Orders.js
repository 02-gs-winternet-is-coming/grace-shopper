const router = require('express').Router();
const Order = require('../db/models/Order');
const Product = require('../db/models/Product')


// GET route for users current order/cart
router.get('/:userId', async (req, res, next) => {
  try {
    const usersCart = await Order.findOne({
      where: {
        userId: req.params.userId,
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
