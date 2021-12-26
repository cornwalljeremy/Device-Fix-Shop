const ws = require('./config/socket');
const controller = require('./controllers');
const jwt = require('./utils/jwt');

ws.on('connection', (client, req) => {
  // check for correct headers
  if (req.headers['authorization']) {
    const bearer = req.headers['authorization'].split(' ')[1];
    if (jwt.verify(bearer)) {
      // pass all client/socket handling to the controller
      return controller(client);
    }
  }

  // not authorized, so close connection
  client.close();
});
