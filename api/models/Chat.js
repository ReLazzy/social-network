const mongoose = require('mongoose');
const Message = require('./Message');

const ChatSchema = new mongoose.Schema(
  {
    usersId: {
      type: [],
      required: true,
    },
    name: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    messages: {
      type: Array,
      ref: Message,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Chat', ChatSchema);
