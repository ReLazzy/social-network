const User = require('../models/User');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const Post = require('../models/Post');
const authMiddleware = require('../middlewaree/authMiddleware');

//update user
router.put('/update', authMiddleware, async (req, res) => {
  if (req.body.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    } catch (err) {
      return res.status(500).json({ message: 'Пароль не изменен ' });
    }
  }
  try {
    const user = await User.findByIdAndUpdate(req.user.id, {
      $set: req.body,
    });
    const updateUser = await User.findById(req.user.id);

    const { password, updatedAt, isAdmin, createdAt, ...other } =
      updateUser._doc;
    res.status(200).json(other);
  } catch (err) {
    return res.status(500).json({ message: 'Акаунт не удалось обновить' });
  }
});

//get a user by username
router.post('/username', authMiddleware, async (req, res) => {
  try {
    const { username } = req.body;

    const user = await User.findOne({ username });

    const { password, updatedAt, isAdmin, createdAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get a user by id
router.post('/id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.body;

    const user = await User.findById(id);

    const { password, updatedAt, isAdmin, createdAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/friends', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const followers = user.followers;
    const followings = user.followings;
    const friendsIdList = followers.filter((x) => followings.indexOf(x) !== -1);
    const friendslist = [];

    for (let id of friendsIdList) {
      const user = await User.findById(id);
      friendslist.push({
        _id: user._id,
        username: user.username,
        name: user.name,
        lastname: user.lastname,
        profilePicture: user.profilePicture,
      });
    }

    res.status(200).json({ friendslist });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/search', authMiddleware, async (req, res) => {
  try {
    const search = req.body.search;
    if (search !== '') {
      console.log(search);
      const name = User.find([
        {
          $search: {
            index: 'text',
            text: {
              query: '<query>',
              path: {
                wildcard: '*',
              },
            },
          },
        },
      ]);
      res.status(200).json({ name });
    } else {
      res.status(400).json({ message: 'введите запрос' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//follow a user

router.post('/follow', authMiddleware, async (req, res) => {
  if (req.user.username !== req.body.username) {
    try {
      const user = await User.findOne({ username: req.body.username });
      const currentUser = await User.findOne({ username: req.user.username });
      if (!user.followers.includes(currentUser._id)) {
        await user.updateOne({ $push: { followers: currentUser._id } });
        await currentUser.updateOne({ $push: { followings: user._id } });

        const currUser = await User.findOne({ username: req.user.username });
        const follow = {
          followers: currUser.followers,
          followings: currUser.followings,
        };

        res.status(200).json(follow);
      } else {
        res.status(403).json('you allready follow this user');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('you cant follow yourself');
  }
});

//unfollow a user

router.post('/unfollow', authMiddleware, async (req, res) => {
  if (req.user.username !== req.body.username) {
    try {
      const user = await User.findOne({ username: req.body.username });
      const currentUser = await User.findOne({ username: req.user.username });
      if (user.followers.includes(currentUser._id)) {
        await user.updateOne({ $pull: { followers: currentUser._id } });
        await currentUser.updateOne({ $pull: { followings: user._id } });
        const currUser = await User.findOne({ username: req.user.username });
        const follow = {
          followers: currUser.followers,
          followings: currUser.followings,
        };

        res.status(200).json(follow);
      } else {
        res.status(403).json('you dont follow this user');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('you cant unfollow yourself');
  }
});

module.exports = router;
