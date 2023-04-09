const router = require('express').Router();

// const {
//   validateAuthentication,
//   validateUserBody,
// } = require('../middlewars/validation');
const { userRouter } = require('./users');
const { cardRouter } = require('./cards');
const nonRoute = require('./nonRoute');
const auth = require('../middlewars/auth');
const { createUser, login } = require('../controllers/users');

router.post('/signup', /**validateUserBody,*/ createUser);
router.post('/signin', /**  validateAuthentication,*/ login);

router.use(auth);

router.use('/', userRouter);
router.use('/', cardRouter);
router.use('*', nonRoute);

module.exports = { router };
