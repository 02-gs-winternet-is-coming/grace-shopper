const router = require('express').Router()

router.use('/orders', require('./Orders'))
router.use('/products', require('./Products'))
router.use('/users', require('./Users'))


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router;
