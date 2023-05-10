const User = require('../models/User');
const router = require('express').Router();
const bcrypt = require('bcrypt');
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
    res.status(200).json('Account has been updated');
  } catch (err) {
    return res.status(500).json({ message: 'Акаунт не удалось обновить' });
  }
});

//delete user
router.delete('/delete', authMiddleware, async (req, res) => {
  if (req.user.id === req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json('Account has been deleted');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('You can delete only your account!');
  }
});

//get a user by username
router.post('/username', authMiddleware, async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    console.log(user);
    const { password, updatedAt, isAdmin, createdAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    console.log(err);
    console.log('Пизда');
    res.status(500).json(err);
  }
});

router.post('/friends', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const followers = user.followers;
    const followings = user.followings;
    const friendsIdList = followers.filter((x) => followings.indexOf(x) !== -1);
    const friendsList = [];

    for (let id of friendsIdList) {
      const user = await User.findById(id);
      friendsList.push({
        username: user.username,
        name: user.name,
        lastname: user.lastname,
        profilePicture: user.profilePicture,
      });
    }

    console.log('2', friendsList);
    res.status(200).json({ friendsList });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/search', authMiddleware, async (req, res) => {
  try {
    const search = req.body.search;
    if (search !== '') {
      const List = await User.find(
        { $text: { $search: search } },
        { score: { $meta: 'textScore' } }
      ).sort({ score: { $meta: 'textScore' } });
      console.log(List);
    } else {
      res.status(400).json({ message: 'введите запрос' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//follow a user

router.put('/follow', authMiddleware, async (req, res) => {
  if (req.user.username !== req.body.username) {
    try {
      const user = await User.findOne({ username: req.body.username });
      const currentUser = await User.findOne({ username: req.user.username });
      if (!user.followers.includes(currentUser._id)) {
        await user.updateOne({ $push: { followers: currentUser._id } });
        await currentUser.updateOne({ $push: { followings: user._id } });
        res.status(200).json({
          message: 'user has been followed',
          followers: currentUser.followers,
          followings: currentUser.followings,
        });
      } else {
        res.status(403).json('you allready follow this user');
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('you cant follow yourself');
  }
});

//unfollow a user

router.put('/unfollow', authMiddleware, async (req, res) => {
  if (req.user.username !== req.body.username) {
    try {
      const user = await User.findOne({ username: req.body.username });
      const currentUser = await User.findOne({ username: req.user.username });
      if (user.followers.includes(currentUser._id)) {
        await user.updateOne({ $pull: { followers: currentUser._id } });
        await currentUser.updateOne({ $pull: { followings: user._id } });
        res.status(200).json({
          message: 'user has been unfollowed',
          followers: currentUser.followers,
          followings: currentUser.followings,
        });
      } else {
        console.log('1');
        res.status(403).json('you dont follow this user');
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    console.log('2');
    res.status(403).json('you cant unfollow yourself');
  }
});

module.exports = router;
