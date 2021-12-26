const { Model } = require('../models');

module.exports = {
  getAll: async (client) => {
    const models = await Model.getAll();

    // send all models to this client only
    client.send(
      JSON.stringify({
        type: 'all-models',
        payload: models[0],
      })
    );
  },
};
