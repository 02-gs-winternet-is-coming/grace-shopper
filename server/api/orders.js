const router = require('express').Router();
const Order = require('../db/models/order');

// GET route for users current order/cart
router.get('/:userId', async (req, res, next) => {
  try {
    console.log("this req.params.id", req.params.userId)
    const usersCart = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'open'
      }
    })
    res.send(usersCart);
  } catch(err) {
    console.log('Error inside your get all orders for this user Route', err);
    next(err);
  }
})


module.exports = router;
