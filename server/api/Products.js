const router = require('express').Router();

const Product = require('../db/models/product');

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll();
    res.send(allProducts);
  } catch (err) {
    next(err);
  }
})

//GET api/products/:id
router.get('/:productId', async (req, res, next) => {
    try {
        let product = await Product.findOne({
            where: {
                id: req.params.id,
            },
        });
        res.json(product);
    } catch (error) {
        next(error);
    };
});

module.exports = router;

