// TODO: make better / butify
// TODO: add global constants

// TODO: make debug global constant
const debug = true;

const socketIo = require('socket.io');

const serverList = {};
const users = {};

function authUser(user) {
  // TODO: add auth
  return !!user;
}

function handelServer(socket) {
  if (debug) console.info('socket is server type');
  socket.emit('auth');
  socket.on('auth', (server) => {
    if (debug) console.info('server Redistert', server);
    serverList[server.hostname] = socket;
    Object.keys(users).forEach((username) => {
      users[username].emit('newServer', server.hostname);
    });
    socket.on('disconnect', () => {
      delete serverList[server.hostname];
      Object.keys(users).forEach((username) => {
        users[username].emit('diconectServer', server.hostname);
      });
    });
  });
}

function handelUser(socket) {
  if (debug) console.info('socket is user type');
  socket.emit('auth');
  if (debug) console.info('asking user for auth');
  socket.on('auth', (user) => {
    const validUser = authUser(user);
    if (debug) console.info('user auth', validUser);
    if (validUser) {
      users[user.username] = socket;
      if (debug) console.info('sending server list', Object.keys(serverList));
      socket.emit('serverList', Object.keys(serverList));
    }
  });
}

function connectionHandler(socket) {
  if (debug) console.info('socket recives connection');
  socket.emit('type');
  socket.on('type', (data) => {
    if (data) {
      if (data === 'user') {
        handelUser(socket);
      } else if (data === 'server') {
        handelServer(socket);
      } else {
        if (debug) console.info('socket is not a valid type closing Socket');
        socket.emit('notValid');
        socket.close();
      }
    }
  });
}

function createSocket(httpApp) {
  const io = socketIo(httpApp);
  if (debug) console.info('socket server Startet');
  io.on('connection', connectionHandler);
}

module.exports = createSocket;
