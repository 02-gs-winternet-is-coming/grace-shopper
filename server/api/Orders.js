const router = require('express').Router();
const {
    models: { Order, Product, User, Order_Product },
} = require('../db/index')

// GET route for users current cart
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

        //find open order based on userId
        let currentOrder = await Order.findOne({
            where: {
                userId: userId, status: 'open'
            }
        })
        //if user does not have an open order, create one for the user
        let user = await User.findByPk(userId)
        if (!currentOrder) {
            currentOrder = await Order.create()
            user.addOrders(currentOrder)
        }
        //if product is in the order, increment/decrement the quantity in the cart
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
        //add the product from incoming body to the current order of the user
        let newProduct = await Product.findByPk(product.id)
        await currentOrder.addProducts(newProduct)
        //send status code and the product you want to add to the cart
        res.status(201).send(newProduct)
    } catch (err) {
        next(err)
    }
})

// add an order to the database, as guest user
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

// update order as a logged in user
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

//delete a product in cart
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