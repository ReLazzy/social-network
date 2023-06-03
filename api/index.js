const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const chatRoute = require('./routes/chats');
const messageRoute = require('./routes/messages');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const MONGO_URL = require('./config');
const HOST_URL = require('./config');
dotenv.config();

mongoose.connect(MONGO_URL).then(() => {
  console.log('Connected to MongoDB');
});

//middleware
app.use(express.json());

app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(
  cors({
    credentials: true,
    origin: HOST_URL,
  })
);
app.use('/images', express.static(path.join(__dirname, '/public/images')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    return res.status(200).json('File uploded successfully');
  } catch (error) {
    console.error(error);
  }
});

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/chats', chatRoute);
app.use('/api/messages', messageRoute);

app.listen(8800, () => {
  console.log('Backend server is running!');
});
