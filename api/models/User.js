const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
      unique: true,
      maxlength: 20,
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    lastname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      maxlength: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    birthday: {
      type: Date,
      required: true,
    },
    profilePicture: {
      type: String,
      default: 'avatar.png',
    },
    coverPicture: {
      type: String,
      default: 'background.jpg',
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    city: {
      type: String,
      maxlength: 50,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
