const router = require('express').Router();
const { 
    models: { Order, Product, User, Order_Product }, 
} = require('../db/index')

//add a product to cart


router.post('/', async (req, res, next) => {
    try {
        const userId = req.body[0]['id']
        const product = req.body[1]
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
        //if product is in the order, increment the quantity in the cart
        let orderProduct = await Order_Product.findOne({
            where: {
                orderId: currentOrder.id,
                productId: product.id
            }
        })
        if (orderProduct) {
           orderProduct.quantity++
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

// //increase quantity of product in cart
// router.put('/:userId/:productId', async (req, res, next) => {
//     try {
//         const cart = await Order.findOne({
//             where: {
//               userId: req.params.userId,
//               status: 'open'
//             },
//             include: {
//                 model: Product,
//                 attributes: ['name', 'imageUrl', 'price', 'description']
//             },
//         })
//         let product = await Order_Product.findByPk(req.params.productId)
//         console.log('req.body ==>', req.body)
//         let updatedProduct = await product.increment('quantity')
//         let updatedCart = await cart.update(updatedProduct)
//         res.status(201).send(updatedCart)
//     } catch (err) {
//         next(err)
//     }
// })

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

    },
})
    res.status(200).send(cart);
  } catch(err) {
    console.log('Error inside your get all orders for this user Route', err);
    next(err);
  }
})


module.exports = router;

