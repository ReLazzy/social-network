const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const authMiddleware = require('../middlewaree/authMiddleware');

const generateAccessToken = (id, username) => {
  const payload = {
    id,
    username,
  };
  return jwt.sign(payload, secret, { expiresIn: '200h' });
};

//REGISTER
router.post('/register', async (req, res) => {
  try {
    const { username, name, lastname, birthday, password, email } = req.body;
    const selectedDate = new Date(birthday);
    const currentDate = new Date();
    if (selectedDate >= currentDate)
      return res
        .status(400)
        .json({ message: 'Выбранная дата рождения позже текущей даты' });

    const candidateUser = await User.findOne({ username });
    const candidateMail = await User.findOne({ email });
    const isUsernameValid = /^[a-zA-Z0-9]+$/.test(username);
    if (candidateUser || candidateMail) {
      return res
        .status(400)
        .json({ message: 'Пользователь с таким именем/почтой уже существует' });
    }
    if (!isUsernameValid) {
      return res
        .status(400)
        .json({ message: 'Username может содержть только латинские буквы' });
    }

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hashSync(password, salt);

    const newUser = new User({
      username: username,
      name: name,
      lastname: lastname,
      email: email,
      password: hashPassword,
      birthday: birthday,
    });

    await newUser.save();

    const token = generateAccessToken(newUser._id, newUser.username);
    return res.json({
      message: 'Пользователь успешно зарегистрирован',
      token,
      id: newUser._id,
      username: newUser.username,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Не удалось зарегистрироваться проверьте поля ввода)' });
  }
});
//check
router.post('/check', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    return res.status(200).json({
      username: req.user.username,
      id: req.user.id,

      followers: user.followers,
      followings: user.followings,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(403)
        .json({ message: `Пользователь ${email} не найден` });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: `Введен неверный пароль` });
    }

    const token = generateAccessToken(user._id, user.username);

    return res.json({
      token,
      username: user.username,
      id: user._id,

      followers: user.followers,
      followings: user.followings,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
