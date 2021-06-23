const router = require('express').Router();
const {
    models: { Order, Product, User, Order_Product },
} = require('../db/index')

router.get('/:userId', async (req, res, next) => {
    try {
      const cart = await Order.findOne({
        where: {
          userId: req.params.userId,
          status: 'open'
        },
        include: {
          model: Product,
          attributes: ['name', 'imageUrl', 'price', 'description']
      }
  })
      res.status(200).send(cart);
    } catch(err) {
      console.log('Error inside your get all orders for this user Route', err);
      next(err);
    }
  })

//add a product to cart
router.post('/', async (req, res, next) => {
    try {
        const userId = req.body[0].id
        const product = req.body[1]
        const quantityType = req.body[2]

        let currentOrder = await Order.findOne({
            where: {
                userId: userId, status: 'open'
            }
        })
        let user = await User.findByPk(userId)
        if (!currentOrder) {
            currentOrder = await Order.create()
            user.addOrders(currentOrder)
        }
        let orderProduct = await Order_Product.findOne({
            where: {
                orderId: currentOrder.id,
                productId: product.id
            }
        })
        if (orderProduct && quantityType.type === 'increment') {
           orderProduct.quantity++
           orderProduct.save()
        }
        else if (orderProduct && quantityType.type === 'decrement' && orderProduct.quantity >= 1) {
            orderProduct.quantity--
            orderProduct.save()
         }
        let newProduct = await Product.findByPk(product.id)
        await currentOrder.addProducts(newProduct)
        res.status(201).send(newProduct)
    } catch (err) {
        next(err)
    }
})

router.post('/guest/:id', async (req, res, next) => {
    try {
        /* suggest moving this logic to front end
        if (!req.body.id) {
            let guestUserId = []
            while(guestUserId.length < 1){
                let num = Math.floor(Math.random() * 100000) + 1;
                guestUserId.push(num);
                req.body.id = Number(guestUserId);
            }
        */
        const guestOrder = await Order.create(req.body);
        res.status(201).send(guestOrder)
    } catch(err) {
        console.log('error in your post new order API ROUTE: ', err);
        next(err);
    }
})

router.put('/:userId', async (req, res, next) => {
    try {
        const order = await Order.findOne({
            where: {
                userId: req.params.userId,
                status: 'open'
            }
        });
        res.send(await order.update(req.body)).status(204);
    } catch(err) {
        next(err);
    }
})

router.delete('/:userId/:productId', async (req, res, next) => {
    try {
        let currentOrder = await Order.findOne({
            where: {
                userId: req.params.userId, status: 'open'
            }
        })
        let product = await Product.findByPk(req.params.productId)
        await currentOrder.removeProduct(product)
        res.status(201).send(product)
    } catch(error) {
        next(error)
    }
})

module.exports = router;