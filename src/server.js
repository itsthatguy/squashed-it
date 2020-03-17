var express = require('express');
var app = express();
var path = require('path');
const WebSocket = require('ws');
const http = require('http');

app.use(express.static(path.join(__dirname, 'client')))
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const broadcast = (data) => {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
};

wss.on('connection', function(ws, request) {
  // const userId = request.session.userId;

  // map.set(userId, ws);

  ws.on('message', function(message) {
    if (message == "playsound") {
      broadcast('playsound');
    }
    console.log(`Received message ${message}`);
  });

  ws.on('close', function() {
    // map.delete(userId);
  });
});

// app.ws('/', function(ws, req) {
//   ws.on('message', function(msg) {
//     if (msg == "playsound") {
//       ws.send('playsound');
//       console.log(ws);
//     }
//   });

//   ws.on('message', function(msg) {
//     console.log(msg);
//   });
//   console.log('socket', req.testing);
// });

const port = process.env.PORT || 8080
server.listen(port, () => console.log(`Server listening on http://localhost:${port}.`));
