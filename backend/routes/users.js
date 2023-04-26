const router = require('express').Router();
// const {
//   validateProfile,
//   validateAvatar,
//   validateObjectId,
// } = require('../middlewars/validation');
const {
  updateUserInfo,
  updateUserAvatar,
  getUsers,
  getUserId,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:id', getUserId);
router.patch('/users/me', updateUserInfo);
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = { userRouter: router };
