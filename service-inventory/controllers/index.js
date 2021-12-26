const deviceController = require('./devices');
const modelController = require('./models');

module.exports = (client) => {
  // immediately send connected client all devices and models
  deviceController.getAll(client);
  modelController.getAll(client);

  // listen for follow-up messages from this client
  client.on('message', async (message) => {
    try {
      const { type, payload } = JSON.parse(message);

      // relay the client's request to the appropriate controller method
      switch (type) {
        case 'add-device':
          await deviceController.addDevice(payload);
          break;
        case 'remove-device':
          await deviceController.removeDevice(payload);
          break;
      }
    } catch (err) {
      // relay any errors back to client
      client.send(
        JSON.stringify({
          type: 'error',
          payload: err.message,
        })
      );
    }
  });
};
