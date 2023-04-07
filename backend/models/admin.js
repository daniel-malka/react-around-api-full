const { model } = require('mongoose').mongoose;
const adminSchema = new Schema({
  email: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  string: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

module.exports = model('admin', adminSchema);
