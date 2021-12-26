require('dotenv').config();

const WebSocket = require('ws');

// create a new socket connection
const wss = new WebSocket.Server({
  port: process.env.PORT || 8080,
});

module.exports = {
  broadcast: (data) => {
    // send the message to every connected client
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  },
  // preserve original `on` functionality
  on: (type, callback) => wss.on(type, callback),
};
