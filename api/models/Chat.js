const mongoose = require('mongoose');
const Message = require('./Message');

const ChatSchema = new mongoose.Schema(
  {
    usersId: {
      type: [],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Chat', ChatSchema);
