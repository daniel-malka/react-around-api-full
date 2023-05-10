const isValideURL = require('valid-url');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const ErrorHandler = require('../errors/Error');

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Jacques Cousteau',
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Explorer',
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
      validate: {
        validator: (value) => isValideURL.isUri(value),
        message: 'invalid url',
      },
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: 'invalid Email please, use a valid Email address',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
  },

  { versionKey: false }
);

UserSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new ErrorHandler(401, 'Incorrect email or password')
        );
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new ErrorHandler(401, 'Incorrect email or password')
          );
        }
        return user;
      });
    });
};

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  const { password, ...rest } = obj;
  return rest;
};

module.exports = model('user', UserSchema);
