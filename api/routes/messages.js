const router = require('express').Router();
const Message = require('../models/Message');
const authMiddleware = require('../middlewaree/authMiddleware');

//add
router.post('/', authMiddleware, async (req, res) => {
  const newMessage = new Message({
    chatId: req.body.chatId,
    userId: req.user.id,
    text: req.body.text,
    img: req.body.img,
  });

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all
router.post('/all', authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find({
      chatId: req.body.chatId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get last
// router.post('/last', authMiddleware, async (req, res) => {
//   try {
//     const message = await Message.find({
//       chatId: req.body.chatId,
//     })
//       .sort({
//         createdAt: -1,
//       })
//       .limit(1);
//     res.status(200).json(message);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
module.exports = router;
