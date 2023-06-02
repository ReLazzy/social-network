const io = require('socket.io')(8900, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

let users = [];

const addUser = (userId, socketId) => {
  users.map((user) => {
    if (user.userId === userId) user.socketId = socketId;
  });
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
  console.log('a user connected');
  //   io.emit('welcome', 'hello server');
  socket.on('addUser', (userId) => {
    console.log('addUser', userId);
    console.log(userId);
    addUser(userId, socket.id);
  });
  socket.on('disconnect', () => {
    console.log('disconnect');
    removeUser(socket.id);
  });

  socket.on('sendMessage', ({ senderId, receiverId, message }) => {
    const user = getUser(receiverId);

    io.to(user.socketId).emit('getMessage', { senderId, message });
  });
});
