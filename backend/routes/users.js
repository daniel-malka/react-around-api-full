const router = require('express').Router();
const {
  validateProfile,
  validateAvatar,
  validateObjectId,
} = require('../middlewars/validation');
const {
  updateUserInfo,
  updateUserAvatar,
  getCurrentUser,
  getUsers,
  getUserId,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:id', getUserId);
router.get('users/me', /*validateObjectId,**/ getCurrentUser);
router.patch('/users/me', /* validateProfile, **/ updateUserInfo);
router.patch('/users/me/avatar', /*  validateAvatar,*/ updateUserAvatar);

module.exports = { userRouter: router };
