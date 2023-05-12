const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');
const authMiddleware = require('../middlewaree/authMiddleware');
//create a post

router.post('/', authMiddleware, async (req, res) => {
  const user = await User.findOne({ username: req.user.username });
  const newPost = new Post({
    username: user.username,
    name: user.name,
    lastname: user.lastname,
    profilePicture: user.profilePicture,
    userId: req.user.id,
    desc: req.body.desc,
    image: req.body.image,
  });

  try {
    const savedPost = await newPost.save();
    res.status(200).json({ message: 'Пост сохранен' });
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
    const limit = req.body.limit;
    const userPosts = await Post.find({ userId: currentUser._id })
      .limit(limit)
      .sort({ createdAt: -1 });

    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId })
          .limit(limit)
          .sort({ createdAt: -1 });
      })
    );
    const allPost = userPosts.concat(...friendPosts);
    res.json({ allPost });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/timeline/person', authMiddleware, async (req, res) => {
  try {
    const { username } = req.body;

    const currentUser = await User.findOne({ username });

    const allPost = await Post.find({ userId: currentUser._id }).sort({
      createdAt: -1,
    });

    res.json({ allPost });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
