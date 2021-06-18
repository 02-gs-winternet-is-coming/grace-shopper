const router = require('express').Router();
<<<<<<< HEAD:server/api/products.js
const {models: User, Product} = require('../db/');

async function requireToken(req, res, next) {
  try {
    const token = req.headers.authorization;
    const userObj = await User.findByToken(token);
    req.user = userObj;
    next();
  } catch (error) {
    next(error);
  }
}

=======
const Product = require('../db/models/Product');

// GET api/products
>>>>>>> 994d6cd02f90b17c4d05f47b0d7b01b91a78db78:server/api/Products.js
router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll();
    res.send(allProducts);
  } catch (err) {
    next(err);
  }
})

// Admin only
router.post('/', requireToken, async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      const product = await Product.create(req.body);
      res.status(201).send(product);
    } catch (err) {next(err)}
  }
})

router.get('/:productId', async (req, res, next) => {
    try {
        let product = await Product.findOne({
            where: { id: req.params.productId }
        });
        res.json(product);
    } catch (error) {
        next(error);
    }
});

// Admin only
router.put('/:productId', requireToken, async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      let product = await Product.findOne({
        where: { id: req.params.productId }
      });
      await product.update(req.body);
      res.status(201).send(product);
    } catch (err) {next(err)}
  }
})

// Admin only
router.delete('/:productId', async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      const product = await Product.findByPk(req.params.productId);
      await product.destroy();
      res.status(201).send('successful deletion');
    } catch (err) {next(err)}
}
})

module.exports = router;

