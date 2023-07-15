const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema(
  {
    usersId: {
      type: [],
      required: true,
    },
    lastView: {
      type: [
        {
          userId: {
            type: String,
            required: true,
          },
          timestamp: {
            type: Date,
            default: Date.now,
            required: true,
          },
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Chat', ChatSchema);
