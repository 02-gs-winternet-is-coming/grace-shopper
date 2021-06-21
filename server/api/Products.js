const router = require('express').Router();
const Product = require('../db/models/Product')
const User = require('../db/models/User')

async function requireToken(req, res, next) {
  try {
    const token = req.headers.authorization;
    const userObj = await User.findByToken(token);
    req.user = userObj;
    next();
  } catch (err) {next(err)}
}

// GET api/products
router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll();
    res.send(allProducts);
  } catch (err) {next(err)}
})

//GET api/products/:id
router.get('/:productId', async (req, res, next) => {
  try {
    let product = await Product.findOne({
        where: { id: req.params.productId }
    });
    res.send(product)
    } catch(err) {next(err)}
})

router.post('/', requireToken, async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
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
    } catch (err) {next(err)}
})

// Admin only
router.put('/:productId', requireToken, async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
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
router.delete('/:productId', requireToken, async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    try {
      const product = await Product.findByPk(req.params.productId);
      await product.destroy();
      res.status(201).send('successful deletion');
    } catch (err) {next(err)}
  }
})

module.exports = router;

