const db = require('../config/connection');

class Address {
  create({ street, city, state, postal_code }) {
    return db.query(
      'INSERT INTO addresses(street, city, state, postal_code) VALUES (?, ?, ?, ?)',
      [street, city, state, postal_code]
    );
  }
}

module.exports = new Address();
