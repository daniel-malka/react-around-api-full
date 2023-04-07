const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserSchima = require('../models/user');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;

const { JWT_SECRET } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;
  return UserSchima.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res.send({ data: user.toJSON(), token });
    })
    .catch(() => {
      next(new UnauthorizedError('Incorrect email or password'));
    });
};

const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  Users.findOne({ email })
    .then((user) => {
      if (user) {
        // user already exists
        throw new ConflictError('a user with this email already exists');
      }
      // user does not exist, so spit out a hashed password
      return bcrypt.hash(password, 10);
    })
    .then((hash) =>
      UserSchima.create({ name, about, avatar, email, password: hash })
        .then((user) => res.status(201).send({ data: user }))
        .catch((err) => {
          if (err.name === 'Validation Error') {
            const { errors } = err;
            const message = `${Object.values(errors)
              .map((error) => error.message)
              .join(', ')}`;
            res.status(400).send(message);
          } else {
            res.status(500).send({ message: 'somthing went wrong..' });
          }
        })
    );
};
const updateUserData = (req, res) => {
  const { _id } = req.user;
  const { name, about, avatar } = req.body;

  UserSchima.findByIdAndUpdate(
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
  UserSchima.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() =>
      res
        .status(500)
        .send({ message: 'An error has occured.. please try again later' })
    );
};
const getUserId = (req, res) => {
  const { id } = req.params;
  UserSchima.findById(id)
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
  UserSchima.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('No user found with this Id');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(err.message));
      } else if (err.name === 'ValidationError') {
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