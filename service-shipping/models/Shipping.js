const db = require('../config/connection');

class Shipping {
  create({ updated_on, status, location, shipment_id }) {
    return db.query(
      `INSERT INTO shipping_updates(updated_on, status, location, shipment_id) VALUES(?, ?, ?, ?)`,
      [updated_on, status, location, shipment_id]
    );
  }

  getUpdate(id) {
    return db.query(
      `SELECT * from shipping_updates WHERE shipping_updates.id = ?`,
      [id]
    );
  }
}

module.exports = new Shipping();
