const router = require('express').Router();

const { 
    models: { Order, Product, User, Order_Product }, 
} = require('../db/index')

//add a product to cart
router.post('/:userId', async (req, res, next) => {
    try {
        //find open order based on userId
        let currentOrder = await Order.findOne({
            where: {
                userId: req.params.userId, status: 'open'
            }
        })
        //if user does not have an open order, create one for the user
        let user = await User.findByPk(req.params.userId)
        if (!currentOrder) {
            currentOrder = await Order.create()
            user.addOrders(currentOrder)
        }
        //if product is in the order, increment the quantity in the cart
        let orderProduct = await Order_Product.findOne({
            where: {
                orderId: currentOrder.id,
                productId: req.body.id
            }
        })
        if (orderProduct) {
           orderProduct.quantity++
           orderProduct.save()    
        }
        //add the product from incoming body to the current order of the user
        let product = await Product.findByPk(req.body.id)
        await currentOrder.addProducts(product)
        //send status code and the product you want to add to the cart
        res.status(201).send(product)
    } catch (err) {
        next(err)
    }
})
//delete a product in cart
router.delete('/:userId/:orderId', async (req, res, next) => {
    try {
        let currentOrder = await Order.findOne({
            where: {
                userId: req.params.userId, status: 'open'
            }
        })
        let product = await Product.findByPk(req.params.orderId)

    } catch(error) {
        console.log(error)
    }
})


// GET route for users current orders/:id
router.get('/:userId', async (req, res, next) => {
  try {
    const usersCart = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'open'
      },
      include: Product
    })
    const { id, products, tax, shippingMethod, paymentMethod, userId } = usersCart
    const cartArray = [ id, products, tax, shippingMethod, paymentMethod, userId ]
    res.status(200).send(cartArray);
  } catch(err) {
    console.log('Error inside your get all orders for this user Route', err);
    next(err);
  }
})


module.exports = router;

