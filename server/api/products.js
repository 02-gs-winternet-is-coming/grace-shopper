const router = require('express').Router();
const { 
    models: { Product }, 
} = require('../db/models/product');

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