const mongoose = require('mongoose');

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
