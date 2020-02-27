// TODO: add Vue
const fs = require('fs');
const http = require('http');

function createWebServer(port) {
  const app = http.createServer((req, res) => {
    fs.readFile(`${__dirname}/../html/index.html`, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading index.html');
        return;
      }

      res.writeHead(200);
      res.end(data);
    });
  });

  app.listen(port);
  return app;
}

module.exports = createWebServer;
