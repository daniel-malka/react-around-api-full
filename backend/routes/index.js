const router = require('express').Router();

const { userRouter } = require('./users');
const { cardRouter } = require('./cards');
const nonRoute = require('./nonRoute');
const { auth } = require('../middlewars/auth');
const { createUser, login } = require('../controllers/users');

router.post('/signin', login);
router.post('/signup', createUser);

router.use('/', userRouter);
router.use('/', cardRouter);
router.use('*', nonRoute);

module.exports = { router };
