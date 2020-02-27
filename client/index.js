const socket = require('socket.io-client')('http://localhost');

socket.on('news', (data) => {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});
