var express = require('express');
var path = require('path');
const WebSocket = require('ws');

const port = process.env.PORT || 8080;
var server = express()
  .use(express.static(path.join(__dirname, 'client')))
  .get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
  })
  .listen(port, () =>
    console.log(`Server listening on http://localhost:${port}.`)
  );

const wss = new WebSocket.Server({ server });
const broadcast = data => {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', function(ws, request) {
  ws.on('message', function(message) {
    if (message == 'playsound') {
      broadcast('playsound');
    }
    console.log(`Received message ${message}`);
  });

  ws.on('close', function() {});
});
