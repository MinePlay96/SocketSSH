const debug = true;

const socket = require('socket.io-client')('http://localhost');
const os = require('os');

socket.on('type', () => {
  if (debug) console.info('Recived type request', 'server');
  socket.emit('type', 'server');
});
socket.on('auth', () => {
  if (debug) console.info('Recived auth request');
  const authData = { hostname: os.hostname() };
  socket.emit('auth', authData);
  if (debug) console.info('Sended auth data', authData);
});
