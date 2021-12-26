const { Device } = require('../models');
const ws = require('../config/socket');

module.exports = {
  getAll: async (client) => {
    const devices = await Device.getAll();

    // send all devices to this client only
    client.send(
      JSON.stringify({
        type: 'all-devices',
        payload: devices[0],
      })
    );
  },
  addDevice: async (payload) => {
    const res = await Device.create(payload);
    const newId = await res[0].insertId;
    const device = await Device.getOne(newId);

    // ping all connected clients with the newly added device
    ws.broadcast(
      JSON.stringify({
        type: 'add-device',
        payload: device[0][0],
      })
    );
  },
  removeDevice: async (payload) => {
    const device = await Device.delete(payload);

    if (device) {
      ws.broadcast(
        JSON.stringify({
          type: 'remove-device',
          payload: { id: payload.id },
        })
      );
    }
  },
};
