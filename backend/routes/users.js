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

router.get('/', getUsers);
// router.get('/users/me', getCurrentUser);
router.get('/me', getCurrentUser);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateUserAvatar);

module.exports = { userRouter: router };
