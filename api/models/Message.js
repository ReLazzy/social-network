const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', MessageSchema);
