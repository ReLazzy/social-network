const io = require('socket.io')(8900, {
  cors: {
    origin: 'http://45.141.76.248:3000',
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
  //   io.emit('welcome', 'hello server');
  socket.on('addUser', (userId) => {
    console.log(userId);
    addUser(userId, socket.id);
  });
  socket.on('disconnect', () => {
    removeUser(socket.id);
  });

  socket.on('sendMessage', ({ senderId, receiverId, message }) => {
    const user = getUser(receiverId);

    user && io.to(user.socketId).emit('getMessage', { senderId, message });
  });
});
