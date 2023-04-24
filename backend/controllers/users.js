const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserSchema = require('../models/user');

const { JWT_SECRET } = require('../utils/config');

function login(req, res, next) {
  const { email, password } = req.body;

  return UserSchema.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res.send({ user, token });
    })
    .catch(() => {
      next(new Error(`Incorrect email or password`));
    });
}
// const createUser = (req, res, next) => {
//   const { name, about, avatar, email, password } = req.body;
//   UserSchema.findOne({ email })
//     .then((user) => {
//       if (user) {
//         // user already exists

//         const error = new Error('a user with this email already exists');
//         error.status = 409;

//         throw error;
//       }
//       // user does not exist, so spit out a hashed password
//       return bcrypt.hash(password, 11);
//     })
//     .then((hash) =>
//       UserSchema.create({ name, about, avatar, email, password: hash })
//         .then((user) => {
//           // Return the user object with password field excluded
//           const { password, ...userWithoutPassword } = user.toObject();
//           res.status(201).send({ user: userWithoutPassword });
//         })
//         .catch((err) => {
//           if (err.name === 'Validation Error') {
//             next(
//               new Error(
//                 `${Object.values(err.errors)
//                   .map((error) => error.message)
//                   .join(', ')}`
//               )
//             );
//           } else {
//             next(err);
//           }
//         })
//     );
// };
const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  UserSchema.findOne({ email })
    .then((user) => {
      if (user) {
        // user already exists

        const error = new Error('a user with this email already exists');
        error.status = 409;
        throw error;
      }
      // user does not exist, so spit out a hashed password
      return bcrypt.hash(password, 11);
    })
    .then((hash) =>
      UserSchema.create({ name, about, avatar, email, password: hash })
        .then((user) => res.status(201).send({ user }))
        .catch((err) => {
          if (err.name === 'Validation Error') {
            next(
              new Error(
                `${Object.values(err.errors)
                  .map((error) => error.message)
                  .join(', ')}`
              )
            );
          } else {
            next(err);
          }
        })
    );
};
const updateUserData = (req, res) => {
  const { _id } = req.user;
  const { name, about, avatar } = req.body;

  UserSchema.findByIdAndUpdate(
    _id,
    { $set: { name, about, avatar } },

    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error(`User with this id (${_id}) was not found`);
      error.status = 404;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({ message: `the user id (${_id}) is not correct` });
      } else if (res.status === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'somthing went wrong' });
      }
    });
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;

  if (!name || !about) {
    return res.status(400).send({ message: 'name and about cant be empty' });
  }

  updateUserData(req, res);
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  if (!avatar) {
    return res.status(400).send({ message: `avatar cant be empty` });
  }

  updateUserData(req, res);
};

const getUsers = (req, res) => {
  UserSchema.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() =>
      res
        .status(500)
        .send({ message: 'An error has occured.. please try again later' })
    );
};
const getUserId = (req, res) => {
  const { id } = req.params;
  UserSchema.findById(id)
    .orFail(() => {
      const error = new Error('No user found with this Id');
      error.status = 404;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: err.message });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'An error has occured' });
      }
    });
};
const getCurrentUser = (req, res, next) => {
  UserSchema.findById(req.user._id)
    .orFail(() => {
      const error = new Error('No user found with this Id');
      error.status = 404;
      throw error;
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  updateUserInfo,
  updateUserAvatar,
  getUsers,
  getCurrentUser,
  getUserId,
  login,
};
