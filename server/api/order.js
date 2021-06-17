const router = require('express').Router();
const { 
    models: { Order, Product, User }, 
} = require('../db/index')

//add a product to cart
//route: '/orders/:userId
router.post('/:userId', async (req, res, next) => {
    try {
        const currentOrder = await Order.findOne({
            where: {
                userId: req.params.userId, status: 'open'
            }
        })
        const product = await Product.findByPk(req.body.id)
        const user = await User.findByPk(req.params.userId)
        if (!currentOrder) {
            currentOrder = await Order.create()
            user.
        }

    }
})