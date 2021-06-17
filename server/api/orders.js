const router = require('express').Router();
const { 
    models: { Order, Product, User }, 
} = require('../db/index')

//add a product to cart
//route: '/orders/:userId
router.post('/:userId', async (req, res, next) => {
    try {
        //find open order based on userId
        const currentOrder = await Order.findOne({
            where: {
                userId: req.params.userId, status: 'open'
            }
        })
        //if user does not have an open order, create one for the user
        const user = await User.findByPk(req.params.userId)
        if (!currentOrder) {
            currentOrder = await Order.create()
            user.addOrders(currentOrder)
        }
        //add the product from incoming body to the current order of the user
        const product = await Product.findByPk(req.body.id)
        await currentOrder.addProducts(product)
        //send status code and the product you want to add to the cart
        res.status(201).send(product)
    } catch (err) {
        next(err)
    }
})

module.exports = router