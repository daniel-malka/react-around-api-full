const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserSchema = require('../models/user');
const error = require('../errors/Error');
const { JWT_SECRET = 'abrakadabra' } = process.env;

function login(req, res, next) {
  const { email, password } = req.body;

  return UserSchema.findUserByCredentials(email, password)
    .then((user) => {
      //   res.send({ 'user id': user._id, JWT_SECRET });
      // });
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res.send({ user, token });
    })
    .catch(() => {
      next(new error(401, 'incorrect email or password'));
    });
}

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  UserSchema.findOne({ email })
    .then((user) => {
      if (user) {
        next(new error(409, 'a user with this email already exists'));
      }
      // user does not exist, so spit out a hashed password
      return bcrypt.hash(password, 11);
    })
    .then((hash) => {
      UserSchema.create({ name, about, avatar, email, password: hash })
        .then((user) => res.status(201).send({ user }))
        .catch((err) => {
          if (err.name === 'Validation Error') {
            next(
              new error(
                400,
                `${Object.values(err.errors)
                  .map((error) => error.message)
                  .join(', ')}`
              )
            );
          } else {
            next(new error(500, 'internal server error'));
          }
        });
    });
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
      throw new error(404, `User with this id (${_id}) was not found`);
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new error(400, `the user id (${_id}) is not correct`));
      } else if (res.statusCode === 404) {
        next(new error(404, err.message));
      } else {
        next(err);
      }
    });
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;

  if (!name || !about) {
    next(new error(400, 'name and about cant be empty'));
  }

  updateUserData(req, res);
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  if (!avatar) {
    next(new error(400, `avatar cant be empty`));
  }

  updateUserData(req, res);
};

const getUsers = (req, res) => {
  UserSchema.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() =>
      next(new error(500, 'An error has occured.. please try again later'))
    );
};
const getUserId = (req, res) => {
  const { _id } = req.params;
  UserSchema.findById(_id)
    .orFail(() => {
      next(new Error(404, 'No user found with this Id'));
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new error(400, err.message));
      } else {
        next(err);
      }
    });
};

const getCurrentUser = (req, res, next) => {
  UserSchema.findById(req.user._id)
    .orFail(() => {
      next(new error(404, 'No user found with this Id'));
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new error(400, err.message));
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
