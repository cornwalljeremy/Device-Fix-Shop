const db = require('../config/connection');

class Device {
  getAll() {
    return db.query(
      `SELECT devices.*, models.name AS model,
      models.screen_size, platforms.name AS platform
      FROM devices
      LEFT JOIN models ON devices.model_id = models.id
      LEFT JOIN platforms ON models.platform_id = platforms.id
      ORDER BY date_received DESC`
    );
  }

  create({ cond, notes, model_id }) {
    return db.query(
      `INSERT INTO devices (cond, notes, model_id)
        VALUES (?, ?, ?)`,
      [cond, notes, model_id]
    );
  }

  getOne(id) {
    return db.query(
      `SELECT devices.* , models.name AS model,
      models.screen_size, platforms.name AS platform
      FROM devices
      LEFT JOIN models ON devices.model_id = models.id
      LEFT JOIN platforms ON models.platform_id = platforms.id
      WHERE devices.id = ?`,
      [id]
    );
  }

  delete({ id }) {
    return db.query(`DELETE FROM devices WHERE id = ?`, [id]);
  }
}

module.exports = new Device();
