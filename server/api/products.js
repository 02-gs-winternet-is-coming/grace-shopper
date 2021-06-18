const router = require('express').Router();

const Product = require('../db/models/product');

// GET api/products
router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll();
    res.send(allProducts);
  } catch (err) {
    next(err);
  }
})

//GET api/products/:id
router.get('/:id', async (req, res, next) => {
  console.log(req)
    try {
        let product = await Product.findOne({
            where: {
                id: req.params.id,
            },
        });
        res.json(product);
    } catch (error) {
        next(error);
    }
});

module.exports = router;

