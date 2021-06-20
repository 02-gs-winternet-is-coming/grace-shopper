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

// Create new user; cannot be admin
router.post('/', async (req, res, next) => {
  try {
    if (!req.body.isAdmin) {
      const newUser = await User.create(req.body);
      res.status(201).send(newUser.username);
    }
  } catch (err) {next(err)}
})

router.get('/', requireToken, async (req, res, next) => {
  // console.log('req.user in router', req.user)
  try {
    if (req.user.isAdmin) {
      const users = await User.findAll();
      res.status(201).send(users);
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
      await user.update(req.body);
      res.json(user);
    }
  } catch (err) {next(err)}
})
