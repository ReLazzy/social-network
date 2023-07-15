const router = require('express').Router();
const Chat = require('../models/Chat');
const User = require('../models/User');
const Message = require('../models/Message');
const authMiddleware = require('../middlewaree/authMiddleware');




//get unreadMessage in chat
router.post('/unreadMessage', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const chat = await Chat.findById(req.body.chatId);

    const lastVievTime = chat.lastView.find(
      (a) => a.userId === userId
    ).timestamp;

    const unreadMessageCount = await Message.countDocuments({
      chatId: chat._id,
      userId: { $ne: userId },
      createdAt: { $gt: lastVievTime },
    });
console.log(unreadMessageCount)
    res.status(200).json(unreadMessageCount);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get unreadChats of a user
router.post('/unreadChats', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    // Найти все чаты пользователя
    const userChats = await Chat.find({
      usersId: { $in: [userId] },
    });

    const chats =[];
    // Обход каждого чата и проверка количества непрочитанных сообщений
     for (const chat of userChats) {
      const lastViewTime = chat.lastView.find(
        (view) => view.userId === userId
      ).timestamp;
      const hasUnreadMessages = await Message.exists({
        chatId: chat._id,
        userId: { $ne: userId },
        createdAt: { $gt: lastViewTime },
      });

      hasUnreadMessages && chats.push(chat._id);
    }
console.log("unreadChats",chats)
    res.status(200).json({chats:chats});
  } catch (err) {
      console.log(err)
    res.status(500).json(err);
  }
});


//new chat
router.post('/', authMiddleware, async (req, res) => {

  const newChat = new Chat({
    usersId: [req.user.id, req.body.receiverId],
    lastView:[{
        userId:req.user.id,
        timestamp: Date.now()
    },
    {
        userId:req.body.receiverId,
        timestamp: Date.now()
    }]
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

    if(hasExactUsers) {
        const chatId = chat._id;
        const userId = req.user.id;
        const currentTime = Date.now();

        const updatedChat = await Chat.findOneAndUpdate(
          { _id: chatId, lastView: { $elemMatch: { userId: userId } } }, // Фильтр для поиска чата с соответствующим идентификатором и существующим объектом lastView для данного пользователя
          { $set: { 'lastView.$.timestamp': currentTime } }, // Обновление значения timestamp в найденном элементе массива lastView
          { new: true } // Опция, чтобы вернуть обновленный документ
        );
        res.status(200).json(updatedChat) 
    }else res.status(400);
  } catch (err) {
    res.status(500).json(err);
  }
});
// router.post('/update', authMiddleware, async (req, res) => {
//   try {
//     const chatId = req.body.chatsId;
//     const userId = req.user.id;
//     const currentTime = Date.now();

//     const updatedChat = await Chat.findOneAndUpdate(
//       { _id: chatId, lastView: { $elemMatch: { userId: userId } } }, // Фильтр для поиска чата с соответствующим идентификатором и существующим объектом lastView для данного пользователя
//       { $set: { 'lastView.$.timestamp': currentTime } }, // Обновление значения timestamp в найденном элементе массива lastView
//       { new: true } // Опция, чтобы вернуть обновленный документ
//     );
    
//     res.status(200).json(updatedChat);
//   } catch (err) {
//       console.log(err)
//     res.status(500).json(err);
//   }
// });


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
