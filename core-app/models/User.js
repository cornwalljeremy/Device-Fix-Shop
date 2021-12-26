const db = require('../config/connection');

class User {
  findUser({ username, password }) {
    return db.query(
      `SELECT id FROM users
      WHERE username = ?
      AND password = AES_ENCRYPT(?, UNHEX(SHA2(?, 512)))`,
      [username, password, process.env.ENCRYPTION_KEY]
    );
  }

  create({ username, password }) {
    return db.query(
      `INSERT INTO users (username, password)
      VALUES(?, AES_ENCRYPT(?, UNHEX(SHA2(?, 512))))`,
      [username, password, process.env.ENCRYPTION_KEY]
    );
  }
}

module.exports = new User();
