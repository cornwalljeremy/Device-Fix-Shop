const db = require('../config/connection');

class Model {
  getAll() {
    return db.query(`SELECT * FROM models ORDER BY name`);
  }
}

module.exports = new Model();
