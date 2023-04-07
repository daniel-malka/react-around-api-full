const mongoose = require('mongoose');
const validator = require('validator');
const { Schema, model } = mongoose;

const { emailRegex, urlRegex } = require('../utils/regex');

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
      validate: {
        validator: (value) => value.match(urlRegex),
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
      password: {
        type: String,
        required: [true, 'Password is required'],
        select: false,
      },
    },
  },
  { versionKey: false }
);
module.exports = model('user', userSchema);
