const db = require('../config/connection');

class Shipment {
  getTrackingInfo(tracking_number) {
    return db.query(
      `WITH updates AS (
        SELECT shipments.*, 
        JSON_ARRAYAGG(JSON_OBJECT("id", shipping_updates.id, "updated_on", shipping_updates.updated_on, "status", shipping_updates.status, "location", shipping_updates.location, "shipment_id", shipping_updates.shipment_id)) 
        AS updates FROM shipments 
        LEFT JOIN shipping_updates ON shipments.id = shipping_updates.shipment_id 
        WHERE shipments.tracking_number = ?
        GROUP BY shipments.id
      )
      SELECT updates.*, 
      JSON_OBJECT("id", addresses.id, "street", addresses.street, "city", addresses.city, "state", addresses.state, "postal_code", addresses.postal_code) 
      AS address FROM updates 
      LEFT JOIN addresses ON addresses.id = updates.address_id;`,
      [tracking_number]
    );
  }

  createShipment({ tracking_number, expected_arrival, address_id }) {
    return db.query(
      `INSERT INTO shipments(tracking_number, expected_arrival, address_id) VALUES(?, ?, ?)`,
      [tracking_number, expected_arrival, address_id]
    );
  }

  getShipment(id) {
    return db.query(`SELECT * from shipments WHERE shipments.id = ?`, [id]);
  }
}

module.exports = new Shipment();
