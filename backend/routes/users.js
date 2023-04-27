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
  getCurrentUser,
  getUserId,
} = require('../controllers/users');

router.get('/users', getUsers);
// router.get('/users/me', getCurrentUser);
router.get('/users/me', getCurrentUser);
router.patch('/users/me', updateUserInfo);
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = { userRouter: router };
