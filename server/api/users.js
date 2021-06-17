const router = require('express').Router()
const { models: { User, Order }} = require('../db')
module.exports = router

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

// Still trying to work out specifics of req.params
router.get('/:id', requireToken, async (req, res, next) => {
  try {
    if (req.user.id == req.params.id
      || req.user.isAdmin) {
      const {data: user} = await User.findOne({
        where: {id: req.params.id},
        include: {
          model: Order,
          where: {
            userId: req.params.id
          }
        }
      })
      res.json(user);
    }
  } catch (err) {next(err)}
})

router.get('/', requireToken, async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const {data: users} = await User.findAll();
      res.json(users);
    }
  } catch (err) {
    next(err);
  }
})

router.put('/:id', requireToken, async (req, res, next) => {
  try {
    if (req.user.id == req.params.id
      || req.user.isAdmin) {
      const {data: user} = await User.findOne({
        where: {id: req.params.id}
      })
      await user.update(req.params);
      res.json(user);
    }
  } catch (err) {next(err)}
})
