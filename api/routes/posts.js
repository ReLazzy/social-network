const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');
const authMiddleware = require('../middlewaree/authMiddleware');
//create a post

router.post('/', authMiddleware, async (req, res) => {
  const user = await User.findOne({ username: req.user.username });
  const newPost = new Post({
    username: user.username,

    userId: req.user.id,
    desc: req.body.desc,
    image: req.body.image,
  });

  try {
    const savedPost = await newPost.save();
    const userInfo = [
      {
        _id: user._id,
        username: user.username,
        name: user.name,
        lastname: user.lastname,
        profilePicture: user.profilePicture,
      },
    ];
    console.log(userInfo);
    res.status(200).json({ allPost: [savedPost], usersProfile: userInfo });
  } catch (err) {
    res.status(500).json(err);
  }
});
//update a post

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.user.id) {
      await post.updateOne({ $set: req.body });
      res.status(200).json('the post has been updated');
    } else {
      res.status(403).json('you can update only your post');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete a post

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.user.id) {
      await post.deleteOne();
      res.status(200).json('the post has been deleted');
    } else {
      res.status(403).json('you can delete only your post');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//like / dislike a post

router.post('/like', authMiddleware, async (req, res) => {
  try {
    const { idPanel } = req.body;
    const post = await Post.findOne({ _id: idPanel });

    if (!post.likes.includes(req.user.id)) {
      await post.updateOne({ $push: { likes: req.user.id } });
      res.status(200).json('like');
    } else {
      await post.updateOne({ $pull: { likes: req.user.id } });
      res.status(200).json('unlike');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//get a post

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get timeline posts

router.post('/timeline/all', authMiddleware, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    const limit = 5;

    const date = req.body.date;
    const page = req.body.page;

    const currentUsers = [req.user.id];
    const allUsers = currentUsers.concat(currentUser.followings);
    const usersProfile = await Promise.all(
      allUsers.map(async (Id) => {
        const user = await User.findById(Id);
        const { _id, username, name, lastname, profilePicture } = user._doc;
        return { _id, username, name, lastname, profilePicture };
      })
    );
    const friendPosts = await Post.find({
      userId: allUsers,
      createdAt: { $lt: date },
    })
      .sort({
        createdAt: -1,
      })
      .skip(limit * page)
      .limit(limit);

    const allPost = [].concat(...friendPosts);
    res.json({ allPost, usersProfile });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/timeline/person', authMiddleware, async (req, res) => {
  try {
    const { username, date, page } = req.body;
    const limit = 5;
    console.log(username, date, page);
    const currentUser = await User.findOne({ username });
    const { _id, name, lastname, profilePicture } = currentUser;
    const allPost = await Post.find({
      userId: currentUser._id,
      createdAt: { $lt: date },
    })
      .sort({
        createdAt: -1,
      })
      .skip(limit * page)
      .limit(limit);

    res.json({
      allPost,
      usersProfile: [{ _id, name, username, lastname, profilePicture }],
      username: username,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
