const mongoose = require('mongoose');
const validator = require('validator');
const { Schema, model } = mongoose;

const { emailRegex, urlRegex } = require('../utils/regex');

const userSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Jacques Cousteau',
    },
    about: {
      required: true,
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Explorer',
    },
    avatar: {
      required: true,
      type: String,
      default:
        'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
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
