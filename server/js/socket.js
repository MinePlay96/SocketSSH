// TODO: make better / butify
const socketIo = require('socket.io');

function connectionHandler(socket) {
  socket.emit('news', { hello: 'world' });

  socket.on('my other event', (data) => {
    console.log(data);
  });
}

function createSocket(httpApp) {
  const io = socketIo(httpApp);
  io.on('connection', connectionHandler);
}

module.exports = createSocket;
