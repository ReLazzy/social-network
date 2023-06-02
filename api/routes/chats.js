const router = require('express').Router();
const Chat = require('../models/Chat');
const User = require('../models/User');
const authMiddleware = require('../middlewaree/authMiddleware');

//new chat
router.post('/', authMiddleware, async (req, res) => {
  const newChat = new Chat({
    usersId: [req.user.id, req.body.receiverId],
  });

  try {
    const usersArray = [req.user.id, req.body.receiverId];
    const chat = await Chat.findOne({
      usersId: {
        $all: usersArray,
      },
    });

    const chatUsers = chat ? chat.usersId.sort() : [];
    const inputUsers = usersArray.sort();

    const hasExactUsers =
      JSON.stringify(chatUsers) === JSON.stringify(inputUsers);

    if (hasExactUsers) res.status(200).json(true);
    else {
      const savedChat = await newChat.save();
      res.status(200).json(savedChat);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get chat by username
router.post('/userId', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.userId });
    const usersArray = [req.user.id, user._id.toString()];
    const chat = await Chat.findOne({
      usersId: {
        $all: usersArray,
      },
    });

    const chatUsers = chat ? chat.usersId.sort() : [];
    const inputUsers = usersArray.sort();

    const hasExactUsers =
      JSON.stringify(chatUsers) === JSON.stringify(inputUsers);

    hasExactUsers ? res.status(200).json(chat) : res.status(400);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get chats of a user
router.post('/user', authMiddleware, async (req, res) => {
  try {
    const chats = await Chat.find({
      usersId: { $in: [req.user.id] },
    });
    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
