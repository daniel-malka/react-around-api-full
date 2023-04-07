const router = require('express').Router();

const { userRouter } = require('./users');
const { cardRouter } = require('./cards');
const nonRoute = require('./nonRoute');
const { auth } = require('../middlewars/auth');

app.post('/signin', login);
app.post('/signup', createUser);

router.use(auth);

router.use('/', userRouter);
router.use('/', cardRouter);
router.use('*', nonRoute);

module.exports = { router };
