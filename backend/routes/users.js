const router = require('express').Router();
const {
  validateProfile,
  validateAvatar,
  validateObjectId,
} = require('../middlewars/validation');
const {
  updateUserInfo,
  updateUserAvatar,
  getUsers,
  getCurrentUser,
  // getUserId,
} = require('../controllers/users');

router.get('/', getUsers);
// router.get('/me', validateObjectId, getUserId);
router.get('/me', validateObjectId, getCurrentUser);
router.patch('/me', validateProfile, updateUserInfo);
router.patch('/me/avatar', /* validateAvatar, */ updateUserAvatar);

module.exports = { userRouter: router };
